import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import type { CardRepository } from '../interfaces/card.repository';
import { AssignCardInput } from '../interfaces/card.repository';
import { CardAssignment } from '../../domain/entities/card-assignment.entity';

@Injectable()
export class AssignCardUseCase {
  constructor(
    @Inject('CardRepository') private readonly cardRepo: CardRepository,
  ) {}

  async execute(input: AssignCardInput): Promise<CardAssignment> {
    const card = await this.cardRepo.findById(input.cardId);

    if (!card) {
      throw new NotFoundException(
        `Tarjeta con ID ${input.cardId} no encontrada`,
      );
    }

    if (!card.isActive) {
      throw new ConflictException('La tarjeta no está activa');
    }

    const activeAssignment = await this.cardRepo.getActiveAssignmentByCardId(
      input.cardId,
    );

    if (activeAssignment) {
      throw new ConflictException(
        'La tarjeta ya está asignada a otro usuario',
      );
    }

    const activeAssignmentsCount =
      await this.cardRepo.countActiveAssignmentsByUserId(input.userId);

    if (activeAssignmentsCount >= 4) {
      throw new ConflictException(
        'El usuario ya tiene el máximo de 4 tarjetas asignadas activas',
      );
    }

    try {
      return await this.cardRepo.assignCard(input);
    } catch (error: any) {
      throw new InternalServerErrorException(
        error.message || 'Error al asignar la tarjeta',
      );
    }
  }
}

