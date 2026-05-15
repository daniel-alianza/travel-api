import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class ValidateTripFoodExpenseDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'El área debe ser un identificador numérico.' })
  @Min(1, { message: 'El área es obligatoria.' })
  areaId: number;

  @IsString({ message: 'La fecha de salida es obligatoria.' })
  fechaSalida: string;

  @IsString({ message: 'La fecha de regreso es obligatoria.' })
  fechaRegreso: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'El monto de alimentos debe ser numérico.' })
  @Min(0, { message: 'El monto de alimentos no puede ser negativo.' })
  alimentos: number;
}
