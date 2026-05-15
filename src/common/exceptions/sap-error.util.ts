import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { AxiosError } from 'axios';
import { buildErrorResponse } from './builders/error-response.builder';
import type { SapServiceLayerError } from './sap-error.interface';

const sapSlClientLogger = new Logger('SapServiceLayerClient');

export function handleSapError(error: AxiosError<SapServiceLayerError>): never {
  const status =
    typeof error.response?.status === 'number'
      ? error.response.status
      : HttpStatus.BAD_GATEWAY;

  const sapMessage =
    error.response?.data?.error?.message?.value ??
    error.message ??
    'Error en SAP Service Layer';

  const rawBody = error.response?.data;
  let bodyResumen = '';
  try {
    bodyResumen = JSON.stringify(rawBody).slice(0, 4000);
  } catch {
    bodyResumen = '[cuerpo no serializable]';
  }

  sapSlClientLogger.warn(
    `Error SAP Service Layer status=${String(status)} url=${error.config?.url ?? 'n/a'} mensaje=${sapMessage} cuerpo=${bodyResumen}`,
  );

  throw new HttpException(
    buildErrorResponse('Error al consumir SAP Service Layer.', sapMessage),
    status,
  );
}
