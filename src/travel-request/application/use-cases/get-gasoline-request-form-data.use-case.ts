import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { maskCardNumber } from '../../../common/security/mask-card-number';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

type GetGasolineRequestFormDataData = {
  readonly userId: number;
  readonly company: {
    readonly id: number;
    readonly name: string;
  };
  readonly branch: {
    readonly id: number;
    readonly name: string;
  };
  readonly area: {
    readonly id: number;
    readonly name: string;
  };
  readonly fuelCards: readonly {
    readonly id: number;
    readonly cardNumber: string;
  }[];
};

export type GetGasolineRequestFormDataResponse =
  ApiSuccessResponse<GetGasolineRequestFormDataData>;

@Injectable()
export class GetGasolineRequestFormDataUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(userId: number): Promise<GetGasolineRequestFormDataResponse> {
    const user = await this.travelRequestRepository.findFormDataByUserId(userId);

    if (!user) {
      throw new NotFoundException('No se encontró el usuario para precarga.');
    }

    const fuelCards = user.cards
      .filter((card) => card.type === 'FUEL' && card.isActive)
      .map((card) => ({
        id: card.id,
        cardNumber: maskCardNumber(card.cardNumber),
      }));

    return buildSuccessResponse(
      {
        userId: user.id,
        company: user.company,
        branch: user.branch,
        area: user.area,
        fuelCards,
      },
      'Datos de solicitud de gasolina cargados correctamente.',
    );
  }
}
