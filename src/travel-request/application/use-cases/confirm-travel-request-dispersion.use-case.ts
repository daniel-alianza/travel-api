import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

export type ConfirmTravelRequestDispersionCommand = {
  readonly travelRequestId: number;
  readonly dispersedTotal: number;
  readonly comment: string | null;
};

export type ConfirmTravelRequestDispersionResponse =
  ApiSuccessResponse<{ readonly ok: true }>;

@Injectable()
export class ConfirmTravelRequestDispersionUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(
    command: ConfirmTravelRequestDispersionCommand,
  ): Promise<ConfirmTravelRequestDispersionResponse> {
    if (!Number.isFinite(command.dispersedTotal) || command.dispersedTotal <= 0) {
      throw new BadRequestException(
        'El monto dispersado debe ser un número mayor a cero.',
      );
    }

    const dispersionComment =
      command.comment !== null && command.comment.trim().length > 0
        ? command.comment.trim()
        : null;

    const result = await this.travelRequestRepository.confirmTravelRequestDispersion({
      travelRequestId: command.travelRequestId,
      dispersedTotal: command.dispersedTotal,
      dispersionComment,
    });

    if (result === 'not_found') {
      throw new NotFoundException('Solicitud de viaje no encontrada.');
    }

    if (result === 'invalid_status') {
      throw new ConflictException(
        'Solo se puede dispersar una solicitud aprobada con viajes aprobados.',
      );
    }

    return buildSuccessResponse(
      { ok: true as const },
      'Solicitud dispersada correctamente.',
    );
  }
}
