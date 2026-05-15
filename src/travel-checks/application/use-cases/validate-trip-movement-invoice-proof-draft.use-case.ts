import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import {
  INVOICE_CFDI_XML_PDF_PAIRS,
  validateInvoiceProofPairsFromBuffers,
  type InvoiceProofPairBuffersInput,
} from '../../domain/trip-movement-invoice-cfdi';
import { extractPlainTextFromPdfBuffer } from '../../infrastructure/extract-plain-text-from-pdf-buffer';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

export type ValidateTripMovementInvoiceProofDraftFileBuffers = {
  readonly invoice_xml?: Buffer;
  readonly invoice_pdf?: Buffer;
  readonly invoice_xml_outbound?: Buffer;
  readonly invoice_pdf_outbound?: Buffer;
  readonly invoice_xml_return?: Buffer;
  readonly invoice_pdf_return?: Buffer;
};

type ValidateTripMovementInvoiceProofDraftData = {
  readonly valid: true;
};

export type ValidateTripMovementInvoiceProofDraftResponse =
  ApiSuccessResponse<ValidateTripMovementInvoiceProofDraftData>;

@Injectable()
export class ValidateTripMovementInvoiceProofDraftUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
  ) {}

  async execute(input: {
    readonly userId: number;
    readonly tripId: number;
    readonly movementSequence: number;
    readonly files: ValidateTripMovementInvoiceProofDraftFileBuffers;
  }): Promise<ValidateTripMovementInvoiceProofDraftResponse> {
    const context = await this.travelChecksRepository.findExpenseTripMovementContext(
      input.tripId,
      input.userId,
    );
    if (context === null) {
      throw new NotFoundException({
        message: 'Viaje no encontrado o no dispersado para este usuario.',
        error: 'Viaje no encontrado',
      });
    }

    const pairs = this.buildPairsOrThrow(input.files);

    const validated = await validateInvoiceProofPairsFromBuffers({
      tripDeparture: context.departureDate,
      tripReturn: context.returnDate,
      pairs,
      extractPdfPlainText: extractPlainTextFromPdfBuffer,
    });

    const excludeProofId =
      await this.travelChecksRepository.findTripMovementProofIdByTripAndSequence({
        tripId: input.tripId,
        movementSequence: input.movementSequence,
      });

    for (const row of validated) {
      const hasConflict = await this.travelChecksRepository.hasTripMovementProofCfdiUuidConflict({
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

    return buildSuccessResponse(
      { valid: true },
      'Los archivos de factura cumplen las validaciones de CFDI.',
    );
  }

  private buildPairsOrThrow(
    files: ValidateTripMovementInvoiceProofDraftFileBuffers,
  ): readonly InvoiceProofPairBuffersInput[] {
    const pairs: InvoiceProofPairBuffersInput[] = [];

    for (const pair of INVOICE_CFDI_XML_PDF_PAIRS) {
      const xmlBuffer = files[pair.xml];
      const pdfBuffer = files[pair.pdf];

      const hasXml = xmlBuffer !== undefined && xmlBuffer.length > 0;
      const hasPdf = pdfBuffer !== undefined && pdfBuffer.length > 0;

      if (!hasXml && !hasPdf) {
        continue;
      }
      if (!hasXml || !hasPdf) {
        throw new BadRequestException({
          message: 'Cada XML de factura debe ir acompañado de su PDF correspondiente.',
          error: 'CFDI_ARCHIVOS_INCOMPLETOS',
        });
      }

      pairs.push({
        xmlText: xmlBuffer.toString('utf8'),
        pdfBuffer,
        xmlRole: pair.xml,
      });
    }

    const rolesPresent = new Set(
      pairs.map((item) => item.xmlRole),
    );
    const isSimple =
      rolesPresent.has('invoice_xml') &&
      pairs.length === 1 &&
      rolesPresent.size === 1;
    const isBus =
      rolesPresent.has('invoice_xml_outbound') &&
      rolesPresent.has('invoice_xml_return') &&
      pairs.length === 2 &&
      rolesPresent.size === 2;

    if (!isSimple && !isBus) {
      throw new BadRequestException({
        message:
          'Para factura debes enviar XML+PDF o los 4 archivos de autobús (ida y regreso).',
        error: 'Archivos inválidos',
      });
    }

    return pairs;
  }
}
