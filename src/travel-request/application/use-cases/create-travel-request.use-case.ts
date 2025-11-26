import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request.repository';
import { CreateTravelRequestInput, TravelRequest } from '../interfaces';

@Injectable()
export class CreateTravelRequestUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepo: TravelRequestRepository,
  ) {}

  async execute(input: CreateTravelRequestInput): Promise<TravelRequest> {
    try {
      return await this.travelRequestRepo.create(input);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al crear la solicitud de viaje';
      throw new InternalServerErrorException(message);
    }
  }
}
