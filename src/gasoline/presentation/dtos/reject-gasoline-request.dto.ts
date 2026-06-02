import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RejectGasolineRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  approverId: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
