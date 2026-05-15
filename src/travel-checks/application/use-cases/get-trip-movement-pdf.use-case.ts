import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { DmsBucketConfig } from '../../../config/dms-bucket/dms';
import type { DmsStoragePort } from '../../../dms/application/interfaces/dms-storage.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

type GetTripMovementPdfData = {
  readonly movementSequence: number;
  readonly pdfFileName: string | null;
  readonly signedUrl: string;
  readonly expiresInSeconds: number;
};

export type GetTripMovementPdfResponse =
  ApiSuccessResponse<GetTripMovementPdfData>;

@Injectable()
export class GetTripMovementPdfUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
    @Inject('DmsStoragePort')
    private readonly dmsStoragePort: DmsStoragePort,
    @Inject('DMS_BUCKET_CONFIG')
    private readonly dmsBucketConfig: DmsBucketConfig,
  ) {}

  async execute(
    tripId: number,
    movementSequence: number,
  ): Promise<GetTripMovementPdfResponse> {
    const pdfFile =
      await this.travelChecksRepository.findTripMovementProofPdfFile({
        tripId,
        movementSequence,
      });

    if (pdfFile === null) {
      throw new NotFoundException({
        message: 'No se encontró PDF de factura para este movimiento.',
        error: 'PDF no encontrado',
      });
    }

    const signedDownload = await this.dmsStoragePort.createSignedDownloadUrl(
      pdfFile.filePath,
      this.dmsBucketConfig.signedUrlExpiresInSeconds,
    );

    return buildSuccessResponse(
      {
        movementSequence,
        pdfFileName: pdfFile.fileName,
        signedUrl: signedDownload.signedUrl,
        expiresInSeconds: this.dmsBucketConfig.signedUrlExpiresInSeconds,
      },
      'URL de descarga del PDF obtenida correctamente.',
    );
  }
}
