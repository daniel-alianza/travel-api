import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  paternalSurname: string;

  @IsString()
  @IsNotEmpty()
  maternalSurname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @Min(1)
  companyId: number;

  @IsNumber()
  @Min(1)
  branchId: number;

  @IsNumber()
  @Min(1)
  areaId: number;

  @IsNumber()
  @Min(1)
  roleId: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  supervisorId?: number;
}

