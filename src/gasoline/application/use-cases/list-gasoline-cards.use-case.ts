import { Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { maskCardNumber } from '../../../common/security/mask-card-number';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type ListGasolineCardsQuery = {
  readonly companyId: number;
  readonly q?: string;
};

export type GasolineCardListItem = {
  readonly cardId: number;
  readonly sapCode: string | null;
  readonly name: string;
  readonly cardNumberMasked: string;
};

type ListGasolineCardsData = {
  readonly cards: readonly GasolineCardListItem[];
};

export type ListGasolineCardsResponse = ApiSuccessResponse<ListGasolineCardsData>;

@Injectable()
export class ListGasolineCardsUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    query: ListGasolineCardsQuery,
  ): Promise<ListGasolineCardsResponse> {
    const company = await this.prismaService.company.findUnique({
      where: { id: query.companyId },
      select: { id: true },
    });

    if (company === null) {
      throw new NotFoundException('La empresa indicada no existe.');
    }

    const searchText = query.q?.trim() ?? '';
    const digitsOnly = searchText.replace(/\D/g, '');

    const records = await this.prismaService.card.findMany({
      where: {
        type: 'FUEL',
        companyId: query.companyId,
        isActive: true,
        fuelStatus: 'active',
        ...(searchText.length >= 2
          ? {
              OR: [
                { cardNumber: { contains: digitsOnly.length >= 2 ? digitsOnly : searchText } },
                { fuelName: { contains: searchText } },
              ],
            }
          : {}),
      },
      select: {
        id: true,
        sapCode: true,
        fuelName: true,
        cardNumber: true,
      },
      orderBy: [{ fuelName: 'asc' }, { cardNumber: 'asc' }],
      take: searchText.length >= 2 ? 80 : 200,
    });

    const cards = records.map((record) => {
      const displayName =
        record.fuelName !== null && record.fuelName.trim().length > 0
          ? record.fuelName.trim()
          : `Tarjeta ·${record.cardNumber.slice(-4)}`;

      return {
        cardId: record.id,
        sapCode: record.sapCode,
        name: displayName,
        cardNumberMasked: maskCardNumber(record.cardNumber),
      };
    });

    return buildSuccessResponse(
      { cards },
      'Tarjetas de gasolina cargadas correctamente.',
    );
  }
}
