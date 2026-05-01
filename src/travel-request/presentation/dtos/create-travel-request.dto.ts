import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class TravelRequestExpensesDto {
  @Type(() => Number)
  @Min(0)
  transporte: number;

  @Type(() => Number)
  @Min(0)
  peajes: number;

  @Type(() => Number)
  @Min(0)
  hospedaje: number;

  @Type(() => Number)
  @Min(0)
  alimentos: number;

  @Type(() => Number)
  @Min(0)
  fletes: number;

  @Type(() => Number)
  @Min(0)
  herramientas: number;

  @Type(() => Number)
  @Min(0)
  envios: number;

  @Type(() => Number)
  @Min(0)
  miscelaneos: number;
}

class TravelRequestGasolineDto {
  @IsBoolean()
  necesitaGasolina: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cardId: number | null;

  @IsOptional()
  @IsString()
  placa: string | null;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  kilometrajeActualKm: number | null;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  montoSolicitado: number | null;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  distanciaKm: number | null;

  @IsOptional()
  @IsString()
  comentarios: string | null;
}

class TravelRequestTagDto {
  @IsBoolean()
  necesitaTag: boolean;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  montoSolicitado: number | null;

  @IsOptional()
  @IsString()
  comentarios: string | null;
}

class TravelRequestTripDto {
  @IsString()
  @IsNotEmpty()
  destinoViaje: string;

  @IsString()
  @IsNotEmpty()
  motivoViaje: string;

  @IsDateString()
  fechaSalida: string;

  @IsDateString()
  fechaRegreso: string;

  @IsDateString()
  fechaDispersion: string;

  @ValidateNested()
  @Type(() => TravelRequestExpensesDto)
  gastos: TravelRequestExpensesDto;

  @IsArray()
  @IsString({ each: true })
  objetivos: string[];

  @ValidateNested()
  @Type(() => TravelRequestGasolineDto)
  gasolina: TravelRequestGasolineDto;

  @ValidateNested()
  @Type(() => TravelRequestTagDto)
  tag: TravelRequestTagDto;
}

export class CreateTravelRequestDto {
  @Type(() => Number)
  @IsInt()
  userId: number;

  @Type(() => Number)
  @IsInt()
  companyId: number;

  @Type(() => Number)
  @IsInt()
  branchId: number;

  @Type(() => Number)
  @IsInt()
  areaId: number;

  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @IsOptional()
  @IsString()
  corporateCardNumber: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TravelRequestTripDto)
  trips: TravelRequestTripDto[];
}
