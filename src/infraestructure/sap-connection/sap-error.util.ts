import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { SapErrorCode } from './sap-error.enum';
import { SapServiceLayerError } from './sap-error.interface';

const logger = new Logger('SAP');

export function handleSapError(error: AxiosError<SapServiceLayerError>): never {
  const sapError = error.response?.data?.error;

  const code = sapError?.code;
  const message = sapError?.message?.value ?? 'SAP Service Layer error';
  const trace = sapError?.innererror?.trace;

  logger.error(
    `❌ SAP Error (${code}): ${message}${trace ? ` | Trace: ${trace}` : ''}`,
  );

  switch (code) {
    case SapErrorCode.InvalidSession:
    case SapErrorCode.Unauthorized:
      throw new UnauthorizedException(message);

    case SapErrorCode.Forbidden:
      throw new ForbiddenException(message);

    case SapErrorCode.NotFound:
    case SapErrorCode.OrderNotFound:
      throw new NotFoundException(message);

    case SapErrorCode.DuplicateEntry:
    case SapErrorCode.ActionNotSupported:
    case SapErrorCode.InvalidQuery:
    case SapErrorCode.InvalidSQL:
      throw new BadRequestException(message);

    case SapErrorCode.ScriptCompileError:
    case SapErrorCode.ScriptRuntimeError:
      throw new InternalServerErrorException(message);

    default:
      throw new InternalServerErrorException(`SAP Error (${code}): ${message}`);
  }
}

