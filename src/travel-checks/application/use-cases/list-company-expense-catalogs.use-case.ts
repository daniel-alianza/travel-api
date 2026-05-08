import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

type ListCompanyExpenseCatalogsData = {
  readonly companyId: number;
  readonly vatIndicators: readonly {
    readonly id: number;
    readonly code: string;
    readonly name: string;
  }[];
  readonly viaticCategories: readonly {
    readonly id: number;
    readonly code: string;
    readonly name: string;
  }[];
};

export type ListCompanyExpenseCatalogsResponse =
  ApiSuccessResponse<ListCompanyExpenseCatalogsData>;

@Injectable()
export class ListCompanyExpenseCatalogsUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
  ) {}

  async execute(companyId: number): Promise<ListCompanyExpenseCatalogsResponse> {
    const [vatIndicators, viaticCategories] = await Promise.all([
      this.travelChecksRepository.listVatByCompanyId(companyId),
      this.travelChecksRepository.listViaticCategoriesByCompanyId(companyId),
    ]);

    return buildSuccessResponse(
      {
        companyId,
        vatIndicators,
        viaticCategories,
      },
      'Catálogos contables por compañía.',
    );
  }
}
