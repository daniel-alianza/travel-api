import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class AssignCardDto {
  @ApiProperty({
    example: '4532123456789010',
    description: 'Número completo de tarjeta para registrar asignación.',
  })
  @IsString()
  @Matches(/^\d{13,19}$/, {
    message: 'El número de tarjeta debe contener entre 13 y 19 dígitos.',
  })
  cardNumber: string;

  @ApiProperty({
    example: 'Grupo FG Industrial',
    description: 'Compañía seleccionada en frontend.',
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    example: 'VIATIC',
    enum: ['VIATIC', 'FUEL'],
    description: 'Tipo de tarjeta a asignar.',
  })
  @IsString()
  @IsIn(['VIATIC', 'FUEL'])
  cardType: 'VIATIC' | 'FUEL';

  @ApiPropertyOptional({
    example: 'Tarjeta Operaciones Norte',
    description: 'Nombre de tarjeta de gasolina para sincronización SAP.',
  })
  @IsOptional()
  @IsString()
  fuelName?: string;

  @ApiPropertyOptional({
    example: 'physical',
    enum: ['physical', 'virtual'],
    description: 'Tipo de tarjeta de gasolina.',
  })
  @IsOptional()
  @IsString()
  @IsIn(['physical', 'virtual'])
  fuelCardKind?: 'physical' | 'virtual';

  @ApiPropertyOptional({
    example: 'NotAcumulative',
    enum: ['NotAcumulative', 'Acumulable'],
    description: 'Tipo de asignación para tarjeta de gasolina.',
  })
  @IsOptional()
  @IsString()
  @IsIn(['NotAcumulative', 'Acumulable'])
  fuelAssignmentType?: 'NotAcumulative' | 'Acumulable';

  @ApiPropertyOptional({
    example: 'Tarjetas Base',
    description: 'Grupo de tarjeta de gasolina.',
  })
  @IsOptional()
  @IsString()
  fuelGroup?: string;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['active', 'inactive', 'blocked', 'cancelled'],
    description: 'Estado de tarjeta de gasolina.',
  })
  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive', 'blocked', 'cancelled'])
  fuelStatus?: 'active' | 'inactive' | 'blocked' | 'cancelled';
}
