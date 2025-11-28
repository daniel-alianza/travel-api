import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request.repository';
import { TravelRequest } from '../interfaces';

export interface RejectTravelRequestInput {
  id: number;
  approverId: number;
  comment?: string | null;
  rejectedStatusId: number;
}

@Injectable()
export class RejectTravelRequestUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepo: TravelRequestRepository,
  ) {}

  async execute(input: RejectTravelRequestInput): Promise<TravelRequest> {
    const travelRequest = await this.travelRequestRepo.findById(input.id);

    if (!travelRequest) {
      throw new NotFoundException(
        `Solicitud de viaje con ID ${input.id} no encontrada.`,
      );
    }

    if (travelRequest.statusId === input.rejectedStatusId) {
      throw new BadRequestException(
        'La solicitud ya se encuentra en estado rechazado.',
      );
    }

    return this.travelRequestRepo.updateStatus(input.id, {
      statusId: input.rejectedStatusId,
      approverId: input.approverId,
      comment: input.comment ?? null,
    });
  }
}

