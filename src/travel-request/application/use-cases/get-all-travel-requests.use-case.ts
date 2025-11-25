import { Inject, Injectable } from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request.repository';
import { TravelRequest, PaginationInput } from '../interfaces';

@Injectable()
export class GetAllTravelRequestsUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepo: TravelRequestRepository,
  ) {}

  async execute(input?: PaginationInput): Promise<TravelRequest[]> {
    return this.travelRequestRepo.findAll(input);
  }
}
