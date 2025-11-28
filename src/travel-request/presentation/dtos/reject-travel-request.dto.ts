import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class RejectTravelRequestDto {
  @IsNumber()
  approverId: number;

  @IsNumber()
  rejectedStatusId: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  comment?: string;
}

