import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { GasolineNotificationRecipientService } from '../services/gasoline-notification-recipient.service';
import type {
  GasolineRequestRepository,
  GasolineRequestSummaryRecord,
} from '../interfaces/gasoline-request.repository.interface';

export type ApproveGasolineRequestCommand = {
  readonly requestId: number;
  readonly approverId: number;
  readonly comment?: string;
};

export type ApproveGasolineRequestResponse =
  ApiSuccessResponse<GasolineRequestSummaryRecord>;

@Injectable()
export class ApproveGasolineRequestUseCase {
  constructor(
    @Inject('GasolineRequestRepository')
    private readonly gasolineRequestRepository: GasolineRequestRepository,
    private readonly gasolineNotificationRecipientService: GasolineNotificationRecipientService,
  ) {}

  async execute(
    command: ApproveGasolineRequestCommand,
  ): Promise<ApproveGasolineRequestResponse> {
    const request = await this.gasolineRequestRepository.findById(
      command.requestId,
    );
    if (request === null) {
      throw new NotFoundException('Solicitud de gasolina no encontrada.');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException(`La solicitud ya fue ${request.status}.`);
    }

    const applicant =
      await this.gasolineRequestRepository.findUserApprovalContext(
        request.userId,
      );
    if (applicant === null) {
      throw new NotFoundException('Solicitante no encontrado.');
    }

    const approver = await this.gasolineRequestRepository.findApprover(
      command.approverId,
    );
    if (approver === null) {
      throw new NotFoundException('Aprobador no encontrado.');
    }

    const treasury =
      await this.gasolineNotificationRecipientService.isTreasuryApprover(
        approver.email,
      );
    if (!treasury) {
      if (applicant.managerId === null) {
        throw new BadRequestException(
          'El colaborador no tiene jefe directo configurado.',
        );
      }
      if (applicant.managerId !== command.approverId) {
        throw new BadRequestException(
          'Solo el jefe directo del colaborador puede aprobar esta solicitud.',
        );
      }
    }

    const updated = await this.gasolineRequestRepository.approve({
      requestId: command.requestId,
      approverId: command.approverId,
      comment: command.comment?.trim() ?? null,
    });

    if (updated === null) {
      throw new BadRequestException('No fue posible aprobar la solicitud.');
    }

    return buildSuccessResponse(
      updated,
      'Solicitud de gasolina aprobada correctamente.',
    );
  }
}
