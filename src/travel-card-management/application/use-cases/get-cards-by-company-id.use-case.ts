import { Inject, Injectable } from '@nestjs/common';
import type { CardRepository } from '../interfaces/card.repository';
import { PaginationInput } from '../interfaces/pagination.input';
import { Card } from '../../domain/entities/card.entity';

@Injectable()
export class GetCardsByCompanyIdUseCase {
  constructor(
    @Inject('CardRepository') private readonly cardRepo: CardRepository,
  ) {}

  async execute(companyId: number, input?: PaginationInput): Promise<Card[]> {
    return this.cardRepo.findByCompanyId(companyId, input);
  }
}
