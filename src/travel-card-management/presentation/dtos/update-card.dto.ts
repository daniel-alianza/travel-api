import { IsString, IsOptional, IsBoolean, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCardDto {
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.replace(/[-\s]/g, '');
    }
    return value;
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/, {
    message: 'El número de tarjeta solo debe contener números',
  })
  cardNumber?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
