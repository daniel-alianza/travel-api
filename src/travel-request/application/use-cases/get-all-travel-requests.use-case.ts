import { Inject, Injectable } from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request.repository';
import { TravelRequest, PaginationInput } from '../interfaces';

@Injectable()
export class GetAllTravelRequestsUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepo: TravelRequestRepository,
  ) {}

  async execute(input?: Partial<PaginationInput>): Promise<{
    data: TravelRequest[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const paginationInput: PaginationInput = {
      limit: input?.limit ?? 5,
      offset: input?.offset ?? 0,
      statusId: input?.statusId,
      userId: input?.userId,
    };

    const [data, total] = await Promise.all([
      this.travelRequestRepo.findAll(paginationInput),
      this.travelRequestRepo.count(paginationInput),
    ]);

    return {
      data,
      total,
      limit: paginationInput.limit,
      offset: paginationInput.offset,
    };
  }
}
