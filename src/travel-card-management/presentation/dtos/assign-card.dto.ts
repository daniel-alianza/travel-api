import {
  IsNumber,
  Min,
} from 'class-validator';

export class AssignCardDto {
  @IsNumber()
  @Min(1)
  cardId: number;

  @IsNumber()
  @Min(1)
  userId: number;
}

