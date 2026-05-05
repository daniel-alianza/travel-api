import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

type GetTravelRequestFormDataData = {
  readonly userId: number;
  readonly employeeName: string;
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
  readonly viaticCards: readonly {
    readonly id: number;
    readonly cardNumber: string;
  }[];
};

export type GetTravelRequestFormDataResponse =
  ApiSuccessResponse<GetTravelRequestFormDataData>;

@Injectable()
export class GetTravelRequestFormDataUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(userId: number): Promise<GetTravelRequestFormDataResponse> {
    const user = await this.travelRequestRepository.findFormDataByUserId(userId);

    if (!user) {
      throw new NotFoundException('No se encontró el usuario para precarga.');
    }

    const viaticCards = user.cards
      .filter((card) => card.type === 'VIATIC' && card.isActive)
      .map((card) => ({
        id: card.id,
        cardNumber: card.cardNumber,
      }));

    return buildSuccessResponse(
      {
        userId: user.id,
        employeeName: user.name,
        company: user.company,
        branch: user.branch,
        area: user.area,
        viaticCards,
      },
      'Datos de formulario cargados correctamente.',
    );
  }
}
