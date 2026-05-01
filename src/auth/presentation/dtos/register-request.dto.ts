import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'Daniel Ortiz',
  })
  name: string;

  @ApiProperty({
    example: 'daniel@travel.com',
  })
  email: string;

  @ApiProperty({
    example: 'Password123!',
  })
  password: string;

  @ApiProperty({
    example: 1,
  })
  companyId: number;

  @ApiProperty({
    example: 1,
  })
  branchId: number;

  @ApiProperty({
    example: 1,
  })
  areaId: number;

  constructor(payload: {
    name: string;
    email: string;
    password: string;
    companyId: number;
    branchId: number;
    areaId: number;
  }) {
    this.name = payload.name;
    this.email = payload.email;
    this.password = payload.password;
    this.companyId = payload.companyId;
    this.branchId = payload.branchId;
    this.areaId = payload.areaId;
  }
}
