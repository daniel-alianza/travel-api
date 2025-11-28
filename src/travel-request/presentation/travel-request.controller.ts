import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTravelRequestInput } from '../application/interfaces';
import {
  GetAllTravelRequestsUseCase,
  CreateTravelRequestUseCase,
  ApproveTravelRequestUseCase,
  RejectTravelRequestUseCase,
  GetDisbursementsUseCase,
} from '../application/use-cases';
import {
  CreateTravelRequestDto,
  PaginationDto,
  ApproveTravelRequestDto,
  RejectTravelRequestDto,
  DisbursementAuditDto,
} from './dtos';

@Controller('travel-requests')
export class TravelRequestController {
  constructor(
    private readonly getAllTravelRequests: GetAllTravelRequestsUseCase,
    private readonly createTravelRequest: CreateTravelRequestUseCase,
    private readonly approveTravelRequest: ApproveTravelRequestUseCase,
    private readonly rejectTravelRequest: RejectTravelRequestUseCase,
    private readonly getDisbursementsUseCase: GetDisbursementsUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Query() dto: PaginationDto) {
    const result = await this.getAllTravelRequests.execute(dto);

    return {
      data: result.data,
      pagination: {
        total: result.total,
        limit: result.limit,
        offset: result.offset,
        totalPages: Math.ceil(result.total / result.limit),
        currentPage: Math.floor(result.offset / result.limit) + 1,
      },
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

  @Patch(':id/approve')
  @UseGuards(AuthGuard('jwt'))
  async approve(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ApproveTravelRequestDto,
  ) {
    const travelRequest = await this.approveTravelRequest.execute({
      id,
      approverId: dto.approverId,
      approvedStatusId: dto.approvedStatusId,
      comment: dto.comment,
    });

    return {
      data: travelRequest,
      message: 'Solicitud de viaje aprobada correctamente',
      error: null,
    };
  }

  @Patch(':id/reject')
  @UseGuards(AuthGuard('jwt'))
  async reject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RejectTravelRequestDto,
  ) {
    const travelRequest = await this.rejectTravelRequest.execute({
      id,
      approverId: dto.approverId,
      rejectedStatusId: dto.rejectedStatusId,
      comment: dto.comment,
    });

    return {
      data: travelRequest,
      message: 'Solicitud de viaje rechazada correctamente',
      error: null,
    };
  }

  @Get('disbursements')
  @UseGuards(AuthGuard('jwt'))
  async getDisbursements(@Query() dto: PaginationDto) {
    const disbursements = await this.getDisbursementsUseCase.execute(dto);

    const auditData: DisbursementAuditDto[] = disbursements.map((tr) => ({
      requesterName: `${tr.user.name} ${tr.user.paternalSurname} ${tr.user.maternalSurname}`.trim(),
      requesterEmail: tr.user.email,
      cardNumber: tr.card.cardNumber,
      travelReason: tr.travelReason,
      travelObjectives: tr.travelObjectives,
      disbursementDate: tr.disbursementDate!,
      disburserName: tr.disburser?.name || '',
      disburserEmail: tr.disburser?.email || '',
    }));

    return {
      data: auditData,
      message: 'Auditoría de dispersiones obtenida correctamente',
      error: null,
    };
  }
}
