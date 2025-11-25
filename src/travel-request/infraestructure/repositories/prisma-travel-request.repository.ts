import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/prisma/prisma.service';
import {
  CreateTravelRequestInput,
  TravelRequest,
  TravelRequestRepository,
} from '../../application/interfaces';
import { PaginationInput } from '../../application/interfaces/pagination.input';

@Injectable()
export class PrismaTravelRequestRepository
  implements TravelRequestRepository
{
  constructor(private readonly prisma: PrismaService) {}

  private mapToTravelRequest(data: any): TravelRequest {
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
      card: {
        id: data.card.id,
        cardNumber: data.card.cardNumber,
      },
      details: data.details
        ? data.details.map((detail: any) => ({
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

  async findAll(input?: PaginationInput): Promise<TravelRequest[]> {
    const { limit = 20, offset = 0, statusId, userId } = input ?? {};

    try {
      const where: any = {};
      
      if (statusId !== undefined) {
        where.statusId = statusId;
      }
      
      if (userId !== undefined) {
        where.userId = userId;
      }

      const travelRequests = await this.prisma.travelRequest.findMany({
        where: Object.keys(where).length > 0 ? where : undefined,
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
    } catch (error) {
      throw error;
    }
  }

  async create(input: CreateTravelRequestInput): Promise<TravelRequest> {
    try {
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
    } catch (error) {
      throw error;
    }
  }
}

