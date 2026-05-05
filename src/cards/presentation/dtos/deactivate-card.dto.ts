import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class DeactivateCardDto {
  @ApiPropertyOptional({
    example: 12,
    description: 'Usuario que ejecuta la desactivación de tarjeta.',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  actorUserId?: number;

  @ApiProperty({
    example: 'VIATIC',
    enum: ['VIATIC', 'FUEL'],
    description: 'Tipo de tarjeta a desactivar.',
  })
  @IsString()
  @IsIn(['VIATIC', 'FUEL'])
  cardType: 'VIATIC' | 'FUEL';
}
