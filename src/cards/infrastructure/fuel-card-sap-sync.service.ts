import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { SapAuthAdapter } from '../../infrastructure/SL/sap-auth.adapter';
import { SapHttpService } from '../../infrastructure/SL/sap-http.service';

const SAP_GASOLINE_TABLE = 'U_LISTA_TARJETAS_GAS';

type SapOdataCodesResponse = {
  readonly value?: readonly { readonly Code: string }[];
  readonly 'odata.nextLink'?: string;
};

type SyncFuelCardInput = {
  readonly companyId: number;
  readonly cardNumber: string;
  readonly fuelName: string;
  readonly fuelStatus: 'active' | 'inactive' | 'blocked' | 'cancelled';
};

type SyncFuelCardResult = {
  readonly sapCode: string;
  readonly sapSyncedAt: Date;
};

@Injectable()
export class FuelCardSapSyncService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sapAuthAdapter: SapAuthAdapter,
    private readonly sapHttpService: SapHttpService,
    private readonly configService: ConfigService,
  ) {}

  async sync(input: SyncFuelCardInput): Promise<SyncFuelCardResult> {
    const [company, supplier] = await Promise.all([
      this.prismaService.company.findUnique({
        where: { id: input.companyId },
        select: { id: true, name: true },
      }),
      this.prismaService.gasolineSupplier.findFirst({
        where: { companyId: input.companyId },
        select: { code: true },
      }),
    ]);

    if (company === null) {
      throw new NotFoundException(
        'No existe la compañía para sincronizar en SAP.',
      );
    }
    if (supplier === null) {
      throw new NotFoundException(
        `No existe proveedor de gasolina para la compañía ${company.name}.`,
      );
    }

    const baseUrl = this.configService.get<string>('SAP_SL_URL');
    if (!baseUrl) {
      throw new BadRequestException('SAP_SL_URL no está configurada.');
    }

    const login = await this.sapAuthAdapter.login(company.id);
    try {
      const sapCode = await this.getNextSapCode(baseUrl, login.SessionId);
      const sapPayload = {
        Code: sapCode,
        Name: input.fuelName,
        U_Tarjeta: input.cardNumber,
        U_Activo: input.fuelStatus === 'active' ? 'Y' : 'N',
        U_Proveedor: supplier.code,
      };

      await this.sapHttpService.post(
        `${baseUrl}/${SAP_GASOLINE_TABLE}`,
        sapPayload,
        login.SessionId,
      );

      return {
        sapCode,
        sapSyncedAt: new Date(),
      };
    } finally {
      await this.sapAuthAdapter.logout(login.SessionId);
    }
  }

  private async getNextSapCode(
    baseUrl: string,
    sessionId: string,
  ): Promise<string> {
    const existingCodes = new Set<number>();
    let url: string | null = `${baseUrl}/${SAP_GASOLINE_TABLE}?$select=Code`;

    while (url) {
      const response = await this.sapHttpService.get<SapOdataCodesResponse>(
        url,
        sessionId,
      );
      const records = response.value ?? [];

      for (const record of records) {
        const codeNumber = Number.parseInt(record.Code, 10);
        if (!Number.isNaN(codeNumber)) {
          existingCodes.add(codeNumber);
        }
      }

      const nextLink = response['odata.nextLink'];
      url = nextLink ? `${baseUrl}/${nextLink}` : null;
    }

    const maxCode = existingCodes.size > 0 ? Math.max(...existingCodes) : 0;
    return String(maxCode + 1);
  }
}
