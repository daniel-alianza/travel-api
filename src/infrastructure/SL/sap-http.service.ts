import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { AxiosError } from 'axios';
import * as https from 'https';
import { firstValueFrom } from 'rxjs';
import type { SapServiceLayerError } from '../../common/exceptions/sap-error.interface';
import { handleSapError } from '../../common/exceptions/sap-error.util';

@Injectable()
export class SapHttpService {
  constructor(private readonly httpService: HttpService) {}

  async post<T = unknown>(
    url: string,
    data: unknown,
    sessionId?: string,
  ): Promise<T> {
    try {
      const headers = sessionId
        ? {
            Cookie: `B1SESSION=${sessionId}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        : {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          };

      const response = await firstValueFrom(
        this.httpService.post<T>(url, data, {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          headers,
          timeout: 15000,
        }),
      );

      return response.data;
    } catch (error) {
      handleSapError(error as AxiosError<SapServiceLayerError>);
      throw error;
    }
  }

  async get<T = unknown>(url: string, sessionId: string): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          headers: {
            Cookie: `B1SESSION=${sessionId}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 15000,
        }),
      );

      return response.data;
    } catch (error) {
      handleSapError(error as AxiosError<SapServiceLayerError>);
      throw error;
    }
  }

  async patch<T = unknown>(
    url: string,
    data: unknown,
    sessionId: string,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch<T>(url, data, {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          headers: {
            Cookie: `B1SESSION=${sessionId}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 15000,
        }),
      );

      return response.data;
    } catch (error) {
      handleSapError(error as AxiosError<SapServiceLayerError>);
      throw error;
    }
  }
}
