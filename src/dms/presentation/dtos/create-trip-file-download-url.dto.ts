import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateTripFileDownloadUrlDto {
  @ApiProperty({
    example: 145,
    description: 'Identificador del archivo a descargar.',
  })
  @IsInt()
  @IsPositive()
  fileId: number;
}
