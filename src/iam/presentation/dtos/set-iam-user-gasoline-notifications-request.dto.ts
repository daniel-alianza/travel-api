import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SetIamUserGasolineNotificationsRequestDto {
  @ApiProperty({
    description:
      'Puede aprobar o rechazar solicitudes de gasolina como tesorería (cualquier pendiente).',
  })
  @IsBoolean()
  treasuryApprover: boolean;

  @ApiProperty({
    description:
      'Recibe notificaciones de cola de dispersión de gasolina (cuando aplica el flujo de correos).',
  })
  @IsBoolean()
  dispersalNotify: boolean;
}
