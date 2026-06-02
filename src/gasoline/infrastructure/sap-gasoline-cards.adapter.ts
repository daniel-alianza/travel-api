import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SapAuthAdapter } from '../../infrastructure/SL/sap-auth.adapter';
import { SapHttpService } from '../../infrastructure/SL/sap-http.service';
import type {
  GasolineSapCardRecord,
  GasolineSapCardsPort,
  SearchGasolineSapCardsInput,
} from '../application/interfaces/gasoline-sap-cards.port';

const SAP_GASOLINE_TABLE = 'U_LISTA_TARJETAS_GAS';

const SAP_CARD_SELECT = 'Code,Name,U_Tarjeta,U_Activo,U_Sucursal';

type SapGasolineCardsPageResponse = {
  readonly value?: readonly {
    readonly Code: string;
    readonly Name: string;
    readonly U_Tarjeta: string | null;
    readonly U_Activo: string | null;
    readonly U_Sucursal: string | null;
  }[];
  readonly 'odata.nextLink'?: string;
};

@Injectable()
export class SapGasolineCardsAdapter implements GasolineSapCardsPort {
  constructor(
    private readonly configService: ConfigService,
    private readonly sapAuthAdapter: SapAuthAdapter,
    private readonly sapHttpService: SapHttpService,
  ) {}

  async search(
    input: SearchGasolineSapCardsInput,
  ): Promise<readonly GasolineSapCardRecord[]> {
    const baseUrl = this.configService.get<string>('SAP_SL_URL');
    if (!baseUrl) {
      throw new BadRequestException('SAP_SL_URL no está configurada.');
    }

    const login = await this.sapAuthAdapter.login(input.companyId);
    try {
      const filter = buildOdataFilter(input);
      const params = new URLSearchParams({
        $select: SAP_CARD_SELECT,
        $orderby: 'Name asc',
      });
      if (filter.length > 0) {
        params.set('$filter', filter);
      }

      const records: GasolineSapCardRecord[] = [];
      let url: string | null =
        `${baseUrl}/${SAP_GASOLINE_TABLE}?${params.toString()}`;

      while (url !== null && records.length < input.maxResults) {
        const response =
          await this.sapHttpService.get<SapGasolineCardsPageResponse>(
            url,
            login.SessionId,
          );
        const page = response.value ?? [];

        for (const row of page) {
          const cardNumber = (row.U_Tarjeta ?? '').trim();
          if (cardNumber.length === 0) {
            continue;
          }

          records.push({
            sapCode: row.Code,
            name: row.Name?.trim() ?? '',
            cardNumber,
            branchCode: row.U_Sucursal?.trim() ?? null,
            isActiveInSap: row.U_Activo === 'Y',
          });

          if (records.length >= input.maxResults) {
            break;
          }
        }

        if (records.length >= input.maxResults) {
          break;
        }

        const nextLink = response['odata.nextLink'];
        url = nextLink ? `${baseUrl}/${nextLink}` : null;
      }

      return records;
    } finally {
      await this.sapAuthAdapter.logout(login.SessionId);
    }
  }

  async findBySapCode(
    companyId: number,
    sapCode: string,
  ): Promise<GasolineSapCardRecord | null> {
    const baseUrl = this.configService.get<string>('SAP_SL_URL');
    if (!baseUrl) {
      throw new BadRequestException('SAP_SL_URL no está configurada.');
    }

    const trimmedCode = sapCode.trim();
    const login = await this.sapAuthAdapter.login(companyId);
    try {
      const url = `${baseUrl}/${SAP_GASOLINE_TABLE}('${escapeOdataString(trimmedCode)}')?$select=${SAP_CARD_SELECT}`;
      const row = await this.sapHttpService.get<SapGasolineCardRow>(
        url,
        login.SessionId,
      );
      const cardNumber = (row.U_Tarjeta ?? '').trim();
      if (cardNumber.length === 0) {
        return null;
      }

      return {
        sapCode: row.Code,
        name: row.Name?.trim() ?? '',
        cardNumber,
        branchCode: row.U_Sucursal?.trim() ?? null,
        isActiveInSap: row.U_Activo === 'Y',
      };
    } finally {
      await this.sapAuthAdapter.logout(login.SessionId);
    }
  }
}

function buildOdataFilter(input: SearchGasolineSapCardsInput): string {
  const parts: string[] = ["U_Activo eq 'Y'"];

  if (
    input.filterByBranch &&
    input.branchExternalCode !== null &&
    input.branchExternalCode.trim().length > 0
  ) {
    parts.push(
      `U_Sucursal eq '${escapeOdataString(input.branchExternalCode.trim())}'`,
    );
  }

  const searchText = input.searchText?.trim() ?? '';
  if (searchText.length > 0) {
    const digitsOnly = searchText.replace(/\D/g, '');
    if (digitsOnly.length >= 2) {
      parts.push(`contains(U_Tarjeta,'${escapeOdataString(digitsOnly)}')`);
    } else if (searchText.length >= 2) {
      parts.push(`contains(Name,'${escapeOdataString(searchText)}')`);
    }
  }

  return parts.join(' and ');
}

function escapeOdataString(value: string): string {
  return value.replace(/'/g, "''");
}

type SapGasolineCardRow = {
  readonly Code: string;
  readonly Name: string;
  readonly U_Tarjeta: string | null;
  readonly U_Activo: string | null;
  readonly U_Sucursal: string | null;
};
