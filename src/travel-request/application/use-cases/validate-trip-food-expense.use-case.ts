import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';
import {
  calculateTripDaysForFoodPolicy,
  computeFoodPolicyMaximumAmount,
  resolveFoodPolicyForAreaName,
  roundToTwoDecimals,
} from '../../domain/travel-request-food-policy';

export type ValidateTripFoodExpenseCommand = {
  readonly areaId: number;
  readonly fechaSalida: string;
  readonly fechaRegreso: string;
  readonly alimentos: number;
};

export type ValidateTripFoodExpenseData = {
  readonly appliesPolicy: boolean;
  readonly withinCap: boolean;
  readonly requestedAmount: number;
  readonly maximumAllowedAmount: number | null;
};

export type ValidateTripFoodExpenseResponse =
  ApiSuccessResponse<ValidateTripFoodExpenseData>;

@Injectable()
export class ValidateTripFoodExpenseUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(
    command: ValidateTripFoodExpenseCommand,
  ): Promise<ValidateTripFoodExpenseResponse> {
    const area = await this.travelRequestRepository.findAreaById(
      command.areaId,
    );
    if (!area) {
      throw new NotFoundException('No se encontró el área indicada.');
    }

    const foodPolicyResolution = resolveFoodPolicyForAreaName(area.name);
    if (foodPolicyResolution.tag === 'unconfigured') {
      throw new BadRequestException(
        `No hay política de alimentos configurada para el área ${foodPolicyResolution.areaName}.`,
      );
    }

    const departureDate = parseDateOrThrow(command.fechaSalida, 'fechaSalida');
    const returnDate = parseDateOrThrow(command.fechaRegreso, 'fechaRegreso');

    if (returnDate < departureDate) {
      throw new BadRequestException(
        'La fecha de regreso no puede ser menor a la fecha de salida.',
      );
    }

    const tripDays = calculateTripDaysForFoodPolicy(departureDate, returnDate);
    const maximumAllowedAmount = computeFoodPolicyMaximumAmount(
      foodPolicyResolution,
      tripDays,
    );
    const appliesPolicy = foodPolicyResolution.tag === 'capped';
    const requestedAmount = roundToTwoDecimals(toSafeNumber(command.alimentos));
    const withinCap = !appliesPolicy || requestedAmount <= maximumAllowedAmount;

    return buildSuccessResponse(
      {
        appliesPolicy,
        withinCap,
        requestedAmount,
        maximumAllowedAmount: appliesPolicy ? maximumAllowedAmount : null,
      },
      'Validación de alimentos aplicada.',
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
