import { Module } from '@nestjs/common';
import { ChangePasswordUseCase } from './application/use-cases/change-password.use-case';
import { GetCurrentUserProfileUseCase } from './application/use-cases/get-current-user-profile.use-case';
import { ListManagerCandidateUsersUseCase } from './application/use-cases/list-manager-candidate-users.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { AuthConfigService } from './infrastructure/auth-config.service';
import { HmacJwtService } from './infrastructure/jwt/hmac-jwt.service';
import { AuthController } from './presentation/auth.controller';
import { JwtSessionGuard } from './presentation/guards/jwt-session.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthConfigService,
    LoginUseCase,
    RegisterUseCase,
    GetCurrentUserProfileUseCase,
    ChangePasswordUseCase,
    ListManagerCandidateUsersUseCase,
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
    JwtSessionGuard,
  ],
  exports: ['AUTH_TOKEN_SERVICE', AuthConfigService, JwtSessionGuard],
})
export class AuthModule {}
