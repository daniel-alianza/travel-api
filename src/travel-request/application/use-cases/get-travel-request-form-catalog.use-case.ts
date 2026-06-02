import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

type TravelRequestFormCatalogData = {
  readonly areas: readonly { readonly id: number; readonly name: string }[];
  readonly companies: readonly { readonly id: number; readonly name: string }[];
  readonly branches: readonly {
    readonly id: number;
    readonly name: string;
    readonly companyId: number | null;
  }[];
};

export type GetTravelRequestFormCatalogResponse =
  ApiSuccessResponse<TravelRequestFormCatalogData>;

@Injectable()
export class GetTravelRequestFormCatalogUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(): Promise<GetTravelRequestFormCatalogResponse> {
    const catalog = await this.travelRequestRepository.findRequestFormCatalog();

    return buildSuccessResponse(
      catalog,
      'Catálogo de formulario cargado correctamente.',
    );
  }
}
