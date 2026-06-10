import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { CardRepository } from '../interfaces/card-repository.interface';

type CardAssignmentFilterCatalogData = {
  readonly companies: readonly { readonly name: string }[];
  readonly areas: readonly { readonly name: string }[];
};

export type CardAssignmentFilterCatalogResponse =
  ApiSuccessResponse<CardAssignmentFilterCatalogData>;

@Injectable()
export class GetCardAssignmentFilterCatalogUseCase {
  constructor(
    @Inject('CardRepository')
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(): Promise<CardAssignmentFilterCatalogResponse> {
    const catalog = await this.cardRepository.findCardAssignmentFilterCatalog();

    return buildSuccessResponse(
      {
        companies: catalog.companies,
        areas: catalog.areas,
      },
      'Catálogo de filtros cargado correctamente.',
    );
  }
}
