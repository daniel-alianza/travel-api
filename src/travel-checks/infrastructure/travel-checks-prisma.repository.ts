import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import type {
  DispersedExpenseTripListRecord,
  ExpenseTripMovementContextRecord,
  DispersedExpenseTripMovementsSourceRecord,
  DispersedTravelRequestForCheckRecord,
  DispersedTripForCheckRecord,
  ExpenseTripExpenseAmountsRecord,
  TravelChecksRepository,
} from '../application/interfaces/travel-checks-repository.interface';

@Injectable()
export class TravelChecksPrismaRepository implements TravelChecksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDispersedTravelRequestsWithDispersedTrips(): Promise<
    readonly DispersedTravelRequestForCheckRecord[]
  > {
    const rows = await this.prisma.travelRequest.findMany({
      where: {
        status: 'dispersed',
        trips: { some: { tripApprovalStatus: 'dispersed' } },
      },
      orderBy: { dispersedAt: 'desc' },
      select: {
        id: true,
        status: true,
        employeeName: true,
        corporateCardNumber: true,
        dispersedAt: true,
        dispersedTotal: true,
        userId: true,
        user: {
          select: { id: true, name: true, email: true },
        },
        company: { select: { id: true, name: true } },
        branch: { select: { id: true, name: true } },
        area: { select: { id: true, name: true } },
        trips: {
          where: { tripApprovalStatus: 'dispersed' },
          orderBy: { tripOrder: 'asc' },
          select: {
            id: true,
            tripOrder: true,
            destination: true,
            tripApprovalStatus: true,
            departureDate: true,
            returnDate: true,
            disbursementDate: true,
            estimatedTotal: true,
          },
        },
      },
    });

    return rows.map((row) => mapRow(row));
  }

  async findDispersedExpenseTripsForUser(
    userId: number,
  ): Promise<readonly DispersedExpenseTripListRecord[]> {
    const trips = await this.prisma.travelRequestTrip.findMany({
      where: {
        tripApprovalStatus: 'dispersed',
        travelRequest: {
          userId,
          status: 'dispersed',
        },
      },
      orderBy: [{ departureDate: 'desc' }, { tripOrder: 'asc' }],
      select: {
        id: true,
        tripOrder: true,
        destination: true,
        purpose: true,
        departureDate: true,
        returnDate: true,
        disbursementDate: true,
        estimatedTotal: true,
        approvedAt: true,
        travelRequest: {
          select: {
            id: true,
            corporateCardNumber: true,
            dispersedAt: true,
            approvedAt: true,
            employeeName: true,
            user: { select: { email: true } },
            company: { select: { name: true } },
          },
        },
        expenses: {
          select: {
            transport: true,
            tolls: true,
            lodging: true,
            food: true,
            freight: true,
            tools: true,
            shipping: true,
            miscellaneous: true,
          },
        },
      },
    });

    return trips.map((trip) => ({
      id: trip.id,
      tripOrder: trip.tripOrder,
      destination: trip.destination,
      purpose: trip.purpose,
      departureDate: trip.departureDate,
      returnDate: trip.returnDate,
      disbursementDate: trip.disbursementDate,
      estimatedTotal: Number(trip.estimatedTotal.toString()),
      approvedAt: trip.approvedAt,
      travelRequest: trip.travelRequest,
      expenses: trip.expenses === null ? null : mapExpenseAmounts(trip.expenses),
    }));
  }

  async findDispersedExpenseTripMovementsSource(
    tripId: number,
    userId: number,
  ): Promise<DispersedExpenseTripMovementsSourceRecord | null> {
    const trip = await this.prisma.travelRequestTrip.findFirst({
      where: {
        id: tripId,
        tripApprovalStatus: 'dispersed',
        travelRequest: {
          userId,
          status: 'dispersed',
        },
      },
      select: {
        id: true,
        destination: true,
        disbursementDate: true,
        travelRequest: {
          select: { corporateCardNumber: true },
        },
        expenses: {
          select: {
            transport: true,
            tolls: true,
            lodging: true,
            food: true,
            freight: true,
            tools: true,
            shipping: true,
            miscellaneous: true,
          },
        },
      },
    });
    if (trip === null) {
      return null;
    }
    return {
      id: trip.id,
      destination: trip.destination,
      disbursementDate: trip.disbursementDate,
      travelRequest: trip.travelRequest,
      expenses: trip.expenses === null ? null : mapExpenseAmounts(trip.expenses),
    };
  }

  async findExpenseTripMovementContext(
    tripId: number,
    userId: number,
  ): Promise<ExpenseTripMovementContextRecord | null> {
    const trip = await this.prisma.travelRequestTrip.findFirst({
      where: {
        id: tripId,
        tripApprovalStatus: 'dispersed',
        travelRequest: {
          userId,
          status: 'dispersed',
        },
      },
      select: {
        id: true,
        destination: true,
        departureDate: true,
        returnDate: true,
        travelRequest: {
          select: {
            companyId: true,
            corporateCardNumber: true,
          },
        },
      },
    });

    if (trip === null) {
      return null;
    }

    const prismaWithAccountCode = this.prisma as PrismaService & {
      readonly accountCode: {
        findMany(args: {
          where: { companyId: number; isActive: boolean };
          select: { code: true };
        }): Promise<readonly { code: string }[]>;
      };
    };

    const accountCodes = await prismaWithAccountCode.accountCode.findMany({
      where: { companyId: trip.travelRequest.companyId, isActive: true },
      select: { code: true },
    });

    return {
      tripId: trip.id,
      destination: trip.destination,
      departureDate: trip.departureDate,
      returnDate: trip.returnDate,
      companyId: trip.travelRequest.companyId,
      corporateCardNumber: trip.travelRequest.corporateCardNumber,
      accountCodes: accountCodes.map((row) => row.code),
    };
  }
}

function mapExpenseAmounts(row: {
  readonly transport: { toString(): string };
  readonly tolls: { toString(): string };
  readonly lodging: { toString(): string };
  readonly food: { toString(): string };
  readonly freight: { toString(): string };
  readonly tools: { toString(): string };
  readonly shipping: { toString(): string };
  readonly miscellaneous: { toString(): string };
}): ExpenseTripExpenseAmountsRecord {
  return {
    transport: Number(row.transport.toString()),
    tolls: Number(row.tolls.toString()),
    lodging: Number(row.lodging.toString()),
    food: Number(row.food.toString()),
    freight: Number(row.freight.toString()),
    tools: Number(row.tools.toString()),
    shipping: Number(row.shipping.toString()),
    miscellaneous: Number(row.miscellaneous.toString()),
  };
}

type TravelRequestRow = {
  readonly id: number;
  readonly status: string;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly dispersedAt: Date | null;
  readonly dispersedTotal: { toString(): string } | null;
  readonly userId: number;
  readonly user: { readonly id: number; readonly name: string; readonly email: string };
  readonly company: { readonly id: number; readonly name: string };
  readonly branch: { readonly id: number; readonly name: string };
  readonly area: { readonly id: number; readonly name: string };
  readonly trips: readonly {
    readonly id: number;
    readonly tripOrder: number;
    readonly destination: string;
    readonly tripApprovalStatus: string;
    readonly departureDate: Date;
    readonly returnDate: Date;
    readonly disbursementDate: Date;
    readonly estimatedTotal: { toString(): string };
  }[];
};

function mapRow(row: TravelRequestRow): DispersedTravelRequestForCheckRecord {
  return {
    id: row.id,
    status: row.status,
    employeeName: row.employeeName,
    corporateCardNumber: row.corporateCardNumber,
    dispersedAt: row.dispersedAt,
    dispersedTotal:
      row.dispersedTotal === null ? null : Number(row.dispersedTotal.toString()),
    userId: row.userId,
    user: row.user,
    company: row.company,
    branch: row.branch,
    area: row.area,
    trips: row.trips.map((trip) => mapTrip(trip)),
  };
}

function mapTrip(trip: TravelRequestRow['trips'][number]): DispersedTripForCheckRecord {
  return {
    id: trip.id,
    tripOrder: trip.tripOrder,
    destination: trip.destination,
    tripApprovalStatus: trip.tripApprovalStatus,
    departureDate: trip.departureDate,
    returnDate: trip.returnDate,
    disbursementDate: trip.disbursementDate,
    estimatedTotal: Number(trip.estimatedTotal.toString()),
  };
}
