import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import {
  ListDispersedTravelChecksUseCase,
  type ListDispersedTravelChecksResponse,
} from '../application/use-cases/list-dispersed-travel-checks.use-case';
import {
  ListExpenseDispersedTripsForUserUseCase,
  type ListExpenseDispersedTripsForUserResponse,
} from '../application/use-cases/list-expense-dispersed-trips-for-user.use-case';
import {
  ListExpenseTripMovementsForUserUseCase,
  type ListExpenseTripMovementsForUserResponse,
} from '../application/use-cases/list-expense-trip-movements-for-user.use-case';
import {
  RequestTravelReconciliationCodeUseCase,
  type RequestTravelReconciliationCodeResponse,
} from '../application/use-cases/request-travel-reconciliation-code.use-case';
import {
  VerifyTravelReconciliationCodeUseCase,
  type VerifyTravelReconciliationCodeResponse,
} from '../application/use-cases/verify-travel-reconciliation-code.use-case';
import {
  ListPendingTravelReconciliationsUseCase,
  type ListPendingTravelReconciliationsResponse,
} from '../application/use-cases/list-pending-travel-reconciliations.use-case';
import {
  DecideTravelReconciliationUseCase,
  type DecideTravelReconciliationResponse,
} from '../application/use-cases/decide-travel-reconciliation.use-case';
import { CurrentUser } from '../../auth/presentation/decorators/current-user.decorator';
import { JwtSessionGuard } from '../../auth/presentation/guards/jwt-session.guard';
import type { AuthTokenVerifiedPayload } from '../../auth/application/interfaces/auth-token.service.interface';
class DispersedTripCheckItemDto {
  @ApiProperty()
  tripId: number;

  @ApiProperty()
  tripOrder: number;

  @ApiProperty()
  destino: string;

  @ApiProperty()
  estadoViaje: string;

  @ApiProperty()
  fechaSalida: string;

  @ApiProperty()
  fechaRegreso: string;

  @ApiProperty()
  fechaDispersion: string;

  @ApiProperty()
  totalEstimado: number;
}

class DispersedCheckUsuarioDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  correo: string;
}

class DispersedCheckCatalogItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;
}

class DispersedTravelCheckSolicitudDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  nombreEmpleado: string;

  @ApiProperty()
  tarjetaCorporativaEnmascarada: string;

  @ApiProperty({ nullable: true })
  dispersadoEn: string | null;

  @ApiProperty({ nullable: true })
  montoDispersado: number | null;

  @ApiProperty({ type: DispersedCheckUsuarioDto })
  usuario: DispersedCheckUsuarioDto;

  @ApiProperty({ type: DispersedCheckCatalogItemDto })
  compania: DispersedCheckCatalogItemDto;

  @ApiProperty({ type: DispersedCheckCatalogItemDto })
  sucursal: DispersedCheckCatalogItemDto;

  @ApiProperty({ type: DispersedCheckCatalogItemDto })
  area: DispersedCheckCatalogItemDto;

  @ApiProperty({ type: [DispersedTripCheckItemDto] })
  viajes: DispersedTripCheckItemDto[];
}

class ListDispersedTravelChecksDataDto {
  @ApiProperty({ type: [DispersedTravelCheckSolicitudDto] })
  solicitudes: DispersedTravelCheckSolicitudDto[];
}

class ListDispersedTravelChecksHttpDto {
  @ApiProperty({ type: ListDispersedTravelChecksDataDto })
  data: ListDispersedTravelChecksDataDto;

  @ApiProperty()
  message: string;
}

class ExpenseDispersedTripItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  solicitudId: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  motivo: string;

  @ApiProperty()
  emailSolicitante: string;

  @ApiProperty()
  compania: string;

  @ApiProperty()
  montoSolicitado: number;

  @ApiProperty()
  fechaAutorizacion: string;

  @ApiProperty()
  numeroTarjeta: string;

  @ApiProperty()
  fechaSalida: string;

  @ApiProperty()
  fechaRegreso: string;

  @ApiProperty()
  pendientesComprobacion: number;
}

class ListExpenseDispersedTripsDataDto {
  @ApiProperty({ type: [ExpenseDispersedTripItemDto] })
  viajes: ExpenseDispersedTripItemDto[];
}

class ListExpenseDispersedTripsHttpDto {
  @ApiProperty({ type: ListExpenseDispersedTripsDataDto })
  data: ListExpenseDispersedTripsDataDto;

  @ApiProperty()
  message: string;
}

class ExpenseTripMovimientoItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  numeroMovimiento: number;

  @ApiProperty()
  fecha: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  numeroTarjeta: string;

  @ApiProperty()
  gasto: number;

  @ApiProperty({ enum: ['pendiente'] })
  estado: 'pendiente';
}

class ListExpenseTripMovementsDataDto {
  @ApiProperty({ type: [ExpenseTripMovimientoItemDto] })
  movimientos: ExpenseTripMovimientoItemDto[];
}

class ListExpenseTripMovementsHttpDto {
  @ApiProperty({ type: ListExpenseTripMovementsDataDto })
  data: ListExpenseTripMovementsDataDto;

  @ApiProperty()
  message: string;
}

class RequestTravelReconciliationCodeBodyDto {
  @ApiProperty()
  tripId: number;
}

class RequestTravelReconciliationCodeDataDto {
  @ApiProperty()
  reconciliationId: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  codeExpiresAt: string;

  @ApiProperty()
  remainingAttempts: number;
}

class RequestTravelReconciliationCodeHttpDto {
  @ApiProperty({ type: RequestTravelReconciliationCodeDataDto })
  data: RequestTravelReconciliationCodeDataDto;

  @ApiProperty()
  message: string;
}

class VerifyTravelReconciliationCodeBodyDto {
  @ApiProperty()
  travelRequestId: number;

  @ApiProperty()
  verificationCode: string;
}

class VerifyTravelReconciliationCodeDataDto {
  @ApiProperty()
  verified: true;
}

class VerifyTravelReconciliationCodeHttpDto {
  @ApiProperty({ type: VerifyTravelReconciliationCodeDataDto })
  data: VerifyTravelReconciliationCodeDataDto;

  @ApiProperty()
  message: string;
}

class PendingTravelReconciliationItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  travelRequestId: number;

  @ApiProperty({ enum: ['pending', 'rejected', 'approved', 'verified'] })
  status: 'pending' | 'rejected' | 'approved' | 'verified';

  @ApiProperty()
  verificationCode: string;

  @ApiProperty()
  codeExpiresAt: string;

  @ApiProperty()
  employeeName: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  requestedByName: string;

  @ApiProperty()
  requestedByEmail: string;

  @ApiProperty()
  createdAt: string;
}

class ListPendingTravelReconciliationsDataDto {
  @ApiProperty({ type: [PendingTravelReconciliationItemDto] })
  reconciliations: PendingTravelReconciliationItemDto[];
}

class ListPendingTravelReconciliationsHttpDto {
  @ApiProperty({ type: ListPendingTravelReconciliationsDataDto })
  data: ListPendingTravelReconciliationsDataDto;

  @ApiProperty()
  message: string;
}

class DecideTravelReconciliationDataDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: ['rejected'] })
  status: 'rejected';
}

class DecideTravelReconciliationHttpDto {
  @ApiProperty({ type: DecideTravelReconciliationDataDto })
  data: DecideTravelReconciliationDataDto;

  @ApiProperty()
  message: string;
}

class RejectTravelReconciliationBodyDto {
  @ApiProperty({ nullable: true })
  rejectionReason: string | null;
}

@ApiTags('Travel Checks')
@Controller('travel-checks')
@UseGuards(JwtSessionGuard)
export class TravelChecksController {
  constructor(
    private readonly listDispersedTravelChecksUseCase: ListDispersedTravelChecksUseCase,
    private readonly listExpenseDispersedTripsForUserUseCase: ListExpenseDispersedTripsForUserUseCase,
    private readonly listExpenseTripMovementsForUserUseCase: ListExpenseTripMovementsForUserUseCase,
    private readonly requestTravelReconciliationCodeUseCase: RequestTravelReconciliationCodeUseCase,
    private readonly verifyTravelReconciliationCodeUseCase: VerifyTravelReconciliationCodeUseCase,
    private readonly listPendingTravelReconciliationsUseCase: ListPendingTravelReconciliationsUseCase,
    private readonly decideTravelReconciliationUseCase: DecideTravelReconciliationUseCase,
  ) {}
  @Get('dispersed')
  @ApiOperation({
    summary:
      'Listar solicitudes dispersadas con viajes en estado dispersado (comprobaciones)',
  })
  @ApiOkResponse({ type: ListDispersedTravelChecksHttpDto })
  async listDispersed(): Promise<ListDispersedTravelChecksResponse> {
    return this.listDispersedTravelChecksUseCase.execute();
  }

  @Get('expense-trips/:userId')
  @ApiOperation({
    summary: 'Viajes dispersados del usuario para pantalla de comprobaciones',
  })
  @ApiOkResponse({ type: ListExpenseDispersedTripsHttpDto })
  async listExpenseTrips(
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<ListExpenseDispersedTripsForUserResponse> {
    if (Number(user.sub) !== userId) {
      throw new ForbiddenException({
        message: 'No puedes consultar viajes de otro usuario.',
        error: 'Prohibido',
      });
    }
    return this.listExpenseDispersedTripsForUserUseCase.execute(userId);
  }

  @Get('expense-trips/:userId/trips/:tripId/movements')
  @ApiOperation({
    summary:
      'Líneas de gasto de un viaje dispersado (movimientos para comprobación)',
  })
  @ApiOkResponse({ type: ListExpenseTripMovementsHttpDto })
  async listExpenseTripMovements(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<ListExpenseTripMovementsForUserResponse> {
    if (Number(user.sub) !== userId) {
      throw new ForbiddenException({
        message: 'No puedes consultar movimientos de otro usuario.',
        error: 'Prohibido',
      });
    }
    return this.listExpenseTripMovementsForUserUseCase.execute(userId, tripId);
  }

  @Post('reconciliations/request-code')
  @ApiOperation({
    summary: 'Solicitar código de conciliación para viaje vencido',
  })
  @ApiOkResponse({ type: RequestTravelReconciliationCodeHttpDto })
  async requestReconciliationCode(
    @Body() body: RequestTravelReconciliationCodeBodyDto,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<RequestTravelReconciliationCodeResponse> {
    return this.requestTravelReconciliationCodeUseCase.execute(
      Number(user.sub),
      body.tripId,
    );
  }

  @Post('reconciliations/verify-code')
  @ApiOperation({
    summary: 'Verificar código de conciliación',
  })
  @ApiOkResponse({ type: VerifyTravelReconciliationCodeHttpDto })
  async verifyReconciliationCode(
    @Body() body: VerifyTravelReconciliationCodeBodyDto,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<VerifyTravelReconciliationCodeResponse> {
    return this.verifyTravelReconciliationCodeUseCase.execute(
      Number(user.sub),
      body.travelRequestId,
      body.verificationCode,
    );
  }

  @Get('reconciliations/pending')
  @ApiOperation({
    summary: 'Listado de conciliaciones para contabilidad',
  })
  @ApiOkResponse({ type: ListPendingTravelReconciliationsHttpDto })
  async listPendingReconciliations(
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<ListPendingTravelReconciliationsResponse> {
    if (!user.role.includes('administrador')) {
      throw new ForbiddenException({
        message: 'No tienes permisos para consultar conciliaciones pendientes.',
        error: 'Prohibido',
      });
    }
    return this.listPendingTravelReconciliationsUseCase.execute();
  }

  @Post('reconciliations/:reconciliationId/reject')
  @ApiOperation({
    summary: 'Rechazar conciliación',
  })
  @ApiOkResponse({ type: DecideTravelReconciliationHttpDto })
  async rejectReconciliation(
    @Param('reconciliationId', ParseIntPipe) reconciliationId: number,
    @Body() body: RejectTravelReconciliationBodyDto,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<DecideTravelReconciliationResponse> {
    if (!user.role.includes('administrador')) {
      throw new ForbiddenException({
        message: 'No tienes permisos para decidir conciliaciones.',
        error: 'Prohibido',
      });
    }
    return this.decideTravelReconciliationUseCase.execute({
      reconciliationId,
      decidedByUserId: Number(user.sub),
      rejectionReason: body.rejectionReason,
    });
  }
}
