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
  type CreateTravelRequestTripCommand,
} from './create-travel-request.use-case';

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

const FOOD_POLICY_EVENTS_PER_DAY = 3;
const FOOD_POLICY_IVA_RATE = 0.16;
const FOOD_POLICY_TIP_RATE = 0.1;
const FOOD_EVENT_COST_ADMINISTRATIVO = 250;
const FOOD_EVENT_COST_VENTAS = 250;
const FOOD_EVENT_COST_OPERACIONES = 200;

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
    const foodPolicy = resolveFoodPolicyByAreaName(area.name);

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
    const tripDays = calculateTripDays(departureDate, returnDate);
    const foodPolicyRecommendedTotal = foodPolicy.applies
      ? roundToTwo(
          tripDays *
            FOOD_POLICY_EVENTS_PER_DAY *
            foodPolicy.eventCost *
            (1 + FOOD_POLICY_IVA_RATE) *
            (1 + FOOD_POLICY_TIP_RATE),
        )
      : 0;
    validateFoodExpenseCapOrThrow({
      tripIndex: 1,
      foodPolicyApplies: foodPolicy.applies,
      requestedFoodAmount: toSafeNumber(trip.gastos.alimentos),
      maximumAllowedAmount: foodPolicyRecommendedTotal,
    });

    const gastosTotal = sumTripExpenses(trip.gastos);
    const gasolinaTotal = trip.gasolina.necesitaGasolina
      ? toSafeNumber(trip.gasolina.montoSolicitado)
      : 0;
    const tagTotal = trip.tag.necesitaTag
      ? toSafeNumber(trip.tag.montoSolicitado)
      : 0;
    const totalEstimado = roundToTwo(gastosTotal + gasolinaTotal + tagTotal);

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
  return roundToTwo(
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

function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

function calculateTripDays(startDate: Date, endDate: Date): number {
  const normalizedStart = new Date(startDate);
  normalizedStart.setHours(0, 0, 0, 0);
  const normalizedEnd = new Date(endDate);
  normalizedEnd.setHours(0, 0, 0, 0);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayDifference = Math.floor(
    (normalizedEnd.getTime() - normalizedStart.getTime()) / millisecondsPerDay,
  );
  return Math.max(dayDifference + 1, 1);
}

function resolveFoodPolicyByAreaName(areaName: string): {
  readonly applies: boolean;
  readonly eventCost: number;
} {
  const normalizedAreaName = normalizeText(areaName);
  if (normalizedAreaName === 'direccion') {
    return {
      applies: false,
      eventCost: 0,
    };
  }

  const administrativeAreas = new Set<string>([
    'administracion',
    'contabilidad',
    'recursos humanos',
    'tecnologias de la informacion',
  ]);
  if (administrativeAreas.has(normalizedAreaName)) {
    return {
      applies: true,
      eventCost: FOOD_EVENT_COST_ADMINISTRATIVO,
    };
  }

  const salesAreas = new Set<string>([
    'atencion a clientes',
    'compras',
    'mercadotecnia',
    'ventas',
  ]);
  if (salesAreas.has(normalizedAreaName)) {
    return {
      applies: true,
      eventCost: FOOD_EVENT_COST_VENTAS,
    };
  }

  const operationAreas = new Set<string>([
    'almacen',
    'logistica',
    'auditoria externa',
    'auditoria interna',
    'calidad',
    'ingenieria',
    'mantenimiento',
    'manufactura',
    'produccion',
    'seguridad e higiene',
  ]);
  if (operationAreas.has(normalizedAreaName)) {
    return {
      applies: true,
      eventCost: FOOD_EVENT_COST_OPERACIONES,
    };
  }

  throw new BadRequestException(
    `No hay política de alimentos configurada para el área ${areaName}.`,
  );
}

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function validateFoodExpenseCapOrThrow(input: {
  readonly tripIndex: number;
  readonly foodPolicyApplies: boolean;
  readonly requestedFoodAmount: number;
  readonly maximumAllowedAmount: number;
}): void {
  if (!input.foodPolicyApplies) {
    return;
  }
  if (input.requestedFoodAmount <= input.maximumAllowedAmount) {
    return;
  }
  throw new BadRequestException({
    message: `El monto de alimentos del viaje ${input.tripIndex} excede el tope permitido por política.`,
    error: {
      code: 'TRAVEL_REQUEST_POLICY_LIMIT_EXCEEDED',
      tripIndex: input.tripIndex,
      field: 'alimentos',
      requestedAmount: roundToTwo(input.requestedFoodAmount),
      maximumAllowedAmount: roundToTwo(input.maximumAllowedAmount),
    },
  });
}
