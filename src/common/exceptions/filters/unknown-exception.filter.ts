import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { buildErrorResponse } from '../builders/error-response.builder';

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnknownExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const normalized =
        exceptionResponse !== null && typeof exceptionResponse === 'object'
          ? (exceptionResponse as Record<string, unknown>)
          : {};
      const rawMessage = normalized.message;
      const message =
        typeof rawMessage === 'string'
          ? rawMessage
          : Array.isArray(rawMessage)
            ? rawMessage.join(', ')
            : exception.message || 'Ocurrió un error en la solicitud.';
      const errorDetail = normalized.error ?? rawMessage ?? message;

      response.status(status).json(buildErrorResponse(message, errorDetail));
      return;
    }

    const errorMessage =
      exception instanceof Error
        ? exception.message
        : 'Error interno no controlado.';

    this.logger.error(
      errorMessage,
      exception instanceof Error ? exception.stack : '',
    );

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        buildErrorResponse(
          'Ocurrió un error interno en el servidor.',
          errorMessage,
        ),
      );
  }
}
