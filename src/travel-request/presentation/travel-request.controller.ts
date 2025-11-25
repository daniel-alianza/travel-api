import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateTravelRequestInput,
  PaginationInput,
} from '../application/interfaces';
import { GetAllTravelRequestsUseCase } from '../application/use-cases/get-all-travel-requests.use-case';
import { CreateTravelRequestUseCase } from '../application/use-cases/create-travel-request.use-case';
import {
  CreateTravelRequestDto,
  PaginationDto,
} from './dtos';

@Controller('travel-requests')
export class TravelRequestController {
  constructor(
    private readonly getAllTravelRequests: GetAllTravelRequestsUseCase,
    private readonly createTravelRequest: CreateTravelRequestUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Query() dto: PaginationDto) {
    const input: PaginationInput = { ...dto };
    const travelRequests = await this.getAllTravelRequests.execute(input);

    return {
      data: travelRequests,
      message: 'Solicitudes de viaje obtenidas correctamente',
      error: null,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: CreateTravelRequestDto) {
    const input: CreateTravelRequestInput = {
      userId: dto.userId,
      statusId: dto.statusId,
      cardId: dto.cardId,
      totalAmount: dto.totalAmount,
      travelReason: dto.travelReason,
      travelObjectives: dto.travelObjectives,
      departureDate: new Date(dto.departureDate),
      returnDate: new Date(dto.returnDate),
      details: dto.details.map((detail) => ({
        concept: detail.concept,
        amount: detail.amount,
      })),
    };

    const travelRequest = await this.createTravelRequest.execute(input);

    return {
      data: {
        id: travelRequest.id,
        userId: travelRequest.userId,
        statusId: travelRequest.statusId,
        cardId: travelRequest.cardId,
        totalAmount: travelRequest.totalAmount,
        travelReason: travelRequest.travelReason,
        travelObjectives: travelRequest.travelObjectives,
        departureDate: travelRequest.departureDate,
        createdAt: travelRequest.createdAt,
        updatedAt: travelRequest.updatedAt,
      },
      message: 'Solicitud de viaje creada correctamente',
      error: null,
    };
  }
}
