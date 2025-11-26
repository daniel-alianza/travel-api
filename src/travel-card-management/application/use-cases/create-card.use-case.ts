import {
  Inject,
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import type { CardRepository } from '../interfaces/card.repository';
import { CreateCardInput } from '../interfaces/card.repository';
import { Card } from '../../domain/entities/card.entity';

@Injectable()
export class CreateCardUseCase {
  constructor(
    @Inject('CardRepository') private readonly cardRepo: CardRepository,
  ) {}

  async execute(input: CreateCardInput): Promise<Card> {
    const exists = await this.cardRepo.existsByCardNumber(input.cardNumber);

    if (exists) {
      throw new ConflictException('El número de tarjeta ya está registrado');
    }

    try {
      return await this.cardRepo.create(input);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error al crear la tarjeta';
      throw new InternalServerErrorException(message);
    }
  }
}
