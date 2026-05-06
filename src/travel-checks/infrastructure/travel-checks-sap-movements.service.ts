import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SapAuthAdapter } from '../../infrastructure/SL/sap-auth.adapter';
import { SapHttpService } from '../../infrastructure/SL/sap-http.service';
import type {
  ExpenseTripMovementContextRecord,
  SapExpenseMovementRecord,
  TravelChecksSapMovementsPort,
} from '../application/interfaces/travel-checks-sap-movements.interface';

type SapBankPagesResponse = {
  readonly value?: readonly {
    readonly Sequence: number;
    readonly DueDate: string;
    readonly Memo: string;
    readonly Reference: string;
    readonly DebitAmount: number;
  }[];
};

@Injectable()
export class TravelChecksSapMovementsService implements TravelChecksSapMovementsPort {
  constructor(
    private readonly configService: ConfigService,
    private readonly sapAuthAdapter: SapAuthAdapter,
    private readonly sapHttpService: SapHttpService,
  ) {}

  async fetchByReference(
    context: ExpenseTripMovementContextRecord,
  ): Promise<readonly SapExpenseMovementRecord[]> {
    const baseUrl = this.configService.get<string>('SAP_SL_URL');
    if (!baseUrl || context.corporateCardNumber === null) {
      return [];
    }

    const normalizedCardReference = context.corporateCardNumber.replace(/\D/g, '');
    if (normalizedCardReference.length === 0) {
      return [];
    }

    const startDate = toSapUtcStartOfDay(context.departureDate);
    const endDate = toSapUtcEndOfDay(context.returnDate);

    const login = await this.sapAuthAdapter.login(context.companyId);
    try {
      const filter = [
        `Reference eq '${normalizedCardReference}'`,
        `DueDate ge '${startDate}'`,
        `DueDate le '${endDate}'`,
      ].join(' and ');

      const url = `${baseUrl}/BankPages?$filter=${encodeURIComponent(filter)}&$orderby=DueDate desc`;
      const response = await this.sapHttpService.get<SapBankPagesResponse>(
        url,
        login.SessionId,
      );
      const rows = response.value ?? [];
      const movements = rows.map((row) => ({
        sequence: row.Sequence,
        dueDate: row.DueDate,
        memo: row.Memo,
        reference: row.Reference,
        debitAmount: row.DebitAmount,
      }));

      return movements.sort(
        (left, right) =>
          new Date(right.dueDate).getTime() - new Date(left.dueDate).getTime(),
      );
    } finally {
      await this.sapAuthAdapter.logout(login.SessionId);
    }
  }
}

function addDaysUtc(date: Date, daysToAdd: number): Date {
  const clone = new Date(date.getTime());
  clone.setUTCDate(clone.getUTCDate() + daysToAdd);
  return clone;
}

function toSapUtcStartOfDay(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year.toString()}-${month}-${day}T00:00:00Z`;
}

function toSapUtcEndOfDay(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year.toString()}-${month}-${day}T23:59:59Z`;
}
