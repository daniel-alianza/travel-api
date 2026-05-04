import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RejectTravelRequestTripDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(8000)
  comment: string;
}
