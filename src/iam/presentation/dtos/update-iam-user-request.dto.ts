import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UpdateIamUserRequestDto {
  @ApiProperty({ example: 'Contabilidad Alianza' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'contabilidad@alianzaelectrica.com' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: 'Colaborador',
    description:
      'Etiqueta de rol mostrada en IAM: Super Admin, Administrador, Supervisor, Colaborador.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  roleLabel: string;

  @ApiProperty({ example: 'Contabilidad' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  areaName: string;

  @ApiProperty({ example: 'Atizapan' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  branchName: string;

  @ApiProperty({
    nullable: true,
    type: Number,
    description: 'Id del jefe directo; null para quitar asignación.',
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsInt()
  managerUserId?: number | null;
}
