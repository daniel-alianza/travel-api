import { Inject, Injectable } from '@nestjs/common';
import type { CardRepository } from '../interfaces/card.repository';
import { PaginationInput } from '../interfaces/pagination.input';
import { Card } from '../../domain/entities/card.entity';

@Injectable()
export class GetAllCardsUseCase {
  constructor(
    @Inject('CardRepository') private readonly cardRepo: CardRepository,
  ) {}

  async execute(input?: PaginationInput): Promise<Card[]> {
    return this.cardRepo.findAll(input);
  }
}

