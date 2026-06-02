import { Injectable } from '@nestjs/common';
import { maskCardNumber } from '../../common/security/mask-card-number';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { FuelCardSapSyncService } from './fuel-card-sap-sync.service';
import type {
  AssignCardToUserInput,
  AssignCardToUserResult,
  CardAssignmentUserRecord,
  CardAssignmentUsersListRecord,
  CardAssignmentUsersQuery,
  CardRepository,
  DeactivateUserCardResult,
} from '../application/interfaces/card-repository.interface';

type UserListDbRecord = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly company: { readonly name: string };
  readonly area: { readonly name: string };
  readonly cards: readonly {
    readonly cardNumber: string;
    readonly type: 'VIATIC' | 'FUEL';
    readonly assignedAt: Date;
  }[];
};

function pickLatestCardNumberPerType(
  cards: readonly {
    readonly cardNumber: string;
    readonly type: 'VIATIC' | 'FUEL';
    readonly assignedAt: Date;
  }[],
): { readonly viatic: string | null; readonly fuel: string | null } {
  let viaticNumber: string | null = null;
  let fuelNumber: string | null = null;
  let viaticMs = -1;
  let fuelMs = -1;
  for (const card of cards) {
    const ms = card.assignedAt.getTime();
    if (card.type === 'VIATIC' && ms >= viaticMs) {
      viaticMs = ms;
      viaticNumber = card.cardNumber;
    }
    if (card.type === 'FUEL' && ms >= fuelMs) {
      fuelMs = ms;
      fuelNumber = card.cardNumber;
    }
  }
  return { viatic: viaticNumber, fuel: fuelNumber };
}

function toCardAssignmentUser(
  record: UserListDbRecord,
): CardAssignmentUserRecord {
  const { viatic, fuel } = pickLatestCardNumberPerType(record.cards);
  return {
    id: record.id,
    nombreCompleto: record.name,
    correo: record.email,
    compania: record.company.name,
    area: record.area.name,
    tarjetaViaticosEnmascarada: viatic !== null ? maskCardNumber(viatic) : null,
    tarjetaGasolinaEnmascarada: fuel !== null ? maskCardNumber(fuel) : null,
  };
}

@Injectable()
export class CardPrismaRepository implements CardRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fuelCardSapSyncService: FuelCardSapSyncService,
  ) {}

  async findCardAssignmentFilterCatalog(): Promise<{
    readonly companies: readonly { readonly name: string }[];
    readonly areas: readonly { readonly name: string }[];
  }> {
    const [companiesRows, areasRows] = await Promise.all([
      this.prismaService.company.findMany({
        orderBy: { name: 'asc' },
        select: { name: true },
      }),
      this.prismaService.area.findMany({
        orderBy: { name: 'asc' },
        select: { name: true },
      }),
    ]);

    return {
      companies: companiesRows.map((c) => ({ name: c.name })),
      areas: areasRows.map((a) => ({ name: a.name })),
    };
  }

  async findCardAssignmentUsers(
    query: CardAssignmentUsersQuery,
  ): Promise<CardAssignmentUsersListRecord> {
    const whereNameOrEmail =
      query.search.trim().length > 0
        ? {
            OR: [
              { name: { contains: query.search.trim() } },
              { email: { contains: query.search.trim() } },
            ],
          }
        : {};
    const whereCompany =
      query.compania.trim().length > 0
        ? { company: { name: query.compania.trim() } }
        : {};
    const whereArea =
      query.area.trim().length > 0 ? { area: { name: query.area.trim() } } : {};
    const where = {
      isActive: true,
      ...whereNameOrEmail,
      ...whereCompany,
      ...whereArea,
    };
    const total = await this.prismaService.user.count({ where });
    const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
    const page = Math.min(Math.max(1, query.page), totalPages);
    const skip = (page - 1) * query.pageSize;
    const rows = await this.prismaService.user.findMany({
      where,
      orderBy: { name: 'asc' },
      skip,
      take: query.pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        company: { select: { name: true } },
        area: { select: { name: true } },
        cards: {
          where: {
            isActive: true,
            type: { in: ['VIATIC', 'FUEL'] },
          },
          select: { cardNumber: true, type: true, assignedAt: true },
        },
      },
    });
    return {
      items: rows.map(toCardAssignmentUser),
      total,
      page,
      pageSize: query.pageSize,
      totalPages,
    };
  }

  async assignCardToUser(
    input: AssignCardToUserInput,
  ): Promise<AssignCardToUserResult> {
    const auditActorId = input.actorUserId ?? null;
    const selectedCompany = await this.prismaService.company.findFirst({
      where: { name: input.companyName.trim() },
      select: { id: true },
    });
    if (selectedCompany === null) {
      return 'company_not_found';
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: input.userId },
      select: { id: true, companyId: true },
    });
    if (user === null) {
      return 'user_not_found';
    }

    const cardInUse = await this.prismaService.card.findFirst({
      where: {
        cardNumber: input.cardNumber,
        type: input.cardType,
        isActive: true,
        userId: { not: input.userId },
      },
      select: { id: true },
    });
    if (cardInUse !== null) {
      return 'card_in_use';
    }

    const selectedCompanyId = selectedCompany.id;
    if (input.cardType === 'FUEL') {
      const gasolineSupplier =
        await this.prismaService.gasolineSupplier.findFirst({
          where: { companyId: selectedCompanyId },
          select: { id: true },
        });
      if (gasolineSupplier === null) {
        return 'gasoline_supplier_not_found';
      }
    }

    const fuelStatus = input.fuelStatus ?? 'active';
    const lastFourDigits = input.cardNumber.slice(-4);
    const fuelName = input.fuelName?.trim() || `Tarjeta ${lastFourDigits}`;

    const sapSyncResult =
      input.cardType === 'FUEL'
        ? await this.fuelCardSapSyncService.sync({
            companyId: selectedCompanyId,
            cardNumber: input.cardNumber,
            fuelName,
            fuelStatus,
          })
        : null;

    await this.prismaService.$transaction(async (tx) => {
      const deactivationDate = new Date();
      await tx.card.updateMany({
        where: { userId: input.userId, type: input.cardType, isActive: true },
        data: {
          isActive: false,
          deactivatedAt: deactivationDate,
          deactivatedById: auditActorId,
          fuelStatus: input.cardType === 'FUEL' ? 'inactive' : undefined,
        },
      });
      const existing = await tx.card.findUnique({
        where: { cardNumber: input.cardNumber },
        select: { id: true, type: true, createdById: true },
      });
      if (existing === null) {
        const assignmentDate = new Date();
        await tx.card.create({
          data: {
            cardNumber: input.cardNumber,
            type: input.cardType,
            companyId: selectedCompanyId,
            userId: input.userId,
            isActive: true,
            assignedAt: assignmentDate,
            createdById: auditActorId,
            assignedById: auditActorId,
            deactivatedAt: null,
            deactivatedById: null,
            fuelName: input.cardType === 'FUEL' ? fuelName : null,
            fuelCardKind: input.cardType === 'FUEL' ? input.fuelCardKind : null,
            fuelGroup:
              input.cardType === 'FUEL' ? (input.fuelGroup ?? null) : null,
            fuelAssignmentType:
              input.cardType === 'FUEL'
                ? (input.fuelAssignmentType ?? null)
                : null,
            fuelStatus: input.cardType === 'FUEL' ? fuelStatus : null,
            sapCode:
              input.cardType === 'FUEL'
                ? (sapSyncResult?.sapCode ?? null)
                : null,
            sapSyncedAt:
              input.cardType === 'FUEL'
                ? (sapSyncResult?.sapSyncedAt ?? null)
                : null,
          },
        });
      } else {
        const assignmentDate = new Date();
        await tx.card.update({
          where: { id: existing.id },
          data: {
            type: input.cardType,
            companyId: selectedCompanyId,
            userId: input.userId,
            isActive: true,
            assignedAt: assignmentDate,
            createdById: existing.createdById ?? auditActorId,
            assignedById: auditActorId,
            deactivatedAt: null,
            deactivatedById: null,
            fuelName: input.cardType === 'FUEL' ? fuelName : null,
            fuelCardKind: input.cardType === 'FUEL' ? input.fuelCardKind : null,
            fuelGroup:
              input.cardType === 'FUEL' ? (input.fuelGroup ?? null) : null,
            fuelAssignmentType:
              input.cardType === 'FUEL'
                ? (input.fuelAssignmentType ?? null)
                : null,
            fuelStatus: input.cardType === 'FUEL' ? fuelStatus : null,
            sapCode:
              input.cardType === 'FUEL'
                ? (sapSyncResult?.sapCode ?? null)
                : null,
            sapSyncedAt:
              input.cardType === 'FUEL'
                ? (sapSyncResult?.sapSyncedAt ?? null)
                : null,
          },
        });
      }
    });

    return 'ok';
  }

  async deactivateUserCard(input: {
    readonly userId: number;
    readonly actorUserId?: number;
    readonly cardType: 'VIATIC' | 'FUEL';
  }): Promise<DeactivateUserCardResult> {
    const user = await this.prismaService.user.findUnique({
      where: { id: input.userId },
      select: { id: true },
    });
    if (user === null) {
      return 'user_not_found';
    }
    await this.prismaService.card.updateMany({
      where: { userId: input.userId, type: input.cardType, isActive: true },
      data: {
        isActive: false,
        deactivatedAt: new Date(),
        deactivatedById: input.actorUserId ?? null,
        fuelStatus: input.cardType === 'FUEL' ? 'inactive' : undefined,
      },
    });
    return 'ok';
  }

  async findCardAssignmentUserById(
    userId: number,
  ): Promise<CardAssignmentUserRecord | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId, isActive: true },
      select: {
        id: true,
        name: true,
        email: true,
        company: { select: { name: true } },
        area: { select: { name: true } },
        cards: {
          where: {
            isActive: true,
            type: { in: ['VIATIC', 'FUEL'] },
          },
          select: { cardNumber: true, type: true, assignedAt: true },
        },
      },
    });
    if (user === null) {
      return null;
    }
    return toCardAssignmentUser(user);
  }
}
