import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class RequestSentNotificationDto {
  @ApiProperty({
    description: 'Correo del empleado solicitante (destinatario del aviso)',
  })
  @IsEmail()
  @IsNotEmpty()
  recipientEmail!: string;

  @ApiProperty({ description: 'Nombre del empleado solicitante' })
  @IsString()
  @IsNotEmpty()
  employeeName!: string;

  @ApiProperty({ description: 'Nombre del jefe directo' })
  @IsString()
  @IsNotEmpty()
  bossName!: string;

  @ApiProperty({ description: 'Empresa del solicitante' })
  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @ApiProperty({ description: 'Número de tarjeta corporativa' })
  @IsString()
  cardNumber!: string;

  @ApiProperty({ description: 'Folio de la solicitud' })
  @IsString()
  @IsNotEmpty()
  requestId!: string;

  @ApiProperty({ description: 'Motivo del viaje' })
  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @ApiProperty({ description: 'Destinos del viaje' })
  @IsString()
  @IsNotEmpty()
  destinos!: string;

  @ApiProperty({ description: 'Monto total estimado' })
  @IsNumber()
  @Min(0)
  totalAmount!: number;

  @ApiProperty({ description: 'Monto de gasolina solicitado' })
  @IsNumber()
  @Min(0)
  gasolinaAmount!: number;

  @ApiProperty({ description: 'Monto de TAG solicitado' })
  @IsNumber()
  @Min(0)
  tagAmount!: number;

  @ApiProperty({ description: 'Número de viajes en la solicitud' })
  @IsNumber()
  @Min(1)
  tripCount!: number;

  @ApiProperty({ description: 'URL de la aplicación' })
  @IsString()
  @IsNotEmpty()
  appUrl!: string;
}
