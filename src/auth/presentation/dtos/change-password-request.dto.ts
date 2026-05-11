import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordRequestDto {
  @ApiProperty({ example: 'Actual123!' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'NuevaClaveSegura9!' })
  @IsString()
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres.',
  })
  newPassword: string;
}
