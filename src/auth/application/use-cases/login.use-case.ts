import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import type { AuthConfig } from '../interfaces/auth-config.interface';
import type {
  AuthTokenResult,
  AuthTokenService,
} from '../interfaces/auth-token.service.interface';

export type LoginCommand = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: AuthTokenResult;
  cookieName: string;
  userId: number;
};

type AuthUserRecord = {
  id: number;
  email: string;
  password: string;
};

type PrismaUserReader = {
  user: {
    findFirst(args: {
      where: { email: string };
    }): Promise<AuthUserRecord | null>;
  };
};

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('AUTH_CONFIG') private readonly authConfig: AuthConfig,
    @Inject('AUTH_TOKEN_SERVICE')
    private readonly authTokenService: AuthTokenService,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponse> {
    const normalizedEmail = command.email.trim().toLowerCase();
    const prismaUserReader = this.prismaService as unknown as PrismaUserReader;
    const user = await prismaUserReader.user.findFirst({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user || !(await this.isEqual(command.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.authTokenService.signAccessToken({
      sub: user.id.toString(),
      email: normalizedEmail,
      role: 'user',
    });

    return {
      token,
      cookieName: this.authConfig.jwtCookieName,
      userId: user.id,
    };
  }

  private async isEqual(input: string, expected: string): Promise<boolean> {
    if (this.isBcryptHash(expected)) {
      return compare(input, expected);
    }

    const inputBuffer = Buffer.from(input, 'utf-8');
    const expectedBuffer = Buffer.from(expected, 'utf-8');

    if (inputBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(inputBuffer, expectedBuffer);
  }

  private isBcryptHash(value: string): boolean {
    return value.startsWith('$2a$') || value.startsWith('$2b$');
  }
}
