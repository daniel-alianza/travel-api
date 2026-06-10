import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  GasolineRequestRepository,
  GasolineRequestSummaryRecord,
} from '../interfaces/gasoline-request.repository.interface';

export type CancelApprovedGasolineRequestCommand = {
  readonly requestId: number;
  readonly cancelledById: number;
  readonly comment: string;
};

export type CancelApprovedGasolineRequestResponse =
  ApiSuccessResponse<GasolineRequestSummaryRecord>;

@Injectable()
export class CancelApprovedGasolineRequestUseCase {
  constructor(
    @Inject('GasolineRequestRepository')
    private readonly gasolineRequestRepository: GasolineRequestRepository,
  ) {}

  async execute(
    command: CancelApprovedGasolineRequestCommand,
  ): Promise<CancelApprovedGasolineRequestResponse> {
    const request = await this.gasolineRequestRepository.findById(
      command.requestId,
    );
    if (request === null) {
      throw new NotFoundException('Solicitud de gasolina no encontrada.');
    }

    if (request.status !== 'approved') {
      throw new BadRequestException(
        `Solo se pueden cancelar solicitudes aprobadas. Estado actual: ${request.status}.`,
      );
    }

    if (command.comment.trim().length === 0) {
      throw new BadRequestException('El motivo de cancelación es obligatorio.');
    }

    const updated = await this.gasolineRequestRepository.cancelApproved({
      requestId: command.requestId,
      cancelledById: command.cancelledById,
      comment: command.comment.trim(),
    });

    if (updated === null) {
      throw new BadRequestException('No fue posible cancelar la solicitud.');
    }

    return buildSuccessResponse(updated, 'Solicitud cancelada correctamente.');
  }
}
