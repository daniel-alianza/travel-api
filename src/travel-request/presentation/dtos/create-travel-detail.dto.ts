import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTravelDetailDto {
  @IsString()
  @IsNotEmpty()
  concept: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
