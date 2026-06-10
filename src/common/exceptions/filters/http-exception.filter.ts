import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { buildErrorResponse } from '../builders/error-response.builder';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const responseBody = exception.getResponse();

    if (request.url.includes('power-automate')) {
      const rawMessage = (
        responseBody !== null &&
        typeof responseBody === 'object' &&
        'message' in responseBody
          ? (responseBody as Record<string, unknown>).message
          : responseBody
      ) as unknown;

      const detail =
        typeof rawMessage === 'string'
          ? rawMessage
          : Array.isArray(rawMessage)
            ? rawMessage.join(', ')
            : String(rawMessage);

      this.logger.warn(
        `Error PA ${request.method} ${request.url} → HTTP ${status} | ${detail}`,
      );
    }

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
