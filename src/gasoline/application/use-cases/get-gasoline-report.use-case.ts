import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { maskCardNumber } from '../../../common/security/mask-card-number';
import { computeGasolineReportMetrics } from '../../domain/gasoline-report.metrics';
import type {
  GasolineReportFilters,
  GasolineReportHistoryRow,
  GasolineReportRepository,
} from '../interfaces/gasoline-report.repository.interface';
import type { GasolineRequestStatusValue } from '../interfaces/gasoline-request.repository.interface';

export type GetGasolineReportQuery = {
  readonly companyId?: number;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly status?: GasolineRequestStatusValue;
  readonly plate?: string;
};

export type GasolineReportRow = {
  readonly id: number;
  readonly usuario: string;
  readonly email: string;
  readonly razonSocial: string;
  readonly fechaSolicitud: string;
  readonly tarjeta: string;
  readonly placa: string;
  readonly kmInicial: number;
  readonly tieneImagenKm: boolean;
  readonly kmRecorre: number;
  readonly rendimientoEsperado: number | null;
  readonly kmAnterior: number | null;
  readonly monto: number;
  readonly montoRecorrido: number | null;
  readonly kmRecorridoReal: number | null;
  readonly rendimientoRealKmPeso: number | null;
  readonly variacionRendimiento: number | null;
  readonly estado: GasolineRequestStatusValue;
  readonly reviso: string | null;
  readonly emailReviso: string | null;
  readonly fechaHoraRevision: string | null;
  readonly dispersado: boolean;
  readonly autorizador: string | null;
  readonly emailAutorizador: string | null;
  readonly fechaHoraDispersion: string | null;
};

type GetGasolineReportData = {
  readonly rows: readonly GasolineReportRow[];
  readonly total: number;
};

export type GetGasolineReportResponse = ApiSuccessResponse<GetGasolineReportData>;

@Injectable()
export class GetGasolineReportUseCase {
  constructor(
    @Inject('GasolineReportRepository')
    private readonly gasolineReportRepository: GasolineReportRepository,
  ) {}

  async execute(
    query: GetGasolineReportQuery,
  ): Promise<GetGasolineReportResponse> {
    const filters = this.buildFilters(query);
    const filtered =
      await this.gasolineReportRepository.findFilteredRequests(filters);

    if (filtered.length === 0) {
      return buildSuccessResponse(
        { rows: [], total: 0 },
        'Reporte de gasolina generado correctamente.',
      );
    }

    const plates = [...new Set(filtered.map((row) => row.plate))];
    const fullHistory =
      await this.gasolineReportRepository.findHistoryByPlates(plates);

    const historyByPlate = new Map<string, GasolineReportHistoryRow[]>();
    for (const row of fullHistory) {
      const list = historyByPlate.get(row.plate);
      if (list === undefined) {
        historyByPlate.set(row.plate, [row]);
      } else {
        list.push(row);
      }
    }

    const rows = filtered
      .map((request) => {
        const history = historyByPlate.get(request.plate) ?? [];
        const metrics = computeGasolineReportMetrics(
          history,
          request.id,
          request.currentMileageKm,
          request.requestedAmount,
          request.distanceKm,
        );

        return {
          id: request.id,
          usuario: request.user.name,
          email: request.user.email,
          razonSocial: request.company.name,
          fechaSolicitud: request.createdAt.toISOString(),
          tarjeta: maskCardNumber(request.card.cardNumber),
          placa: request.plate,
          kmInicial: request.currentMileageKm,
          tieneImagenKm: request.odometerPhotoCount > 0,
          kmRecorre: request.distanceKm,
          rendimientoEsperado: metrics.rendimientoEsperado,
          kmAnterior: metrics.kmAnterior,
          monto: request.requestedAmount,
          montoRecorrido: metrics.montoRecorrido,
          kmRecorridoReal: metrics.kmRecorridoReal,
          rendimientoRealKmPeso: metrics.rendimientoRealKmPeso,
          variacionRendimiento: metrics.variacionRendimiento,
          estado: request.status,
          reviso: request.approver?.name ?? null,
          emailReviso: request.approver?.email ?? null,
          fechaHoraRevision: request.approvedAt?.toISOString() ?? null,
          dispersado: request.disbursedAt !== null,
          autorizador: request.disbursedBy?.name ?? null,
          emailAutorizador: request.disbursedBy?.email ?? null,
          fechaHoraDispersion: request.disbursedAt?.toISOString() ?? null,
        };
      })
      .sort(
        (left, right) =>
          new Date(right.fechaSolicitud).getTime() -
          new Date(left.fechaSolicitud).getTime(),
      );

    return buildSuccessResponse(
      { rows, total: rows.length },
      'Reporte de gasolina generado correctamente.',
    );
  }

  private buildFilters(query: GetGasolineReportQuery): GasolineReportFilters {
    const startDate = parseOptionalDate(query.startDate, 'startDate');
    const endDate = parseOptionalDate(query.endDate, 'endDate');

    if (
      startDate !== undefined &&
      endDate !== undefined &&
      startDate.getTime() > endDate.getTime()
    ) {
      throw new BadRequestException(
        'startDate no puede ser posterior a endDate.',
      );
    }

    return {
      companyId: query.companyId,
      startDate,
      endDate: endDate !== undefined ? endOfDay(endDate) : undefined,
      status: query.status,
      plate: query.plate,
    };
  }
}

function parseOptionalDate(
  value: string | undefined,
  fieldName: string,
): Date | undefined {
  if (value === undefined || value.trim().length === 0) {
    return undefined;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new BadRequestException(`${fieldName} no es una fecha válida.`);
  }
  return parsed;
}

function endOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy;
}
