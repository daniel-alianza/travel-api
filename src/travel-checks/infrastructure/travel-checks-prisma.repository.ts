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
  ReconciliationTripOwnershipRecord,
  TravelRequestReconciliationRecord,
  PendingTravelRequestReconciliationRecord,
  TripFileForProofValidationRecord,
  TripMovementProofInvoiceCfdiPersistInput,
  TripMovementProofRecord,
  TripMovementProofAccountingSnapshot,
} from '../application/interfaces/travel-checks-repository.interface';

@Injectable()
export class TravelChecksPrismaRepository implements TravelChecksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async resolveExpenseCatalogCompanyId(
    corporateCardNumber: string | null,
    travelRequestCompanyId: number,
  ): Promise<number> {
    return this.resolveCompanyIdForSapExpenseMovements(
      corporateCardNumber,
      travelRequestCompanyId,
    );
  }

  async listViaticDistributionRules(): Promise<
    readonly {
      id: number;
      code: string;
      name: string;
      companyName: string;
    }[]
  > {
    const rules = await this.prisma.distributionRule.findMany({
      where: { areaId: null },
      select: {
        id: true,
        code: true,
        name: true,
        company: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ company: { name: 'asc' } }, { code: 'asc' }],
    });

    return rules.map((rule) => ({
      id: rule.id,
      code: rule.code,
      name: rule.name,
      companyName: rule.company.name,
    }));
  }

  async listVatByCompanyId(companyId: number): Promise<
    readonly {
      id: number;
      code: string;
      name: string;
    }[]
  > {
    const vats = await this.prisma.vAT.findMany({
      where: { companyId },
      select: { id: true, code: true, name: true },
      orderBy: [{ code: 'asc' }],
    });
    return vats;
  }

  async listViaticCategoriesByCompanyId(companyId: number): Promise<
    readonly {
      id: number;
      code: string;
      name: string;
    }[]
  > {
    const categories = await this.prisma.$queryRaw<
      readonly {
        id: number;
        code: string;
        name: string;
      }[]
    >`SELECT id, code, name FROM ViaticCategory WHERE companyId = ${companyId} ORDER BY code ASC`;
    return categories;
  }

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
            purpose: true,
            tripApprovalStatus: true,
            departureDate: true,
            returnDate: true,
            disbursementDate: true,
            estimatedTotal: true,
          },
        },
      },
    });

    return Promise.all(
      rows.map(async (row) => {
        const mapped = mapRow(row);
        const expenseCatalogCompanyId =
          await this.resolveCompanyIdForSapExpenseMovements(
            row.corporateCardNumber,
            row.company.id,
          );
        return { ...mapped, expenseCatalogCompanyId };
      }),
    );
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
            reconciliations: {
              where: {
                requestedByUserId: userId,
                status: 'verified',
              },
              select: { id: true },
              take: 1,
            },
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
      travelRequest: {
        id: trip.travelRequest.id,
        corporateCardNumber: trip.travelRequest.corporateCardNumber,
        dispersedAt: trip.travelRequest.dispersedAt,
        approvedAt: trip.travelRequest.approvedAt,
        employeeName: trip.travelRequest.employeeName,
        user: trip.travelRequest.user,
        company: trip.travelRequest.company,
        hasVerifiedReconciliation:
          trip.travelRequest.reconciliations.length > 0,
      },
      expenses:
        trip.expenses === null ? null : mapExpenseAmounts(trip.expenses),
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
      expenses:
        trip.expenses === null ? null : mapExpenseAmounts(trip.expenses),
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

    const sapCompanyId = await this.resolveCompanyIdForSapExpenseMovements(
      trip.travelRequest.corporateCardNumber,
      trip.travelRequest.companyId,
    );

    const prismaWithAccountCode = this.prisma as PrismaService & {
      readonly accountCode: {
        findMany(args: {
          where: { companyId: number; isActive: boolean };
          select: { code: true };
        }): Promise<readonly { code: string }[]>;
      };
    };

    const accountCodes = await prismaWithAccountCode.accountCode.findMany({
      where: { companyId: sapCompanyId, isActive: true },
      select: { code: true },
    });

    return {
      tripId: trip.id,
      destination: trip.destination,
      departureDate: trip.departureDate,
      returnDate: trip.returnDate,
      companyId: sapCompanyId,
      corporateCardNumber: trip.travelRequest.corporateCardNumber,
      accountCodes: accountCodes.map((row) => row.code),
    };
  }

  private async resolveCompanyIdForSapExpenseMovements(
    corporateCardNumber: string | null,
    travelRequestCompanyId: number,
  ): Promise<number> {
    if (corporateCardNumber === null || corporateCardNumber.trim() === '') {
      return travelRequestCompanyId;
    }

    const trimmed = corporateCardNumber.trim();
    const digitsOnly = trimmed.replace(/\D/g, '');
    const cardNumberOr: { cardNumber: string }[] = [{ cardNumber: trimmed }];
    if (digitsOnly.length > 0 && digitsOnly !== trimmed) {
      cardNumberOr.push({ cardNumber: digitsOnly });
    }

    const card = await this.prisma.card.findFirst({
      where: {
        type: 'VIATIC',
        OR: cardNumberOr,
      },
      select: { companyId: true },
    });

    if (card !== null && card.companyId !== null) {
      return card.companyId;
    }

    return travelRequestCompanyId;
  }

  async findReconciliationTripOwnership(
    tripId: number,
    userId: number,
  ): Promise<ReconciliationTripOwnershipRecord | null> {
    const row = await this.prisma.travelRequestTrip.findFirst({
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
        travelRequestId: true,
        travelRequest: {
          select: {
            employeeName: true,
            company: { select: { name: true } },
          },
        },
      },
    });
    if (row === null) {
      return null;
    }
    return {
      tripId: row.id,
      travelRequestId: row.travelRequestId,
      companyName: row.travelRequest.company.name,
      employeeName: row.travelRequest.employeeName,
    };
  }

  async countTripFilesForUser(tripId: number, userId: number): Promise<number> {
    return this.prisma.travelRequestTripFile.count({
      where: {
        tripId,
        trip: {
          travelRequest: { userId },
        },
      },
    });
  }

  async countReconciliationAttempts(
    travelRequestId: number,
    requestedByUserId: number,
  ): Promise<number> {
    return this.prisma.travelRequestReconciliation.count({
      where: { travelRequestId, requestedByUserId },
    });
  }

  async createTravelRequestReconciliation(input: {
    travelRequestId: number;
    requestedByUserId: number;
    verificationCodeHash: string;
    codeExpiresAt: Date;
  }): Promise<TravelRequestReconciliationRecord> {
    const created = await this.prisma.travelRequestReconciliation.create({
      data: {
        travelRequestId: input.travelRequestId,
        requestedByUserId: input.requestedByUserId,
        verificationCodeHash: input.verificationCodeHash,
        codeExpiresAt: input.codeExpiresAt,
      },
    });
    return created;
  }

  async findLatestTravelRequestReconciliation(
    travelRequestId: number,
    requestedByUserId: number,
  ): Promise<TravelRequestReconciliationRecord | null> {
    return this.prisma.travelRequestReconciliation.findFirst({
      where: { travelRequestId, requestedByUserId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markTravelRequestReconciliationVerified(
    reconciliationId: number,
  ): Promise<void> {
    await this.prisma.travelRequestReconciliation.update({
      where: { id: reconciliationId },
      data: {
        status: 'verified',
        codeVerifiedAt: new Date(),
      },
    });
  }

  async listPendingTravelRequestReconciliations(): Promise<
    readonly PendingTravelRequestReconciliationRecord[]
  > {
    const rows = await this.prisma.travelRequestReconciliation.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        travelRequestId: true,
        status: true,
        verificationCodeHash: true,
        codeExpiresAt: true,
        createdAt: true,
        travelRequest: {
          select: {
            employeeName: true,
            company: { select: { name: true } },
          },
        },
        requestedBy: { select: { id: true, name: true, email: true } },
      },
    });
    return rows.map((row) => ({
      id: row.id,
      travelRequestId: row.travelRequestId,
      status: row.status,
      verificationCode: row.verificationCodeHash,
      codeExpiresAt: row.codeExpiresAt,
      createdAt: row.createdAt,
      employeeName: row.travelRequest.employeeName,
      companyName: row.travelRequest.company.name,
      requestedBy: row.requestedBy,
    }));
  }

  async decideTravelRequestReconciliation(input: {
    reconciliationId: number;
    decidedByUserId: number;
    approve: boolean;
    rejectionReason: string | null;
  }): Promise<TravelRequestReconciliationRecord | null> {
    const current = await this.prisma.travelRequestReconciliation.findUnique({
      where: { id: input.reconciliationId },
    });
    if (current === null || current.status !== 'pending') {
      return null;
    }
    return this.prisma.travelRequestReconciliation.update({
      where: { id: input.reconciliationId },
      data: {
        status: input.approve ? 'approved' : 'rejected',
        decidedByUserId: input.decidedByUserId,
        decidedAt: new Date(),
        rejectionReason: input.approve ? null : input.rejectionReason,
      },
    });
  }

  async findTripMovementProofAccountingSnapshot(
    proofId: number,
  ): Promise<TripMovementProofAccountingSnapshot | null> {
    const row = await this.prisma.tripMovementProof.findUnique({
      where: { id: proofId },
      select: {
        id: true,
        tripId: true,
        movementSequence: true,
        status: true,
        proofType: true,
        movementMemo: true,
        comment: true,
        trip: {
          select: {
            travelRequest: {
              select: { companyId: true, corporateCardNumber: true },
            },
          },
        },
      },
    });
    if (row === null) {
      return null;
    }
    return {
      id: row.id,
      tripId: row.tripId,
      movementSequence: row.movementSequence,
      status: row.status,
      proofType: row.proofType,
      companyId: row.trip.travelRequest.companyId,
      corporateCardNumber: row.trip.travelRequest.corporateCardNumber,
      movementMemo: row.movementMemo,
      proofComment: row.comment,
    };
  }

  async markTripMovementProofApprovedIfSubmitted(proofId: number): Promise<boolean> {
    const resultado = await this.prisma.tripMovementProof.updateMany({
      where: { id: proofId, status: 'submitted' },
      data: { status: 'approved' },
    });
    return resultado.count > 0;
  }

  async listTripMovementProofsByTripId(
    tripId: number,
  ): Promise<readonly TripMovementProofRecord[]> {
    const prismaWithMovementProof = this.prisma as PrismaService & {
      readonly tripMovementProof: {
        findMany(args: {
          where: { tripId: number };
          select: {
            id: true;
            tripId: true;
            movementSequence: true;
            movementDate: true;
            movementAmount: true;
            movementMemo: true;
            comment: true;
            status: true;
            proofType: true;
          };
        }): Promise<
          readonly {
            id: number;
            tripId: number;
            movementSequence: number;
            movementDate: Date;
            movementAmount: { toNumber(): number };
            movementMemo: string | null;
            comment: string | null;
            status: 'submitted' | 'approved' | 'rejected';
            proofType: 'ticket' | 'invoice';
          }[]
        >;
      };
    };

    const proofs = await prismaWithMovementProof.tripMovementProof.findMany({
      where: { tripId },
      select: {
        id: true,
        tripId: true,
        movementSequence: true,
        movementDate: true,
        movementAmount: true,
        movementMemo: true,
        comment: true,
        status: true,
        proofType: true,
      },
    });
    return proofs.map((proof) => ({
      id: proof.id,
      tripId: proof.tripId,
      movementSequence: proof.movementSequence,
      movementDate: proof.movementDate,
      movementAmount: proof.movementAmount.toNumber(),
      movementMemo: proof.movementMemo,
      comment: proof.comment,
      status: proof.status,
      proofType: proof.proofType,
    }));
  }

  async findTripMovementProofXmlFile(input: {
    tripId: number;
    movementSequence: number;
  }): Promise<{
    filePath: string;
    fileName: string | null;
  } | null> {
    const proof = await this.prisma.tripMovementProof.findUnique({
      where: {
        tripId_movementSequence: {
          tripId: input.tripId,
          movementSequence: input.movementSequence,
        },
      },
      select: {
        files: {
          where: {
            fileRole: {
              in: ['invoice_xml', 'invoice_xml_outbound', 'invoice_xml_return'],
            },
          },
          orderBy: { id: 'asc' },
          select: {
            fileUrl: true,
            fileName: true,
          },
          take: 1,
        },
      },
    });

    const xmlFile = proof?.files[0];
    if (xmlFile === undefined) {
      return null;
    }

    return {
      filePath: xmlFile.fileUrl,
      fileName: xmlFile.fileName,
    };
  }

  async areTripFilesOwnedByUser(input: {
    tripId: number;
    userId: number;
    fileIds: readonly number[];
  }): Promise<boolean> {
    if (input.fileIds.length === 0) {
      return false;
    }

    const count = await this.prisma.travelRequestTripFile.count({
      where: {
        id: { in: [...input.fileIds] },
        tripId: input.tripId,
        trip: {
          travelRequest: { userId: input.userId },
        },
      },
    });

    return count === input.fileIds.length;
  }

  async findTripFilesForProofByIds(input: {
    tripId: number;
    userId: number;
    fileIds: readonly number[];
  }): Promise<readonly TripFileForProofValidationRecord[]> {
    if (input.fileIds.length === 0) {
      return [];
    }

    return this.prisma.travelRequestTripFile.findMany({
      where: {
        id: { in: [...input.fileIds] },
        tripId: input.tripId,
        trip: {
          travelRequest: { userId: input.userId },
        },
      },
      select: {
        id: true,
        fileUrl: true,
        fileRole: true,
      },
    });
  }

  async findTripMovementProofIdByTripAndSequence(input: {
    tripId: number;
    movementSequence: number;
  }): Promise<number | null> {
    const row = await this.prisma.tripMovementProof.findUnique({
      where: {
        tripId_movementSequence: {
          tripId: input.tripId,
          movementSequence: input.movementSequence,
        },
      },
      select: { id: true },
    });
    return row?.id ?? null;
  }

  async hasTripMovementProofCfdiUuidConflict(input: {
    cfdiUuid: string;
    excludeTripMovementProofId: number | null;
  }): Promise<boolean> {
    const row = await this.prisma.tripMovementProofCfdi.findFirst({
      where: {
        cfdiUuid: input.cfdiUuid,
        ...(input.excludeTripMovementProofId === null
          ? {}
          : {
              tripMovementProofId: {
                not: input.excludeTripMovementProofId,
              },
            }),
      },
      select: { id: true },
    });
    return row !== null;
  }

  async createTripMovementProof(input: {
    tripId: number;
    movementSequence: number;
    movementDate: Date;
    movementAmount: number;
    movementMemo: string;
    proofType: 'ticket' | 'invoice';
    createdByUserId: number;
    comment: string | null;
    files: readonly {
      tripFileId: number;
      fileRole:
        | 'ticket'
        | 'invoice_xml'
        | 'invoice_pdf'
        | 'invoice_xml_outbound'
        | 'invoice_pdf_outbound'
        | 'invoice_xml_return'
        | 'invoice_pdf_return';
    }[];
    invoiceCfdi: TripMovementProofInvoiceCfdiPersistInput | null;
  }): Promise<TripMovementProofRecord> {
    const crossPassed = input.invoiceCfdi?.cfdiPdfCrosscheckPassed ?? null;
    const crossAt = input.invoiceCfdi?.cfdiPdfCrosscheckAt ?? null;

    return this.prisma.$transaction(async (transaction) => {
      const proof = await transaction.tripMovementProof.upsert({
        where: {
          tripId_movementSequence: {
            tripId: input.tripId,
            movementSequence: input.movementSequence,
          },
        },
        create: {
          tripId: input.tripId,
          movementSequence: input.movementSequence,
          movementDate: input.movementDate,
          movementAmount: input.movementAmount,
          movementMemo: input.movementMemo,
          proofType: input.proofType,
          status: 'submitted',
          comment: input.comment,
          createdByUserId: input.createdByUserId,
          cfdiPdfCrosscheckPassed: crossPassed,
          cfdiPdfCrosscheckAt: crossAt,
        },
        update: {
          movementDate: input.movementDate,
          movementAmount: input.movementAmount,
          movementMemo: input.movementMemo,
          proofType: input.proofType,
          status: 'submitted',
          comment: input.comment,
          createdByUserId: input.createdByUserId,
          cfdiPdfCrosscheckPassed: crossPassed,
          cfdiPdfCrosscheckAt: crossAt,
        },
        select: {
          id: true,
          tripId: true,
          movementSequence: true,
          movementDate: true,
          movementAmount: true,
          movementMemo: true,
          comment: true,
          status: true,
          proofType: true,
        },
      });

      await transaction.tripMovementProofCfdi.deleteMany({
        where: { tripMovementProofId: proof.id },
      });

      await transaction.travelRequestTripFile.updateMany({
        where: {
          tripId: input.tripId,
          tripMovementProofId: proof.id,
        },
        data: {
          tripMovementProofId: null,
          fileRole: null,
        },
      });

      for (const file of input.files) {
        await transaction.travelRequestTripFile.update({
          where: { id: file.tripFileId },
          data: {
            tripMovementProofId: proof.id,
            fileRole: file.fileRole,
          },
        });
      }

      if (input.invoiceCfdi !== null) {
        for (const row of input.invoiceCfdi.cfdiRecords) {
          await transaction.tripMovementProofCfdi.create({
            data: {
              tripMovementProofId: proof.id,
              tripFileId: row.tripFileId,
              cfdiUuid: row.cfdiUuid,
              fechaEmision: row.fechaEmision,
              xmlFileRole: row.xmlFileRole,
            },
          });
        }
      }

      return {
        id: proof.id,
        tripId: proof.tripId,
        movementSequence: proof.movementSequence,
        movementDate: proof.movementDate,
        movementAmount: proof.movementAmount.toNumber(),
        movementMemo: proof.movementMemo,
        comment: proof.comment,
        status: proof.status,
        proofType: proof.proofType,
      };
    });
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
  readonly user: {
    readonly id: number;
    readonly name: string;
    readonly email: string;
  };
  readonly company: { readonly id: number; readonly name: string };
  readonly branch: { readonly id: number; readonly name: string };
  readonly area: { readonly id: number; readonly name: string };
  readonly trips: readonly {
    readonly id: number;
    readonly tripOrder: number;
    readonly destination: string;
    readonly purpose: string;
    readonly tripApprovalStatus: string;
    readonly departureDate: Date;
    readonly returnDate: Date;
    readonly disbursementDate: Date;
    readonly estimatedTotal: { toString(): string };
  }[];
};

function mapRow(
  row: TravelRequestRow,
): Omit<DispersedTravelRequestForCheckRecord, 'expenseCatalogCompanyId'> {
  return {
    id: row.id,
    status: row.status,
    employeeName: row.employeeName,
    corporateCardNumber: row.corporateCardNumber,
    dispersedAt: row.dispersedAt,
    dispersedTotal:
      row.dispersedTotal === null
        ? null
        : Number(row.dispersedTotal.toString()),
    userId: row.userId,
    user: row.user,
    company: row.company,
    branch: row.branch,
    area: row.area,
    trips: row.trips.map((trip) => mapTrip(trip)),
  };
}

function mapTrip(
  trip: TravelRequestRow['trips'][number],
): DispersedTripForCheckRecord {
  return {
    id: trip.id,
    tripOrder: trip.tripOrder,
    destination: trip.destination,
    purpose: trip.purpose,
    tripApprovalStatus: trip.tripApprovalStatus,
    departureDate: trip.departureDate,
    returnDate: trip.returnDate,
    disbursementDate: trip.disbursementDate,
    estimatedTotal: Number(trip.estimatedTotal.toString()),
  };
}
