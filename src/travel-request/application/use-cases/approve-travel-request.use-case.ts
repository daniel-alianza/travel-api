import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request.repository';
import { TravelRequest } from '../interfaces';

export interface ApproveTravelRequestInput {
  id: number;
  approverId: number;
  comment?: string | null;
  approvedStatusId: number;
}

@Injectable()
export class ApproveTravelRequestUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepo: TravelRequestRepository,
  ) {}

  async execute(input: ApproveTravelRequestInput): Promise<TravelRequest> {
    const travelRequest = await this.travelRequestRepo.findById(input.id);

    if (!travelRequest) {
      throw new NotFoundException(
        `Solicitud de viaje con ID ${input.id} no encontrada.`,
      );
    }

    if (travelRequest.statusId === input.approvedStatusId) {
      throw new BadRequestException(
        'La solicitud ya se encuentra en estado aprobado.',
      );
    }

    return this.travelRequestRepo.updateStatus(input.id, {
      statusId: input.approvedStatusId,
      approverId: input.approverId,
      comment: input.comment ?? null,
    });
  }
}

