import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
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
