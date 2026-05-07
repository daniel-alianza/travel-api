import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { DmsBucketConfig } from '../../../config/dms-bucket/dms';
import type { DmsRepository } from '../interfaces/dms-repository.interface';
import type { DmsStoragePort } from '../interfaces/dms-storage.interface';
import { DmsUsageMetricsService } from '../../infrastructure/dms-usage-metrics.service';
import { DmsDownloadUrlCacheService } from '../../infrastructure/dms-download-url-cache.service';

type CreateTripFileDownloadUrlData = {
  readonly fileId: number;
  readonly signedUrl: string;
  readonly expiresInSeconds: number;
};

export type CreateTripFileDownloadUrlResponse =
  ApiSuccessResponse<CreateTripFileDownloadUrlData>;

@Injectable()
export class CreateTripFileDownloadUrlUseCase {
  constructor(
    @Inject('DmsRepository')
    private readonly dmsRepository: DmsRepository,
    @Inject('DmsStoragePort')
    private readonly dmsStoragePort: DmsStoragePort,
    @Inject('DMS_BUCKET_CONFIG')
    private readonly dmsBucketConfig: DmsBucketConfig,
    private readonly dmsUsageMetricsService: DmsUsageMetricsService,
    private readonly dmsDownloadUrlCacheService: DmsDownloadUrlCacheService,
  ) {}

  async execute(
    userId: number,
    fileId: number,
  ): Promise<CreateTripFileDownloadUrlResponse> {
    const file = await this.dmsRepository.findTripFileForUser(fileId, userId);
    if (file === null) {
      throw new BadRequestException({
        message: 'No tienes acceso a este archivo.',
        error: 'Archivo inválido',
      });
    }

    const cached = this.dmsDownloadUrlCacheService.get(file.filePath);
    if (cached !== null) {
      this.dmsUsageMetricsService.recordDownloadUrlRequest(userId);
      return buildSuccessResponse(
        {
          fileId: file.id,
          signedUrl: cached.signedUrl,
          expiresInSeconds: this.dmsBucketConfig.signedUrlExpiresInSeconds,
        },
        'URL de descarga obtenida desde caché.',
      );
    }

    const downloadSession = await this.dmsStoragePort.createSignedDownloadUrl(
      file.filePath,
      this.dmsBucketConfig.signedUrlExpiresInSeconds,
    );
    this.dmsDownloadUrlCacheService.set(
      file.filePath,
      downloadSession.signedUrl,
      this.dmsBucketConfig.downloadUrlCacheTtlSeconds,
    );
    this.dmsUsageMetricsService.recordDownloadUrlRequest(userId);

    return buildSuccessResponse(
      {
        fileId: file.id,
        signedUrl: downloadSession.signedUrl,
        expiresInSeconds: this.dmsBucketConfig.signedUrlExpiresInSeconds,
      },
      'URL de descarga generada correctamente.',
    );
  }
}
