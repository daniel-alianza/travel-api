import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolveInclusiveDateRangeInTimeZone } from '../../../common/date/resolve-inclusive-date-range-in-time-zone';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { AuthTokenVerifiedPayload } from '../../../auth/application/interfaces/auth-token.service.interface';
import {
  usuarioPuedeConsultarIndicadoresContabilidad,
  usuarioTieneVistaConsolidada,
} from '../helpers/accounting-indicators-access.helper';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

export type AccountingMonthIndicatorsCompanyRow = {
  readonly companyId: number;
  readonly companyName: string;
  readonly totalDispersadoMes: number;
  readonly totalComprobadoMes: number;
  readonly pendienteAutorizarContable: number;
  readonly solicitudesAbiertas: number;
};

export type GetAccountingMonthIndicatorsData = {
  readonly scope: 'consolidated' | 'company';
  readonly monthLabel: string;
  readonly companies: readonly AccountingMonthIndicatorsCompanyRow[];
  readonly totals: AccountingMonthIndicatorsCompanyRow | null;
};

export type GetAccountingMonthIndicatorsResponse =
  ApiSuccessResponse<GetAccountingMonthIndicatorsData>;

function etiquetaMesActual(timeZone: string, instant: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    year: 'numeric',
    timeZone,
  }).format(instant);
}

function sumarIndicadores(
  filas: readonly AccountingMonthIndicatorsCompanyRow[],
): AccountingMonthIndicatorsCompanyRow {
  return {
    companyId: 0,
    companyName: 'Total grupo',
    totalDispersadoMes: filas.reduce((acc, f) => acc + f.totalDispersadoMes, 0),
    totalComprobadoMes: filas.reduce((acc, f) => acc + f.totalComprobadoMes, 0),
    pendienteAutorizarContable: filas.reduce(
      (acc, f) => acc + f.pendienteAutorizarContable,
      0,
    ),
    solicitudesAbiertas: filas.reduce(
      (acc, f) => acc + f.solicitudesAbiertas,
      0,
    ),
  };
}

@Injectable()
export class GetAccountingMonthIndicatorsUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    user: AuthTokenVerifiedPayload,
  ): Promise<GetAccountingMonthIndicatorsResponse> {
    if (!usuarioPuedeConsultarIndicadoresContabilidad(user)) {
      throw new ForbiddenException({
        message: 'No tienes permisos para consultar los indicadores contables.',
        error: 'Prohibido',
      });
    }

    const userId = Number.parseInt(user.sub, 10);
    if (!Number.isFinite(userId)) {
      throw new ForbiddenException({
        message: 'Sesión inválida.',
        error: 'Prohibido',
      });
    }

    const timeZone =
      this.configService.get<string>('APP_TIMEZONE') ?? 'America/Mexico_City';
    const ahora = new Date();
    const rango = resolveInclusiveDateRangeInTimeZone({
      fromInput: undefined,
      toInput: undefined,
      timeZone,
      now: ahora,
    });

    const consolidado = usuarioTieneVistaConsolidada(user);
    const contexto =
      await this.travelChecksRepository.resolveAccountingIndicatorsScope({
        userId,
        consolidated: consolidado,
      });

    if (contexto.companies.length === 0) {
      throw new NotFoundException('No se encontraron empresas para el alcance.');
    }

    const companyIds = contexto.companies.map((company) => company.id);
    const indicadores =
      await this.travelChecksRepository.getAccountingMonthIndicatorsByCompanies({
        companyIds,
        rangeStart: rango.startInstant,
        rangeEnd: rango.endInstant,
      });

    const indicadoresPorId = new Map(
      indicadores.map((row) => [row.companyId, row]),
    );

    const companies: AccountingMonthIndicatorsCompanyRow[] =
      contexto.companies.map((company) => {
        const valores = indicadoresPorId.get(company.id);
        return {
          companyId: company.id,
          companyName: company.name,
          totalDispersadoMes: valores?.totalDispersadoMes ?? 0,
          totalComprobadoMes: valores?.totalComprobadoMes ?? 0,
          pendienteAutorizarContable: valores?.pendienteAutorizarContable ?? 0,
          solicitudesAbiertas: valores?.solicitudesAbiertas ?? 0,
        };
      });

    const scope: 'consolidated' | 'company' = consolidado
      ? 'consolidated'
      : 'company';

    return buildSuccessResponse(
      {
        scope,
        monthLabel: etiquetaMesActual(timeZone, ahora),
        companies,
        totals: consolidado ? sumarIndicadores(companies) : null,
      },
      'Indicadores contables del mes obtenidos correctamente.',
    );
  }
}
