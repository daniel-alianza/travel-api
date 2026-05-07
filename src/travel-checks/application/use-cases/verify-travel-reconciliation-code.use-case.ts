import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

type VerifyTravelReconciliationCodeData = {
  readonly verified: true;
};

export type VerifyTravelReconciliationCodeResponse =
  ApiSuccessResponse<VerifyTravelReconciliationCodeData>;

@Injectable()
export class VerifyTravelReconciliationCodeUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
  ) {}

  async execute(
    userId: number,
    travelRequestId: number,
    verificationCode: string,
  ): Promise<VerifyTravelReconciliationCodeResponse> {
    const latest =
      await this.travelChecksRepository.findLatestTravelRequestReconciliation(
        travelRequestId,
        userId,
      );
    if (latest === null) {
      throw new BadRequestException({
        message: 'No existe una solicitud de conciliación activa.',
        error: 'Solicitud no encontrada',
      });
    }
    if (latest.status === 'rejected') {
      throw new UnauthorizedException({
        message: 'La solicitud fue rechazada por contabilidad.',
        error: 'Solicitud rechazada',
      });
    }
    if (latest.status === 'verified') {
      return buildSuccessResponse(
        { verified: true },
        'Código de conciliación ya verificado.',
      );
    }
    if (new Date().getTime() > latest.codeExpiresAt.getTime()) {
      throw new UnauthorizedException({
        message: 'El código de conciliación expiró. Solicita uno nuevo.',
        error: 'Código expirado',
      });
    }

    if (verificationCode.trim() !== latest.verificationCodeHash) {
      throw new UnauthorizedException({
        message: 'Código inválido.',
        error: 'Código inválido',
      });
    }

    await this.travelChecksRepository.markTravelRequestReconciliationVerified(
      latest.id,
    );

    return buildSuccessResponse(
      { verified: true },
      'Código de conciliación verificado.',
    );
  }
}
