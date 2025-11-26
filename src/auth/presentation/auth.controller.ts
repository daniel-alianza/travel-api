import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { LoginUseCase, RefreshTokenUseCase } from '../application/use-cases';
import { LoginDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.loginUseCase.execute(loginDto);
    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'lax' : 'strict',
      path: '/',
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'lax' : 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        accessToken: result.accessToken,
      },
    });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshJwtToken(@Req() req: Request, @Res() res: Response) {
    // Debug: verificar cookies recibidas
    const allCookies = req.cookies || {};
    const refreshToken: string =
      typeof allCookies.refreshToken === 'string'
        ? allCookies.refreshToken
        : '';

    if (!refreshToken) {
      throw new UnauthorizedException('No hay refresh token');
    }

    const { accessToken } =
      await this.refreshTokenUseCase.execute(refreshToken);
    const isProd = process.env.NODE_ENV === 'production';

    // Actualizar la cookie del access_token también
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'lax' : 'strict',
      path: '/',
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: 'Token renovado correctamente',
      data: { accessToken },
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response) {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'lax' : 'strict',
      path: '/',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'lax' : 'strict',
      path: '/',
    });

    return res.json({
      success: true,
      message: 'Logout exitoso',
      data: null,
    });
  }
}
