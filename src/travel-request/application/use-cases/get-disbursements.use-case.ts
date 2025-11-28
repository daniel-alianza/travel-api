import { Inject, Injectable } from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request.repository';
import { PaginationInput } from '../interfaces/pagination.input';

@Injectable()
export class GetDisbursementsUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepo: TravelRequestRepository,
  ) {}

  async execute(input?: Partial<PaginationInput>) {
    const paginationInput: PaginationInput | undefined = input
      ? {
          limit: input.limit ?? 20,
          offset: input.offset ?? 0,
          statusId: input.statusId,
          userId: input.userId,
        }
      : undefined;

    return await this.travelRequestRepo.getDisbursements(paginationInput);
  }
}

