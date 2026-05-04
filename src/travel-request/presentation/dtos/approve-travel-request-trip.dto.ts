import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ApproveTravelRequestTripDto {
  @IsOptional()
  @IsString()
  @MaxLength(8000)
  comment?: string;
}
