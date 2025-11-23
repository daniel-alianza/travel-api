import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { PrismaModule } from '../infraestructure/prisma/prisma.module';
import { AuthController } from './presentation';
import {
  LoginUseCase,
  ValidateUserUseCase,
  RefreshTokenUseCase,
} from './application/use-cases';
import { PrismaUserRepository } from './infraestructure/repositories';
import { JwtStrategy, JwtAuthAdapter } from './infraestructure/jwt';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const expiresIn = (configService.get<string>('JWT_EXPIRES_IN') ||
          '2h') as StringValue;
        return {
          secret: configService.get<string>('JWT_SECRET') || 'default-secret',
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaUserRepository,
    LoginUseCase,
    ValidateUserUseCase,
    RefreshTokenUseCase,
    JwtStrategy,
    JwtAuthAdapter,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: 'JwtAuthPort',
      useExisting: JwtAuthAdapter,
    },
  ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
