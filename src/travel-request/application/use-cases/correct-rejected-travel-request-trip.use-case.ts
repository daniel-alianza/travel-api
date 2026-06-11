import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  TravelRequestRepository,
  TravelRequestTripInput,
} from '../interfaces/travel-request-repository.interface';
import {
  assertTravelRequestTripCommandValid,
  validateFoodExpenseCapOrThrow,
  validateLodgingExpenseCapOrThrow,
  type CreateTravelRequestTripCommand,
} from './create-travel-request.use-case';
import {
  calculateTripDaysForFoodPolicy,
  computeFoodPolicyMaximumAmount,
  resolveFoodPolicyForAreaName,
  roundToTwoDecimals,
} from '../../domain/travel-request-food-policy';
import {
  computeLodgingPolicyMaximumAmount,
  resolveNationalLodgingPolicyForAreaName,
} from '../../domain/travel-request-lodging-policy';

export type CorrectRejectedTravelRequestTripCommand = {
  readonly userId: number;
  readonly tripId: number;
  readonly trip: CreateTravelRequestTripCommand;
};

type CorrectRejectedTravelRequestTripData = {
  readonly solicitudId: number;
  readonly tripId: number;
  readonly statusViaje: string;
  readonly statusSolicitud: string;
};

export type CorrectRejectedTravelRequestTripResponse =
  ApiSuccessResponse<CorrectRejectedTravelRequestTripData>;

@Injectable()
export class CorrectRejectedTravelRequestTripUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(
    command: CorrectRejectedTravelRequestTripCommand,
  ): Promise<CorrectRejectedTravelRequestTripResponse> {
    const user = await this.travelRequestRepository.findUserById(
      command.userId,
    );
    if (!user) {
      throw new NotFoundException('No se encontró el usuario solicitante.');
    }
    const area = await this.travelRequestRepository.findAreaById(user.areaId);
    if (!area) {
      throw new NotFoundException('No se encontró el área del solicitante.');
    }
    const foodPolicyResolution = resolveFoodPolicyForAreaName(area.name);
    if (foodPolicyResolution.tag === 'unconfigured') {
      throw new BadRequestException(
        `No hay política de alimentos configurada para el área ${foodPolicyResolution.areaName}.`,
      );
    }
    const lodgingPolicyResolution = resolveNationalLodgingPolicyForAreaName(
      area.name,
    );
    if (lodgingPolicyResolution.tag === 'unconfigured') {
      throw new BadRequestException(
        `No hay política de hospedaje nacional configurada para el área ${lodgingPolicyResolution.areaName}.`,
      );
    }

    const trip = command.trip;
    assertTravelRequestTripCommandValid(trip, 1);
    const departureDate = parseDateOrThrow(
      trip.fechaSalida,
      'fechaSalida del viaje',
    );
    const returnDate = parseDateOrThrow(
      trip.fechaRegreso,
      'fechaRegreso del viaje',
    );
    const disbursementDate = parseDateOrThrow(
      trip.fechaDispersion,
      'fechaDispersion del viaje',
    );

    if (returnDate < departureDate) {
      throw new BadRequestException(
        'La fecha de regreso no puede ser menor a la fecha de salida.',
      );
    }
    const tripDays = calculateTripDaysForFoodPolicy(departureDate, returnDate);
    const foodPolicyRecommendedTotal = computeFoodPolicyMaximumAmount(
      foodPolicyResolution,
      tripDays,
    );
    validateFoodExpenseCapOrThrow({
      tripIndex: 1,
      foodPolicyApplies: foodPolicyResolution.tag === 'capped',
      requestedFoodAmount: toSafeNumber(trip.gastos.alimentos),
      maximumAllowedAmount: foodPolicyRecommendedTotal,
    });

    const lodgingMaximum = computeLodgingPolicyMaximumAmount(
      lodgingPolicyResolution,
      departureDate,
      returnDate,
    );
    validateLodgingExpenseCapOrThrow({
      tripIndex: 1,
      lodgingPolicyApplies: lodgingPolicyResolution.tag === 'capped',
      requestedLodgingAmount: toSafeNumber(trip.gastos.hospedaje),
      maximumAllowedAmount: lodgingMaximum,
    });

    const gastosTotal = sumTripExpenses(trip.gastos);
    const gasolinaTotal = trip.gasolina.necesitaGasolina
      ? toSafeNumber(trip.gasolina.montoSolicitado)
      : 0;
    const tagTotal = trip.tag.necesitaTag
      ? toSafeNumber(trip.tag.montoSolicitado)
      : 0;
    const totalEstimado = roundToTwoDecimals(
      gastosTotal + gasolinaTotal + tagTotal,
    );

    if (trip.gasolina.necesitaGasolina && trip.gasolina.cardId) {
      const card = await this.travelRequestRepository.findFuelCardById(
        trip.gasolina.cardId,
      );

      if (!card || card.type !== 'FUEL' || !card.isActive) {
        throw new BadRequestException(
          'La tarjeta de gasolina no es válida o está inactiva.',
        );
      }
    }

    const repositoryTrip: TravelRequestTripInput = {
      ordenViaje: 1,
      destinoViaje: trip.destinoViaje.trim(),
      motivoViaje: trip.motivoViaje.trim(),
      fechaSalida: departureDate,
      fechaRegreso: returnDate,
      fechaDispersion: disbursementDate,
      totalEstimado,
      gastos: {
        transporte: toSafeNumber(trip.gastos.transporte),
        peajes: toSafeNumber(trip.gastos.peajes),
        hospedaje: toSafeNumber(trip.gastos.hospedaje),
        alimentos: toSafeNumber(trip.gastos.alimentos),
        fletes: toSafeNumber(trip.gastos.fletes),
        herramientas: toSafeNumber(trip.gastos.herramientas),
        envios: toSafeNumber(trip.gastos.envios),
        miscelaneos: toSafeNumber(trip.gastos.miscelaneos),
      },
      objetivos: trip.objetivos.map((objective) => objective.trim()),
      gasolina: {
        necesitaGasolina: trip.gasolina.necesitaGasolina,
        cardId: trip.gasolina.cardId,
        placa: trip.gasolina.placa?.trim() || null,
        kilometrajeActualKm: trip.gasolina.kilometrajeActualKm,
        montoSolicitado: trip.gasolina.montoSolicitado,
        distanciaKm: trip.gasolina.distanciaKm,
        comentarios: trip.gasolina.comentarios?.trim() || null,
        fotoOdometroBase64: trip.gasolina.fotoOdometroBase64?.trim() || null,
      },
      tag: {
        necesitaTag: trip.tag.necesitaTag,
        montoSolicitado: trip.tag.montoSolicitado,
        comentarios: trip.tag.comentarios?.trim() || null,
      },
    };

    const result = await this.travelRequestRepository.correctRejectedTrip(
      command.userId,
      command.tripId,
      repositoryTrip,
    );

    if (result === 'not_found') {
      throw new NotFoundException('No se encontró el viaje indicado.');
    }

    if (result === 'forbidden') {
      throw new ForbiddenException('No puedes modificar este viaje.');
    }

    if (result === 'invalid_status') {
      throw new BadRequestException(
        'Solo se pueden corregir viajes en estado rechazado.',
      );
    }

    const solicitud =
      await this.travelRequestRepository.findTravelRequestDetailByTripForUser(
        command.tripId,
        command.userId,
      );

    const viajeActualizado = solicitud?.trips.find(
      (viaje) => viaje.id === command.tripId,
    );

    return buildSuccessResponse(
      {
        solicitudId: solicitud?.id ?? 0,
        tripId: command.tripId,
        statusViaje: viajeActualizado?.tripApprovalStatus ?? 'pending',
        statusSolicitud: solicitud?.status ?? 'submitted',
      },
      'Viaje corregido y reenviado a revisión.',
    );
  }
}

function sumTripExpenses(
  expenses: CreateTravelRequestTripCommand['gastos'],
): number {
  return roundToTwoDecimals(
    toSafeNumber(expenses.transporte) +
      toSafeNumber(expenses.peajes) +
      toSafeNumber(expenses.hospedaje) +
      toSafeNumber(expenses.alimentos) +
      toSafeNumber(expenses.fletes) +
      toSafeNumber(expenses.herramientas) +
      toSafeNumber(expenses.envios) +
      toSafeNumber(expenses.miscelaneos),
  );
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
