import {
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import type { CardRepository } from '../interfaces/card.repository';

@Injectable()
export class UnassignCardUseCase {
  constructor(
    @Inject('CardRepository') private readonly cardRepo: CardRepository,
  ) {}

  async execute(cardId: number, userId: number): Promise<void> {
    const activeAssignment = await this.cardRepo.getActiveAssignmentByCardId(
      cardId,
    );

    if (!activeAssignment) {
      throw new NotFoundException(
        'No se encontró una asignación activa para esta tarjeta',
      );
    }

    if (activeAssignment.userId !== userId) {
      throw new NotFoundException(
        'La tarjeta no está asignada al usuario especificado',
      );
    }

    try {
      await this.cardRepo.unassignCard(cardId, userId);
    } catch (error: any) {
      throw new InternalServerErrorException(
        error.message || 'Error al desasignar la tarjeta',
      );
    }
  }
}

