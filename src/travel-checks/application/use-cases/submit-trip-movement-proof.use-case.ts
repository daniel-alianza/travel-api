import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { DmsBucketConfig } from '../../../config/dms-bucket/dms';
import type { DmsStoragePort } from '../../../dms/application/interfaces/dms-storage.interface';
import {
  INVOICE_CFDI_XML_PDF_PAIRS,
  mapInvoiceXmlRoleToCfdiEnum,
  validateInvoiceProofPairsFromBuffers,
  type InvoiceProofPairBuffersInput,
} from '../../domain/trip-movement-invoice-cfdi';
import { extractPlainTextFromPdfBuffer } from '../../infrastructure/extract-plain-text-from-pdf-buffer';
import type {
  TravelChecksRepository,
  TripMovementProofInvoiceCfdiPersistInput,
  TripMovementProofInvoiceCfdiRecordInput,
} from '../interfaces/travel-checks-repository.interface';
import type {
  SapExpenseMovementRecord,
  TravelChecksSapMovementsPort,
} from '../interfaces/travel-checks-sap-movements.interface';

type SubmitTripMovementProofData = {
  readonly id: number;
  readonly status: 'submitted';
};

export type SubmitTripMovementProofResponse =
  ApiSuccessResponse<SubmitTripMovementProofData>;

type MovementProofFileRole =
  | 'ticket'
  | 'invoice_xml'
  | 'invoice_pdf'
  | 'invoice_xml_outbound'
  | 'invoice_pdf_outbound'
  | 'invoice_xml_return'
  | 'invoice_pdf_return';

@Injectable()
export class SubmitTripMovementProofUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
    @Inject('TravelChecksSapMovementsPort')
    private readonly travelChecksSapMovementsPort: TravelChecksSapMovementsPort,
    @Inject('DmsStoragePort')
    private readonly dmsStoragePort: DmsStoragePort,
    @Inject('DMS_BUCKET_CONFIG')
    private readonly dmsBucketConfig: DmsBucketConfig,
  ) {}

  async execute(input: {
    userId: number;
    tripId: number;
    movementSequence: number;
    proofType: 'ticket' | 'invoice';
    comment: string | null;
    files: readonly { tripFileId: number; fileRole: MovementProofFileRole }[];
  }): Promise<SubmitTripMovementProofResponse> {
    const context =
      await this.travelChecksRepository.findExpenseTripMovementContext(
        input.tripId,
        input.userId,
      );
    if (context === null) {
      throw new NotFoundException({
        message: 'Viaje no encontrado o no dispersado para este usuario.',
        error: 'Viaje no encontrado',
      });
    }
    if (context.corporateCardNumber === null) {
      throw new BadRequestException({
        message: 'El viaje no tiene tarjeta corporativa asociada.',
        error: 'Tarjeta no encontrada',
      });
    }

    validateProofFiles(input.proofType, input.files);

    const filesBelongToUser =
      await this.travelChecksRepository.areTripFilesOwnedByUser({
        tripId: input.tripId,
        userId: input.userId,
        fileIds: input.files.map((file) => file.tripFileId),
      });
    if (!filesBelongToUser) {
      throw new BadRequestException({
        message: 'Uno o más archivos no pertenecen a este viaje.',
        error: 'Archivo inválido',
      });
    }

    const movement = await this.findMovement({
      context,
      movementSequence: input.movementSequence,
    });

    let invoiceCfdi: TripMovementProofInvoiceCfdiPersistInput | null = null;
    if (input.proofType === 'invoice') {
      invoiceCfdi = await this.buildInvoiceCfdiPersistInput({
        tripId: input.tripId,
        userId: input.userId,
        files: input.files,
        departureDate: context.departureDate,
        returnDate: context.returnDate,
        movementSequence: input.movementSequence,
      });
    }

    const createdProof =
      await this.travelChecksRepository.createTripMovementProof({
        tripId: input.tripId,
        movementSequence: input.movementSequence,
        movementDate: new Date(movement.dueDate),
        movementAmount: movement.debitAmount,
        movementMemo: movement.memo,
        proofType: input.proofType,
        createdByUserId: input.userId,
        comment: input.comment,
        files: input.files,
        invoiceCfdi,
      });

    return buildSuccessResponse(
      { id: createdProof.id, status: 'submitted' },
      'Comprobación del movimiento registrada correctamente.',
    );
  }

  private async buildInvoiceCfdiPersistInput(input: {
    readonly tripId: number;
    readonly userId: number;
    readonly files: readonly {
      tripFileId: number;
      fileRole: MovementProofFileRole;
    }[];
    readonly departureDate: Date;
    readonly returnDate: Date;
    readonly movementSequence: number;
  }): Promise<TripMovementProofInvoiceCfdiPersistInput> {
    const fileIds = input.files.map((f) => f.tripFileId);
    const rows = await this.travelChecksRepository.findTripFilesForProofByIds({
      tripId: input.tripId,
      userId: input.userId,
      fileIds,
    });
    if (rows.length !== fileIds.length) {
      throw new BadRequestException({
        message:
          'No se pudieron resolver todos los archivos de la comprobación.',
        error: 'Archivos inválidos',
      });
    }

    const fileById = new Map(rows.map((row) => [row.id, row]));
    const crosscheckAt = new Date();

    const excludeProofId =
      await this.travelChecksRepository.findTripMovementProofIdByTripAndSequence(
        {
          tripId: input.tripId,
          movementSequence: input.movementSequence,
        },
      );

    const bufferPairs: InvoiceProofPairBuffersInput[] = [];
    const xmlTripFileIds: number[] = [];

    for (const pair of INVOICE_CFDI_XML_PDF_PAIRS) {
      const xmlSpec = input.files.find((f) => f.fileRole === pair.xml);
      const pdfSpec = input.files.find((f) => f.fileRole === pair.pdf);
      if (xmlSpec === undefined && pdfSpec === undefined) {
        continue;
      }
      if (xmlSpec === undefined || pdfSpec === undefined) {
        throw new BadRequestException({
          message:
            'Cada XML de factura debe ir acompañado de su PDF correspondiente.',
          error: 'CFDI_ARCHIVOS_INCOMPLETOS',
        });
      }

      const xmlRow = fileById.get(xmlSpec.tripFileId);
      const pdfRow = fileById.get(pdfSpec.tripFileId);
      if (xmlRow === undefined || pdfRow === undefined) {
        throw new BadRequestException({
          message: 'No se encontraron rutas de archivo para validar el CFDI.',
          error: 'Archivo inválido',
        });
      }

      const xmlText = await this.descargarTextoDesdeDms(xmlRow.fileUrl);
      const pdfBuffer = await this.descargarBufferDesdeDms(pdfRow.fileUrl);

      bufferPairs.push({
        xmlText,
        pdfBuffer,
        xmlRole: pair.xml,
      });
      xmlTripFileIds.push(xmlSpec.tripFileId);
    }

    const validated = await validateInvoiceProofPairsFromBuffers({
      tripDeparture: input.departureDate,
      tripReturn: input.returnDate,
      pairs: bufferPairs,
      extractPdfPlainText: extractPlainTextFromPdfBuffer,
    });

    for (const row of validated) {
      const hasConflict =
        await this.travelChecksRepository.hasTripMovementProofCfdiUuidConflict({
          cfdiUuid: row.cfdiUuid,
          excludeTripMovementProofId: excludeProofId,
        });
      if (hasConflict) {
        throw new BadRequestException({
          message:
            'El UUID de este CFDI ya fue registrado en otra comprobación; no se puede reutilizar la misma factura.',
          error: 'CFDI_UUID_DUPLICADO',
        });
      }
    }

    const cfdiRecords: TripMovementProofInvoiceCfdiRecordInput[] =
      validated.map((row, index) => {
        const tripFileId = xmlTripFileIds[index];
        if (tripFileId === undefined) {
          throw new BadRequestException({
            message:
              'No se pudo asociar el XML del CFDI con el archivo del viaje.',
            error: 'CFDI_ASOCIACION_INVALIDA',
          });
        }
        return {
          tripFileId,
          cfdiUuid: row.cfdiUuid,
          fechaEmision: row.fechaEmision,
          xmlFileRole: mapInvoiceXmlRoleToCfdiEnum(row.xmlRole),
        };
      });

    if (cfdiRecords.length === 0) {
      throw new BadRequestException({
        message: 'No se encontraron XML de factura para validar.',
        error: 'CFDI_XML_FALTANTE',
      });
    }

    return {
      cfdiPdfCrosscheckPassed: true,
      cfdiPdfCrosscheckAt: crosscheckAt,
      cfdiRecords,
    };
  }

  private async descargarTextoDesdeDms(filePath: string): Promise<string> {
    const signed = await this.dmsStoragePort.createSignedDownloadUrl(
      filePath,
      this.dmsBucketConfig.signedUrlExpiresInSeconds,
    );
    const response = await fetch(signed.signedUrl);
    if (!response.ok) {
      throw new BadRequestException({
        message: 'No se pudo descargar el XML del CFDI para validarlo.',
        error: `HTTP ${String(response.status)}`,
      });
    }
    return response.text();
  }

  private async descargarBufferDesdeDms(filePath: string): Promise<Buffer> {
    const signed = await this.dmsStoragePort.createSignedDownloadUrl(
      filePath,
      this.dmsBucketConfig.signedUrlExpiresInSeconds,
    );
    const response = await fetch(signed.signedUrl);
    if (!response.ok) {
      throw new BadRequestException({
        message: 'No se pudo descargar el PDF de la factura para validarlo.',
        error: `HTTP ${String(response.status)}`,
      });
    }
    return Buffer.from(await response.arrayBuffer());
  }

  private async findMovement(input: {
    context: {
      tripId: number;
      destination: string;
      departureDate: Date;
      returnDate: Date;
      companyId: number;
      corporateCardNumber: string | null;
      accountCodes: readonly string[];
    };
    movementSequence: number;
  }): Promise<SapExpenseMovementRecord> {
    const movements = await this.travelChecksSapMovementsPort.fetchByReference(
      input.context,
    );
    const movement = movements.find(
      (item) => item.sequence === input.movementSequence,
    );
    if (!movement) {
      throw new BadRequestException({
        message: 'No se encontró el movimiento en SAP para este viaje.',
        error: 'Movimiento inválido',
      });
    }
    return movement;
  }
}

function validateProofFiles(
  proofType: 'ticket' | 'invoice',
  files: readonly { tripFileId: number; fileRole: MovementProofFileRole }[],
): void {
  if (files.length === 0) {
    throw new BadRequestException({
      message: 'Debes enviar al menos un archivo para comprobar el movimiento.',
      error: 'Archivos requeridos',
    });
  }

  if (proofType === 'ticket') {
    const validTicket = files.length === 1 && files[0]?.fileRole === 'ticket';
    if (!validTicket) {
      throw new BadRequestException({
        message:
          'Para ticket debes enviar exactamente un archivo con rol ticket.',
        error: 'Archivos inválidos',
      });
    }
    return;
  }

  const roles = files.map((file) => file.fileRole);
  const isSimpleInvoice =
    roles.length === 2 &&
    roles.includes('invoice_xml') &&
    roles.includes('invoice_pdf');
  const isBusInvoice =
    roles.length === 4 &&
    roles.includes('invoice_xml_outbound') &&
    roles.includes('invoice_pdf_outbound') &&
    roles.includes('invoice_xml_return') &&
    roles.includes('invoice_pdf_return');

  if (!isSimpleInvoice && !isBusInvoice) {
    throw new BadRequestException({
      message:
        'Para factura debes enviar XML+PDF o los 4 archivos de autobús (ida y regreso).',
      error: 'Archivos inválidos',
    });
  }
}
