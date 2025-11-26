import { Inject, Injectable } from '@nestjs/common';
import type { CardRepository } from '../interfaces/card.repository';
import { PaginationInput } from '../interfaces/pagination.input';
import { CardAssignment } from '../../domain/entities/card-assignment.entity';

@Injectable()
export class GetAssignmentsByUserIdUseCase {
  constructor(
    @Inject('CardRepository') private readonly cardRepo: CardRepository,
  ) {}

  async execute(
    userId: number,
    input?: PaginationInput,
  ): Promise<CardAssignment[]> {
    return this.cardRepo.getAssignmentsByUserId(userId, input);
  }
}
