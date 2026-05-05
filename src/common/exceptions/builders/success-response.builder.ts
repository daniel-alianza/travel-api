import type { ApiSuccessResponse } from '../interfaces/api-success-response.interface';

export function buildSuccessResponse<TData>(
  data: TData,
  message: string,
): ApiSuccessResponse<TData> {
  return {
    data,
    message,
  };
}
