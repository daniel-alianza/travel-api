import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

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
}
