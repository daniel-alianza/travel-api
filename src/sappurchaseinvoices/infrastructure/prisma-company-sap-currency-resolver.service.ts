import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import type { CompanySapCurrencyResolver } from '../application/interfaces/company-sap-currency-resolver.interface';

type PrismaCurrencyReader = {
  readonly currency: {
    findFirst(args: {
      where: { companyId: number; name: string };
      select: { sapCurrencyCode: true };
    }): Promise<{ sapCurrencyCode: string } | null>;
  };
};

@Injectable()
export class PrismaCompanySapCurrencyResolver implements CompanySapCurrencyResolver {
  constructor(private readonly prisma: PrismaService) {}

  async resolveSapCurrencyCode(
    companyId: number,
    sourceCurrencyCode: string,
  ): Promise<string> {
    const normalized = sourceCurrencyCode.trim().toUpperCase();
    const prismaReader = this.prisma as unknown as PrismaCurrencyReader;
    const row = await prismaReader.currency.findFirst({
      where: {
        companyId,
        name: normalized,
      },
      select: { sapCurrencyCode: true },
    });
    if (row === null) {
      return normalized;
    }
    return row.sapCurrencyCode;
  }
}
