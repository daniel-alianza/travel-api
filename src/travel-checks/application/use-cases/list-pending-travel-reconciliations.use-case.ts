import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

type PendingTravelReconciliationItem = {
  readonly id: number;
  readonly travelRequestId: number;
  readonly status: 'pending' | 'rejected' | 'approved' | 'verified';
  readonly verificationCode: string;
  readonly codeExpiresAt: string;
  readonly employeeName: string;
  readonly companyName: string;
  readonly requestedByName: string;
  readonly requestedByEmail: string;
  readonly createdAt: string;
};

type ListPendingTravelReconciliationsData = {
  readonly reconciliations: readonly PendingTravelReconciliationItem[];
};

export type ListPendingTravelReconciliationsResponse =
  ApiSuccessResponse<ListPendingTravelReconciliationsData>;

@Injectable()
export class ListPendingTravelReconciliationsUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
  ) {}

  async execute(): Promise<ListPendingTravelReconciliationsResponse> {
    const pending =
      await this.travelChecksRepository.listPendingTravelRequestReconciliations();
    return buildSuccessResponse(
      {
        reconciliations: pending.map((item) => ({
          id: item.id,
          travelRequestId: item.travelRequestId,
          status: item.status,
          verificationCode: item.verificationCode,
          codeExpiresAt: item.codeExpiresAt.toISOString(),
          employeeName: item.employeeName,
          companyName: item.companyName,
          requestedByName: item.requestedBy.name,
          requestedByEmail: item.requestedBy.email,
          createdAt: item.createdAt.toISOString(),
        })),
      },
      'Conciliaciones cargadas.',
    );
  }
}
