import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { getDaysUntilMonthEnd as computeDaysUntilMonthEnd } from './date/days-until-month-end';
import { buildSuccessResponse } from './exceptions/builders/success-response.builder';

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

@ApiTags('Common')
@Controller('common')
export class CommonController {
  constructor(private readonly configService: ConfigService) {}

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
}
