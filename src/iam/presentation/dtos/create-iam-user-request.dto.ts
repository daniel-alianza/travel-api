import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateIamUserRequestDto {
  @ApiProperty({ example: 'Daniel Ortiz' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'daniel@travel.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.',
  })
  password: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  companyId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  branchId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  areaId: number;

  @ApiPropertyOptional({
    example: 'Colaborador',
    description:
      'Etiqueta de rol: Super Admin, Administrador, Supervisor, Colaborador. Por defecto Colaborador.',
  })
  @IsOptional()
  @IsString()
  roleLabel?: string;
}
