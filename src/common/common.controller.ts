import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import type { AuthTokenVerifiedPayload } from '../auth/application/interfaces/auth-token.service.interface';
import { CurrentUser } from '../auth/presentation/decorators/current-user.decorator';
import { JwtSessionGuard } from '../auth/presentation/guards/jwt-session.guard';
import {
  GetSalesViaticosHomeNoticeUseCase,
  type GetSalesViaticosHomeNoticeResponse,
} from './application/use-cases/get-sales-viaticos-home-notice.use-case';
import { getDaysUntilMonthEnd as computeDaysUntilMonthEnd } from './date/days-until-month-end';
import { buildSuccessResponse } from './exceptions/builders/success-response.builder';
import type { SalesViaticosHomeNoticeDto } from './sales-viaticos/sales-viaticos-home-notice.types';

class DaysUntilMonthEndDataDto {
  @ApiProperty({ example: 12 })
  daysUntilMonthEnd: number;

  @ApiProperty({ example: 'America/Mexico_City' })
  timeZone: string;
}

class DaysUntilMonthEndHttpResponseDto {
  @ApiProperty({ type: DaysUntilMonthEndDataDto })
  data: DaysUntilMonthEndDataDto;

  @ApiProperty()
  message: string;
}

class SalesViaticosHomeNoticeHttpResponseDto {
  @ApiProperty()
  data: SalesViaticosHomeNoticeDto;

  @ApiProperty()
  message: string;
}

@ApiTags('Common')
@Controller('common')
export class CommonController {
  constructor(
    private readonly configService: ConfigService,
    private readonly getSalesViaticosHomeNoticeUseCase: GetSalesViaticosHomeNoticeUseCase,
  ) {}

  @Get('days-until-month-end')
  @ApiOperation({
    summary: 'Días hasta el fin del mes (calendario)',
    description:
      'Usa la zona horaria configurada en APP_TIMEZONE (por defecto America/Mexico_City).',
  })
  @ApiOkResponse({
    description: 'Cálculo exitoso',
    type: DaysUntilMonthEndHttpResponseDto,
  })
  getDaysUntilMonthEnd(): DaysUntilMonthEndHttpResponseDto {
    const timeZone =
      this.configService.get<string>('APP_TIMEZONE') ?? 'America/Mexico_City';
    const daysUntilMonthEnd = computeDaysUntilMonthEnd(new Date(), timeZone);
    return buildSuccessResponse(
      {
        daysUntilMonthEnd,
        timeZone,
      },
      'Días hasta fin de mes calculados correctamente.',
    );
  }

  @Get('sales-viaticos-home-notice')
  @UseGuards(JwtSessionGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Aviso de calendario de viáticos (área ventas)',
    description:
      'Calcula días hábiles restantes, mensajes y pendientes según permisos IAM y horario laboral del servidor.',
  })
  @ApiOkResponse({
    description: 'Aviso calculado',
    type: SalesViaticosHomeNoticeHttpResponseDto,
  })
  getSalesViaticosHomeNotice(
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<GetSalesViaticosHomeNoticeResponse> {
    return this.getSalesViaticosHomeNoticeUseCase.execute(user);
  }
}
