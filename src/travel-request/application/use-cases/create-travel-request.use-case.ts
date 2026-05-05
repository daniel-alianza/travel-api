import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  CreateTravelRequestRepositoryInput,
  TravelRequestRepository,
} from '../interfaces/travel-request-repository.interface';

export type CreateTravelRequestTripCommand = {
  readonly destinoViaje: string;
  readonly motivoViaje: string;
  readonly fechaSalida: string;
  readonly fechaRegreso: string;
  readonly fechaDispersion: string;
  readonly gastos: {
    readonly transporte: number;
    readonly peajes: number;
    readonly hospedaje: number;
    readonly alimentos: number;
    readonly fletes: number;
    readonly herramientas: number;
    readonly envios: number;
    readonly miscelaneos: number;
  };
  readonly objetivos: readonly string[];
  readonly gasolina: {
    readonly necesitaGasolina: boolean;
    readonly cardId: number | null;
    readonly placa: string | null;
    readonly kilometrajeActualKm: number | null;
    readonly montoSolicitado: number | null;
    readonly distanciaKm: number | null;
    readonly comentarios: string | null;
  };
  readonly tag: {
    readonly necesitaTag: boolean;
    readonly montoSolicitado: number | null;
    readonly comentarios: string | null;
  };
};

export type CreateTravelRequestCommand = {
  readonly userId: number;
  readonly companyId: number;
  readonly branchId: number;
  readonly areaId: number;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly trips: readonly CreateTravelRequestTripCommand[];
};

type CreateTravelRequestData = {
  readonly id: number;
  readonly status: string;
  readonly createdAt: string;
};

export type CreateTravelRequestResponse =
  ApiSuccessResponse<CreateTravelRequestData>;

const FOOD_POLICY_EVENT_COST = 250;
const FOOD_POLICY_EVENTS_PER_DAY = 3;
const FOOD_POLICY_IVA_RATE = 0.16;
const FOOD_POLICY_TIP_RATE = 0.1;
const CAR_RENT_RECOMMENDED_PER_DAY = 850;

@Injectable()
export class CreateTravelRequestUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(
    command: CreateTravelRequestCommand,
  ): Promise<CreateTravelRequestResponse> {
    if (command.trips.length === 0) {
      throw new BadRequestException('Debe incluir al menos un viaje.');
    }

    const user = await this.travelRequestRepository.findUserById(command.userId);
    if (!user) {
      throw new NotFoundException('No se encontró el usuario solicitante.');
    }

    const area = await this.travelRequestRepository.findAreaById(command.areaId);
    if (!area) {
      throw new NotFoundException('No se encontró el área del solicitante.');
    }

    const normalizedAreaName = normalizeText(area.name);
    const foodPolicyApplies =
      normalizedAreaName.includes('ventas') ||
      normalizedAreaName.includes('administracion');

    const repositoryInputTrips: CreateTravelRequestRepositoryInput['trips'][number][] = [];
    for (const [tripIndex, trip] of command.trips.entries()) {
      const departureDate = parseDateOrThrow(
        trip.fechaSalida,
        `fechaSalida del viaje ${tripIndex + 1}`,
      );
      const returnDate = parseDateOrThrow(
        trip.fechaRegreso,
        `fechaRegreso del viaje ${tripIndex + 1}`,
      );
      const disbursementDate = parseDateOrThrow(
        trip.fechaDispersion,
        `fechaDispersion del viaje ${tripIndex + 1}`,
      );

      if (returnDate < departureDate) {
        throw new BadRequestException(
          `La fecha de regreso no puede ser menor a la fecha de salida en el viaje ${tripIndex + 1}.`,
        );
      }

      const tripDays = calculateTripDays(departureDate, returnDate);
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
            `La tarjeta de gasolina del viaje ${tripIndex + 1} no es válida o está inactiva.`,
          );
        }
      }

      const foodPolicyRecommendedTotal = foodPolicyApplies
        ? roundToTwo(
            tripDays *
              FOOD_POLICY_EVENTS_PER_DAY *
              FOOD_POLICY_EVENT_COST *
              (1 + FOOD_POLICY_IVA_RATE + FOOD_POLICY_TIP_RATE),
          )
        : 0;
      void foodPolicyRecommendedTotal;
      const carRentPolicyRecommendedTotal = roundToTwo(
        tripDays * CAR_RENT_RECOMMENDED_PER_DAY,
      );
      void carRentPolicyRecommendedTotal;

      repositoryInputTrips.push({
        ordenViaje: tripIndex + 1,
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
      });

      void gastosTotal;
      void gasolinaTotal;
      void tagTotal;
    }

    const createdRequest = await this.travelRequestRepository.createTravelRequest({
      userId: command.userId,
      companyId: command.companyId,
      branchId: command.branchId,
      areaId: command.areaId,
      approverId: user.managerId,
      employeeName: command.employeeName.trim(),
      corporateCardNumber: command.corporateCardNumber?.trim() ?? null,
      trips: repositoryInputTrips,
    });

    return buildSuccessResponse(
      {
        id: createdRequest.id,
        status: createdRequest.status,
        createdAt: createdRequest.createdAt.toISOString(),
      },
      'Solicitud creada correctamente.',
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
    throw new BadRequestException(`El campo ${fieldName} no tiene una fecha válida.`);
  }
  return parsedDate;
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

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
