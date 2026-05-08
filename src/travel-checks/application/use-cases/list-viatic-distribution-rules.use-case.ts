import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

type ListViaticDistributionRulesData = {
  readonly distributionRules: readonly {
    readonly id: number;
    readonly code: string;
    readonly name: string;
    readonly companyName: string;
  }[];
};

export type ListViaticDistributionRulesResponse =
  ApiSuccessResponse<ListViaticDistributionRulesData>;

@Injectable()
export class ListViaticDistributionRulesUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
  ) {}

  async execute(): Promise<ListViaticDistributionRulesResponse> {
    const rules = await this.travelChecksRepository.listViaticDistributionRules();
    return buildSuccessResponse(
      {
        distributionRules: rules,
      },
      'Normas de reparto viáticos obtenidas correctamente.',
    );
  }
}
