import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ChangePasswordUseCase } from '../application/use-cases/change-password.use-case';
import { GetCurrentUserProfileUseCase } from '../application/use-cases/get-current-user-profile.use-case';
import { ListManagerCandidateUsersUseCase } from '../application/use-cases/list-manager-candidate-users.use-case';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { RegisterUseCase } from '../application/use-cases/register.use-case';
import type { AuthTokenVerifiedPayload } from '../application/interfaces/auth-token.service.interface';
import { buildSuccessResponse } from '../../common/exceptions/builders/success-response.builder';
import { CurrentUser } from './decorators/current-user.decorator';
import { ChangePasswordRequestDto } from './dtos/change-password-request.dto';
import { LoginRequestDto } from './dtos/login-request.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { JwtSessionGuard } from './guards/jwt-session.guard';
import { AuthConfigService } from '../infrastructure/auth-config.service';

class LoginResponseDataDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiresInSeconds: number;

  @ApiProperty({
    description: 'Nombre del rol del usuario (coincide con el claim JWT)',
    example: 'colaborador',
  })
  role: string;

  @ApiProperty({
    type: [String],
    description:
      'Permisos IAM efectivos (rol por defecto + extras). Misma lógica que en el token.',
  })
  permisos: readonly string[];
}

class LoginHttpResponseDto {
  @ApiProperty({
    type: LoginResponseDataDto,
  })
  data: LoginResponseDataDto;

  @ApiProperty()
  message: string;
}

class RegisterResponseDataDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  branchId: number;

  @ApiProperty()
  areaId: number;
}

class RegisterHttpResponseDto {
  @ApiProperty({
    type: RegisterResponseDataDto,
  })
  data: RegisterResponseDataDto;

  @ApiProperty()
  message: string;
}

class CurrentUserProfileDataDto {
  @ApiProperty()
  nombreCompleto: string;

  @ApiProperty()
  correoElectronico: string;

  @ApiProperty()
  area: string;

  @ApiProperty({ nullable: true, type: String })
  sucursal: string | null;

  @ApiProperty()
  departamento: string;

  @ApiProperty()
  jefeDirecto: string;

  @ApiProperty()
  tieneJefeDirectoAsignado: boolean;
}

class ManagerCandidateItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombreCompleto: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  area: string;
}

class ManagerCandidatesHttpResponseDto {
  @ApiProperty({ type: [ManagerCandidateItemDto] })
  data: ManagerCandidateItemDto[];

  @ApiProperty()
  message: string;
}

class CurrentUserProfileHttpResponseDto {
  @ApiProperty({ type: CurrentUserProfileDataDto })
  data: CurrentUserProfileDataDto;

  @ApiProperty()
  message: string;
}

class ChangePasswordHttpResponseDto {
  @ApiProperty({ type: Object, nullable: true })
  data: null;

  @ApiProperty()
  message: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly authConfigService: AuthConfigService,
    private readonly getCurrentUserProfileUseCase: GetCurrentUserProfileUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly listManagerCandidateUsersUseCase: ListManagerCandidateUsersUseCase,
  ) {}

  @Get('me')
  @UseGuards(JwtSessionGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Perfil del usuario autenticado',
    description:
      'Devuelve datos laborales del usuario según su sesión (cookie JWT).',
  })
  @ApiOkResponse({
    description: 'Perfil obtenido',
    type: CurrentUserProfileHttpResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'No autenticado' })
  async getCurrentUserProfile(
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<CurrentUserProfileHttpResponseDto> {
    const userId = this.parseUserIdOrThrow(user);
    const perfil = await this.getCurrentUserProfileUseCase.execute({ userId });
    return buildSuccessResponse(perfil, 'Perfil obtenido correctamente.');
  }

  @Get('manager-candidates')
  @UseGuards(JwtSessionGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Candidatos a jefe directo',
    description:
      'Lista usuarios activos con rol administrador o lider/gerente, excluyendo al usuario de la sesión.',
  })
  @ApiOkResponse({
    description: 'Listado de candidatos',
    type: ManagerCandidatesHttpResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'No autenticado' })
  async listManagerCandidates(
    @CurrentUser() user: AuthTokenVerifiedPayload,
  ): Promise<ManagerCandidatesHttpResponseDto> {
    const userId = this.parseUserIdOrThrow(user);
    const candidatos = await this.listManagerCandidateUsersUseCase.execute({
      currentUserId: userId,
    });
    return buildSuccessResponse(
      candidatos,
      'Candidatos a jefe directo obtenidos correctamente.',
    );
  }

  @Post('change-password')
  @UseGuards(JwtSessionGuard)
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({
    summary: 'Cambiar contraseña',
    description:
      'Actualiza la contraseña del usuario autenticado tras validar la actual.',
  })
  @ApiBody({ type: ChangePasswordRequestDto })
  @ApiOkResponse({
    description: 'Contraseña actualizada',
    type: ChangePasswordHttpResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'No autenticado o contraseña actual incorrecta',
  })
  async changePassword(
    @CurrentUser() user: AuthTokenVerifiedPayload,
    @Body() body: ChangePasswordRequestDto,
  ): Promise<ChangePasswordHttpResponseDto> {
    const userId = this.parseUserIdOrThrow(user);
    await this.changePasswordUseCase.execute({
      userId,
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    });
    return buildSuccessResponse(null, 'Contraseña actualizada correctamente.');
  }

  @Post('register')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Registra un usuario nuevo en la tabla User',
  })
  @ApiBody({
    type: RegisterRequestDto,
  })
  @ApiCreatedResponse({
    description: 'Usuario registrado exitosamente',
    type: RegisterHttpResponseDto,
  })
  @ApiConflictResponse({
    description: 'El correo ya está registrado',
  })
  async register(
    @Body() requestBody: RegisterRequestDto,
  ): Promise<RegisterHttpResponseDto> {
    const registeredUser = await this.registerUseCase.execute({
      name: requestBody.name,
      email: requestBody.email,
      password: requestBody.password,
      companyId: requestBody.companyId,
      branchId: requestBody.branchId,
      areaId: requestBody.areaId,
    });

    return buildSuccessResponse(
      registeredUser,
      'Usuario registrado exitosamente',
    );
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Autentica al usuario, retorna token y setea cookie httpOnly',
  })
  @ApiBody({
    type: LoginRequestDto,
  })
  @ApiOkResponse({
    description: 'Login exitoso',
    type: LoginHttpResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciales inválidas',
  })
  async login(
    @Body() requestBody: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginHttpResponseDto> {
    const loginResult = await Promise.resolve(
      this.loginUseCase.execute({
        email: requestBody.email,
        password: requestBody.password,
      }),
    );

    const authConfig = this.authConfigService.getConfig();

    response.cookie(loginResult.cookieName, loginResult.token.accessToken, {
      httpOnly: true,
      secure: authConfig.isProduction,
      sameSite: 'lax',
      maxAge: loginResult.token.expiresInSeconds * 1000,
      path: '/',
    });

    return buildSuccessResponse(
      {
        userId: loginResult.userId,
        accessToken: loginResult.token.accessToken,
        expiresInSeconds: loginResult.token.expiresInSeconds,
        role: loginResult.role,
        permisos: loginResult.permisos,
      },
      'Login exitoso',
    );
  }

  private parseUserIdOrThrow(user: AuthTokenVerifiedPayload): number {
    const id = Number.parseInt(user.sub, 10);
    if (!Number.isFinite(id) || id < 1) {
      throw new UnauthorizedException('Sesión no válida.');
    }
    return id;
  }
}
