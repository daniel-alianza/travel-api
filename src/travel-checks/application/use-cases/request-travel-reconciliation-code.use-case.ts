import {
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { randomInt } from 'crypto';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

const MAX_RECONCILIATION_ATTEMPTS = 2;

type RequestTravelReconciliationCodeData = {
  readonly reconciliationId: number;
  readonly companyName: string;
  readonly codeExpiresAt: string;
  readonly remainingAttempts: number;
};

export type RequestTravelReconciliationCodeResponse =
  ApiSuccessResponse<RequestTravelReconciliationCodeData>;

@Injectable()
export class RequestTravelReconciliationCodeUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
  ) {}

  async execute(
    userId: number,
    tripId: number,
  ): Promise<RequestTravelReconciliationCodeResponse> {
    const ownership = await this.travelChecksRepository.findReconciliationTripOwnership(
      tripId,
      userId,
    );
    if (ownership === null) {
      throw new BadRequestException({
        message: 'No puedes solicitar conciliación para este viaje.',
        error: 'Viaje inválido',
      });
    }

    const tripFilesCount = await this.travelChecksRepository.countTripFilesForUser(
      tripId,
      userId,
    );
    if (tripFilesCount === 0) {
      throw new BadRequestException({
        message:
          'Debes cargar al menos un comprobante en el bucket antes de solicitar conciliación.',
        error: 'Sin comprobantes',
      });
    }

    const attempts = await this.travelChecksRepository.countReconciliationAttempts(
      ownership.travelRequestId,
      userId,
    );
    if (attempts >= MAX_RECONCILIATION_ATTEMPTS) {
      throw new BadRequestException({
        message:
          'Ya utilizaste los 2 intentos permitidos para solicitar conciliación.',
        error: 'Intentos agotados',
      });
    }

    const verificationCode = generarCodigoSeisDigitos();
    const codeExpiresAt = sumarHorasHabiles(new Date(), 24);
    const reconciliation =
      await this.travelChecksRepository.createTravelRequestReconciliation({
        travelRequestId: ownership.travelRequestId,
        requestedByUserId: userId,
        verificationCodeHash: verificationCode,
        codeExpiresAt,
      });

    return buildSuccessResponse(
      {
        reconciliationId: reconciliation.id,
        companyName: ownership.companyName,
        codeExpiresAt: reconciliation.codeExpiresAt.toISOString(),
        remainingAttempts: MAX_RECONCILIATION_ATTEMPTS - (attempts + 1),
      },
      'Solicitud de conciliación registrada.',
    );
  }
}

function generarCodigoSeisDigitos(): string {
  return String(randomInt(100000, 1000000));
}

const HORA_ENTRADA = 8;
const MINUTO_ENTRADA = 30;
const HORA_SALIDA_LUNES_VIERNES = 18;
const MINUTO_SALIDA_LUNES_VIERNES = 30;
const HORA_SALIDA_SABADO = 12;
const MINUTO_SALIDA_SABADO = 30;
const MILISEGUNDOS_POR_HORA = 3_600_000;

function sumarHorasHabiles(fechaBase: Date, horas: number): Date {
  let restante = horas;
  let cursor = ajustarAHorarioHabil(fechaBase);
  while (restante > 0) {
    const finJornadaActual = finJornada(cursor);
    const horasDisponibles =
      (finJornadaActual.getTime() - cursor.getTime()) / MILISEGUNDOS_POR_HORA;
    if (horasDisponibles >= restante) {
      return new Date(cursor.getTime() + restante * MILISEGUNDOS_POR_HORA);
    }
    restante -= horasDisponibles;
    cursor = siguienteInicioJornadaHabil(cursor);
  }
  return cursor;
}

function esDiaHabil(fecha: Date): boolean {
  const dia = fecha.getDay();
  return dia >= 1 && dia <= 6;
}

function ajustarAHorarioHabil(fecha: Date): Date {
  const ajustada = new Date(fecha);
  while (!esDiaHabil(ajustada)) {
    ajustada.setDate(ajustada.getDate() + 1);
    ajustada.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
  }
  const inicio = new Date(ajustada);
  inicio.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
  const fin = finJornada(ajustada);
  if (ajustada.getTime() < inicio.getTime()) {
    ajustada.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
    return ajustada;
  }
  if (ajustada.getTime() >= fin.getTime()) {
    return siguienteInicioJornadaHabil(ajustada);
  }
  return ajustada;
}

function siguienteInicioJornadaHabil(desde: Date): Date {
  const siguiente = new Date(desde);
  siguiente.setDate(siguiente.getDate() + 1);
  siguiente.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
  while (!esDiaHabil(siguiente)) {
    siguiente.setDate(siguiente.getDate() + 1);
  }
  return siguiente;
}

function finJornada(fecha: Date): Date {
  const fin = new Date(fecha);
  if (fecha.getDay() === 6) {
    fin.setHours(HORA_SALIDA_SABADO, MINUTO_SALIDA_SABADO, 0, 0);
    return fin;
  }
  fin.setHours(HORA_SALIDA_LUNES_VIERNES, MINUTO_SALIDA_LUNES_VIERNES, 0, 0);
  return fin;
}
