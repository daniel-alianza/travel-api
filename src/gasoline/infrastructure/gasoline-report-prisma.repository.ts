import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import type {
  GasolineReportFilters,
  GasolineReportHistoryRow,
  GasolineReportRepository,
  GasolineReportRequestRow,
} from '../application/interfaces/gasoline-report.repository.interface';

@Injectable()
export class GasolineReportPrismaRepository implements GasolineReportRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findFilteredRequests(
    filters: GasolineReportFilters,
  ): Promise<readonly GasolineReportRequestRow[]> {
    const records = await this.prismaService.gasolineRequest.findMany({
      where: {
        ...(filters.companyId !== undefined
          ? { companyId: filters.companyId }
          : {}),
        ...(filters.status !== undefined ? { status: filters.status } : {}),
        ...(filters.plate !== undefined && filters.plate.trim().length > 0
          ? { plate: { contains: filters.plate.trim() } }
          : {}),
        ...(filters.startDate !== undefined || filters.endDate !== undefined
          ? {
              createdAt: {
                ...(filters.startDate !== undefined
                  ? { gte: filters.startDate }
                  : {}),
                ...(filters.endDate !== undefined
                  ? { lte: filters.endDate }
                  : {}),
              },
            }
          : {}),
      },
      include: {
        user: { select: { name: true, email: true } },
        company: { select: { name: true } },
        card: { select: { cardNumber: true } },
        approver: { select: { name: true, email: true } },
        disbursedBy: { select: { name: true, email: true } },
        _count: { select: { odometerPhotos: true } },
      },
      orderBy: [{ plate: 'asc' }, { createdAt: 'asc' }],
    });

    return records.map((record) => ({
      id: record.id,
      userId: record.userId,
      plate: record.plate,
      currentMileageKm: decimalToNumber(record.currentMileageKm),
      requestedAmount: decimalToNumber(record.requestedAmount),
      distanceKm: decimalToNumber(record.distanceKm),
      status: record.status,
      approvedAt: record.approvedAt,
      disbursedAt: record.disbursedAt,
      createdAt: record.createdAt,
      user: record.user,
      company: record.company,
      card: record.card,
      approver: record.approver,
      disbursedBy: record.disbursedBy,
      odometerPhotoCount: record._count.odometerPhotos,
    }));
  }

  async findHistoryByPlates(
    plates: readonly string[],
  ): Promise<readonly GasolineReportHistoryRow[]> {
    if (plates.length === 0) {
      return [];
    }

    const records = await this.prismaService.gasolineRequest.findMany({
      where: { plate: { in: [...plates] } },
      select: {
        id: true,
        plate: true,
        currentMileageKm: true,
        requestedAmount: true,
        distanceKm: true,
        createdAt: true,
      },
      orderBy: [{ plate: 'asc' }, { createdAt: 'asc' }],
    });

    return records.map((record) => ({
      id: record.id,
      plate: record.plate,
      currentMileageKm: decimalToNumber(record.currentMileageKm),
      requestedAmount: decimalToNumber(record.requestedAmount),
      distanceKm: decimalToNumber(record.distanceKm),
      createdAt: record.createdAt,
    }));
  }
}

function decimalToNumber(value: { toNumber(): number } | number): number {
  return typeof value === 'number' ? value : value.toNumber();
}
