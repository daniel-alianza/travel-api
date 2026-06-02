import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { maskCardNumber } from '../../../common/security/mask-card-number';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import {
  requiresGasolineBranch,
  requiresGasolineBranchSapFilter,
} from '../../domain/gasoline-company.rules';
import type { GasolineSapCardsPort } from '../interfaces/gasoline-sap-cards.port';

type SearchGasolineCardsCommand = {
  readonly companyId: number;
  readonly branchId?: number;
  readonly q?: string;
};

type GasolineCardSearchItem = {
  readonly sapCode: string;
  readonly name: string;
  readonly cardNumberMasked: string;
  readonly cardId: number | null;
  readonly branchCode: string | null;
};

type SearchGasolineCardsData = {
  readonly cards: readonly GasolineCardSearchItem[];
};

export type SearchGasolineCardsResponse =
  ApiSuccessResponse<SearchGasolineCardsData>;

const DEFAULT_MAX_RESULTS = 50;
const SEARCH_MAX_RESULTS = 80;

@Injectable()
export class SearchGasolineCardsUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('GasolineSapCardsPort')
    private readonly gasolineSapCardsPort: GasolineSapCardsPort,
  ) {}

  async execute(
    command: SearchGasolineCardsCommand,
  ): Promise<SearchGasolineCardsResponse> {
    const company = await this.prismaService.company.findUnique({
      where: { id: command.companyId },
      select: { id: true, name: true },
    });

    if (company === null) {
      throw new NotFoundException('La empresa indicada no existe.');
    }

    if (
      requiresGasolineBranch(company.id, company.name) &&
      command.branchId === undefined
    ) {
      throw new BadRequestException(
        'La sucursal es obligatoria para Alianza Eléctrica.',
      );
    }

    let branchExternalCode: string | null = null;
    if (command.branchId !== undefined) {
      const branch = await this.prismaService.branch.findUnique({
        where: { id: command.branchId },
        select: { externalCode: true },
      });
      if (branch === null) {
        throw new NotFoundException('La sucursal indicada no existe.');
      }
      branchExternalCode = branch.externalCode;
    }

    const searchText = command.q?.trim() ?? '';
    const maxResults =
      searchText.length > 0 ? SEARCH_MAX_RESULTS : DEFAULT_MAX_RESULTS;

    const filterByBranch =
      requiresGasolineBranchSapFilter(company.id, company.name) &&
      branchExternalCode !== null &&
      branchExternalCode.trim().length > 0;

    let sapCards;
    try {
      sapCards = await this.gasolineSapCardsPort.search({
        companyId: company.id,
        branchExternalCode,
        filterByBranch,
        searchText: searchText.length > 0 ? searchText : null,
        maxResults,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error desconocido en SAP.';
      throw new BadRequestException(
        `No se pudieron consultar las tarjetas en SAP: ${message}`,
      );
    }

    const cardNumbers = sapCards.map((card) => card.cardNumber);
    const localCards =
      cardNumbers.length > 0
        ? await this.prismaService.card.findMany({
            where: {
              type: 'FUEL',
              cardNumber: { in: cardNumbers },
            },
            select: {
              id: true,
              cardNumber: true,
              fuelName: true,
              sapCode: true,
            },
          })
        : [];

    const localByNumber = new Map(
      localCards.map((card) => [card.cardNumber, card]),
    );

    const cards = sapCards.map((card) => {
      const local = localByNumber.get(card.cardNumber);
      const localFuelName =
        local !== undefined && local.fuelName !== null
          ? local.fuelName.trim()
          : '';
      const displayName =
        card.name.trim().length > 0
          ? card.name.trim()
          : localFuelName.length > 0
            ? localFuelName
            : `Tarjeta ·${card.cardNumber.slice(-4)}`;

      return {
        sapCode: card.sapCode,
        name: displayName,
        cardNumberMasked: maskCardNumber(card.cardNumber),
        cardId: local?.id ?? null,
        branchCode: card.branchCode,
      };
    });

    return buildSuccessResponse(
      { cards },
      'Tarjetas de gasolina consultadas correctamente.',
    );
  }
}
