import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

export type ResolveTravelRequestTripCommand = {
  readonly tripId: number;
  readonly resolution: 'approve' | 'reject';
  readonly comment: string | null;
};

export type ResolveTravelRequestTripResponse = {
  readonly data: {
    readonly ok: true;
  };
  readonly message: string;
};

@Injectable()
export class ResolveTravelRequestTripUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
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

    const result = await this.travelRequestRepository.resolveTravelRequestTripResolution({
      tripId: command.tripId,
      resolution: command.resolution,
      comment:
        command.resolution === 'reject'
          ? (command.comment ?? '').trim()
          : trimmedApproveComment,
    });

    if (result === 'not_found') {
      throw new NotFoundException('Viaje no encontrado.');
    }

    if (result === 'invalid_status') {
      throw new ConflictException(
        'Solo se puede aprobar o rechazar un viaje en estado pendiente.',
      );
    }

    return {
      data: { ok: true },
      message:
        command.resolution === 'approve'
          ? 'Viaje aprobado correctamente.'
          : 'Viaje rechazado correctamente.',
    };
  }
}
