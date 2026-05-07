import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class RegisterTripFileDto {
  @ApiProperty({
    example: 'invoice',
    description: 'Tipo lógico del archivo para control de negocio.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  fileType: string;

  @ApiProperty({
    example: 'factura-marzo-2026.pdf',
    description: 'Nombre original del archivo.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fileName: string;

  @ApiProperty({
    example: 'application/pdf',
    description: 'MimeType del archivo.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  mimeType: string;

  @ApiProperty({
    example: 'user/12/trip/233/4ea84320-75f8-40d6-ad8f-53e6795307cb.pdf',
    description: 'Ruta generada para el archivo en el bucket.',
  })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({
    example: 204800,
    description: 'Tamaño del archivo en bytes para métricas de consumo.',
  })
  @IsInt()
  @IsPositive()
  fileSizeBytes: number;
}
