import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
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
import {
  SubmitTripMovementProofUseCase,
  type SubmitTripMovementProofResponse,
} from '../application/use-cases/submit-trip-movement-proof.use-case';
import {
  ValidateTripMovementInvoiceProofDraftUseCase,
  type ValidateTripMovementInvoiceProofDraftFileBuffers,
  type ValidateTripMovementInvoiceProofDraftResponse,
} from '../application/use-cases/validate-trip-movement-invoice-proof-draft.use-case';
import {
  ListViaticDistributionRulesUseCase,
  type ListViaticDistributionRulesResponse,
} from '../application/use-cases/list-viatic-distribution-rules.use-case';
import {
  GetTripMovementCfdiUseCase,
  type GetTripMovementCfdiResponse,
} from '../application/use-cases/get-trip-movement-cfdi.use-case';
import {
  GetTripMovementPdfUseCase,
  type GetTripMovementPdfResponse,
} from '../application/use-cases/get-trip-movement-pdf.use-case';
import {
  ListCompanyExpenseCatalogsUseCase,
  type ListCompanyExpenseCatalogsResponse,
} from '../application/use-cases/list-company-expense-catalogs.use-case';
import { CurrentUser } from '../../auth/presentation/decorators/current-user.decorator';
import { JwtSessionGuard } from '../../auth/presentation/guards/jwt-session.guard';
import type { AuthTokenVerifiedPayload } from '../../auth/application/interfaces/auth-token.service.interface';
import { SubmitTripMovementProofDto } from './dtos/submit-trip-movement-proof.dto';
import { memoryStorage } from 'multer';

const validateInvoiceDraftUpload = FileFieldsInterceptor(
  [
    { name: 'invoice_xml', maxCount: 1 },
    { name: 'invoice_pdf', maxCount: 1 },
    { name: 'invoice_xml_outbound', maxCount: 1 },
    { name: 'invoice_pdf_outbound', maxCount: 1 },
    { name: 'invoice_xml_return', maxCount: 1 },
    { name: 'invoice_pdf_return', maxCount: 1 },
  ],
  {
    storage: memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024 },
  },
);

type MulterMemoryFile = {
  readonly buffer: Buffer;
};

type InvoiceDraftMulterFiles = {
  readonly invoice_xml?: MulterMemoryFile[];
  readonly invoice_pdf?: MulterMemoryFile[];
  readonly invoice_xml_outbound?: MulterMemoryFile[];
  readonly invoice_pdf_outbound?: MulterMemoryFile[];
  readonly invoice_xml_return?: MulterMemoryFile[];
  readonly invoice_pdf_return?: MulterMemoryFile[];
};

function mapInvoiceDraftMulterToBuffers(
  files: InvoiceDraftMulterFiles | undefined,
): ValidateTripMovementInvoiceProofDraftFileBuffers {
  return {
    invoice_xml: pickFirstFileBuffer(files?.invoice_xml),
    invoice_pdf: pickFirstFileBuffer(files?.invoice_pdf),
    invoice_xml_outbound: pickFirstFileBuffer(files?.invoice_xml_outbound),
    invoice_pdf_outbound: pickFirstFileBuffer(files?.invoice_pdf_outbound),
    invoice_xml_return: pickFirstFileBuffer(files?.invoice_xml_return),
    invoice_pdf_return: pickFirstFileBuffer(files?.invoice_pdf_return),
  };
}

function pickFirstFileBuffer(
  fileList: MulterMemoryFile[] | undefined,
): Buffer | undefined {
  const file = fileList?.[0];
  if (file?.buffer === undefined || !Buffer.isBuffer(file.buffer)) {
    return undefined;
  }
  if (file.buffer.length === 0) {
    return undefined;
  }
  return file.buffer;
}

class DispersedTripCheckItemDto {
  @ApiProperty()
  tripId: number;

  @ApiProperty()
  tripOrder: number;

  @ApiProperty()
  motivoViaje: string;

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

  @ApiProperty()
  movimientosComprobados: number;

  @ApiProperty()
  totalComprobadoMovimientos: number;

  @ApiProperty({
    type: () => [DispersedTripCheckMovementItemDto],
  })
  movimientosComprobadosDetalle: DispersedTripCheckMovementItemDto[];
}

class DispersedTripCheckMovementItemDto {
  @ApiProperty()
  tripMovementProofId: number;

  @ApiProperty()
  movementSequence: number;

  @ApiProperty()
  movementDate: string;

  @ApiProperty()
  movementAmount: number;

  @ApiProperty({ nullable: true })
  movementMemo: string | null;

  @ApiProperty({ nullable: true })
  movementComment: string | null;

  @ApiProperty({ enum: ['submitted', 'approved', 'rejected'] })
  proofStatus: 'submitted' | 'approved' | 'rejected';

  @ApiProperty({ enum: ['ticket', 'invoice'] })
  proofType: 'ticket' | 'invoice';
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

  @ApiProperty({
    description:
      'CompanyId para catálogos contables (cuenta / IVA) y moneda SAP según la tarjeta corporativa; puede diferir de compania.id.',
  })
  expenseCatalogCompanyId: number;

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

  @ApiProperty({ enum: ['pendiente', 'comprobado'] })
  estado: 'pendiente' | 'comprobado';
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

class SubmitTripMovementProofDataDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: ['submitted'] })
  status: 'submitted';
}

class SubmitTripMovementProofHttpDto {
  @ApiProperty({ type: SubmitTripMovementProofDataDto })
  data: SubmitTripMovementProofDataDto;

  @ApiProperty()
  message: string;
}

class ViaticDistributionRuleItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  companyName: string;
}

class ListViaticDistributionRulesDataDto {
  @ApiProperty({ type: [ViaticDistributionRuleItemDto] })
  distributionRules: ViaticDistributionRuleItemDto[];
}

class ListViaticDistributionRulesHttpDto {
  @ApiProperty({ type: ListViaticDistributionRulesDataDto })
  data: ListViaticDistributionRulesDataDto;

  @ApiProperty()
  message: string;
}

class TripMovementCfdiCampoDto {
  @ApiProperty()
  campo: string;

  @ApiProperty()
  valor: string;
}

class TripMovementCfdiTrasladoDto {
  @ApiProperty()
  base: string;

  @ApiProperty()
  impuesto: string;

  @ApiProperty()
  tipoFactor: string;

  @ApiProperty()
  tasaOCuota: string;

  @ApiProperty()
  importe: string;
}

class TripMovementCfdiConceptoDto {
  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  cantidad: string;

  @ApiProperty()
  claveUnidad: string;

  @ApiProperty()
  valorUnitario: string;

  @ApiProperty()
  importe: string;

  @ApiProperty()
  objetoImp: string;

  @ApiProperty({ type: [TripMovementCfdiTrasladoDto] })
  traslados: TripMovementCfdiTrasladoDto[];
}

class GetTripMovementCfdiDataDto {
  @ApiProperty()
  movementSequence: number;

  @ApiProperty({ nullable: true })
  xmlFileName: string | null;

  @ApiProperty()
  xmlRaw: string;

  @ApiProperty({ type: Object })
  xmlJson: unknown;

  @ApiProperty({ type: [TripMovementCfdiConceptoDto] })
  conceptos: TripMovementCfdiConceptoDto[];

  @ApiProperty({ type: [TripMovementCfdiCampoDto] })
  camposXml: TripMovementCfdiCampoDto[];
}

class GetTripMovementCfdiHttpDto {
  @ApiProperty({ type: GetTripMovementCfdiDataDto })
  data: GetTripMovementCfdiDataDto;

  @ApiProperty()
  message: string;
}

class GetTripMovementPdfDataDto {
  @ApiProperty()
  movementSequence: number;

  @ApiProperty({ nullable: true })
  pdfFileName: string | null;

  @ApiProperty()
  signedUrl: string;

  @ApiProperty()
  expiresInSeconds: number;
}

class GetTripMovementPdfHttpDto {
  @ApiProperty({ type: GetTripMovementPdfDataDto })
  data: GetTripMovementPdfDataDto;

  @ApiProperty()
  message: string;
}

class CompanyExpenseCatalogItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;
}

class ListCompanyExpenseCatalogsDataDto {
  @ApiProperty()
  companyId: number;

  @ApiProperty({ type: [CompanyExpenseCatalogItemDto] })
  vatIndicators: CompanyExpenseCatalogItemDto[];

  @ApiProperty({ type: [CompanyExpenseCatalogItemDto] })
  viaticCategories: CompanyExpenseCatalogItemDto[];
}

class ListCompanyExpenseCatalogsHttpDto {
  @ApiProperty({ type: ListCompanyExpenseCatalogsDataDto })
  data: ListCompanyExpenseCatalogsDataDto;

  @ApiProperty()
  message: string;
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
    private readonly submitTripMovementProofUseCase: SubmitTripMovementProofUseCase,
    private readonly validateTripMovementInvoiceProofDraftUseCase: ValidateTripMovementInvoiceProofDraftUseCase,
    private readonly listViaticDistributionRulesUseCase: ListViaticDistributionRulesUseCase,
    private readonly getTripMovementCfdiUseCase: GetTripMovementCfdiUseCase,
    private readonly getTripMovementPdfUseCase: GetTripMovementPdfUseCase,
    private readonly listCompanyExpenseCatalogsUseCase: ListCompanyExpenseCatalogsUseCase,
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

  @Post(
    'expense-trips/:userId/trips/:tripId/movements/:movementSequence/proofs/validate-invoice-draft',
  )
  @HttpCode(200)
  @UseInterceptors(validateInvoiceDraftUpload)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary:
      'Validar factura CFDI (XML+PDF) antes de subir al almacén: fechas del viaje, UUID único y cruce PDF',
  })
  @ApiOkResponse({ description: 'Archivos válidos para continuar con la subida.' })
  async validateInvoiceProofDraft(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
    @Param('movementSequence', ParseIntPipe) movementSequence: number,
    @UploadedFiles()
    uploaded: InvoiceDraftMulterFiles | undefined,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<ValidateTripMovementInvoiceProofDraftResponse> {
    if (Number(user.sub) !== userId) {
      throw new ForbiddenException({
        message: 'No puedes validar comprobaciones de otro usuario.',
        error: 'Prohibido',
      });
    }
    const buffers = mapInvoiceDraftMulterToBuffers(uploaded);
    return this.validateTripMovementInvoiceProofDraftUseCase.execute({
      userId,
      tripId,
      movementSequence,
      files: buffers,
    });
  }

  @Post(
    'expense-trips/:userId/trips/:tripId/movements/:movementSequence/proofs',
  )
  @ApiOperation({
    summary: 'Comprobar movimiento con archivos previamente subidos',
  })
  @ApiOkResponse({ type: SubmitTripMovementProofHttpDto })
  async submitTripMovementProof(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
    @Param('movementSequence', ParseIntPipe) movementSequence: number,
    @Body() body: SubmitTripMovementProofDto,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<SubmitTripMovementProofResponse> {
    if (Number(user.sub) !== userId) {
      throw new ForbiddenException({
        message: 'No puedes comprobar movimientos de otro usuario.',
        error: 'Prohibido',
      });
    }
    return this.submitTripMovementProofUseCase.execute({
      userId,
      tripId,
      movementSequence,
      proofType: body.proofType,
      comment: body.comment ?? null,
      files: body.files,
    });
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

  @Get('distribution-rules/viatic')
  @ApiOperation({
    summary: 'Normas de reparto de viáticos',
  })
  @ApiOkResponse({ type: ListViaticDistributionRulesHttpDto })
  async listViaticDistributionRules(
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<ListViaticDistributionRulesResponse> {
    if (!user.role.includes('administrador')) {
      throw new ForbiddenException({
        message:
          'No tienes permisos para consultar normas de reparto de viáticos.',
        error: 'Prohibido',
      });
    }
    return this.listViaticDistributionRulesUseCase.execute();
  }

  @Get('trips/:tripId/movements/:movementSequence/cfdi')
  @ApiOperation({
    summary: 'Obtener y parsear XML CFDI de un movimiento comprobado',
  })
  @ApiOkResponse({ type: GetTripMovementCfdiHttpDto })
  async getTripMovementCfdi(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Param('movementSequence', ParseIntPipe) movementSequence: number,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<GetTripMovementCfdiResponse> {
    if (!user.role.includes('administrador')) {
      throw new ForbiddenException({
        message: 'No tienes permisos para consultar XML de comprobaciones.',
        error: 'Prohibido',
      });
    }
    return this.getTripMovementCfdiUseCase.execute(tripId, movementSequence);
  }

  @Get('trips/:tripId/movements/:movementSequence/pdf')
  @ApiOperation({
    summary: 'Obtener URL firmada de descarga del PDF de factura del movimiento',
  })
  @ApiOkResponse({ type: GetTripMovementPdfHttpDto })
  async getTripMovementPdf(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Param('movementSequence', ParseIntPipe) movementSequence: number,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<GetTripMovementPdfResponse> {
    if (!user.role.includes('administrador')) {
      throw new ForbiddenException({
        message: 'No tienes permisos para consultar PDF de comprobaciones.',
        error: 'Prohibido',
      });
    }
    return this.getTripMovementPdfUseCase.execute(tripId, movementSequence);
  }

  @Get('companies/:companyId/expense-catalogs')
  @ApiOperation({
    summary:
      'Obtener catálogo de categorías viáticos e indicadores de impuesto por compañía',
  })
  @ApiOkResponse({ type: ListCompanyExpenseCatalogsHttpDto })
  async listCompanyExpenseCatalogs(
    @Param('companyId', ParseIntPipe) companyId: number,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<ListCompanyExpenseCatalogsResponse> {
    if (!user.role.includes('administrador')) {
      throw new ForbiddenException({
        message: 'No tienes permisos para consultar catálogos contables.',
        error: 'Prohibido',
      });
    }
    return this.listCompanyExpenseCatalogsUseCase.execute(companyId);
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
