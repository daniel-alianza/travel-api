import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DisburseGasolineRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  disbursedBy: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  downPaymentDocEntry: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
