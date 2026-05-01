import { Module } from '@nestjs/common';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { AuthConfigService } from './infrastructure/auth-config.service';
import { HmacJwtService } from './infrastructure/jwt/hmac-jwt.service';
import { AuthController } from './presentation/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [
    AuthConfigService,
    LoginUseCase,
    RegisterUseCase,
    {
      provide: 'AUTH_CONFIG',
      inject: [AuthConfigService],
      useFactory: (authConfigService: AuthConfigService) =>
        authConfigService.getConfig(),
    },
    {
      provide: 'AUTH_TOKEN_SERVICE',
      useClass: HmacJwtService,
    },
  ],
})
export class AuthModule {}
