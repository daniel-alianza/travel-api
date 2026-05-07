import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiProperty,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { RegisterUseCase } from '../application/use-cases/register.use-case';
import { buildSuccessResponse } from '../../common/exceptions/builders/success-response.builder';
import { LoginRequestDto } from './dtos/login-request.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { AuthConfigService } from '../infrastructure/auth-config.service';

class LoginResponseDataDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiresInSeconds: number;
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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly authConfigService: AuthConfigService,
  ) {}

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
      },
      'Login exitoso',
    );
  }
}
