import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as https from 'https';
import { handleSapError } from './sap-error.util';
import { SapServiceLayerError } from './sap-error.interface';

@Injectable()
export class SapHttpService {
  constructor(private readonly httpService: HttpService) {}

  async post<T = any>(url: string, data: any, sessionId?: string): Promise<T> {
    try {
      const headers = sessionId
        ? { Cookie: `B1SESSION=${sessionId}` }
        : undefined;

      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.post<T>(url, data, {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          headers,
        }),
      );

      return response.data;
    } catch (error) {
      handleSapError(error as import('axios').AxiosError<SapServiceLayerError>);
    }
  }

  async get<T = any>(url: string, sessionId: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.get<T>(url, {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          headers: {
            Cookie: `B1SESSION=${sessionId}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      handleSapError(error as import('axios').AxiosError<SapServiceLayerError>);
    }
  }
}

