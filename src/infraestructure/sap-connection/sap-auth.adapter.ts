import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { SapHttpService } from './sap-http.service';
import { SapAuthPort } from '../../auth/application/interfaces/sap-auth.port';

@Injectable()
export class SapAuthAdapter implements SapAuthPort {
  private readonly logger = new Logger(SapAuthAdapter.name);

  private readonly companyMapping: Record<number, string> = {
    1: process.env.SAP_DB_AE ?? '',
    2: process.env.SAP_DB_FG ?? '',
    3: process.env.SAP_DB_FGM ?? '',
    4: process.env.SAP_DB_TEST ?? '',
  };

  constructor(private readonly sapHttpService: SapHttpService) {}

  async login(companyId: number): Promise<{ SessionId: string }> {
    const companyDB = this.companyMapping[companyId];

    if (!companyDB) {
      throw new HttpException('Empresa no válida', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      CompanyDB: companyDB,
      UserName: process.env.SAP_USERNAME,
      Password: process.env.SAP_PASSWORD,
    };

    const url = `${process.env.SAP_SL_URL}/Login`;

    try {
      return await this.sapHttpService.post<{ SessionId: string }>(
        url,
        payload,
      );
    } catch (error) {
      this.logger.error(`SAP login fallido: ${(error as Error).message}`);
      throw error;
    }
  }

  async logout(): Promise<void> {
    const url = `${process.env.SAP_SL_URL}/Logout`;

    try {
      await this.sapHttpService.post(url, {});
    } catch (error) {
      this.logger.error(`SAP logout fallido: ${(error as Error).message}`);
      throw error;
    }
  }
}

