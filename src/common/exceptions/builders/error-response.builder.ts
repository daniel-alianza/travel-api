import type { ApiErrorResponse } from '../interfaces/api-error-response.interface';

export function buildErrorResponse<TError>(
  message: string,
  error: TError,
): ApiErrorResponse<TError> {
  return {
    data: null,
    message,
    error,
  };
}
