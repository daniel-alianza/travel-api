import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  CreateTravelRequestRepositoryInput,
  TravelRequestRepository,
} from '../interfaces/travel-request-repository.interface';
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
import { buildBossAuthNotificationPayload } from '../../domain/build-boss-auth-notification-payload';
import { buildRequestSentNotificationPayload } from '../../domain/build-request-sent-notification-payload';
import { buildTravelRequestApprovalAppUrl } from '../../domain/build-travel-request-approval-app-url';
import { SendBossAuthNotificationUseCase } from '../../../notifications/application/use-cases/send-boss-auth-notification.use-case';
import { SendRequestSentNotificationUseCase } from '../../../notifications/application/use-cases/send-request-sent-notification.use-case';

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

const CAR_RENT_RECOMMENDED_PER_DAY = 850;

@Injectable()
export class CreateTravelRequestUseCase {
  private readonly logger = new Logger(CreateTravelRequestUseCase.name);

  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
    private readonly sendRequestSentNotificationUseCase: SendRequestSentNotificationUseCase,
    private readonly sendBossAuthNotificationUseCase: SendBossAuthNotificationUseCase,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    command: CreateTravelRequestCommand,
  ): Promise<CreateTravelRequestResponse> {
    if (command.trips.length === 0) {
      throw new BadRequestException('Debe incluir al menos un viaje.');
    }

    const user = await this.travelRequestRepository.findUserById(
      command.userId,
    );
    if (!user) {
      throw new NotFoundException('No se encontró el usuario solicitante.');
    }

    const area = await this.travelRequestRepository.findAreaById(
      command.areaId,
    );
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

    const repositoryInputTrips: CreateTravelRequestRepositoryInput['trips'][number][] =
      [];
    for (const [tripIndex, trip] of command.trips.entries()) {
      assertTravelRequestTripCommandValid(trip, tripIndex + 1);
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

      const tripDays = calculateTripDaysForFoodPolicy(
        departureDate,
        returnDate,
      );
      const foodPolicyRecommendedTotal = computeFoodPolicyMaximumAmount(
        foodPolicyResolution,
        tripDays,
      );
      validateFoodExpenseCapOrThrow({
        tripIndex: tripIndex + 1,
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
        tripIndex: tripIndex + 1,
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
            `La tarjeta de gasolina del viaje ${tripIndex + 1} no es válida o está inactiva.`,
          );
        }
      }

      const carRentPolicyRecommendedTotal = roundToTwoDecimals(
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
    }

    const createdRequest =
      await this.travelRequestRepository.createTravelRequest({
        userId: command.userId,
        companyId: command.companyId,
        branchId: command.branchId,
        areaId: command.areaId,
        approverId: user.managerId,
        employeeName: command.employeeName.trim(),
        corporateCardNumber: command.corporateCardNumber?.trim() ?? null,
        trips: repositoryInputTrips,
      });

    await this.notifyTravelRequestCreatedSafely({
      requestId: createdRequest.id,
      userId: command.userId,
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

  private async notifyTravelRequestCreatedSafely(input: {
    readonly requestId: number;
    readonly userId: number;
    readonly employeeName: string;
    readonly corporateCardNumber: string | null;
    readonly trips: CreateTravelRequestRepositoryInput['trips'];
  }): Promise<void> {
    try {
      this.logger.debug(
        `Iniciando notificaciones para solicitud #${input.requestId} (userId=${input.userId})`,
      );

      const contacts =
        await this.travelRequestRepository.findTravelRequestNotificationContacts(
          input.userId,
        );

      if (contacts === null) {
        this.logger.warn(
          `Notificaciones omitidas para solicitud #${input.requestId}: el solicitante no tiene correo registrado.`,
        );
        return;
      }

      this.logger.debug(
        `Contactos solicitud #${input.requestId}: employee=${contacts.employeeEmail}, boss=${contacts.bossName}, bossEmail=${contacts.bossEmail ?? 'null'}, company=${contacts.companyName}`,
      );

      const frontendUrl = this.configService.get<string>('FRONTEND_URL') ?? '';
      const employeeAppUrl = frontendUrl;
      const approvalAppUrl = buildTravelRequestApprovalAppUrl(frontendUrl);

      const requestSentPayload = buildRequestSentNotificationPayload({
        requestId: input.requestId,
        employeeName: input.employeeName,
        corporateCardNumber: input.corporateCardNumber,
        trips: input.trips,
        contacts,
        appUrl: employeeAppUrl,
      });

      try {
        this.logger.debug(
          `Enviando request_sent solicitud #${input.requestId} → ${requestSentPayload.recipientEmail}`,
        );
        await this.sendRequestSentNotificationUseCase.execute(
          requestSentPayload,
        );
        this.logger.log(
          `Notificación request_sent enviada para solicitud #${input.requestId}`,
        );
      } catch (error) {
        this.logger.error(
          `Falló request_sent para solicitud #${input.requestId}`,
          error,
        );
      }

      const bossAuthPayload = buildBossAuthNotificationPayload({
        requestId: input.requestId,
        employeeName: input.employeeName,
        corporateCardNumber: input.corporateCardNumber,
        trips: input.trips,
        contacts,
        appUrl: approvalAppUrl,
      });

      if (bossAuthPayload === null) {
        this.logger.warn(
          `Notificación boss_authorization omitida para solicitud #${input.requestId}: jefe "${contacts.bossName}" sin correo registrado (bossEmail=null).`,
        );
        return;
      }

      try {
        this.logger.debug(
          `Enviando boss_authorization solicitud #${input.requestId} → ${bossAuthPayload.recipientEmail} (jefe: ${bossAuthPayload.bossName}, empleado: ${bossAuthPayload.employeeName})`,
        );
        await this.sendBossAuthNotificationUseCase.execute(bossAuthPayload);
        this.logger.log(
          `Notificación boss_authorization enviada para solicitud #${input.requestId} → ${bossAuthPayload.recipientEmail}`,
        );
      } catch (error) {
        this.logger.error(
          `Falló boss_authorization para solicitud #${input.requestId} → ${bossAuthPayload.recipientEmail}`,
          error,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error inesperado en notificaciones para solicitud #${input.requestId}`,
        error,
      );
    }
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

export function assertTravelRequestTripCommandValid(
  trip: CreateTravelRequestTripCommand,
  tripIndexOneBased: number,
): void {
  const prefix = `Viaje ${tripIndexOneBased}:`;
  if (!trip.destinoViaje.trim()) {
    throw new BadRequestException(`${prefix} el destino es obligatorio.`);
  }
  if (!trip.motivoViaje.trim()) {
    throw new BadRequestException(
      `${prefix} el motivo o las actividades son obligatorios.`,
    );
  }
  if (
    !trip.fechaSalida.trim() ||
    !trip.fechaRegreso.trim() ||
    !trip.fechaDispersion.trim()
  ) {
    throw new BadRequestException(
      `${prefix} las fechas de salida, regreso y dispersión son obligatorias.`,
    );
  }
  const objetivosContados = trip.objetivos
    .map((objective) => objective.trim())
    .filter((objective) => objective.length > 0);
  if (objetivosContados.length < 3) {
    throw new BadRequestException(
      `${prefix} debes registrar al menos 3 objetivos con descripción.`,
    );
  }
  if (sumTripExpenses(trip.gastos) <= 0) {
    throw new BadRequestException(
      `${prefix} debes registrar al menos un gasto estimado mayor a cero.`,
    );
  }
  if (trip.gasolina.necesitaGasolina) {
    const cardId = trip.gasolina.cardId;
    if (
      cardId === null ||
      cardId === undefined ||
      !Number.isFinite(cardId) ||
      cardId < 1
    ) {
      throw new BadRequestException(
        `${prefix} selecciona una tarjeta de gasolina válida.`,
      );
    }
    if (!trip.gasolina.placa?.trim()) {
      throw new BadRequestException(
        `${prefix} la placa es obligatoria si solicitas gasolina.`,
      );
    }
    const kilometraje = trip.gasolina.kilometrajeActualKm;
    if (
      kilometraje === null ||
      kilometraje === undefined ||
      !Number.isFinite(kilometraje) ||
      kilometraje < 0
    ) {
      throw new BadRequestException(
        `${prefix} indica el kilometraje actual del vehículo.`,
      );
    }
    const montoGasolina = toSafeNumber(trip.gasolina.montoSolicitado);
    if (montoGasolina <= 0) {
      throw new BadRequestException(
        `${prefix} indica el monto solicitado de gasolina.`,
      );
    }
    const distanciaKm = toSafeNumber(trip.gasolina.distanciaKm);
    if (distanciaKm <= 0) {
      throw new BadRequestException(
        `${prefix} indica la distancia a recorrer en kilómetros.`,
      );
    }
  }
  if (trip.tag.necesitaTag) {
    const montoTag = toSafeNumber(trip.tag.montoSolicitado);
    if (montoTag <= 0) {
      throw new BadRequestException(
        `${prefix} indica el monto solicitado para TAG.`,
      );
    }
  }
}

export function validateFoodExpenseCapOrThrow(input: {
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
      requestedAmount: roundToTwoDecimals(input.requestedFoodAmount),
      maximumAllowedAmount: roundToTwoDecimals(input.maximumAllowedAmount),
    },
  });
}

export function validateLodgingExpenseCapOrThrow(input: {
  readonly tripIndex: number;
  readonly lodgingPolicyApplies: boolean;
  readonly requestedLodgingAmount: number;
  readonly maximumAllowedAmount: number;
}): void {
  if (!input.lodgingPolicyApplies) {
    return;
  }
  if (input.requestedLodgingAmount <= input.maximumAllowedAmount) {
    return;
  }

  const lodgingMessage =
    input.maximumAllowedAmount <= 0
      ? `El viaje ${input.tripIndex} es de un solo día; no está permitido solicitar hospedaje.`
      : `El monto de hospedaje del viaje ${input.tripIndex} excede el tope permitido por política.`;

  throw new BadRequestException({
    message: lodgingMessage,
    error: {
      code: 'TRAVEL_REQUEST_POLICY_LIMIT_EXCEEDED',
      tripIndex: input.tripIndex,
      field: 'hospedaje',
      requestedAmount: roundToTwoDecimals(input.requestedLodgingAmount),
      maximumAllowedAmount: roundToTwoDecimals(input.maximumAllowedAmount),
    },
  });
}
