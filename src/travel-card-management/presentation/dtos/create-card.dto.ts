import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsNumber()
  @Min(1)
  companyId: number;
}

