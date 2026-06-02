import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/presentation/decorators/current-user.decorator';
import type { AuthTokenVerifiedPayload } from '../../auth/application/interfaces/auth-token.service.interface';
import { JwtSessionGuard } from '../../auth/presentation/guards/jwt-session.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApproveGasolineRequestUseCase,
  type ApproveGasolineRequestResponse,
} from '../application/use-cases/approve-gasoline-request.use-case';
import {
  CancelApprovedGasolineRequestUseCase,
  type CancelApprovedGasolineRequestResponse,
} from '../application/use-cases/cancel-approved-gasoline-request.use-case';
import {
  CreateGasolineRequestUseCase,
  type CreateGasolineRequestResponse,
} from '../application/use-cases/create-gasoline-request.use-case';
import {
  DisburseGasolineRequestUseCase,
  type DisburseGasolineRequestResponse,
} from '../application/use-cases/disburse-gasoline-request.use-case';
import {
  GetGasolineApprovalContextUseCase,
  type GetGasolineApprovalContextResponse,
} from '../application/use-cases/get-gasoline-approval-context.use-case';
import {
  GetGasolineReportUseCase,
  type GetGasolineReportResponse,
} from '../application/use-cases/get-gasoline-report.use-case';
import {
  GetGasolineRequestByIdUseCase,
  type GetGasolineRequestByIdResponse,
} from '../application/use-cases/get-gasoline-request-by-id.use-case';
import {
  GetGasolineRequestHistoryUseCase,
  type GetGasolineRequestHistoryResponse,
} from '../application/use-cases/get-gasoline-request-history.use-case';
import {
  ListApprovedGasolineRequestsUseCase,
  type ListApprovedGasolineRequestsResponse,
} from '../application/use-cases/list-approved-gasoline-requests.use-case';
import {
  ListGasolineAnticiposUseCase,
  type ListGasolineAnticiposResponse,
} from '../application/use-cases/list-gasoline-anticipos.use-case';
import {
  ListPendingGasolineRequestsUseCase,
  type ListPendingGasolineRequestsResponse,
} from '../application/use-cases/list-pending-gasoline-requests.use-case';
import {
  RejectGasolineRequestUseCase,
  type RejectGasolineRequestResponse,
} from '../application/use-cases/reject-gasoline-request.use-case';
import {
  ListGasolineCardsUseCase,
  type ListGasolineCardsResponse,
} from '../application/use-cases/list-gasoline-cards.use-case';
import {
  SearchGasolineCardsUseCase,
  type SearchGasolineCardsResponse,
} from '../application/use-cases/search-gasoline-cards.use-case';
import { ApproveGasolineRequestDto } from './dtos/approve-gasoline-request.dto';
import { CancelGasolineRequestDto } from './dtos/cancel-gasoline-request.dto';
import { CreateGasolineRequestDto } from './dtos/create-gasoline-request.dto';
import { DisburseGasolineRequestDto } from './dtos/disburse-gasoline-request.dto';
import { RejectGasolineRequestDto } from './dtos/reject-gasoline-request.dto';

@ApiTags('Gasoline')
@Controller('gasoline')
@UseGuards(JwtSessionGuard)
export class GasolineController {
  constructor(
    private readonly getGasolineApprovalContextUseCase: GetGasolineApprovalContextUseCase,
    private readonly getGasolineReportUseCase: GetGasolineReportUseCase,
    private readonly listGasolineCardsUseCase: ListGasolineCardsUseCase,
    private readonly searchGasolineCardsUseCase: SearchGasolineCardsUseCase,
    private readonly createGasolineRequestUseCase: CreateGasolineRequestUseCase,
    private readonly approveGasolineRequestUseCase: ApproveGasolineRequestUseCase,
    private readonly rejectGasolineRequestUseCase: RejectGasolineRequestUseCase,
    private readonly cancelApprovedGasolineRequestUseCase: CancelApprovedGasolineRequestUseCase,
    private readonly disburseGasolineRequestUseCase: DisburseGasolineRequestUseCase,
    private readonly listPendingGasolineRequestsUseCase: ListPendingGasolineRequestsUseCase,
    private readonly listApprovedGasolineRequestsUseCase: ListApprovedGasolineRequestsUseCase,
    private readonly getGasolineRequestHistoryUseCase: GetGasolineRequestHistoryUseCase,
    private readonly getGasolineRequestByIdUseCase: GetGasolineRequestByIdUseCase,
    private readonly listGasolineAnticiposUseCase: ListGasolineAnticiposUseCase,
  ) {}

  @Get('approval-context/me')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Contexto de autorización de gasolina del usuario en sesión',
  })
  async getApprovalContextForCurrentUser(
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<GetGasolineApprovalContextResponse> {
    const userId = Number.parseInt(user.sub, 10);
    if (!Number.isFinite(userId) || userId < 1) {
      throw new BadRequestException('Sesión no válida.');
    }
    return this.getGasolineApprovalContextUseCase.execute(userId);
  }

  @Get('reports')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reporte analítico de solicitudes de gasolina' })
  @ApiQuery({ name: 'companyId', required: false, type: Number })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['pending', 'approved', 'rejected', 'dispersed'],
  })
  @ApiQuery({ name: 'plate', required: false, type: String })
  async getReport(
    @Query('companyId') companyIdRaw?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('status') status?: string,
    @Query('plate') plate?: string,
  ): Promise<GetGasolineReportResponse> {
    const validStatuses = [
      'pending',
      'approved',
      'rejected',
      'dispersed',
    ] as const;
    let parsedStatus: (typeof validStatuses)[number] | undefined;
    if (status !== undefined && status.trim().length > 0) {
      if (!validStatuses.includes(status as (typeof validStatuses)[number])) {
        throw new BadRequestException('status no es válido.');
      }
      parsedStatus = status as (typeof validStatuses)[number];
    }

    return this.getGasolineReportUseCase.execute({
      companyId: parseOptionalInt(companyIdRaw),
      startDate,
      endDate,
      status: parsedStatus,
      plate,
    });
  }

  @Get('cards')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Listar tarjetas de gasolina de la empresa (catálogo local)',
  })
  @ApiQuery({ name: 'companyId', required: true, type: Number })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Filtrar por nombre o últimos dígitos del número',
  })
  async listCards(
    @Query('companyId', ParseIntPipe) companyId: number,
    @Query('q') q?: string,
  ): Promise<ListGasolineCardsResponse> {
    return this.listGasolineCardsUseCase.execute({ companyId, q });
  }

  @Get('cards/search')
  @HttpCode(200)
  @ApiOperation({ summary: 'Buscar tarjetas de gasolina en SAP Service Layer' })
  @ApiQuery({ name: 'companyId', required: true, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: Number })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiOkResponse({ description: 'Tarjetas activas en SAP.' })
  async searchCards(
    @Query('companyId', ParseIntPipe) companyId: number,
    @Query('branchId') branchIdRaw?: string,
    @Query('q') q?: string,
  ): Promise<SearchGasolineCardsResponse> {
    let branchId: number | undefined;
    if (branchIdRaw !== undefined && branchIdRaw.trim().length > 0) {
      branchId = Number.parseInt(branchIdRaw, 10);
      if (Number.isNaN(branchId)) {
        throw new BadRequestException('branchId debe ser un número entero.');
      }
    }

    return this.searchGasolineCardsUseCase.execute({
      companyId,
      branchId,
      q,
    });
  }

  @Post('requests')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('odometerPhoto'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Crear solicitud de gasolina' })
  @ApiBody({ type: CreateGasolineRequestDto })
  async createRequest(
    @Body() dto: CreateGasolineRequestDto,
    @UploadedFile() file: { readonly buffer: Buffer },
  ): Promise<CreateGasolineRequestResponse> {
    if (file === undefined) {
      throw new BadRequestException('La fotografía del odómetro es requerida.');
    }

    if (
      dto.cardId === undefined &&
      (dto.sapCode === undefined || dto.sapCode.trim().length === 0)
    ) {
      throw new BadRequestException(
        'Debes indicar cardId o sapCode de la tarjeta.',
      );
    }

    return this.createGasolineRequestUseCase.execute({
      userId: dto.userId,
      companyId: dto.companyId,
      branchId: dto.branchId,
      areaId: dto.areaId,
      cardId: dto.cardId,
      sapCode: dto.sapCode,
      plate: dto.plate,
      currentMileageKm: dto.currentMileageKm,
      requestedAmount: dto.requestedAmount,
      distanceKm: dto.distanceKm,
      routeToTake: dto.routeToTake,
      applicantComments: dto.applicantComments,
      odometerPhoto: Buffer.from(file.buffer),
    });
  }

  @Get('requests/pending')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar solicitudes de gasolina pendientes' })
  async getPendingRequests(
    @Query('companyId') companyIdRaw?: string,
    @Query('roleId') roleIdRaw?: string,
    @Query('userId') userIdRaw?: string,
  ): Promise<ListPendingGasolineRequestsResponse> {
    return this.listPendingGasolineRequestsUseCase.execute({
      companyId: parseOptionalInt(companyIdRaw),
      roleId: parseOptionalInt(roleIdRaw),
      managerUserId: parseOptionalInt(userIdRaw),
    });
  }

  @Get('requests/approved')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar solicitudes de gasolina aprobadas' })
  async getApprovedRequests(
    @Query('companyId') companyIdRaw?: string,
  ): Promise<ListApprovedGasolineRequestsResponse> {
    return this.listApprovedGasolineRequestsUseCase.execute(
      parseOptionalInt(companyIdRaw),
    );
  }

  @Get('requests/history/:userId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Historial de solicitudes de gasolina por usuario' })
  async getRequestHistory(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<GetGasolineRequestHistoryResponse> {
    return this.getGasolineRequestHistoryUseCase.execute(userId);
  }

  @Get('requests/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Detalle de solicitud de gasolina' })
  async getRequestById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetGasolineRequestByIdResponse> {
    return this.getGasolineRequestByIdUseCase.execute(id);
  }

  @Post('requests/:id/approve')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async approveRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ApproveGasolineRequestDto,
  ): Promise<ApproveGasolineRequestResponse> {
    return this.approveGasolineRequestUseCase.execute({
      requestId: id,
      approverId: dto.approverId,
      comment: dto.comment,
    });
  }

  @Post('requests/:id/reject')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async rejectRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RejectGasolineRequestDto,
  ): Promise<RejectGasolineRequestResponse> {
    return this.rejectGasolineRequestUseCase.execute({
      requestId: id,
      approverId: dto.approverId,
      comment: dto.comment,
    });
  }

  @Post('requests/:id/cancel')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async cancelRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CancelGasolineRequestDto,
  ): Promise<CancelApprovedGasolineRequestResponse> {
    return this.cancelApprovedGasolineRequestUseCase.execute({
      requestId: id,
      cancelledById: dto.cancelledBy,
      comment: dto.comment,
    });
  }

  @Post('requests/:id/disburse')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async disburseRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DisburseGasolineRequestDto,
  ): Promise<DisburseGasolineRequestResponse> {
    return this.disburseGasolineRequestUseCase.execute({
      requestId: id,
      disbursedById: dto.disbursedBy,
      downPaymentDocEntry: dto.downPaymentDocEntry,
      comment: dto.comment,
    });
  }

  @Get('anticipos')
  @HttpCode(200)
  @ApiOperation({ summary: 'Consultar anticipos SAP para gasolina' })
  async getAnticipos(
    @Query('companyId', ParseIntPipe) companyId: number,
  ): Promise<ListGasolineAnticiposResponse> {
    return this.listGasolineAnticiposUseCase.execute(companyId);
  }
}

function parseOptionalInt(value: string | undefined): number | undefined {
  if (value === undefined || value.trim().length === 0) {
    return undefined;
  }
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new BadRequestException('Parámetro numérico inválido.');
  }
  return parsed;
}
