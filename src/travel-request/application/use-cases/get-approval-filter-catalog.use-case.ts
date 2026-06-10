import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

type ApprovalFilterCatalogData = {
  readonly areas: readonly string[];
  readonly companies: readonly string[];
};

export type GetApprovalFilterCatalogResponse =
  ApiSuccessResponse<ApprovalFilterCatalogData>;

@Injectable()
export class GetApprovalFilterCatalogUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(): Promise<GetApprovalFilterCatalogResponse> {
    const catalog =
      await this.travelRequestRepository.findApprovalFilterCatalog();

    return buildSuccessResponse(
      {
        areas: catalog.areas.map((area) => area.name),
        companies: catalog.companies.map((company) => company.name),
      },
      'Catálogo de filtros cargado correctamente.',
    );
  }
}
