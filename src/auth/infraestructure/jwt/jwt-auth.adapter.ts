import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'fg-portal-auth';
import { JwtAuthPort } from '../../application/interfaces/jwt-auth.port';

@Injectable()
export class JwtAuthAdapter implements JwtAuthPort {
  constructor(private readonly jwt: JwtService) {}

  async sign(payload: JwtPayload): Promise<string> {
    return this.jwt.signAsync(payload);
  }

  async verify(token: string): Promise<any> {
    return this.jwt.verifyAsync(token);
  }

  async signRefreshToken(payload: JwtPayload): Promise<string> {
    return this.jwt.signAsync(payload, { expiresIn: '7d' });
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwt.verifyAsync(token);
  }
}
