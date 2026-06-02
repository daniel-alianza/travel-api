import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateGasolineRequestDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  branchId?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  areaId?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  cardId?: number;

  @IsString()
  @IsOptional()
  sapCode?: string;

  @IsString()
  @IsNotEmpty()
  plate: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  currentMileageKm: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  requestedAmount: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  distanceKm: number;

  @IsString()
  @IsNotEmpty()
  routeToTake: string;

  @IsString()
  @IsOptional()
  applicantComments?: string;
}
