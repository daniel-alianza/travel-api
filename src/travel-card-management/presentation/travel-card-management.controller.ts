import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateCardInput,
  UpdateCardInput,
  AssignCardInput,
} from '../application/interfaces/card.repository';
import { GetAllCardsUseCase } from '../application/use-cases/get-all-cards.use-case';
import { GetCardByIdUseCase } from '../application/use-cases/get-card-by-id.use-case';
import { CreateCardUseCase } from '../application/use-cases/create-card.use-case';
import { UpdateCardUseCase } from '../application/use-cases/update-card.use-case';
import { AssignCardUseCase } from '../application/use-cases/assign-card.use-case';
import { UnassignCardUseCase } from '../application/use-cases/unassign-card.use-case';
import { GetAssignmentsByCardIdUseCase } from '../application/use-cases/get-assignments-by-card-id.use-case';
import { GetAssignmentsByUserIdsUseCase } from '../application/use-cases/get-assignments-by-user-ids.use-case';
import { GetCardsByCompanyIdUseCase } from '../application/use-cases/get-cards-by-company-id.use-case';
import {
  CreateCardDto,
  UpdateCardDto,
  AssignCardDto,
  PaginationDto,
  BulkAssignmentsQueryDto,
} from './dtos';
import { PaginationInput } from '../application/interfaces/pagination.input';

@Controller('cards')
export class TravelCardManagementController {
  constructor(
    private readonly createCard: CreateCardUseCase,
    private readonly getAllCards: GetAllCardsUseCase,
    private readonly getCardById: GetCardByIdUseCase,
    private readonly updateCard: UpdateCardUseCase,
    private readonly assignCard: AssignCardUseCase,
    private readonly unassignCard: UnassignCardUseCase,
    private readonly getAssignmentsByCardId: GetAssignmentsByCardIdUseCase,
    private readonly getAssignmentsByUserIds: GetAssignmentsByUserIdsUseCase,
    private readonly getCardsByCompanyId: GetCardsByCompanyIdUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Query() dto: PaginationDto) {
    const input: PaginationInput = { ...dto };
    const cards = await this.getAllCards.execute(input);

    return {
      data: cards,
      message: 'Tarjetas obtenidas correctamente',
      error: null,
    };
  }

  @Get('company/:companyId')
  @UseGuards(AuthGuard('jwt'))
  async getByCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Query() dto: PaginationDto,
  ) {
    const input: PaginationInput = { ...dto };
    const cards = await this.getCardsByCompanyId.execute(companyId, input);

    return {
      data: cards,
      message: 'Tarjetas obtenidas correctamente',
      error: null,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const card = await this.getCardById.execute(id);

    return {
      data: card,
      message: 'Tarjeta obtenida correctamente',
      error: null,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: CreateCardDto) {
    const input: CreateCardInput = { ...dto };
    const card = await this.createCard.execute(input);

    return {
      data: card,
      message: 'Tarjeta creada correctamente',
      error: null,
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCardDto,
  ) {
    const input: UpdateCardInput = { ...dto };
    const card = await this.updateCard.execute(id, input);

    return {
      data: card,
      message: 'Tarjeta actualizada correctamente',
      error: null,
    };
  }

  @Post('assign')
  @UseGuards(AuthGuard('jwt'))
  async assign(@Body() dto: AssignCardDto) {
    const input: AssignCardInput = { ...dto };
    const assignment = await this.assignCard.execute(input);

    return {
      data: assignment,
      message: 'Tarjeta asignada correctamente',
      error: null,
    };
  }

  @Post('unassign')
  @UseGuards(AuthGuard('jwt'))
  async unassign(@Body() dto: AssignCardDto) {
    await this.unassignCard.execute(dto.cardId, dto.userId);

    return {
      data: null,
      message: 'Tarjeta desasignada correctamente',
      error: null,
    };
  }

  @Get(':id/assignments')
  @UseGuards(AuthGuard('jwt'))
  async getAssignmentsByCard(
    @Param('id', ParseIntPipe) cardId: number,
    @Query() dto: PaginationDto,
  ) {
    const input: PaginationInput = { ...dto };
    const assignments = await this.getAssignmentsByCardId.execute(
      cardId,
      input,
    );

    return {
      data: assignments,
      message: 'Asignaciones obtenidas correctamente',
      error: null,
    };
  }

  @Get('assignments/bulk')
  @UseGuards(AuthGuard('jwt'))
  async getAssignmentsByUsers(@Query() dto: BulkAssignmentsQueryDto) {
    const input: PaginationInput = {
      limit: dto.limit ?? 10,
      offset: dto.offset ?? 0,
    };
    const assignments = await this.getAssignmentsByUserIds.execute(
      dto.userIds,
      input,
    );

    return {
      data: assignments,
      message: 'Asignaciones obtenidas correctamente',
      error: null,
    };
  }
}

