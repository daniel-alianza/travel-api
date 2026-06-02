import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import type {
  CreateGasolineRequestRepositoryInput,
  GasolineRequestDetailRecord,
  GasolineRequestRepository,
  GasolineRequestSummaryRecord,
} from '../application/interfaces/gasoline-request.repository.interface';
import {
  gasolineRequestInclude,
  mapGasolineRequestDetail,
  mapGasolineRequestSummary,
} from './gasoline-request-prisma.mapper';

@Injectable()
export class GasolineRequestPrismaRepository implements GasolineRequestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    input: CreateGasolineRequestRepositoryInput,
  ): Promise<GasolineRequestSummaryRecord> {
    const created = await this.prismaService.gasolineRequest.create({
      data: {
        userId: input.userId,
        companyId: input.companyId,
        branchId: input.branchId,
        areaId: input.areaId,
        cardId: input.cardId,
        plate: input.plate,
        currentMileageKm: input.currentMileageKm,
        requestedAmount: input.requestedAmount,
        distanceKm: input.distanceKm,
        routeToTake: input.routeToTake,
        applicantComments: input.applicantComments,
        odometerPhotos: {
          create: { photo: Buffer.from(input.odometerPhoto) },
        },
      },
      include: gasolineRequestInclude,
    });

    return mapGasolineRequestSummary(created);
  }

  async findById(requestId: number): Promise<GasolineRequestDetailRecord | null> {
    const record = await this.prismaService.gasolineRequest.findUnique({
      where: { id: requestId },
      include: {
        ...gasolineRequestInclude,
        odometerPhotos: { select: { id: true, photo: true } },
      },
    });

    if (record === null) {
      return null;
    }

    return mapGasolineRequestDetail(record);
  }

  async findPending(
    companyId: number | undefined,
    applicantUserIds: readonly number[] | undefined,
  ): Promise<readonly GasolineRequestSummaryRecord[]> {
    const records = await this.prismaService.gasolineRequest.findMany({
      where: {
        status: 'pending',
        ...(companyId !== undefined ? { companyId } : {}),
        ...(applicantUserIds !== undefined
          ? { userId: { in: [...applicantUserIds] } }
          : {}),
      },
      include: gasolineRequestInclude,
      orderBy: { createdAt: 'desc' },
    });

    return records.map(mapGasolineRequestSummary);
  }

  async findApproved(
    companyId: number | undefined,
  ): Promise<readonly GasolineRequestSummaryRecord[]> {
    const records = await this.prismaService.gasolineRequest.findMany({
      where: {
        status: 'approved',
        ...(companyId !== undefined ? { companyId } : {}),
      },
      include: gasolineRequestInclude,
      orderBy: { approvedAt: 'desc' },
    });

    return records.map(mapGasolineRequestSummary);
  }

  async findHistoryByUser(
    userId: number,
  ): Promise<readonly GasolineRequestSummaryRecord[]> {
    const records = await this.prismaService.gasolineRequest.findMany({
      where: { userId },
      include: gasolineRequestInclude,
      orderBy: { createdAt: 'desc' },
    });

    return records.map(mapGasolineRequestSummary);
  }

  async findForDisbursement(requestId: number): Promise<{
    readonly id: number;
    readonly status: 'pending' | 'approved' | 'rejected' | 'dispersed';
    readonly companyId: number;
    readonly companyName: string;
    readonly requestedAmount: number;
    readonly plate: string;
    readonly areaName: string | null;
    readonly branchName: string | null;
    readonly approverEmail: string | null;
    readonly approverName: string | null;
    readonly cardNumber: string;
    readonly fuelCardKind: string | null;
  } | null> {
    const record = await this.prismaService.gasolineRequest.findUnique({
      where: { id: requestId },
      include: {
        company: { select: { id: true, name: true } },
        branch: { select: { name: true } },
        area: { select: { name: true } },
        approver: { select: { name: true, email: true } },
        card: {
          select: { cardNumber: true, fuelCardKind: true },
        },
      },
    });

    if (record === null) {
      return null;
    }

    return {
      id: record.id,
      status: record.status,
      companyId: record.company.id,
      companyName: record.company.name,
      requestedAmount: record.requestedAmount.toNumber(),
      plate: record.plate,
      areaName: record.area?.name ?? null,
      branchName: record.branch?.name ?? null,
      approverEmail: record.approver?.email ?? null,
      approverName: record.approver?.name ?? null,
      cardNumber: record.card.cardNumber,
      fuelCardKind: record.card.fuelCardKind,
    };
  }

  async approve(input: {
    readonly requestId: number;
    readonly approverId: number;
    readonly comment: string | null;
  }): Promise<GasolineRequestSummaryRecord | null> {
    const existing = await this.prismaService.gasolineRequest.findUnique({
      where: { id: input.requestId },
      select: { status: true },
    });
    if (existing === null || existing.status !== 'pending') {
      return null;
    }

    const updated = await this.prismaService.gasolineRequest.update({
      where: { id: input.requestId },
      data: {
        status: 'approved',
        approverId: input.approverId,
        approverComment: input.comment,
        approvedAt: new Date(),
      },
      include: gasolineRequestInclude,
    });

    return mapGasolineRequestSummary(updated);
  }

  async reject(input: {
    readonly requestId: number;
    readonly approverId: number;
    readonly comment: string | null;
  }): Promise<GasolineRequestSummaryRecord | null> {
    const existing = await this.prismaService.gasolineRequest.findUnique({
      where: { id: input.requestId },
      select: { status: true },
    });
    if (existing === null || existing.status !== 'pending') {
      return null;
    }

    const updated = await this.prismaService.gasolineRequest.update({
      where: { id: input.requestId },
      data: {
        status: 'rejected',
        approverId: input.approverId,
        approverComment: input.comment,
        approvedAt: new Date(),
      },
      include: gasolineRequestInclude,
    });

    return mapGasolineRequestSummary(updated);
  }

  async cancelApproved(input: {
    readonly requestId: number;
    readonly cancelledById: number;
    readonly comment: string;
  }): Promise<GasolineRequestSummaryRecord | null> {
    const existing = await this.prismaService.gasolineRequest.findUnique({
      where: { id: input.requestId },
      select: { status: true },
    });
    if (existing === null || existing.status !== 'approved') {
      return null;
    }

    const updated = await this.prismaService.gasolineRequest.update({
      where: { id: input.requestId },
      data: {
        status: 'rejected',
        approverId: input.cancelledById,
        approverComment: input.comment,
        approvedAt: new Date(),
      },
      include: gasolineRequestInclude,
    });

    return mapGasolineRequestSummary(updated);
  }

  async markDisbursed(input: {
    readonly requestId: number;
    readonly disbursedById: number;
    readonly comment: string | null;
  }): Promise<GasolineRequestSummaryRecord | null> {
    const existing = await this.prismaService.gasolineRequest.findUnique({
      where: { id: input.requestId },
      select: { status: true },
    });
    if (existing === null || existing.status !== 'approved') {
      return null;
    }

    const updated = await this.prismaService.gasolineRequest.update({
      where: { id: input.requestId },
      data: {
        status: 'dispersed',
        disbursedById: input.disbursedById,
        disbursedComment: input.comment,
        disbursedAt: new Date(),
      },
      include: gasolineRequestInclude,
    });

    return mapGasolineRequestSummary(updated);
  }

  async findSubordinateUserIds(managerId: number): Promise<readonly number[]> {
    const users = await this.prismaService.user.findMany({
      where: { managerId },
      select: { id: true },
    });
    return users.map((user) => user.id);
  }

  async findUserApprovalContext(userId: number): Promise<{
    readonly id: number;
    readonly email: string;
    readonly managerId: number | null;
  } | null> {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, managerId: true },
    });
  }

  async findApprover(userId: number): Promise<{
    readonly id: number;
    readonly email: string;
    readonly name: string;
  } | null> {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    });
  }
}
