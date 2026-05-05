import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SapHttpService } from './sap-http.service';

type SapLoginResponse = {
  SessionId: string;
};

@Injectable()
export class SapAuthAdapter {
  private readonly logger = new Logger(SapAuthAdapter.name);

  constructor(
    private readonly sapHttpService: SapHttpService,
    private readonly configService: ConfigService,
  ) {}

  async login(companyId: number): Promise<SapLoginResponse> {
    const baseUrl = this.configService.get<string>('SAP_SL_URL');
    if (!baseUrl) {
      throw new HttpException(
        'SAP_SL_URL no está configurada en el archivo .env',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const companyKey = this.getEmpresaByCompanyId(companyId);
    const { dbName } = this.getDbNameByEmpresa(companyKey);

    const payload = {
      CompanyDB: dbName,
      UserName: this.getUserNameByEmpresa(companyKey),
      Password: this.getPasswordByEmpresa(companyKey),
    };

    try {
      this.logger.debug(
        `Intentando login SAP para companyId=${companyId} db=${dbName}`,
      );
      return await this.sapHttpService.post<SapLoginResponse>(
        `${baseUrl}/Login`,
        payload,
      );
    } catch (error) {
      this.logger.error(`SAP login fallido: ${(error as Error).message}`);
      throw error;
    }
  }

  async logout(sessionId?: string): Promise<void> {
    const baseUrl = this.configService.get<string>('SAP_SL_URL');
    if (!baseUrl) {
      throw new HttpException(
        'SAP_SL_URL no está configurada en el archivo .env',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      await this.sapHttpService.post(`${baseUrl}/Logout`, {}, sessionId);
    } catch (error) {
      this.logger.error(`SAP logout fallido: ${(error as Error).message}`);
      throw error;
    }
  }

  private getEmpresaByCompanyId(companyId: number): string {
    const empresaByCompanyId: Record<number, string> = {
      1: 'ALIANZA',
      2: 'FGE',
      3: 'MANUFACTURING',
      4: 'TEST',
    };

    const empresa = empresaByCompanyId[companyId];
    if (!empresa) {
      throw new HttpException('Empresa no válida', HttpStatus.BAD_REQUEST);
    }
    return empresa;
  }

  private getDbNameByEmpresa(companyKey: string): {
    dbName: string;
  } {
    const dbEnvKeyByEmpresa: Record<string, string> = {
      ALIANZA: 'SAP_DB_AE',
      FGE: 'SAP_DB_FG',
      MANUFACTURING: 'SAP_DB_FGM',
      TEST: 'SAP_DB_TEST',
      TYA: 'SAP_DB_TYA',
    };

    const dbEnvKey = dbEnvKeyByEmpresa[companyKey];
    const dbName = dbEnvKey
      ? this.configService.get<string>(dbEnvKey)
      : undefined;

    if (!dbName) {
      throw new HttpException(
        `Base de datos no configurada para la empresa ${companyKey}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return { dbName };
  }

  private getUserNameByEmpresa(companyKey: string): string {
    const userName = this.configService.get<string>(`SAP_USER_${companyKey}`);
    if (!userName) {
      return this.configService.get<string>('SAP_USERNAME') ?? '';
    }
    return userName;
  }

  private getPasswordByEmpresa(companyKey: string): string {
    const password = this.configService.get<string>(`SAP_PASS_${companyKey}`);
    if (!password) {
      return this.configService.get<string>('SAP_PASSWORD') ?? '';
    }
    return password;
  }
}
