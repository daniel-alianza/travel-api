import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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

@ApiTags('Travel Checks')
@Controller('travel-checks')
export class TravelChecksController {
  constructor(
    private readonly listDispersedTravelChecksUseCase: ListDispersedTravelChecksUseCase,
    private readonly listExpenseDispersedTripsForUserUseCase: ListExpenseDispersedTripsForUserUseCase,
    private readonly listExpenseTripMovementsForUserUseCase: ListExpenseTripMovementsForUserUseCase,
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
  ): Promise<ListExpenseDispersedTripsForUserResponse> {
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
  ): Promise<ListExpenseTripMovementsForUserResponse> {
    return this.listExpenseTripMovementsForUserUseCase.execute(userId, tripId);
  }
}
