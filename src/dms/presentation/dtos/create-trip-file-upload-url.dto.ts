import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateTripFileUploadUrlDto {
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
    example: 240350,
    description: 'Tamaño del archivo en bytes.',
  })
  @IsInt()
  @IsPositive()
  fileSizeBytes: number;
}
