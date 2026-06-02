import {
  BadRequestException,
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
import type {
  AccountingExpensesReconciliationSolicitudRecord,
  TravelChecksRepository,
} from '../interfaces/travel-checks-repository.interface';

export type AccountingExpensesReconciliationEstadoSolicitud =
  | 'sin_comprobacion'
  | 'parcial'
  | 'completa'
  | 'excedente';

export type AccountingExpensesReconciliationSolicitudRow = {
  readonly solicitudId: number;
  readonly folio: string;
  readonly companyId: number;
  readonly companyName: string;
  readonly userId: number;
  readonly employeeName: string;
  readonly employeeEmail: string;
  readonly dispersedAt: string;
  readonly ultimaComprobacionAt: string | null;
  readonly totalSolicitado: number;
  readonly totalComprobado: number;
  readonly pendientePorComprobar: number;
  readonly pendienteAutorizarContable: number;
  readonly porcentajeComprobado: number;
  readonly movimientosComprobados: number;
  readonly movimientosPendientes: number;
  readonly estado: AccountingExpensesReconciliationEstadoSolicitud;
  readonly comprobacionesPorDia: readonly {
    readonly fechaIso: string;
    readonly monto: number;
  }[];
};

export type GetAccountingExpensesReconciliationData = {
  readonly scope: 'consolidated' | 'company';
  readonly periodLabel: string;
  readonly fromIso: string;
  readonly toIso: string;
  readonly companies: readonly {
    readonly id: number;
    readonly nombre: string;
  }[];
  readonly users: readonly {
    readonly id: number;
    readonly nombre: string;
    readonly correo: string;
    readonly companyId: number;
  }[];
  readonly solicitudes: readonly AccountingExpensesReconciliationSolicitudRow[];
};

export type GetAccountingExpensesReconciliationResponse =
  ApiSuccessResponse<GetAccountingExpensesReconciliationData>;

export type GetAccountingExpensesReconciliationCommand = {
  readonly from?: string;
  readonly to?: string;
};

function resolverEstadoSolicitud(
  solicitado: number,
  comprobado: number,
): AccountingExpensesReconciliationEstadoSolicitud {
  if (comprobado <= 0) {
    return 'sin_comprobacion';
  }
  if (comprobado > solicitado) {
    return 'excedente';
  }
  if (comprobado >= solicitado * 0.98) {
    return 'completa';
  }
  return 'parcial';
}

function construirFolio(
  travelRequestId: number,
  dispersedAt: Date,
  timeZone: string,
): string {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
  }).formatToParts(dispersedAt);
  const yearPart = partes.find((p) => p.type === 'year')?.value ?? '0000';
  return `VT-${yearPart}-${String(travelRequestId).padStart(5, '0')}`;
}

function mapearSolicitud(
  row: AccountingExpensesReconciliationSolicitudRecord,
  timeZone: string,
): AccountingExpensesReconciliationSolicitudRow {
  const totalSolicitado = row.dispersedTotal;
  const totalComprobado = row.totalComprobado;
  const pendientePorComprobar = Math.max(0, totalSolicitado - totalComprobado);
  const porcentajeComprobado =
    totalSolicitado > 0
      ? Math.min(100, (totalComprobado / totalSolicitado) * 100)
      : totalComprobado > 0
        ? 100
        : 0;

  return {
    solicitudId: row.travelRequestId,
    folio: construirFolio(row.travelRequestId, row.dispersedAt, timeZone),
    companyId: row.companyId,
    companyName: row.companyName,
    userId: row.userId,
    employeeName: row.employeeName,
    employeeEmail: row.employeeEmail,
    dispersedAt: row.dispersedAt.toISOString(),
    ultimaComprobacionAt: row.ultimaComprobacionAt?.toISOString() ?? null,
    totalSolicitado,
    totalComprobado,
    pendientePorComprobar,
    pendienteAutorizarContable: row.pendienteAutorizarContable,
    porcentajeComprobado,
    movimientosComprobados: row.movimientosComprobados,
    movimientosPendientes: row.movimientosPendientes,
    estado: resolverEstadoSolicitud(totalSolicitado, totalComprobado),
    comprobacionesPorDia: row.comprobacionesPorDia,
  };
}

function etiquetaPeriodo(
  timeZone: string,
  fromIso: string,
  toIso: string,
): string {
  if (fromIso === toIso) {
    return new Intl.DateTimeFormat('es-MX', {
      dateStyle: 'long',
      timeZone,
    }).format(new Date(`${fromIso}T12:00:00.000Z`));
  }
  const desde = new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone,
  }).format(new Date(`${fromIso}T12:00:00.000Z`));
  const hasta = new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone,
  }).format(new Date(`${toIso}T12:00:00.000Z`));
  return `${desde} – ${hasta}`;
}

@Injectable()
export class GetAccountingExpensesReconciliationUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    user: AuthTokenVerifiedPayload,
    command: GetAccountingExpensesReconciliationCommand,
  ): Promise<GetAccountingExpensesReconciliationResponse> {
    if (!usuarioPuedeConsultarIndicadoresContabilidad(user)) {
      throw new ForbiddenException({
        message: 'No tienes permisos para consultar la conciliación contable.',
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
    const datos =
      await this.travelChecksRepository.findAccountingExpensesReconciliation({
        companyIds,
        rangeStart: rango.startInstant,
        rangeEnd: rango.endInstant,
        timeZone,
      });

    const scope: 'consolidated' | 'company' = consolidado
      ? 'consolidated'
      : 'company';

    return buildSuccessResponse(
      {
        scope,
        periodLabel: etiquetaPeriodo(timeZone, rango.fromIso, rango.toIso),
        fromIso: rango.fromIso,
        toIso: rango.toIso,
        companies: contexto.companies.map((company) => ({
          id: company.id,
          nombre: company.name,
        })),
        users: datos.users.map((usuario) => ({
          id: usuario.id,
          nombre: usuario.name,
          correo: usuario.email,
          companyId: usuario.companyId,
        })),
        solicitudes: datos.solicitudes.map((solicitud) =>
          mapearSolicitud(solicitud, timeZone),
        ),
      },
      'Conciliación comprobado vs solicitado obtenida correctamente.',
    );
  }
}
