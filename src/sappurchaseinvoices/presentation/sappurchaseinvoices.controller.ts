import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtSessionGuard } from '../../auth/presentation/guards/jwt-session.guard';
import { CurrentUser } from '../../auth/presentation/decorators/current-user.decorator';
import type { AuthTokenVerifiedPayload } from '../../auth/application/interfaces/auth-token.service.interface';
import { CreatePurchaseInvoiceFromCfdiUseCase } from '../application/use-cases/create-purchase-invoice-from-cfdi.use-case';
import type { CreatePurchaseInvoiceFromCfdiResponse } from '../application/use-cases/create-purchase-invoice-from-cfdi.use-case';
import { CreatePurchaseInvoiceFromCfdiDto } from './dtos/create-purchase-invoice-from-cfdi.dto';
import type { CreatePurchaseInvoiceFromCfdiCommand } from '../application/interfaces/create-purchase-invoice-from-cfdi-command.interface';

function toCreatePurchaseInvoiceCommand(
  body: CreatePurchaseInvoiceFromCfdiDto,
): CreatePurchaseInvoiceFromCfdiCommand {
  return {
    companyId: body.companyId,
    sapSessionCompanyId: body.sapSessionCompanyId,
    sapCardCode: body.sapCardCode,
    accountCode: body.accountCode,
    taxCode: body.taxCode,
    costingCode: body.costingCode,
    comments: body.comments,
    xmlData: body.xmlData,
  };
}

@ApiTags('SAP facturas de compra')
@ApiCookieAuth('travel_session')
@Controller('sap/purchase-invoices')
@UseGuards(JwtSessionGuard)
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class SapPurchaseInvoicesController {
  constructor(
    private readonly createPurchaseInvoiceFromCfdiUseCase: CreatePurchaseInvoiceFromCfdiUseCase,
  ) {}

  @Post('from-cfdi')
  @ApiOperation({
    summary: 'Crear factura de compra en SAP (Service Layer) desde CFDI',
  })
  async createFromCfdi(
    @Body() body: CreatePurchaseInvoiceFromCfdiDto,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<CreatePurchaseInvoiceFromCfdiResponse> {
    const userId = Number.parseInt(user.sub, 10);
    const command = toCreatePurchaseInvoiceCommand(body);
    return this.createPurchaseInvoiceFromCfdiUseCase.execute(command, userId);
  }
}
