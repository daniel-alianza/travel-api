import {
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  cardNumber?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

