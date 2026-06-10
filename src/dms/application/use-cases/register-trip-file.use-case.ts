import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { DmsBucketConfig } from '../../../config/dms-bucket/dms';
import type { DmsRepository } from '../interfaces/dms-repository.interface';
import { DmsUsageMetricsService } from '../../infrastructure/dms-usage-metrics.service';

type RegisterTripFileData = {
  readonly fileId: number;
  readonly deduplicated: boolean;
};

export type RegisterTripFileResponse = ApiSuccessResponse<RegisterTripFileData>;

@Injectable()
export class RegisterTripFileUseCase {
  constructor(
    @Inject('DmsRepository')
    private readonly dmsRepository: DmsRepository,
    @Inject('DMS_BUCKET_CONFIG')
    private readonly dmsBucketConfig: DmsBucketConfig,
    private readonly dmsUsageMetricsService: DmsUsageMetricsService,
  ) {}

  async execute(input: {
    userId: number;
    tripId: number;
    fileType: string;
    fileName: string;
    mimeType: string;
    path: string;
    fileSizeBytes: number;
  }): Promise<RegisterTripFileResponse> {
    const ownership = await this.dmsRepository.findTripOwnershipForUser(
      input.tripId,
      input.userId,
    );
    if (ownership === null) {
      throw new BadRequestException({
        message: 'No puedes registrar archivos para este viaje.',
        error: 'Viaje inválido',
      });
    }

    const expectedPathPrefix = `user/${input.userId}/request/${ownership.travelRequestId}/trip/${input.tripId}/`;
    if (!input.path.startsWith(expectedPathPrefix)) {
      throw new BadRequestException({
        message: 'La ruta del archivo no corresponde al viaje.',
        error: 'Ruta inválida',
      });
    }

    if (!this.dmsBucketConfig.allowedMimeTypes.includes(input.mimeType)) {
      throw new BadRequestException({
        message: 'El tipo de archivo no está permitido.',
        error: 'MimeType inválido',
      });
    }

    const normalizedFileName = input.fileName.trim().toLowerCase();
    const deduplicationSince = new Date(
      Date.now() - this.dmsBucketConfig.deduplicationWindowMinutes * 60_000,
    );
    const duplicate = await this.dmsRepository.findDuplicateTripFile({
      tripId: input.tripId,
      fileName: normalizedFileName,
      mimeType: input.mimeType,
      createdAfter: deduplicationSince,
    });
    if (duplicate !== null) {
      return buildSuccessResponse(
        {
          fileId: duplicate.id,
          deduplicated: true,
        },
        'Archivo duplicado detectado; se reutilizó el registro existente.',
      );
    }

    const fileRecord = await this.dmsRepository.createTripFile({
      tripId: input.tripId,
      fileType: input.fileType,
      filePath: input.path,
      fileName: normalizedFileName,
      mimeType: input.mimeType,
    });
    this.dmsUsageMetricsService.recordFileRegistered(
      input.userId,
      input.fileSizeBytes,
    );

    return buildSuccessResponse(
      {
        fileId: fileRecord.id,
        deduplicated: false,
      },
      'Archivo registrado correctamente.',
    );
  }
}
