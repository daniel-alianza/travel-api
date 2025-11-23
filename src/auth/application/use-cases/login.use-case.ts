import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { UserRepository } from '../interfaces';
import type { JwtAuthPort } from '../interfaces/jwt-auth.port';
import { JwtPayload, RequestUser } from 'fg-portal-auth';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: RequestUser;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('JwtAuthPort')
    private readonly jwtAuth: JwtAuthPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const userWithPermissions =
      await this.userRepository.findUserWithAppPermissions(user.id);

    if (!userWithPermissions) {
      throw new UnauthorizedException('Error al obtener permisos del usuario');
    }

    const payload: JwtPayload = {
      sub: user.id.toString(),
      name: user.name,
      lastName: user.paternalSurname,
      email: user.email,
      role: userWithPermissions.role,
      apps: userWithPermissions.apps,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.jwtAuth.signRefreshToken(payload);

    return {
      user: userWithPermissions,
      accessToken,
      refreshToken,
    };
  }
}
