import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
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
import { CreateTravelRequestDto } from './dtos/create-travel-request.dto';

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
  ) {}

  @Get('form-data/:userId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Obtener datos precargados de solicitud',
  })
  @ApiOkResponse({
    description: 'Datos bloqueados para empresa/sucursal/área y tarjetas viatic del usuario.',
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
