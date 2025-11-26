import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  paternalSurname?: string;

  @IsOptional()
  maternalSurname?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  companyId?: number;

  @IsOptional()
  branchId?: number;

  @IsOptional()
  areaId?: number;

  @IsOptional()
  roleId?: number;

  @IsOptional()
  supervisorId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
