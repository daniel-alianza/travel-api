import { Inject, Injectable } from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

export type GetApprovalFilterCatalogResponse = {
  readonly data: {
    readonly areas: readonly string[];
    readonly companies: readonly string[];
  };
  readonly message: string;
};

@Injectable()
export class GetApprovalFilterCatalogUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(): Promise<GetApprovalFilterCatalogResponse> {
    const catalog = await this.travelRequestRepository.findApprovalFilterCatalog();

    return {
      data: {
        areas: catalog.areas.map((area) => area.name),
        companies: catalog.companies.map((company) => company.name),
      },
      message: 'Catálogo de filtros cargado correctamente.',
    };
  }
}
