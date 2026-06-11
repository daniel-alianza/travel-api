import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  Validate,
  ValidateIf,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
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

function toExpenseNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  return 0;
}

@ValidatorConstraint({ name: 'estimatedExpensesAtLeastOne', async: false })
class EstimatedExpensesAtLeastOneConstraint implements ValidatorConstraintInterface {
  validate(gastos: TravelRequestExpensesDto): boolean {
    if (!gastos || typeof gastos !== 'object') {
      return false;
    }
    const total =
      toExpenseNumber(gastos.transporte) +
      toExpenseNumber(gastos.peajes) +
      toExpenseNumber(gastos.hospedaje) +
      toExpenseNumber(gastos.alimentos) +
      toExpenseNumber(gastos.fletes) +
      toExpenseNumber(gastos.herramientas) +
      toExpenseNumber(gastos.envios) +
      toExpenseNumber(gastos.miscelaneos);
    return total > 0;
  }

  defaultMessage(): string {
    return 'Debe registrar al menos un gasto estimado mayor a cero.';
  }
}

class TravelRequestGasolineDto {
  @IsBoolean()
  necesitaGasolina: boolean;

  @ValidateIf((gasoline: TravelRequestGasolineDto) => gasoline.necesitaGasolina)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  cardId: number | null;

  @ValidateIf((gasoline: TravelRequestGasolineDto) => gasoline.necesitaGasolina)
  @IsString()
  @IsNotEmpty()
  placa: string | null;

  @ValidateIf((gasoline: TravelRequestGasolineDto) => gasoline.necesitaGasolina)
  @Type(() => Number)
  @IsInt()
  @Min(0)
  kilometrajeActualKm: number | null;

  @ValidateIf((gasoline: TravelRequestGasolineDto) => gasoline.necesitaGasolina)
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  montoSolicitado: number | null;

  @ValidateIf((gasoline: TravelRequestGasolineDto) => gasoline.necesitaGasolina)
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  distanciaKm: number | null;

  @IsOptional()
  @IsString()
  comentarios: string | null;

  @ValidateIf((gasoline: TravelRequestGasolineDto) => gasoline.necesitaGasolina)
  @IsOptional()
  @IsString()
  fotoOdometroBase64: string | null;
}

class TravelRequestTagDto {
  @IsBoolean()
  necesitaTag: boolean;

  @ValidateIf((tag: TravelRequestTagDto) => tag.necesitaTag)
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
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

  @Validate(EstimatedExpensesAtLeastOneConstraint)
  @ValidateNested()
  @Type(() => TravelRequestExpensesDto)
  gastos: TravelRequestExpensesDto;

  @IsArray()
  @ArrayMinSize(3)
  @IsString({ each: true })
  @MinLength(1, { each: true })
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

export class CorrectTravelRequestTripDto {
  @Type(() => Number)
  @IsInt()
  userId: number;

  @ValidateNested()
  @Type(() => TravelRequestTripDto)
  trip: TravelRequestTripDto;
}
