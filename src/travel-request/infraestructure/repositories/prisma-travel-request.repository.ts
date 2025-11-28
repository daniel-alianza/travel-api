import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/prisma/prisma.service';
import {
  CreateTravelRequestInput,
  TravelRequest,
  TravelRequestRepository,
  UpdateTravelRequestStatusInput,
} from '../../application/interfaces';
import { PaginationInput } from '../../application/interfaces/pagination.input';

interface TravelRequestWithRelations {
  id: number;
  userId: number;
  statusId: number;
  cardId: number;
  totalAmount: number | string | { toString(): string; toNumber(): number };
  travelReason: string;
  travelObjectives: string;
  departureDate: Date;
  returnDate: Date;
  disbursementDate: Date | null;
  approvalDate: Date | null;
  approverId: number | null;
  disburserId: number | null;
  comment: string | null;
  user: {
    id: number;
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    email: string;
  };
  status: {
    id: number;
    name: string;
  };
  approver: {
    id: number;
    name: string;
    email: string;
  } | null;
  disburser: {
    id: number;
    name: string;
    email: string;
  } | null;
  card: {
    id: number;
    cardNumber: string;
  };
  details: Array<{
    id: number;
    travelRequestId: number;
    concept: string;
    amount: number | string | { toString(): string; toNumber(): number };
  }>;
  createdAt: Date;
  updatedAt: Date;
}

interface TravelRequestWhereInput {
  statusId?: number;
  userId?: number;
}

@Injectable()
export class PrismaTravelRequestRepository implements TravelRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToTravelRequest(data: TravelRequestWithRelations): TravelRequest {
    return {
      id: data.id,
      userId: data.userId,
      statusId: data.statusId,
      cardId: data.cardId,
      totalAmount: Number(data.totalAmount),
      travelReason: data.travelReason,
      travelObjectives: data.travelObjectives,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      disbursementDate: data.disbursementDate ?? null,
      approvalDate: data.approvalDate ?? null,
      approverId: data.approverId ?? null,
      disburserId: data.disburserId ?? null,
      comment: data.comment ?? null,
      user: {
        id: data.user.id,
        name: data.user.name,
        paternalSurname: data.user.paternalSurname,
        maternalSurname: data.user.maternalSurname,
        email: data.user.email,
      },
      status: {
        id: data.status.id,
        name: data.status.name,
      },
      approver: data.approver
        ? {
            id: data.approver.id,
            name: data.approver.name,
            email: data.approver.email,
          }
        : null,
      disburser: data.disburser
        ? {
            id: data.disburser.id,
            name: data.disburser.name,
            email: data.disburser.email,
          }
        : null,
      card: {
        id: data.card.id,
        cardNumber: data.card.cardNumber,
      },
      details: data.details
        ? data.details.map((detail) => ({
            id: detail.id,
            travelRequestId: detail.travelRequestId,
            concept: detail.concept,
            amount: Number(detail.amount),
          }))
        : [],
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findAll(input: PaginationInput): Promise<TravelRequest[]> {
    const { limit, offset, statusId, userId } = input;

    const where: TravelRequestWhereInput = {};

    if (statusId !== undefined) {
      where.statusId = statusId;
    }

    if (userId !== undefined) {
      where.userId = userId;
    }

    const whereClause = Object.keys(where).length > 0 ? where : undefined;

    const travelRequests = await this.prisma.travelRequest.findMany({
      where: whereClause,
      take: limit,
      skip: offset,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            paternalSurname: true,
            maternalSurname: true,
            email: true,
          },
        },
        status: true,
        approver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        disburser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        card: {
          select: {
            id: true,
            cardNumber: true,
          },
        },
        details: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return travelRequests.map((tr) => this.mapToTravelRequest(tr));
  }

  async count(input: PaginationInput): Promise<number> {
    const { statusId, userId } = input;

    const where: TravelRequestWhereInput = {};

    if (statusId !== undefined) {
      where.statusId = statusId;
    }

    if (userId !== undefined) {
      where.userId = userId;
    }

    const whereClause = Object.keys(where).length > 0 ? where : undefined;

    return this.prisma.travelRequest.count({
      where: whereClause,
    });
  }

  async create(input: CreateTravelRequestInput): Promise<TravelRequest> {
    const created = await this.prisma.travelRequest.create({
      data: {
        userId: input.userId,
        statusId: input.statusId,
        cardId: input.cardId,
        totalAmount: input.totalAmount,
        travelReason: input.travelReason,
        travelObjectives: input.travelObjectives,
        departureDate: input.departureDate,
        returnDate: input.returnDate,
        details: {
          create: input.details.map((detail) => ({
            concept: detail.concept,
            amount: detail.amount,
          })),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            paternalSurname: true,
            maternalSurname: true,
            email: true,
          },
        },
        status: true,
        approver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        disburser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        card: {
          select: {
            id: true,
            cardNumber: true,
          },
        },
        details: true,
      },
    });

    return this.mapToTravelRequest(created);
  }

  async findById(id: number): Promise<TravelRequest | null> {
    const travelRequest = await this.prisma.travelRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            paternalSurname: true,
            maternalSurname: true,
            email: true,
          },
        },
        status: true,
        approver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        disburser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        card: {
          select: {
            id: true,
            cardNumber: true,
          },
        },
        details: true,
      },
    });

    if (!travelRequest) {
      return null;
    }

    return this.mapToTravelRequest(travelRequest);
  }

  async updateStatus(
    id: number,
    input: UpdateTravelRequestStatusInput,
  ): Promise<TravelRequest> {
    const updated = await this.prisma.travelRequest.update({
      where: { id },
      data: {
        statusId: input.statusId,
        approverId: input.approverId,
        approvalDate: new Date(),
        comment: input.comment ?? null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            paternalSurname: true,
            maternalSurname: true,
            email: true,
          },
        },
        status: true,
        approver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        disburser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        card: {
          select: {
            id: true,
            cardNumber: true,
          },
        },
        details: true,
      },
    });

    return this.mapToTravelRequest(updated);
  }

  async getDisbursements(
    input?: PaginationInput,
  ): Promise<TravelRequest[]> {
    const { limit = 20, offset = 0 } = input ?? {};

    const disbursements = await this.prisma.travelRequest.findMany({
      where: {
        disbursementDate: { not: null },
      },
      take: limit,
      skip: offset,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            paternalSurname: true,
            maternalSurname: true,
            email: true,
          },
        },
        status: true,
        approver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        disburser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        card: {
          select: {
            id: true,
            cardNumber: true,
          },
        },
        details: true,
      },
      orderBy: {
        disbursementDate: 'desc',
      },
    });

    return disbursements.map((tr) => this.mapToTravelRequest(tr));
  }
}
