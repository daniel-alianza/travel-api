import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ConfirmDispersionDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0.01, { message: 'El monto dispersado debe ser mayor a cero.' })
  dispersedTotal: number;

  @IsOptional()
  @IsString()
  comment?: string | null;
}
