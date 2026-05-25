import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolveInclusiveDateRangeInTimeZone } from '../../../common/date/resolve-inclusive-date-range-in-time-zone';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';
import {
  buildDispersionReportExcelBuffer,
  mapDispersedRequestToReportRow,
} from '../../infrastructure/dispersion-report-excel.builder';

export type ExportDispersionReportCommand = {
  readonly from?: string;
  readonly to?: string;
};

export type ExportDispersionReportResult = {
  readonly buffer: Buffer;
  readonly fileName: string;
  readonly fromIso: string;
  readonly toIso: string;
};

@Injectable()
export class ExportDispersionReportUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    command: ExportDispersionReportCommand,
  ): Promise<ExportDispersionReportResult> {
    const timeZone =
      this.configService.get<string>('APP_TIMEZONE') ?? 'America/Mexico_City';

    let rango: ReturnType<typeof resolveInclusiveDateRangeInTimeZone>;
    try {
      rango = resolveInclusiveDateRangeInTimeZone({
        fromInput: command.from,
        toInput: command.to,
        timeZone,
      });
    } catch (error) {
      const mensaje =
        error instanceof Error ? error.message : 'Rango de fechas inválido.';
      throw new BadRequestException(mensaje);
    }

    const solicitudes =
      await this.travelRequestRepository.findDispersedRequestsInDateRange({
        dispersedFrom: rango.startInstant,
        dispersedTo: rango.endInstant,
      });

    const filas = solicitudes.map((solicitud) =>
      mapDispersedRequestToReportRow(solicitud),
    );
    const buffer = await buildDispersionReportExcelBuffer(filas);
    const fileName = `reporte-dispersion-viaticos_${rango.fromIso}_${rango.toIso}.xlsx`;

    return {
      buffer,
      fileName,
      fromIso: rango.fromIso,
      toIso: rango.toIso,
    };
  }
}
