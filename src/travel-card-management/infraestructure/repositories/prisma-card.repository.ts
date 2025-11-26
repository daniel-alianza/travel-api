import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/prisma/prisma.service';
import {
  CreateCardInput,
  UpdateCardInput,
  AssignCardInput,
  CardRepository,
} from '../../application/interfaces/card.repository';
import { Card } from '../../domain/entities/card.entity';
import { CardAssignment } from '../../domain/entities/card-assignment.entity';
import { PaginationInput } from '../../application/interfaces/pagination.input';
import { maskCardNumber } from '../utils/mask-card-number.util';

@Injectable()
export class PrismaCardRepository implements CardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Card | null> {
    const card = await this.prisma.card.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });

    if (!card) return null;

    return {
      id: card.id,
      cardNumber: maskCardNumber(card.cardNumber),
      companyId: card.companyId,
      isActive: card.isActive,
      company: {
        id: card.company.id,
        name: card.company.name,
      },
      createdAt: card.createdAt,
    };
  }

  async findAll(input?: PaginationInput): Promise<Card[]> {
    const { limit = 20, offset = 0 } = input ?? {};

    const cards = await this.prisma.card.findMany({
      take: limit,
      skip: offset,
      include: {
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return cards.map((card) => ({
      id: card.id,
      cardNumber: maskCardNumber(card.cardNumber),
      companyId: card.companyId,
      isActive: card.isActive,
      company: {
        id: card.company.id,
        name: card.company.name,
      },
      createdAt: card.createdAt,
    }));
  }

  async findByCardNumber(cardNumber: string): Promise<Card | null> {
    const card = await this.prisma.card.findUnique({
      where: { cardNumber },
      include: {
        company: true,
      },
    });

    if (!card) return null;

    return {
      id: card.id,
      cardNumber: maskCardNumber(card.cardNumber),
      companyId: card.companyId,
      isActive: card.isActive,
      company: {
        id: card.company.id,
        name: card.company.name,
      },
      createdAt: card.createdAt,
    };
  }

  async findByCompanyId(
    companyId: number,
    input?: PaginationInput,
  ): Promise<Card[]> {
    const { limit = 20, offset = 0 } = input ?? {};

    const cards = await this.prisma.card.findMany({
      where: { companyId },
      take: limit,
      skip: offset,
      include: {
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return cards.map((card) => ({
      id: card.id,
      cardNumber: maskCardNumber(card.cardNumber),
      companyId: card.companyId,
      isActive: card.isActive,
      company: {
        id: card.company.id,
        name: card.company.name,
      },
      createdAt: card.createdAt,
    }));
  }

  async create(input: CreateCardInput): Promise<Card> {
    const created = await this.prisma.card.create({
      data: {
        cardNumber: input.cardNumber,
        companyId: input.companyId,
        isActive: true,
      },
      include: {
        company: true,
      },
    });

    return {
      id: created.id,
      cardNumber: maskCardNumber(created.cardNumber),
      companyId: created.companyId,
      isActive: created.isActive,
      company: {
        id: created.company.id,
        name: created.company.name,
      },
      createdAt: created.createdAt,
    };
  }

  async update(id: number, input: UpdateCardInput): Promise<Card> {
    const updateData: {
      cardNumber?: string;
      isActive?: boolean;
    } = {};

    if (input.cardNumber !== undefined) {
      updateData.cardNumber = input.cardNumber;
    }
    if (input.isActive !== undefined) {
      updateData.isActive = input.isActive;
    }

    const updated = await this.prisma.card.update({
      where: { id },
      data: updateData,
      include: {
        company: true,
      },
    });

    return {
      id: updated.id,
      cardNumber: maskCardNumber(updated.cardNumber),
      companyId: updated.companyId,
      isActive: updated.isActive,
      company: {
        id: updated.company.id,
        name: updated.company.name,
      },
      createdAt: updated.createdAt,
    };
  }

  async existsByCardNumber(cardNumber: string): Promise<boolean> {
    const count = await this.prisma.card.count({
      where: { cardNumber },
    });
    return count > 0;
  }

  async assignCard(input: AssignCardInput): Promise<CardAssignment> {
    const assignment = await this.prisma.cardAssignment.create({
      data: {
        cardId: input.cardId,
        userId: input.userId,
      },
      include: {
        card: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      id: assignment.id,
      cardId: assignment.cardId,
      userId: assignment.userId,
      assignedAt: assignment.assignedAt,
      unassignedAt: assignment.unassignedAt,
      card: {
        id: assignment.card.id,
        cardNumber: maskCardNumber(assignment.card.cardNumber),
      },
      user: {
        id: assignment.user.id,
        name: assignment.user.name,
        email: assignment.user.email,
      },
    };
  }

  async unassignCard(cardId: number, userId: number): Promise<void> {
    await this.prisma.cardAssignment.updateMany({
      where: {
        cardId,
        userId,
        unassignedAt: null,
      },
      data: {
        unassignedAt: new Date(),
      },
    });
  }

  async getActiveAssignmentByCardId(
    cardId: number,
  ): Promise<CardAssignment | null> {
    const assignment = await this.prisma.cardAssignment.findFirst({
      where: {
        cardId,
        unassignedAt: null,
      },
      include: {
        card: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        assignedAt: 'desc',
      },
    });

    if (!assignment) return null;

    return {
      id: assignment.id,
      cardId: assignment.cardId,
      userId: assignment.userId,
      assignedAt: assignment.assignedAt,
      unassignedAt: assignment.unassignedAt,
      card: {
        id: assignment.card.id,
        cardNumber: maskCardNumber(assignment.card.cardNumber),
      },
      user: {
        id: assignment.user.id,
        name: assignment.user.name,
        email: assignment.user.email,
      },
    };
  }

  async getActiveAssignmentByUserId(
    userId: number,
  ): Promise<CardAssignment | null> {
    const assignment = await this.prisma.cardAssignment.findFirst({
      where: {
        userId,
        unassignedAt: null,
      },
      include: {
        card: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        assignedAt: 'desc',
      },
    });

    if (!assignment) return null;

    return {
      id: assignment.id,
      cardId: assignment.cardId,
      userId: assignment.userId,
      assignedAt: assignment.assignedAt,
      unassignedAt: assignment.unassignedAt,
      card: {
        id: assignment.card.id,
        cardNumber: maskCardNumber(assignment.card.cardNumber),
      },
      user: {
        id: assignment.user.id,
        name: assignment.user.name,
        email: assignment.user.email,
      },
    };
  }

  async countActiveAssignmentsByUserId(userId: number): Promise<number> {
    const count = await this.prisma.cardAssignment.count({
      where: {
        userId,
        unassignedAt: null,
      },
    });
    return count;
  }

  async getAssignmentsByCardId(
    cardId: number,
    input?: PaginationInput,
  ): Promise<CardAssignment[]> {
    const { limit = 20, offset = 0 } = input ?? {};

    const assignments = await this.prisma.cardAssignment.findMany({
      where: { cardId },
      take: limit,
      skip: offset,
      include: {
        card: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        assignedAt: 'desc',
      },
    });

    return assignments.map((assignment) => ({
      id: assignment.id,
      cardId: assignment.cardId,
      userId: assignment.userId,
      assignedAt: assignment.assignedAt,
      unassignedAt: assignment.unassignedAt,
      card: {
        id: assignment.card.id,
        cardNumber: maskCardNumber(assignment.card.cardNumber),
      },
      user: {
        id: assignment.user.id,
        name: assignment.user.name,
        email: assignment.user.email,
      },
    }));
  }

  async getAssignmentsByUserId(
    userId: number,
    input?: PaginationInput,
  ): Promise<CardAssignment[]> {
    const { limit = 20, offset = 0 } = input ?? {};

    const assignments = await this.prisma.cardAssignment.findMany({
      where: { userId },
      take: limit,
      skip: offset,
      include: {
        card: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        assignedAt: 'desc',
      },
    });

    return assignments.map((assignment) => ({
      id: assignment.id,
      cardId: assignment.cardId,
      userId: assignment.userId,
      assignedAt: assignment.assignedAt,
      unassignedAt: assignment.unassignedAt,
      card: {
        id: assignment.card.id,
        cardNumber: maskCardNumber(assignment.card.cardNumber),
      },
      user: {
        id: assignment.user.id,
        name: assignment.user.name,
        email: assignment.user.email,
      },
    }));
  }

  async getAssignmentsByUserIds(
    userIds: number[],
    input?: PaginationInput,
  ): Promise<CardAssignment[]> {
    const { limit, offset = 0 } = input ?? {};

    const assignments = await this.prisma.cardAssignment.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
      ...(limit && { take: limit }),
      skip: offset,
      include: {
        card: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        assignedAt: 'desc',
      },
    });

    return assignments.map((assignment) => ({
      id: assignment.id,
      cardId: assignment.cardId,
      userId: assignment.userId,
      assignedAt: assignment.assignedAt,
      unassignedAt: assignment.unassignedAt,
      card: {
        id: assignment.card.id,
        cardNumber: maskCardNumber(assignment.card.cardNumber),
      },
      user: {
        id: assignment.user.id,
        name: assignment.user.name,
        email: assignment.user.email,
      },
    }));
  }
}
