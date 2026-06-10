import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

type DecideTravelReconciliationData = {
  readonly id: number;
  readonly status: 'rejected';
};

export type DecideTravelReconciliationResponse =
  ApiSuccessResponse<DecideTravelReconciliationData>;

@Injectable()
export class DecideTravelReconciliationUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
  ) {}

  async execute(input: {
    reconciliationId: number;
    decidedByUserId: number;
    rejectionReason: string | null;
  }): Promise<DecideTravelReconciliationResponse> {
    if ((input.rejectionReason ?? '').trim().length === 0) {
      throw new BadRequestException({
        message: 'Debes indicar una razón de rechazo.',
        error: 'Razón requerida',
      });
    }

    const updated =
      await this.travelChecksRepository.decideTravelRequestReconciliation({
        reconciliationId: input.reconciliationId,
        decidedByUserId: input.decidedByUserId,
        approve: false,
        rejectionReason: input.rejectionReason,
      });
    if (updated === null) {
      throw new BadRequestException({
        message: 'La conciliación no existe o ya fue atendida.',
        error: 'Conciliación inválida',
      });
    }

    return buildSuccessResponse(
      {
        id: updated.id,
        status: 'rejected',
      },
      'Conciliación rechazada por contabilidad.',
    );
  }
}
