import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class ApproveTravelRequestDto {
  @IsNumber()
  approverId: number;

  @IsNumber()
  approvedStatusId: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  comment?: string;
}

