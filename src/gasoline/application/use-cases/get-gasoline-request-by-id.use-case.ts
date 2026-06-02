import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  GasolineRequestDetailRecord,
  GasolineRequestRepository,
} from '../interfaces/gasoline-request.repository.interface';

export type GetGasolineRequestByIdResponse =
  ApiSuccessResponse<GasolineRequestDetailRecord>;

@Injectable()
export class GetGasolineRequestByIdUseCase {
  constructor(
    @Inject('GasolineRequestRepository')
    private readonly gasolineRequestRepository: GasolineRequestRepository,
  ) {}

  async execute(requestId: number): Promise<GetGasolineRequestByIdResponse> {
    const request = await this.gasolineRequestRepository.findById(requestId);
    if (request === null) {
      throw new NotFoundException('Solicitud de gasolina no encontrada.');
    }

    return buildSuccessResponse(
      request,
      'Detalle de solicitud de gasolina cargado correctamente.',
    );
  }
}
