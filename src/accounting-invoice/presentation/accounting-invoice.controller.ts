import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtSessionGuard } from '../../auth/presentation/guards/jwt-session.guard';
import { CurrentUser } from '../../auth/presentation/decorators/current-user.decorator';
import type { AuthTokenVerifiedPayload } from '../../auth/application/interfaces/auth-token.service.interface';
import {
  ApproveTripMovementProofFinancialUseCase,
  type ApproveTripMovementProofFinancialResponse,
} from '../application/use-cases/approve-trip-movement-proof-financial.use-case';
import { ApproveTripMovementProofFinancialDto } from './dtos/approve-trip-movement-proof-financial.dto';

function usuarioPuedeAutorizarComprobacionFinanciera(
  user: AuthTokenVerifiedPayload,
): boolean {
  if (
    user.role.includes('administrador') ||
    user.role.includes('super_administrador')
  ) {
    return true;
  }
  return (
    user.iamPermissionCodes.includes('comprobacion.revisar') ||
    user.iamPermissionCodes.includes('contabilidad.autorizar')
  );
}

@ApiTags('Accounting invoice')
@ApiCookieAuth('travel_session')
@Controller('accounting-invoice')
@UseGuards(JwtSessionGuard)
export class AccountingInvoiceController {
  constructor(
    private readonly approveTripMovementProofFinancialUseCase: ApproveTripMovementProofFinancialUseCase,
  ) {}

  @Post('trip-movement-proofs/:tripMovementProofId/approve')
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Aprobar comprobación contable: crea factura de compra en SAP (Service Layer) y marca el movimiento como aprobado',
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async approveTripMovementProof(
    @Param('tripMovementProofId', ParseIntPipe) tripMovementProofId: number,
    @Body() body: ApproveTripMovementProofFinancialDto,
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<ApproveTripMovementProofFinancialResponse> {
    if (!usuarioPuedeAutorizarComprobacionFinanciera(user)) {
      throw new ForbiddenException({
        message:
          'No tienes permisos para aprobar comprobaciones financieras o enviar facturas a SAP.',
        error: 'Prohibido',
      });
    }
    return this.approveTripMovementProofFinancialUseCase.execute({
      proofId: tripMovementProofId,
      decidedByUserId: Number.parseInt(user.sub, 10),
      accountCode: body.accountCode,
      taxCode: body.taxCode,
      costingCode: body.costingCode,
      reviewerNotes: body.reviewerNotes,
      sapCardCode: body.sapCardCode,
    });
  }
}
