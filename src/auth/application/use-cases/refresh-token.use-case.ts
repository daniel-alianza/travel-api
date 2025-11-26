import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'fg-portal-auth';
import type { JwtAuthPort } from '../interfaces/jwt-auth.port';
import type { UserRepository } from '../interfaces';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('JwtAuthPort') private readonly jwt: JwtAuthPort,
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload: JwtPayload =
        await this.jwt.verifyRefreshToken(refreshToken);

      const userId = Number(payload.sub);
      const user = await this.userRepo.findUserByEmail(payload.email);

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Usuario inactivo');
      }

      const userWithPermissions =
        await this.userRepo.findUserWithAppPermissions(userId);

      if (!userWithPermissions) {
        throw new UnauthorizedException(
          'Error al obtener permisos del usuario',
        );
      }

      const newPayload: JwtPayload = {
        sub: payload.sub,
        name: payload.name,
        lastName: payload.lastName,
        email: payload.email,
        role: userWithPermissions.role,
        apps: userWithPermissions.apps,
      };

      const accessToken = await this.jwt.sign(newPayload);
      return { accessToken };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
}
