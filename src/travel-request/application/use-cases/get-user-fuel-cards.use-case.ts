import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

export type GetUserFuelCardsResponse = {
  readonly data: {
    readonly userId: number;
    readonly fuelCards: readonly {
      readonly id: number;
      readonly cardNumber: string;
    }[];
  };
  readonly message: string;
};

@Injectable()
export class GetUserFuelCardsUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(userId: number): Promise<GetUserFuelCardsResponse> {
    const user = await this.travelRequestRepository.findFormDataByUserId(userId);

    if (!user) {
      throw new NotFoundException('No se encontró el usuario para tarjetas fuel.');
    }

    const fuelCards = user.cards
      .filter((card) => card.type === 'FUEL' && card.isActive)
      .map((card) => ({
        id: card.id,
        cardNumber: card.cardNumber,
      }));

    return {
      data: {
        userId: user.id,
        fuelCards,
      },
      message: 'Tarjetas fuel cargadas correctamente.',
    };
  }
}
