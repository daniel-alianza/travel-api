import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import { buildErrorResponse } from '../builders/error-response.builder';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const responseBody = exception.getResponse();

    if (typeof responseBody === 'string') {
      response
        .status(status)
        .json(buildErrorResponse(responseBody, responseBody));
      return;
    }

    const normalized =
      responseBody !== null && typeof responseBody === 'object'
        ? (responseBody as Record<string, unknown>)
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
  }
}
