import { IsString, IsNotEmpty, IsNumber, Min, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCardDto {
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.replace(/[-\s]/g, '');
    }
    return value;
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message: 'El número de tarjeta solo debe contener números',
  })
  cardNumber: string;

  @IsNumber()
  @Min(1)
  companyId: number;
}
