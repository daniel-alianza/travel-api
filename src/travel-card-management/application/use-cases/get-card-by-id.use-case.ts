import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { CardRepository } from '../interfaces/card.repository';
import { Card } from '../../domain/entities/card.entity';

@Injectable()
export class GetCardByIdUseCase {
  constructor(
    @Inject('CardRepository') private readonly cardRepo: CardRepository,
  ) {}

  async execute(id: number): Promise<Card> {
    const card = await this.cardRepo.findById(id);

    if (!card) {
      throw new NotFoundException(`Tarjeta con ID ${id} no encontrada`);
    }

    return card;
  }
}

