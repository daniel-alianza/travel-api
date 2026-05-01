import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    example: 'usuario@travel.com',
  })
  email: string;

  @ApiProperty({
    example: 'Password123!',
  })
  password: string;

  constructor(payload: { email: string; password: string }) {
    this.email = payload.email;
    this.password = payload.password;
  }
}
