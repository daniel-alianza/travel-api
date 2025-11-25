import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTravelDetailDto } from './create-travel-detail.dto';

export class CreateTravelRequestDto {
  @IsNumber()
  @Min(1)
  userId: number;

  @IsNumber()
  @Min(1)
  statusId: number;

  @IsNumber()
  @Min(1)
  cardId: number;

  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsString()
  @IsNotEmpty()
  travelReason: string;

  @IsString()
  @IsNotEmpty()
  travelObjectives: string;

  @IsDateString()
  departureDate: string;

  @IsDateString()
  returnDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTravelDetailDto)
  details: CreateTravelDetailDto[];
}

