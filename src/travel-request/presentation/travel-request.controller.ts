import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTravelRequestUseCase,
  type CreateTravelRequestResponse,
} from '../application/use-cases/create-travel-request.use-case';
import {
  GetTravelRequestFormDataUseCase,
  type GetTravelRequestFormDataResponse,
} from '../application/use-cases/get-travel-request-form-data.use-case';
import {
  GetUserFuelCardsUseCase,
  type GetUserFuelCardsResponse,
} from '../application/use-cases/get-user-fuel-cards.use-case';
import {
  GetApprovalRequestsUseCase,
  type GetApprovalRequestsResponse,
} from '../application/use-cases/get-approval-requests.use-case';
import {
  GetApprovalFilterCatalogUseCase,
  type GetApprovalFilterCatalogResponse,
} from '../application/use-cases/get-approval-filter-catalog.use-case';
import {
  GetDispersionQueueUseCase,
  type GetDispersionQueueResponse,
} from '../application/use-cases/get-dispersion-queue.use-case';
import {
  ConfirmTravelRequestDispersionUseCase,
  type ConfirmTravelRequestDispersionResponse,
} from '../application/use-cases/confirm-travel-request-dispersion.use-case';
import {
  ResolveTravelRequestTripUseCase,
  type ResolveTravelRequestTripResponse,
} from '../application/use-cases/resolve-travel-request-trip.use-case';
import {
  GetMyTravelRequestsUseCase,
  type GetMyTravelRequestsResponse,
} from '../application/use-cases/get-my-travel-requests.use-case';
import {
  GetTravelRequestDetailForUserUseCase,
  type GetTravelRequestDetailForUserResponse,
} from '../application/use-cases/get-travel-request-detail-for-user.use-case';
import {
  CorrectRejectedTravelRequestTripUseCase,
  type CorrectRejectedTravelRequestTripResponse,
} from '../application/use-cases/correct-rejected-travel-request-trip.use-case';
import { ApproveTravelRequestTripDto } from './dtos/approve-travel-request-trip.dto';
import {
  CorrectTravelRequestTripDto,
  CreateTravelRequestDto,
} from './dtos/create-travel-request.dto';
import { RejectTravelRequestTripDto } from './dtos/reject-travel-request-trip.dto';
import { ConfirmDispersionDto } from './dtos/confirm-dispersion.dto';

type TravelRequestPoliciesResponse = {
  readonly data: {
    readonly notices: readonly {
      readonly id: string;
      readonly text: string;
      readonly color: 'red';
      readonly buttonLabel: string | null;
      readonly actionUrl: string | null;
    }[];
    readonly foodPolicy: {
      readonly eventCost: number;
      readonly events: readonly string[];
      readonly ivaRate: number;
      readonly tipRate: number;
      readonly appliesToAreas: readonly string[];
    };
    readonly carRentPolicy: {
      readonly recommendedPerDay: number;
      readonly note: string;
    };
    readonly taxiPolicy: {
      readonly note: string;
    };
  };
  readonly message: string;
};

@ApiTags('Travel Request')
@Controller('travel-request')
export class TravelRequestController {
  constructor(
    private readonly createTravelRequestUseCase: CreateTravelRequestUseCase,
    private readonly getTravelRequestFormDataUseCase: GetTravelRequestFormDataUseCase,
    private readonly getUserFuelCardsUseCase: GetUserFuelCardsUseCase,
    private readonly getApprovalRequestsUseCase: GetApprovalRequestsUseCase,
    private readonly getApprovalFilterCatalogUseCase: GetApprovalFilterCatalogUseCase,
    private readonly getDispersionQueueUseCase: GetDispersionQueueUseCase,
    private readonly confirmTravelRequestDispersionUseCase: ConfirmTravelRequestDispersionUseCase,
    private readonly resolveTravelRequestTripUseCase: ResolveTravelRequestTripUseCase,
    private readonly getMyTravelRequestsUseCase: GetMyTravelRequestsUseCase,
    private readonly getTravelRequestDetailForUserUseCase: GetTravelRequestDetailForUserUseCase,
    private readonly correctRejectedTravelRequestTripUseCase: CorrectRejectedTravelRequestTripUseCase,
  ) {}

  @Get('form-data/:userId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Obtener datos precargados de solicitud',
  })
  @ApiOkResponse({
    description:
      'Datos bloqueados para empresa/sucursal/área y tarjetas viatic del usuario.',
  })
  async getFormData(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<GetTravelRequestFormDataResponse> {
    return this.getTravelRequestFormDataUseCase.execute(userId);
  }

  @Get('fuel-cards/:userId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Obtener tarjetas fuel activas del usuario',
  })
  @ApiOkResponse({
    description: 'Tarjetas fuel para mostrar en select de gasolina.',
  })
  async getUserFuelCards(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<GetUserFuelCardsResponse> {
    return this.getUserFuelCardsUseCase.execute(userId);
  }

  @Get('solicitudes-propias/:userId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Listar solicitudes de viaje del usuario',
  })
  @ApiOkResponse({
    description: 'Solicitudes del colaborador con estado por viaje.',
  })
  async getSolicitudesPropias(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<GetMyTravelRequestsResponse> {
    return this.getMyTravelRequestsUseCase.execute(userId);
  }

  @Get('solicitud/:travelRequestId/usuario/:userId/detalle')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Obtener detalle de una solicitud del usuario (para corrección)',
  })
  @ApiOkResponse({
    description: 'Solicitud con viajes y montos para precargar el formulario.',
  })
  async getSolicitudDetalleParaUsuario(
    @Param('travelRequestId', ParseIntPipe) travelRequestId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<GetTravelRequestDetailForUserResponse> {
    return this.getTravelRequestDetailForUserUseCase.execute(
      travelRequestId,
      userId,
    );
  }

  @Get('approval-list')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Listar solicitudes para aprobación',
  })
  @ApiOkResponse({
    description:
      'Listado de solicitudes con viajes y conceptos para pantalla de aprobación.',
  })
  async getApprovalList(): Promise<GetApprovalRequestsResponse> {
    return this.getApprovalRequestsUseCase.execute();
  }

  @Get('approval-filter-catalog')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Obtener catálogo de filtros de aprobación',
  })
  @ApiOkResponse({
    description: 'Áreas y empresas disponibles para filtros.',
  })
  async getApprovalFilterCatalog(): Promise<GetApprovalFilterCatalogResponse> {
    return this.getApprovalFilterCatalogUseCase.execute();
  }

  @Get('dispersion-queue')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Listar solicitudes aprobadas pendientes de dispersión',
  })
  @ApiOkResponse({
    description: 'Solicitudes con estado aprobado listas para dispersar.',
  })
  async getDispersionQueue(): Promise<GetDispersionQueueResponse> {
    return this.getDispersionQueueUseCase.execute();
  }

  @Patch(':travelRequestId/disperse')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Confirmar dispersión de una solicitud aprobada',
  })
  @ApiBody({ type: ConfirmDispersionDto })
  @ApiOkResponse({
    description: 'La solicitud y sus viajes aprobados pasan a dispersado.',
  })
  async confirmDispersion(
    @Param('travelRequestId', ParseIntPipe) travelRequestId: number,
    @Body() requestBody: ConfirmDispersionDto,
  ): Promise<ConfirmTravelRequestDispersionResponse> {
    return this.confirmTravelRequestDispersionUseCase.execute({
      travelRequestId,
      dispersedTotal: requestBody.dispersedTotal,
      comment: requestBody.comment ?? null,
    });
  }

  @Patch('trips/:tripId/approve')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Aprobar un viaje pendiente',
  })
  @ApiBody({ type: ApproveTravelRequestTripDto, required: false })
  @ApiOkResponse({
    description:
      'El viaje pasa a aprobado y se recalcula el estado de la solicitud.',
  })
  async approveTrip(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() requestBody?: ApproveTravelRequestTripDto,
  ): Promise<ResolveTravelRequestTripResponse> {
    return this.resolveTravelRequestTripUseCase.execute({
      tripId,
      resolution: 'approve',
      comment: requestBody?.comment ?? null,
    });
  }

  @Patch('trips/:tripId/reject')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Rechazar un viaje pendiente',
  })
  @ApiBody({ type: RejectTravelRequestTripDto })
  @ApiOkResponse({
    description:
      'El viaje pasa a rechazado con comentario y la solicitud puede quedar en corrección.',
  })
  async rejectTrip(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() requestBody: RejectTravelRequestTripDto,
  ): Promise<ResolveTravelRequestTripResponse> {
    return this.resolveTravelRequestTripUseCase.execute({
      tripId,
      resolution: 'reject',
      comment: requestBody.comment,
    });
  }

  @Patch('viajes/:tripId/corregir')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @ApiOperation({
    summary: 'Corregir un viaje rechazado y reenviarlo a revisión',
  })
  @ApiBody({ type: CorrectTravelRequestTripDto })
  @ApiOkResponse({
    description:
      'El viaje queda pendiente y se recalcula el estado de la solicitud.',
  })
  async corregirViajeRechazado(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() requestBody: CorrectTravelRequestTripDto,
  ): Promise<CorrectRejectedTravelRequestTripResponse> {
    return this.correctRejectedTravelRequestTripUseCase.execute({
      userId: requestBody.userId,
      tripId,
      trip: {
        destinoViaje: requestBody.trip.destinoViaje,
        motivoViaje: requestBody.trip.motivoViaje,
        fechaSalida: requestBody.trip.fechaSalida,
        fechaRegreso: requestBody.trip.fechaRegreso,
        fechaDispersion: requestBody.trip.fechaDispersion,
        gastos: {
          transporte: requestBody.trip.gastos.transporte,
          peajes: requestBody.trip.gastos.peajes,
          hospedaje: requestBody.trip.gastos.hospedaje,
          alimentos: requestBody.trip.gastos.alimentos,
          fletes: requestBody.trip.gastos.fletes,
          herramientas: requestBody.trip.gastos.herramientas,
          envios: requestBody.trip.gastos.envios,
          miscelaneos: requestBody.trip.gastos.miscelaneos,
        },
        objetivos: requestBody.trip.objetivos,
        gasolina: {
          necesitaGasolina: requestBody.trip.gasolina.necesitaGasolina,
          cardId: requestBody.trip.gasolina.cardId,
          placa: requestBody.trip.gasolina.placa,
          kilometrajeActualKm: requestBody.trip.gasolina.kilometrajeActualKm,
          montoSolicitado: requestBody.trip.gasolina.montoSolicitado,
          distanciaKm: requestBody.trip.gasolina.distanciaKm,
          comentarios: requestBody.trip.gasolina.comentarios,
        },
        tag: {
          necesitaTag: requestBody.trip.tag.necesitaTag,
          montoSolicitado: requestBody.trip.tag.montoSolicitado,
          comentarios: requestBody.trip.tag.comentarios,
        },
      },
    });
  }

  @Get('policies')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Obtener políticas de solicitud de viaje',
  })
  @ApiOkResponse({
    description: 'Políticas para renderizar mensajes y ayudas en frontend.',
  })
  getPolicies(): TravelRequestPoliciesResponse {
    return {
      data: {
        notices: [
          {
            id: 'hospedaje-onfly',
            text: 'Hospedaje: revisar en Onfly.',
            color: 'red',
            buttonLabel: 'Ir',
            actionUrl: null,
          },
          {
            id: 'vuelo-onfly',
            text: 'Vuelo: revisar en Onfly.',
            color: 'red',
            buttonLabel: 'Ir',
            actionUrl: null,
          },
          {
            id: 'alimentos-politica',
            text: 'Alimentos: 250 por evento (desayuno, comida, cena) + IVA + 10% propina para ventas y administración.',
            color: 'red',
            buttonLabel: null,
            actionUrl: null,
          },
          {
            id: 'renta-autos-politica',
            text: 'Renta de autos: 850 por día (puede variar, política base 850).',
            color: 'red',
            buttonLabel: null,
            actionUrl: null,
          },
          {
            id: 'taxis-exactos',
            text: 'Taxis: registrar montos exactos y justificados.',
            color: 'red',
            buttonLabel: null,
            actionUrl: null,
          },
        ],
        foodPolicy: {
          eventCost: 250,
          events: ['desayuno', 'comida', 'cena'],
          ivaRate: 0.16,
          tipRate: 0.1,
          appliesToAreas: ['ventas', 'administración'],
        },
        carRentPolicy: {
          recommendedPerDay: 850,
          note: 'Se puede superar en casos justificados, pero la política base es 850 por día.',
        },
        taxiPolicy: {
          note: 'Registrar monto exacto del servicio de taxi.',
        },
      },
      message: 'Políticas cargadas correctamente.',
    };
  }

  @Post()
  @HttpCode(201)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @ApiOperation({
    summary: 'Crear solicitud de viaje',
  })
  @ApiBody({
    type: CreateTravelRequestDto,
  })
  @ApiCreatedResponse({
    description: 'Solicitud creada con cálculos de políticas desde API.',
  })
  async create(
    @Body() requestBody: CreateTravelRequestDto,
  ): Promise<CreateTravelRequestResponse> {
    return this.createTravelRequestUseCase.execute({
      userId: requestBody.userId,
      companyId: requestBody.companyId,
      branchId: requestBody.branchId,
      areaId: requestBody.areaId,
      employeeName: requestBody.employeeName,
      corporateCardNumber: requestBody.corporateCardNumber,
      trips: requestBody.trips.map((trip) => ({
        destinoViaje: trip.destinoViaje,
        motivoViaje: trip.motivoViaje,
        fechaSalida: trip.fechaSalida,
        fechaRegreso: trip.fechaRegreso,
        fechaDispersion: trip.fechaDispersion,
        gastos: {
          transporte: trip.gastos.transporte,
          peajes: trip.gastos.peajes,
          hospedaje: trip.gastos.hospedaje,
          alimentos: trip.gastos.alimentos,
          fletes: trip.gastos.fletes,
          herramientas: trip.gastos.herramientas,
          envios: trip.gastos.envios,
          miscelaneos: trip.gastos.miscelaneos,
        },
        objetivos: trip.objetivos,
        gasolina: {
          necesitaGasolina: trip.gasolina.necesitaGasolina,
          cardId: trip.gasolina.cardId,
          placa: trip.gasolina.placa,
          kilometrajeActualKm: trip.gasolina.kilometrajeActualKm,
          montoSolicitado: trip.gasolina.montoSolicitado,
          distanciaKm: trip.gasolina.distanciaKm,
          comentarios: trip.gasolina.comentarios,
        },
        tag: {
          necesitaTag: trip.tag.necesitaTag,
          montoSolicitado: trip.tag.montoSolicitado,
          comentarios: trip.tag.comentarios,
        },
      })),
    });
  }
}
