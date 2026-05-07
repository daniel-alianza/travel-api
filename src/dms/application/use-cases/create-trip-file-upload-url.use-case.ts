import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { DmsBucketConfig } from '../../../config/dms-bucket/dms';
import type { DmsRepository } from '../interfaces/dms-repository.interface';
import type { DmsStoragePort } from '../interfaces/dms-storage.interface';
import { DmsUsageMetricsService } from '../../infrastructure/dms-usage-metrics.service';
import { DmsUploadRateLimitService } from '../../infrastructure/dms-upload-rate-limit.service';

type CreateTripFileUploadUrlData = {
  readonly path: string;
  readonly token: string;
  readonly signedUrl: string;
  readonly expiresInSeconds: number;
};

export type CreateTripFileUploadUrlResponse =
  ApiSuccessResponse<CreateTripFileUploadUrlData>;

@Injectable()
export class CreateTripFileUploadUrlUseCase {
  constructor(
    @Inject('DmsRepository')
    private readonly dmsRepository: DmsRepository,
    @Inject('DmsStoragePort')
    private readonly dmsStoragePort: DmsStoragePort,
    @Inject('DMS_BUCKET_CONFIG')
    private readonly dmsBucketConfig: DmsBucketConfig,
    private readonly dmsUsageMetricsService: DmsUsageMetricsService,
    private readonly dmsUploadRateLimitService: DmsUploadRateLimitService,
  ) {}

  async execute(input: {
    userId: number;
    tripId: number;
    fileName: string;
    mimeType: string;
    fileSizeBytes: number;
  }): Promise<CreateTripFileUploadUrlResponse> {
    const ownership = await this.assertTripOwnership(input.tripId, input.userId);
    this.dmsUploadRateLimitService.assertUploadUrlAllowed({
      userId: input.userId,
      maxRequestsPerMinute: this.dmsBucketConfig.uploadRequestsPerMinutePerUser,
    });
    this.assertMimeTypeAllowed(input.mimeType);
    this.assertFileSize(input.fileSizeBytes);

    const storagePath = buildStoragePath({
      userId: input.userId,
      travelRequestId: ownership.travelRequestId,
      tripId: input.tripId,
      fileName: input.fileName,
    });

    const uploadSession = await this.dmsStoragePort.createSignedUploadUrl(storagePath);
    this.dmsUsageMetricsService.recordUploadUrlRequest(input.userId);

    return buildSuccessResponse(
      {
        path: uploadSession.path,
        token: uploadSession.token,
        signedUrl: uploadSession.signedUrl,
        expiresInSeconds: this.dmsBucketConfig.signedUrlExpiresInSeconds,
      },
      'URL de carga generada correctamente.',
    );
  }

  private async assertTripOwnership(
    tripId: number,
    userId: number,
  ): Promise<{ readonly travelRequestId: number }> {
    const ownership = await this.dmsRepository.findTripOwnershipForUser(tripId, userId);
    if (ownership === null) {
      throw new BadRequestException({
        message: 'No puedes cargar archivos para este viaje.',
        error: 'Viaje inválido',
      });
    }
    return {
      travelRequestId: ownership.travelRequestId,
    };
  }

  private assertMimeTypeAllowed(mimeType: string): void {
    if (!this.dmsBucketConfig.allowedMimeTypes.includes(mimeType)) {
      throw new BadRequestException({
        message: 'El tipo de archivo no está permitido.',
        error: 'MimeType inválido',
      });
    }
  }

  private assertFileSize(fileSizeBytes: number): void {
    if (fileSizeBytes <= 0 || fileSizeBytes > this.dmsBucketConfig.maxUploadBytes) {
      throw new BadRequestException({
        message: 'El archivo excede el tamaño máximo permitido.',
        error: 'Archivo inválido',
      });
    }
  }
}

function buildStoragePath(input: {
  userId: number;
  travelRequestId: number;
  tripId: number;
  fileName: string;
}): string {
  const safeFileName = sanitizeFileName(input.fileName);
  const extension = getFileExtension(safeFileName);
  return `user/${input.userId}/request/${input.travelRequestId}/trip/${input.tripId}/${randomUUID()}${extension}`;
}

function sanitizeFileName(fileName: string): string {
  const trimmed = fileName.trim().toLowerCase();
  const withoutSpaces = trimmed.replace(/\s+/g, '-');
  return withoutSpaces.replace(/[^a-z0-9.\-_]/g, '');
}

function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex <= 0 || lastDotIndex === fileName.length - 1) {
    return '';
  }
  return fileName.slice(lastDotIndex);
}
