import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import type {
  DmsRepository,
  DmsTripOwnershipRecord,
  DmsTripFileRecord,
} from '../application/interfaces/dms-repository.interface';

@Injectable()
export class DmsPrismaRepository implements DmsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existsTripForUser(tripId: number, userId: number): Promise<boolean> {
    const trip = await this.prismaService.travelRequestTrip.findFirst({
      where: {
        id: tripId,
        travelRequest: { userId },
      },
      select: { id: true },
    });

    return trip !== null;
  }

  async findTripOwnershipForUser(
    tripId: number,
    userId: number,
  ): Promise<DmsTripOwnershipRecord | null> {
    const trip = await this.prismaService.travelRequestTrip.findFirst({
      where: {
        id: tripId,
        travelRequest: { userId },
      },
      select: {
        id: true,
        travelRequestId: true,
      },
    });

    if (trip === null) {
      return null;
    }

    return {
      tripId: trip.id,
      travelRequestId: trip.travelRequestId,
    };
  }

  async createTripFile(input: {
    tripId: number;
    fileType: string;
    filePath: string;
    fileName: string;
    mimeType: string;
  }): Promise<DmsTripFileRecord> {
    const createdFile = await this.prismaService.travelRequestTripFile.create({
      data: {
        tripId: input.tripId,
        fileType: input.fileType,
        fileUrl: input.filePath,
        fileName: input.fileName,
        mimeType: input.mimeType,
      },
    });

    return mapTripFileRecord(createdFile);
  }

  async findDuplicateTripFile(input: {
    tripId: number;
    fileName: string;
    mimeType: string;
    createdAfter: Date;
  }): Promise<DmsTripFileRecord | null> {
    const duplicate = await this.prismaService.travelRequestTripFile.findFirst({
      where: {
        tripId: input.tripId,
        fileName: input.fileName,
        mimeType: input.mimeType,
        createdAt: { gte: input.createdAfter },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (duplicate === null) {
      return null;
    }
    return mapTripFileRecord(duplicate);
  }

  async listTripFilesForUser(
    tripId: number,
    userId: number,
  ): Promise<readonly DmsTripFileRecord[]> {
    const files = await this.prismaService.travelRequestTripFile.findMany({
      where: {
        tripId,
        trip: {
          travelRequest: { userId },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return files.map(mapTripFileRecord);
  }

  async findTripFileForUser(
    fileId: number,
    userId: number,
  ): Promise<DmsTripFileRecord | null> {
    const file = await this.prismaService.travelRequestTripFile.findFirst({
      where: {
        id: fileId,
        trip: {
          travelRequest: { userId },
        },
      },
    });

    if (file === null) {
      return null;
    }

    return mapTripFileRecord(file);
  }
}

function mapTripFileRecord(record: {
  id: number;
  tripId: number;
  fileType: string;
  fileUrl: string;
  fileName: string | null;
  mimeType: string | null;
  createdAt: Date;
}): DmsTripFileRecord {
  return {
    id: record.id,
    tripId: record.tripId,
    fileType: record.fileType,
    filePath: record.fileUrl,
    fileName: record.fileName,
    mimeType: record.mimeType,
    createdAt: record.createdAt,
  };
}
