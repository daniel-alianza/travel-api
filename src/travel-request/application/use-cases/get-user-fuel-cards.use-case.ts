import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

type GetUserFuelCardsData = {
  readonly userId: number;
  readonly fuelCards: readonly {
    readonly id: number;
    readonly cardNumber: string;
  }[];
};

export type GetUserFuelCardsResponse = ApiSuccessResponse<GetUserFuelCardsData>;

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

    return buildSuccessResponse(
      {
        userId: user.id,
        fuelCards,
      },
      'Tarjetas fuel cargadas correctamente.',
    );
  }
}
