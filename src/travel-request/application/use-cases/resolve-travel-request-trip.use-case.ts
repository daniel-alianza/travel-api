import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';
import { NotifyTravelRequestApprovedUseCase } from './notify-travel-request-approved.use-case';
import { SpawnApprovedGasolineForTravelTripUseCase } from './spawn-approved-gasoline-for-travel-trip.use-case';

export type ResolveTravelRequestTripCommand = {
  readonly tripId: number;
  readonly resolution: 'approve' | 'reject';
  readonly comment: string | null;
  readonly actorUserId: number;
};

export type ResolveTravelRequestTripResponse = ApiSuccessResponse<{
  readonly ok: true;
}>;

@Injectable()
export class ResolveTravelRequestTripUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
    private readonly notifyTravelRequestApprovedUseCase: NotifyTravelRequestApprovedUseCase,
    private readonly spawnApprovedGasolineForTravelTripUseCase: SpawnApprovedGasolineForTravelTripUseCase,
  ) {}

  async execute(
    command: ResolveTravelRequestTripCommand,
  ): Promise<ResolveTravelRequestTripResponse> {
    if (command.resolution === 'reject') {
      const trimmedComment = command.comment?.trim() ?? '';
      if (trimmedComment.length === 0) {
        throw new BadRequestException(
          'El comentario es obligatorio al rechazar un viaje.',
        );
      }
    }

    const trimmedApproveComment =
      command.resolution === 'approve'
        ? (command.comment?.trim() ?? '') || null
        : null;

    const result =
      await this.travelRequestRepository.resolveTravelRequestTripResolution({
        tripId: command.tripId,
        resolution: command.resolution,
        comment:
          command.resolution === 'reject'
            ? (command.comment ?? '').trim()
            : trimmedApproveComment,
        actorUserId: command.actorUserId,
      });

    if (result === 'not_found') {
      throw new NotFoundException('Viaje no encontrado.');
    }

    if (result === 'invalid_status') {
      throw new ConflictException(
        'Solo se puede aprobar o rechazar un viaje en estado pendiente.',
      );
    }

    if (command.resolution === 'approve' && result.outcome === 'ok') {
      const approvedAt = new Date();
      await this.spawnApprovedGasolineForTravelTripUseCase.execute({
        tripId: command.tripId,
        approverId: command.actorUserId,
        approverComment: trimmedApproveComment,
        approvedAt,
      });
    }

    if (
      command.resolution === 'approve' &&
      result.outcome === 'ok' &&
      result.requestStatus === 'approved'
    ) {
      await this.notifyTravelRequestApprovedUseCase.execute(
        result.travelRequestId,
      );
    }

    return buildSuccessResponse(
      { ok: true as const },
      command.resolution === 'approve'
        ? 'Viaje aprobado correctamente.'
        : 'Viaje rechazado correctamente.',
    );
  }
}
