import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';
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
  ) {}

  async execute(input: {
    userId: number;
    tripId: number;
    movementSequence: number;
    proofType: 'ticket' | 'invoice';
    comment: string | null;
    files: readonly { tripFileId: number; fileRole: MovementProofFileRole }[];
  }): Promise<SubmitTripMovementProofResponse> {
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
    if (context.corporateCardNumber === null) {
      throw new BadRequestException({
        message: 'El viaje no tiene tarjeta corporativa asociada.',
        error: 'Tarjeta no encontrada',
      });
    }

    validateProofFiles(input.proofType, input.files);

    const filesBelongToUser = await this.travelChecksRepository.areTripFilesOwnedByUser({
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

    const createdProof = await this.travelChecksRepository.createTripMovementProof({
      tripId: input.tripId,
      movementSequence: input.movementSequence,
      movementDate: new Date(movement.dueDate),
      movementAmount: movement.debitAmount,
      movementMemo: movement.memo,
      proofType: input.proofType,
      createdByUserId: input.userId,
      comment: input.comment,
      files: input.files,
    });

    return buildSuccessResponse(
      { id: createdProof.id, status: 'submitted' },
      'Comprobación del movimiento registrada correctamente.',
    );
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
    const movements = await this.travelChecksSapMovementsPort.fetchByReference(input.context);
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
        message: 'Para ticket debes enviar exactamente un archivo con rol ticket.',
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
