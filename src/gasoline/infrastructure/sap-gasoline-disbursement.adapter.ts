import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SapAuthAdapter } from '../../infrastructure/SL/sap-auth.adapter';
import { SapHttpService } from '../../infrastructure/SL/sap-http.service';
import type {
  DisburseGasolineInvoiceInput,
  DisburseGasolineInvoiceResult,
  GasolineAnticipoRecord,
  GasolineDisbursementPort,
} from '../application/interfaces/gasoline-disbursement.port';

const ITEM_DESCRIPTION = 'COMBUSTIBLE';

type SapInvoiceResponse = {
  readonly DocEntry: number;
  readonly DocNum: number;
};

type SapEmployeeRow = {
  readonly EmployeeID: number;
  readonly FirstName: string;
  readonly LastName: string;
  readonly eMail: string | null;
};

type SapEmployeesPage = {
  readonly value?: readonly SapEmployeeRow[];
};

type SapAnticipoRow = {
  readonly DocEntry: number;
  readonly DocNum: number;
  readonly DocTotal: number;
  readonly DpmAppl: number;
};

type SapAnticiposPage = {
  readonly value?: readonly SapAnticipoRow[];
};

@Injectable()
export class SapGasolineDisbursementAdapter implements GasolineDisbursementPort {
  constructor(
    private readonly configService: ConfigService,
    private readonly sapAuthAdapter: SapAuthAdapter,
    private readonly sapHttpService: SapHttpService,
  ) {}

  async createPurchaseInvoice(
    input: DisburseGasolineInvoiceInput,
  ): Promise<DisburseGasolineInvoiceResult> {
    const baseUrl = this.requireBaseUrl();
    const login = await this.sapAuthAdapter.login(input.companyId);

    try {
      const documentsOwner = await this.resolveSapEmployeeId(
        baseUrl,
        login.SessionId,
        input.approverEmail,
        input.approverName,
      );

      const today = formatMexicoDate();
      const documentLine: Record<string, unknown> = {
        ItemDescription: ITEM_DESCRIPTION,
        UnitPrice: input.amount,
        TaxCode: input.taxCode,
        LineTotal: input.amount,
        AccountCode: input.accountCode,
        WTLiable: 'tNO',
      };
      if (input.costingCode !== null) {
        documentLine.CostingCode = input.costingCode;
      }

      const payload = {
        CardCode: input.supplierCode,
        DocDate: today,
        DocDueDate: today,
        TaxDate: today,
        DocType: 'dDocument_Service',
        Comments: input.comments,
        U_Comentarios: input.solicitudRef,
        DocumentsOwner: documentsOwner,
        DocumentLines: [documentLine],
        DownPaymentsToDraw: [
          {
            DocEntry: input.downPaymentDocEntry,
            AmountToDraw: input.amount,
          },
        ],
      };

      const response = await this.sapHttpService.post<SapInvoiceResponse>(
        `${baseUrl}/PurchaseInvoices`,
        payload,
        login.SessionId,
      );

      return {
        docEntry: response.DocEntry,
        docNum: response.DocNum,
      };
    } finally {
      await this.sapAuthAdapter.logout(login.SessionId);
    }
  }

  async listAnticipos(
    companyId: number,
    supplierCode: string,
    companyName: string,
  ): Promise<readonly GasolineAnticipoRecord[]> {
    const baseUrl = this.requireBaseUrl();
    const login = await this.sapAuthAdapter.login(companyId);

    try {
      const response = await this.sapHttpService.post<SapAnticiposPage>(
        `${baseUrl}/SQLQueries('ANTICIPO_SALDO_V2')/List`,
        { ParamList: `CardCode='${supplierCode}'` },
        login.SessionId,
      );

      const items = response.value ?? [];
      const excludedDocNumsFgm = [1411, 1420];
      const normalizedCompany = companyName
        .toUpperCase()
        .replace(/\s+/g, ' ')
        .trim();
      const isFgm =
        normalizedCompany === 'FGM' || normalizedCompany === 'FG MANUFACTURING';

      const filtered = isFgm
        ? items.filter((item) => !excludedDocNumsFgm.includes(item.DocNum))
        : items;

      return filtered.map((item) => ({
        docEntry: item.DocEntry,
        facturaDisponible: item.DocNum,
        total: item.DocTotal,
        saldo: Math.round((item.DocTotal - item.DpmAppl) * 100) / 100,
      }));
    } finally {
      await this.sapAuthAdapter.logout(login.SessionId);
    }
  }

  private requireBaseUrl(): string {
    const baseUrl = this.configService.get<string>('SAP_SL_URL');
    if (!baseUrl) {
      throw new BadRequestException('SAP_SL_URL no está configurada.');
    }
    return baseUrl;
  }

  private async resolveSapEmployeeId(
    baseUrl: string,
    sessionId: string,
    email: string | null,
    approverName: string | null,
  ): Promise<number> {
    if (email !== null && email.trim().length > 0) {
      const byEmail = await this.findEmployee(
        baseUrl,
        sessionId,
        `eMail eq '${escapeOdata(email.trim())}'`,
      );
      if (byEmail !== null) {
        return byEmail;
      }
    }

    if (approverName === null || approverName.trim().length === 0) {
      throw new BadRequestException(
        'El aprobador no tiene email ni nombre para buscar en SAP.',
      );
    }

    const nameParts = approverName.trim().split(/\s+/);
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ');
    const filter =
      lastName.length > 0
        ? `contains(FirstName, '${escapeOdata(firstName)}') and contains(LastName, '${escapeOdata(lastName)}')`
        : `contains(FirstName, '${escapeOdata(firstName)}') or contains(LastName, '${escapeOdata(firstName)}')`;

    const byName = await this.findEmployee(baseUrl, sessionId, filter);
    if (byName === null) {
      throw new BadRequestException(
        'No se encontró el empleado del aprobador en SAP.',
      );
    }

    return byName;
  }

  private async findEmployee(
    baseUrl: string,
    sessionId: string,
    filter: string,
  ): Promise<number | null> {
    const url = `${baseUrl}/EmployeesInfo?$select=EmployeeID,FirstName,LastName,eMail&$filter=${encodeURIComponent(filter)}`;
    const response = await this.sapHttpService.get<SapEmployeesPage>(
      url,
      sessionId,
    );
    const employees = response.value ?? [];
    if (employees.length === 0) {
      return null;
    }
    return employees[0].EmployeeID;
  }
}

function formatMexicoDate(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
  }).format(new Date());
}

function escapeOdata(value: string): string {
  return value.replace(/'/g, "''");
}
