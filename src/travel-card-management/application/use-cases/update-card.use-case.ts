import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import type { CardRepository } from '../interfaces/card.repository';
import { UpdateCardInput } from '../interfaces/card.repository';
import { Card } from '../../domain/entities/card.entity';

@Injectable()
export class UpdateCardUseCase {
  constructor(
    @Inject('CardRepository') private readonly cardRepo: CardRepository,
  ) {}

  async execute(id: number, input: UpdateCardInput): Promise<Card> {
    const card = await this.cardRepo.findById(id);

    if (!card) {
      throw new NotFoundException(`Tarjeta con ID ${id} no encontrada`);
    }

    if (input.cardNumber) {
      const exists = await this.cardRepo.existsByCardNumber(
        input.cardNumber,
        id,
      );

      if (exists) {
        throw new ConflictException('El número de tarjeta ya está registrado');
      }
    }

    try {
      return await this.cardRepo.update(id, input);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al actualizar la tarjeta';
      throw new InternalServerErrorException(message);
    }
  }
}
