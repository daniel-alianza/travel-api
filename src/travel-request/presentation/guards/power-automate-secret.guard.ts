import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PowerAutomateSecretGuard implements CanActivate {
  private readonly logger = new Logger(PowerAutomateSecretGuard.name);

  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      headers: Record<string, string | string[] | undefined>;
      body?: unknown;
    }>();

    this.logger.log(
      `Petición PA recibida: ${request.method} ${request.url}`,
    );

    const expectedSecret = this.configService.get<string>('RESPONSE_FOR_TEAMS');

    if (expectedSecret === undefined || expectedSecret.trim().length === 0) {
      this.logger.error(
        'RESPONSE_FOR_TEAMS no está configurado en variables de entorno.',
      );
      throw new UnauthorizedException(
        'Integración con Power Automate no configurada.',
      );
    }

    const providedSecret = request.headers['x-pa-secret'];

    if (typeof providedSecret !== 'string' || providedSecret.length === 0) {
      this.logger.warn(
        'Petición PA rechazada: header x-pa-secret ausente o vacío.',
      );
      throw new UnauthorizedException('Secret de Power Automate no proporcionado.');
    }

    if (providedSecret !== expectedSecret) {
      this.logger.warn(
        `Petición PA rechazada: x-pa-secret inválido (longitud recibida=${providedSecret.length}).`,
      );
      throw new UnauthorizedException('Secret de Power Automate inválido.');
    }

    const bodyPreview =
      request.body !== null &&
      typeof request.body === 'object' &&
      !Array.isArray(request.body)
        ? JSON.stringify(request.body)
        : String(request.body);

    this.logger.log(`Body PA recibido: ${bodyPreview}`);
    this.logger.log('Autenticación PA OK (x-pa-secret válido).');

    return true;
  }
}
