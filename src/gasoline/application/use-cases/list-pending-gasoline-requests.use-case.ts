import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { isManagerRole } from '../../domain/gasoline-approval.policy';
import type {
  GasolineRequestRepository,
  GasolineRequestSummaryRecord,
} from '../interfaces/gasoline-request.repository.interface';

type ListPendingGasolineRequestsData = {
  readonly requests: readonly GasolineRequestSummaryRecord[];
  readonly total: number;
};

export type ListPendingGasolineRequestsResponse =
  ApiSuccessResponse<ListPendingGasolineRequestsData>;

@Injectable()
export class ListPendingGasolineRequestsUseCase {
  constructor(
    @Inject('GasolineRequestRepository')
    private readonly gasolineRequestRepository: GasolineRequestRepository,
  ) {}

  async execute(input: {
    readonly companyId?: number;
    readonly roleId?: number;
    readonly managerUserId?: number;
  }): Promise<ListPendingGasolineRequestsResponse> {
    let applicantUserIds: readonly number[] | undefined;

    if (isManagerRole(input.roleId) && input.managerUserId !== undefined) {
      const subordinates =
        await this.gasolineRequestRepository.findSubordinateUserIds(
          input.managerUserId,
        );
      applicantUserIds = subordinates.length > 0 ? subordinates : [-1];
    }

    const requests = await this.gasolineRequestRepository.findPending(
      input.companyId,
      applicantUserIds,
    );

    return buildSuccessResponse(
      { requests, total: requests.length },
      'Solicitudes pendientes cargadas correctamente.',
    );
  }
}
