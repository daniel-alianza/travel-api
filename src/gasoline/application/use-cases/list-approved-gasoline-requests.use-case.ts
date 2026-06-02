import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  GasolineRequestRepository,
  GasolineRequestSummaryRecord,
} from '../interfaces/gasoline-request.repository.interface';

type ListApprovedGasolineRequestsData = {
  readonly requests: readonly GasolineRequestSummaryRecord[];
  readonly total: number;
};

export type ListApprovedGasolineRequestsResponse =
  ApiSuccessResponse<ListApprovedGasolineRequestsData>;

@Injectable()
export class ListApprovedGasolineRequestsUseCase {
  constructor(
    @Inject('GasolineRequestRepository')
    private readonly gasolineRequestRepository: GasolineRequestRepository,
  ) {}

  async execute(
    companyId?: number,
  ): Promise<ListApprovedGasolineRequestsResponse> {
    const requests =
      await this.gasolineRequestRepository.findApproved(companyId);

    return buildSuccessResponse(
      { requests, total: requests.length },
      'Solicitudes aprobadas cargadas correctamente.',
    );
  }
}
