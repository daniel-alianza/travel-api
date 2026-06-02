import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  GasolineRequestRepository,
  GasolineRequestSummaryRecord,
} from '../interfaces/gasoline-request.repository.interface';

type GetGasolineRequestHistoryData = {
  readonly requests: readonly GasolineRequestSummaryRecord[];
  readonly total: number;
};

export type GetGasolineRequestHistoryResponse =
  ApiSuccessResponse<GetGasolineRequestHistoryData>;

@Injectable()
export class GetGasolineRequestHistoryUseCase {
  constructor(
    @Inject('GasolineRequestRepository')
    private readonly gasolineRequestRepository: GasolineRequestRepository,
  ) {}

  async execute(userId: number): Promise<GetGasolineRequestHistoryResponse> {
    const requests =
      await this.gasolineRequestRepository.findHistoryByUser(userId);

    return buildSuccessResponse(
      { requests, total: requests.length },
      'Historial de solicitudes de gasolina cargado correctamente.',
    );
  }
}
