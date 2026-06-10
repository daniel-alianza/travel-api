import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';
import { roundToTwoDecimals } from '../../domain/travel-request-food-policy';
import {
  computeLodgingPolicyMaximumAmount,
  resolveNationalLodgingPolicyForAreaName,
} from '../../domain/travel-request-lodging-policy';

export type ValidateTripLodgingExpenseCommand = {
  readonly areaId: number;
  readonly fechaSalida: string;
  readonly fechaRegreso: string;
  readonly hospedaje: number;
};

export type ValidateTripLodgingExpenseData = {
  readonly appliesPolicy: boolean;
  readonly withinCap: boolean;
  readonly requestedAmount: number;
  readonly maximumAllowedAmount: number | null;
};

export type ValidateTripLodgingExpenseResponse =
  ApiSuccessResponse<ValidateTripLodgingExpenseData>;

@Injectable()
export class ValidateTripLodgingExpenseUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(
    command: ValidateTripLodgingExpenseCommand,
  ): Promise<ValidateTripLodgingExpenseResponse> {
    const area = await this.travelRequestRepository.findAreaById(
      command.areaId,
    );
    if (!area) {
      throw new NotFoundException('No se encontró el área indicada.');
    }

    const lodgingPolicyResolution = resolveNationalLodgingPolicyForAreaName(
      area.name,
    );
    if (lodgingPolicyResolution.tag === 'unconfigured') {
      throw new BadRequestException(
        `No hay política de hospedaje nacional configurada para el área ${lodgingPolicyResolution.areaName}.`,
      );
    }

    const departureDate = parseDateOrThrow(command.fechaSalida, 'fechaSalida');
    const returnDate = parseDateOrThrow(command.fechaRegreso, 'fechaRegreso');

    if (returnDate < departureDate) {
      throw new BadRequestException(
        'La fecha de regreso no puede ser menor a la fecha de salida.',
      );
    }

    const maximumAllowedAmount = computeLodgingPolicyMaximumAmount(
      lodgingPolicyResolution,
      departureDate,
      returnDate,
    );
    const appliesPolicy = lodgingPolicyResolution.tag === 'capped';
    const requestedAmount = roundToTwoDecimals(toSafeNumber(command.hospedaje));
    const withinCap = !appliesPolicy || requestedAmount <= maximumAllowedAmount;

    return buildSuccessResponse(
      {
        appliesPolicy,
        withinCap,
        requestedAmount,
        maximumAllowedAmount: appliesPolicy ? maximumAllowedAmount : null,
      },
      'Validación de hospedaje nacional aplicada.',
    );
  }
}

function parseDateOrThrow(value: string, fieldName: string): Date {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new BadRequestException(
      `El campo ${fieldName} no tiene una fecha válida.`,
    );
  }
  return parsedDate;
}

function toSafeNumber(value: number | null | undefined): number {
  if (value === null || value === undefined) {
    return 0;
  }
  if (!Number.isFinite(value)) {
    return 0;
  }
  return value;
}
