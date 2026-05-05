import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class DeactivateCardDto {
  @ApiProperty({
    example: 'VIATIC',
    enum: ['VIATIC', 'FUEL'],
    description: 'Tipo de tarjeta a desactivar.',
  })
  @IsString()
  @IsIn(['VIATIC', 'FUEL'])
  cardType: 'VIATIC' | 'FUEL';
}
