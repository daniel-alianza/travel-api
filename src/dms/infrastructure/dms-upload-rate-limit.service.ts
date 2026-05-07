import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class DmsUploadRateLimitService {
  private readonly requestsByUser = new Map<number, number[]>();

  assertUploadUrlAllowed(input: {
    userId: number;
    maxRequestsPerMinute: number;
  }): void {
    const now = Date.now();
    const oneMinuteAgo = now - 60_000;
    const history = this.requestsByUser.get(input.userId) ?? [];
    const recent = history.filter((timestamp) => timestamp >= oneMinuteAgo);
    if (recent.length >= input.maxRequestsPerMinute) {
      throw new HttpException(
        {
          message:
            'Has generado demasiadas solicitudes de carga. Intenta de nuevo en un minuto.',
          error: 'Límite excedido',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    recent.push(now);
    this.requestsByUser.set(input.userId, recent);
  }
}
