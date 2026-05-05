import { Inject, Injectable } from '@nestjs/common';
import type { CardRepository } from '../interfaces/card-repository.interface';

export type CardAssignmentFilterCatalogResponse = {
  readonly data: {
    readonly companies: readonly { readonly name: string }[];
    readonly areas: readonly { readonly name: string }[];
  };
  readonly message: string;
  readonly error: null;
};

@Injectable()
export class GetCardAssignmentFilterCatalogUseCase {
  constructor(
    @Inject('CardRepository')
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(): Promise<CardAssignmentFilterCatalogResponse> {
    const catalog = await this.cardRepository.findCardAssignmentFilterCatalog();

    return {
      data: {
        companies: catalog.companies,
        areas: catalog.areas,
      },
      message: 'Catálogo de filtros cargado correctamente.',
      error: null,
    };
  }
}

