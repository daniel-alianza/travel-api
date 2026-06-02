import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CancelGasolineRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  cancelledBy: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
