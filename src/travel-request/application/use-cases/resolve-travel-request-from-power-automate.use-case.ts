import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';
import { NotifyTravelRequestApprovedUseCase } from './notify-travel-request-approved.use-case';

export type ResolveTravelRequestFromPowerAutomateCommand = {
  readonly requestId: number;
  readonly action: 'approved' | 'rejected';
  readonly bossEmail: string;
  readonly comment?: string | null;
};

export type ResolveTravelRequestFromPowerAutomateResponse = ApiSuccessResponse<{
  readonly requestId: number;
  readonly action: 'approved' | 'rejected';
  readonly resolvedTripCount: number;
}>;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

@Injectable()
export class ResolveTravelRequestFromPowerAutomateUseCase {
  private readonly logger = new Logger(
    ResolveTravelRequestFromPowerAutomateUseCase.name,
  );

  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
    private readonly notifyTravelRequestApprovedUseCase: NotifyTravelRequestApprovedUseCase,
  ) {}

  async execute(
    command: ResolveTravelRequestFromPowerAutomateCommand,
  ): Promise<ResolveTravelRequestFromPowerAutomateResponse> {
    this.logger.log(
      `Inicio resolución PA solicitud #${command.requestId} | action=${command.action} | bossEmail=${command.bossEmail}`,
    );

    const resolution = command.action === 'approved' ? 'approve' : 'reject';
    const trimmedComment = command.comment?.trim() ?? '';

    if (resolution === 'reject' && trimmedComment.length === 0) {
      this.logger.warn(
        `Rechazo omitido solicitud #${command.requestId}: comentario vacío.`,
      );
      throw new BadRequestException(
        'El comentario es obligatorio al rechazar la solicitud.',
      );
    }

    const boss =
      await this.travelRequestRepository.findUserByEmail(command.bossEmail);

    if (boss === null) {
      this.logger.warn(
        `Jefe no encontrado solicitud #${command.requestId}: bossEmail=${command.bossEmail}`,
      );
      throw new ForbiddenException(
        'El correo del jefe no está registrado en la plataforma.',
      );
    }

    this.logger.debug(
      `Jefe resuelto solicitud #${command.requestId}: userId=${boss.id} email=${boss.email}`,
    );

    const context =
      await this.travelRequestRepository.findTravelRequestPowerAutomateContext(
        command.requestId,
      );

    if (context === null) {
      this.logger.warn(
        `Solicitud no encontrada en BD: requestId=${command.requestId}`,
      );
      throw new NotFoundException('Solicitud de viáticos no encontrada.');
    }

    this.logger.debug(
      `Contexto solicitud #${command.requestId}: approverId=${context.approverId ?? 'null'} | approverEmail=${context.approverEmail ?? 'null'} | pendingTrips=${context.pendingTripIds.length} [${context.pendingTripIds.join(', ')}]`,
    );

    if (context.pendingTripIds.length === 0) {
      this.logger.warn(
        `Sin viajes pendientes solicitud #${command.requestId}`,
      );
      throw new ConflictException(
        'La solicitud no tiene viajes pendientes de autorización.',
      );
    }

    if (context.approverId === null) {
      this.logger.warn(
        `Sin approverId solicitud #${command.requestId}`,
      );
      throw new ConflictException(
        'La solicitud no tiene jefe autorizador asignado.',
      );
    }

    if (context.approverId !== boss.id) {
      this.logger.warn(
        `Jefe no autorizado solicitud #${command.requestId}: bossId=${boss.id} approverId=${context.approverId}`,
      );
      throw new ForbiddenException(
        'Solo el jefe autorizador puede resolver esta solicitud.',
      );
    }

    if (context.approverEmail !== null) {
      const normalizedApproverEmail = normalizeEmail(context.approverEmail);
      const normalizedBossEmail = normalizeEmail(boss.email);

      if (normalizedApproverEmail !== normalizedBossEmail) {
        this.logger.warn(
          `Email jefe no coincide solicitud #${command.requestId}: bossEmail=${boss.email} approverEmail=${context.approverEmail}`,
        );
        throw new ForbiddenException(
          'El correo del jefe no coincide con el autorizador de la solicitud.',
        );
      }
    }

    const resolvedTripCount = context.pendingTripIds.length;

    this.logger.log(
      `Aplicando ${resolution} a ${resolvedTripCount} viaje(s) solicitud #${command.requestId} por userId=${boss.id}`,
    );

    const result =
      await this.travelRequestRepository.resolveAllPendingTripsForTravelRequest(
        {
          travelRequestId: command.requestId,
          resolution,
          comment:
            resolution === 'reject'
              ? trimmedComment
              : trimmedComment.length > 0
                ? trimmedComment
                : null,
          actorUserId: boss.id,
        },
      );

    if (result === 'not_found') {
      this.logger.error(
        `Repositorio not_found al resolver solicitud #${command.requestId}`,
      );
      throw new NotFoundException('Solicitud de viáticos no encontrada.');
    }

    if (result === 'no_pending_trips') {
      this.logger.warn(
        `Repositorio no_pending_trips solicitud #${command.requestId}`,
      );
      throw new ConflictException(
        'La solicitud no tiene viajes pendientes de autorización.',
      );
    }

    this.logger.log(
      `Resolución PA OK solicitud #${command.requestId} | action=${command.action} | viajes=${resolvedTripCount}`,
    );

    if (command.action === 'approved') {
      await this.notifyTravelRequestApprovedUseCase.execute(command.requestId);
    }

    return buildSuccessResponse(
      {
        requestId: command.requestId,
        action: command.action,
        resolvedTripCount,
      },
      command.action === 'approved'
        ? 'Solicitud de viáticos aprobada correctamente.'
        : 'Solicitud de viáticos rechazada correctamente.',
    );
  }
}
