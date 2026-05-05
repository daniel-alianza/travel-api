import { HttpException, HttpStatus } from '@nestjs/common';
import type { AxiosError } from 'axios';
import { buildErrorResponse } from './builders/error-response.builder';
import type { SapServiceLayerError } from './sap-error.interface';

export function handleSapError(error: AxiosError<SapServiceLayerError>): never {
  const status =
    typeof error.response?.status === 'number'
      ? error.response.status
      : HttpStatus.BAD_GATEWAY;

  const sapMessage =
    error.response?.data?.error?.message?.value ??
    error.message ??
    'Error en SAP Service Layer';

  throw new HttpException(
    buildErrorResponse('Error al consumir SAP Service Layer.', sapMessage),
    status,
  );
}
