import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AuthTokenVerifiedPayload } from '../../../auth/application/interfaces/auth-token.service.interface';
import { buildSuccessResponse } from '../../exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../exceptions/interfaces/api-success-response.interface';
import { getCalendarDatePartsInTimeZone } from '../../date/calendar-date-parts-in-time-zone';
import {
  buildSalesViaticosHomeNotice,
  resolverTipoAvisoViaticosVentas,
  esAreaVentas,
} from '../../sales-viaticos/build-sales-viaticos-home-notice';
import { contarSolicitudesPendientesAprobacion } from '../../sales-viaticos/count-pending-approval-requests';
import {
  PERMISO_VIAJES_APROBAR,
  PERMISO_VIATICOS_DISPERSAR,
} from '../../sales-viaticos/sales-viaticos-monthly-deadlines';
import type { SalesViaticosHomeNoticeDto } from '../../sales-viaticos/sales-viaticos-home-notice.types';
import type { TravelRequestRepository } from '../../../travel-request/application/interfaces/travel-request-repository.interface';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type GetSalesViaticosHomeNoticeResponse =
  ApiSuccessResponse<SalesViaticosHomeNoticeDto>;

type UserAreaRecord = {
  readonly area: { readonly name: string };
};

type PrismaUserAreaReader = {
  readonly user: {
    findFirst(args: {
      where: { id: number };
      select: { area: { select: { name: true } } };
    }): Promise<UserAreaRecord | null>;
  };
};

@Injectable()
export class GetSalesViaticosHomeNoticeUseCase {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(
    user: AuthTokenVerifiedPayload,
  ): Promise<GetSalesViaticosHomeNoticeResponse> {
    const userId = Number.parseInt(user.sub, 10);
    if (!Number.isFinite(userId)) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const timeZone =
      this.configService.get<string>('APP_TIMEZONE') ?? 'America/Mexico_City';
    const ahora = new Date();
    const calendarToday = getCalendarDatePartsInTimeZone(ahora, timeZone);
    const permisosSesion = user.iamPermissionCodes;

    const prisma = this.prismaService as unknown as PrismaUserAreaReader;
    const registro = await prisma.user.findFirst({
      where: { id: userId },
      select: { area: { select: { name: true } } },
    });

    if (registro === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const areaUsuario = registro.area.name.trim();
    const ventas = esAreaVentas(areaUsuario);
    const kind = resolverTipoAvisoViaticosVentas(permisosSesion, ventas);

    let personasPendientes: number | null = null;

    if (
      kind === 'autorizar' &&
      permisosSesion.includes(PERMISO_VIAJES_APROBAR)
    ) {
      const solicitudes =
        await this.travelRequestRepository.findApprovalRequests();
      personasPendientes = contarSolicitudesPendientesAprobacion(
        solicitudes.map((solicitud) => ({
          status: solicitud.status,
          trips: solicitud.trips.map((viaje) => ({
            tripApprovalStatus: viaje.tripApprovalStatus,
          })),
        })),
      );
    }

    if (
      kind === 'dispersar' &&
      permisosSesion.includes(PERMISO_VIATICOS_DISPERSAR)
    ) {
      const cola =
        await this.travelRequestRepository.findDispersionPendingRequests();
      personasPendientes = cola.length;
    }

    const aviso = buildSalesViaticosHomeNotice({
      permisosSesion,
      areaUsuario,
      personasPendientes,
      calendarToday,
      timeZone,
    });

    return buildSuccessResponse(
      aviso,
      'Aviso de calendario de viáticos calculado correctamente.',
    );
  }
}
