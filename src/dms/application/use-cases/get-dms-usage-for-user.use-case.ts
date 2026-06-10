import { Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { DmsUsageMetricsService } from '../../infrastructure/dms-usage-metrics.service';

type GetDmsUsageForUserData = {
  readonly uploadUrlRequests: number;
  readonly uploadRegisteredFiles: number;
  readonly downloadUrlRequests: number;
  readonly uploadedBytes: number;
};

export type GetDmsUsageForUserResponse =
  ApiSuccessResponse<GetDmsUsageForUserData>;

@Injectable()
export class GetDmsUsageForUserUseCase {
  constructor(
    private readonly dmsUsageMetricsService: DmsUsageMetricsService,
  ) {}

  execute(userId: number): GetDmsUsageForUserResponse {
    const usage = this.dmsUsageMetricsService.getUserUsage(userId);
    return buildSuccessResponse(
      {
        uploadUrlRequests: usage.uploadUrlRequests,
        uploadRegisteredFiles: usage.uploadRegisteredFiles,
        downloadUrlRequests: usage.downloadUrlRequests,
        uploadedBytes: usage.uploadedBytes,
      },
      'Métricas de uso DMS obtenidas correctamente.',
    );
  }
}
