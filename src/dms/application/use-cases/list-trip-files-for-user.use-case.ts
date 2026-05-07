import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { DmsRepository } from '../interfaces/dms-repository.interface';

type ListTripFilesForUserData = {
  readonly files: readonly {
    readonly id: number;
    readonly tripId: number;
    readonly fileType: string;
    readonly filePath: string;
    readonly fileName: string | null;
    readonly mimeType: string | null;
    readonly createdAt: string;
  }[];
};

export type ListTripFilesForUserResponse = ApiSuccessResponse<ListTripFilesForUserData>;

@Injectable()
export class ListTripFilesForUserUseCase {
  constructor(
    @Inject('DmsRepository')
    private readonly dmsRepository: DmsRepository,
  ) {}

  async execute(userId: number, tripId: number): Promise<ListTripFilesForUserResponse> {
    const files = await this.dmsRepository.listTripFilesForUser(tripId, userId);
    return buildSuccessResponse(
      {
        files: files.map((file) => ({
          id: file.id,
          tripId: file.tripId,
          fileType: file.fileType,
          filePath: file.filePath,
          fileName: file.fileName,
          mimeType: file.mimeType,
          createdAt: file.createdAt.toISOString(),
        })),
      },
      'Archivos del viaje obtenidos correctamente.',
    );
  }
}
