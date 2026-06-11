import { Injectable, Logger } from '@nestjs/common';
import { PERMISO_VIATICOS_DISPERSAR } from '../../common/sales-viaticos/sales-viaticos-monthly-deadlines';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import type {
  ApprovalFilterCatalogRecord,
  ApprovalRequestRecord,
  AreaLookupRecord,
  ConfirmTravelRequestDispersionResult,
  CardLookupRecord,
  CorrectRejectedTripRepositoryResult,
  CreateTravelRequestRepositoryInput,
  CreatedTravelRequestRecord,
  MyTravelRequestListRecord,
  RequestFormCatalogRecord,
  ResolveTravelRequestTripRepositoryInput,
  ResolveAllPendingTripsRepositoryInput,
  ResolveAllPendingTripsResult,
  TravelRequestDetailForUserRecord,
  TravelRequestFormUserRecord,
  TravelRequestGasolineInput,
  TravelRequestNotificationContactsRecord,
  TravelRequestApprovedNotificationContextRecord,
  TravelRequestDispersedNotificationContextRecord,
  TreasuryDispersionNotificationRecipientRecord,
  TravelRequestPowerAutomateContextRecord,
  TravelRequestRepository,
  TravelRequestTripInput,
  TravelTripGasolineBridgeSourceRecord,
  TripResolutionResult,
  UserEmailLookupRecord,
  UserLookupRecord,
} from '../application/interfaces/travel-request-repository.interface';
import { decodeBase64ImageBuffer } from '../application/utils/decode-base64-image-buffer.util';
import { toPrismaBytesField } from '../application/utils/to-prisma-bytes-field.util';
import { TREASURY_AREA_NAME } from '../domain/treasury-area.constants';

type PrismaDelegate = {
  user: {
    findUnique(args: {
      where: { id: number };
      select: { id: true; name: true; areaId: true; managerId: true };
    }): Promise<UserLookupRecord | null>;
    findFirst(args: {
      where: { id: number };
      select: {
        id: true;
        name: true;
        company: { select: { id: true; name: true } };
        branch: { select: { id: true; name: true } };
        area: { select: { id: true; name: true } };
        cards: {
          select: {
            id: true;
            cardNumber: true;
            type: true;
            isActive: true;
          };
        };
      };
    }): Promise<TravelRequestFormUserRecord | null>;
  };
  area: {
    findUnique(args: {
      where: { id: number };
      select: { id: true; name: true };
    }): Promise<AreaLookupRecord | null>;
    findMany(args: {
      orderBy: { name: 'asc' };
      select: { id: true; name: true };
    }): Promise<readonly { readonly id: number; readonly name: string }[]>;
  };
  company: {
    findMany(args: {
      orderBy: { name: 'asc' };
      select: { id: true; name: true };
    }): Promise<readonly { readonly id: number; readonly name: string }[]>;
  };
  branch: {
    findMany(args: {
      orderBy: { name: 'asc' };
      select: { id: true; name: true; companyId: true };
    }): Promise<
      readonly {
        readonly id: number;
        readonly name: string;
        readonly companyId: number | null;
      }[]
    >;
  };
  card: {
    findUnique(args: {
      where: { id: number };
      select: { id: true; type: true; isActive: true };
    }): Promise<CardLookupRecord | null>;
  };
  travelRequest: {
    create(args: {
      data: {
        userId: number;
        companyId: number;
        branchId: number;
        areaId: number;
        approverId: number | null;
        employeeName: string;
        corporateCardNumber: string | null;
        status: 'submitted';
        submittedAt: Date;
        trips: {
          create: {
            tripOrder: number;
            destination: string;
            purpose: string;
            departureDate: Date;
            returnDate: Date;
            disbursementDate: Date;
            estimatedTotal: number;
            expenses: {
              create: {
                transport: number;
                tolls: number;
                lodging: number;
                food: number;
                freight: number;
                tools: number;
                shipping: number;
                miscellaneous: number;
              };
            };
            objectives: {
              create: {
                objectiveOrder: number;
                description: string;
              }[];
            };
            gasoline: {
              create: {
                requiresGasoline: boolean;
                cardId: number | null;
                plate: string | null;
                currentMileageKm: number | null;
                requestedAmount: number | null;
                distanceKm: number | null;
                comments: string | null;
              };
            };
            tag: {
              create: {
                requiresTag: boolean;
                requestedAmount: number | null;
                comments: string | null;
              };
            };
          }[];
        };
      };
      select: { id: true; status: true; createdAt: true };
    }): Promise<CreatedTravelRequestRecord>;
    findMany(args: {
      where?: { status: 'approved' };
      orderBy: { createdAt: 'desc' };
      include: {
        user: { select: { email: true } };
        company: { select: { name: true } };
        area: { select: { name: true } };
        approver: { select: { name: true } };
        dispersedBy: { select: { name: true } };
        trips: {
          select: {
            id: true;
            tripOrder: true;
            tripApprovalStatus: true;
            approverComment: true;
            approvedBy: {
              select: {
                name: true;
              };
            };
            destination: true;
            purpose: true;
            departureDate: true;
            returnDate: true;
            disbursementDate: true;
            estimatedTotal: true;
            expenses: {
              select: {
                transport: true;
                tolls: true;
                lodging: true;
                food: true;
                freight: true;
                tools: true;
                shipping: true;
                miscellaneous: true;
              };
            };
            gasoline: {
              select: {
                requiresGasoline: true;
                requestedAmount: true;
              };
            };
            tag: {
              select: {
                requiresTag: true;
                requestedAmount: true;
              };
            };
          };
        };
      };
    }): Promise<readonly ApprovalRequestRecord[]>;
  };
};

const DISPERSION_QUEUE_WHERE = { status: 'approved' as const };

type TravelRequestTripTransactionClient = {
  travelRequestTrip: {
    findUnique(args: {
      where: { id: number };
      select: {
        id: true;
        travelRequestId: true;
        tripApprovalStatus: true;
      };
    }): Promise<{
      id: number;
      travelRequestId: number;
      tripApprovalStatus: string;
    } | null>;
    update(args: {
      where: { id: number };
      data: {
        tripApprovalStatus: 'approved' | 'rejected' | 'pending' | 'dispersed';
        approvedAt: Date | null;
        rejectedAt: Date | null;
        approverComment: string | null;
        approvedById?: number | null;
      };
    }): Promise<unknown>;
    findMany(args: {
      where: { travelRequestId: number };
      select: { tripApprovalStatus: true };
    }): Promise<{ tripApprovalStatus: string }[]>;
  };
  travelRequest: {
    update(args: {
      where: { id: number };
      data: {
        status:
          | 'submitted'
          | 'awaiting_trip_correction'
          | 'approved'
          | 'rejected';
        approvedAt: Date | null;
        rejectedAt: Date | null;
      };
    }): Promise<unknown>;
  };
};

type PrismaWithTripResolutionTransaction = {
  $transaction<T>(
    handler: (transaction: TravelRequestTripTransactionClient) => Promise<T>,
  ): Promise<T>;
};

type TripStatusRow = {
  readonly tripApprovalStatus: string;
};

function computeTravelRequestStatusFromTrips(trips: readonly TripStatusRow[]): {
  readonly status:
    | 'submitted'
    | 'awaiting_trip_correction'
    | 'approved'
    | 'rejected';
  readonly approvedAt: Date | null;
  readonly rejectedAt: Date | null;
} {
  if (trips.length === 0) {
    return {
      status: 'submitted',
      approvedAt: null,
      rejectedAt: null,
    };
  }

  const everyApproved = trips.every(
    (tripRow) => tripRow.tripApprovalStatus === 'approved',
  );

  if (everyApproved) {
    return {
      status: 'approved',
      approvedAt: new Date(),
      rejectedAt: null,
    };
  }

  const someRejected = trips.some(
    (tripRow) => tripRow.tripApprovalStatus === 'rejected',
  );

  if (someRejected) {
    const everyRejected = trips.every(
      (tripRow) => tripRow.tripApprovalStatus === 'rejected',
    );

    if (everyRejected) {
      return {
        status: 'rejected',
        approvedAt: null,
        rejectedAt: new Date(),
      };
    }

    return {
      status: 'awaiting_trip_correction',
      approvedAt: null,
      rejectedAt: null,
    };
  }

  return {
    status: 'submitted',
    approvedAt: null,
    rejectedAt: null,
  };
}

@Injectable()
export class TravelRequestPrismaRepository implements TravelRequestRepository {
  private readonly logger = new Logger(TravelRequestPrismaRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(userId: number): Promise<UserLookupRecord | null> {
    const prisma = this.prismaService as unknown as PrismaDelegate;
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, areaId: true, managerId: true },
    });
  }

  async findUserByEmail(email: string): Promise<UserEmailLookupRecord | null> {
    const normalizedEmail = email.trim();

    if (normalizedEmail.length === 0) {
      return null;
    }

    const user = await this.prismaService.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, email: true },
    });

    return user;
  }

  async findTravelRequestPowerAutomateContext(
    travelRequestId: number,
  ): Promise<TravelRequestPowerAutomateContextRecord | null> {
    const travelRequest = await this.prismaService.travelRequest.findUnique({
      where: { id: travelRequestId },
      select: {
        approverId: true,
        approver: { select: { email: true } },
        trips: {
          where: { tripApprovalStatus: 'pending' },
          select: { id: true },
        },
      },
    });

    if (travelRequest === null) {
      return null;
    }

    return {
      approverId: travelRequest.approverId,
      approverEmail: travelRequest.approver?.email ?? null,
      pendingTripIds: travelRequest.trips.map((trip) => trip.id),
    };
  }

  async resolveAllPendingTripsForTravelRequest(
    input: ResolveAllPendingTripsRepositoryInput,
  ): Promise<ResolveAllPendingTripsResult> {
    this.logger.debug(
      `resolveAllPendingTrips solicitud #${input.travelRequestId} | resolution=${input.resolution} | actorUserId=${input.actorUserId}`,
    );

    const result = await this.prismaService.$transaction(async (transaction) => {
      const travelRequest = await transaction.travelRequest.findUnique({
        where: { id: input.travelRequestId },
        select: { id: true },
      });

      if (travelRequest === null) {
        return 'not_found';
      }

      const pendingTrips = await transaction.travelRequestTrip.findMany({
        where: {
          travelRequestId: input.travelRequestId,
          tripApprovalStatus: 'pending',
        },
        select: { id: true },
      });

      if (pendingTrips.length === 0) {
        return 'no_pending_trips';
      }

      const now = new Date();

      for (const pendingTrip of pendingTrips) {
        if (input.resolution === 'approve') {
          const approvalComment =
            input.comment !== null && input.comment.trim().length > 0
              ? input.comment.trim()
              : null;

          await transaction.travelRequestTrip.update({
            where: { id: pendingTrip.id },
            data: {
              tripApprovalStatus: 'approved',
              approvedAt: now,
              rejectedAt: null,
              approverComment: approvalComment,
              approvedById: input.actorUserId,
            },
          });
        } else {
          await transaction.travelRequestTrip.update({
            where: { id: pendingTrip.id },
            data: {
              tripApprovalStatus: 'rejected',
              rejectedAt: now,
              approvedAt: null,
              approvedById: null,
              approverComment: input.comment?.trim() ?? '',
            },
          });
        }
      }

      const trips = await transaction.travelRequestTrip.findMany({
        where: { travelRequestId: input.travelRequestId },
        select: { tripApprovalStatus: true },
      });

      const aggregate = computeTravelRequestStatusFromTrips(trips);

      await transaction.travelRequest.update({
        where: { id: input.travelRequestId },
        data: {
          status: aggregate.status,
          approvedAt: aggregate.approvedAt,
          rejectedAt: aggregate.rejectedAt,
        },
      });

      return 'ok';
    });

    this.logger.log(
      `resolveAllPendingTrips resultado solicitud #${input.travelRequestId}: ${result}`,
    );

    return result;
  }

  async findTravelRequestNotificationContacts(
    userId: number,
  ): Promise<TravelRequestNotificationContactsRecord | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        name: true,
        company: { select: { name: true } },
        manager: { select: { name: true, email: true } },
      },
    });

    if (user === null) {
      return null;
    }

    if (user.email.trim().length === 0) {
      return null;
    }

    const bossName = user.manager?.name ?? 'Por asignar';
    const bossEmail = user.manager?.email?.trim() ?? null;

    return {
      employeeEmail: user.email,
      employeeName: user.name,
      bossName,
      bossEmail: bossEmail && bossEmail.length > 0 ? bossEmail : null,
      companyName: user.company.name,
    };
  }

  async findTravelRequestApprovedNotificationContext(
    travelRequestId: number,
  ): Promise<TravelRequestApprovedNotificationContextRecord | null> {
    const travelRequest = await this.prismaService.travelRequest.findUnique({
      where: { id: travelRequestId },
      select: {
        id: true,
        companyId: true,
        status: true,
        employeeName: true,
        corporateCardNumber: true,
        user: {
          select: {
            email: true,
            manager: { select: { name: true, email: true } },
            company: { select: { name: true } },
          },
        },
        approver: { select: { name: true, email: true } },
        trips: {
          orderBy: { tripOrder: 'asc' },
          select: {
            tripOrder: true,
            destination: true,
            purpose: true,
            departureDate: true,
            returnDate: true,
            disbursementDate: true,
            estimatedTotal: true,
            objectives: {
              orderBy: { objectiveOrder: 'asc' },
              select: { description: true },
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
            gasoline: {
              select: {
                requiresGasoline: true,
                cardId: true,
                plate: true,
                currentMileageKm: true,
                requestedAmount: true,
                distanceKm: true,
                comments: true,
              },
            },
            tag: {
              select: {
                requiresTag: true,
                requestedAmount: true,
                comments: true,
              },
            },
          },
        },
      },
    });

    if (travelRequest === null) {
      return null;
    }

    const employeeEmail = travelRequest.user.email.trim();
    if (employeeEmail.length === 0) {
      return null;
    }

    const bossName =
      travelRequest.approver?.name ??
      travelRequest.user.manager?.name ??
      'Por asignar';

    const approverEmail = travelRequest.approver?.email?.trim() ?? '';
    const managerEmail = travelRequest.user.manager?.email?.trim() ?? '';
    const bossEmail =
      approverEmail.length > 0
        ? approverEmail
        : managerEmail.length > 0
          ? managerEmail
          : null;

    return {
      requestId: travelRequest.id,
      companyId: travelRequest.companyId,
      status: travelRequest.status,
      employeeName: travelRequest.employeeName,
      corporateCardNumber: travelRequest.corporateCardNumber,
      employeeEmail,
      bossName,
      bossEmail,
      companyName: travelRequest.user.company.name,
      trips: travelRequest.trips.map((trip) =>
        mapStoredTripToNotificationTripInput(trip),
      ),
    };
  }

  async findTravelRequestDispersedNotificationContext(
    travelRequestId: number,
  ): Promise<TravelRequestDispersedNotificationContextRecord | null> {
    const travelRequest = await this.prismaService.travelRequest.findUnique({
      where: { id: travelRequestId },
      select: {
        id: true,
        status: true,
        employeeName: true,
        corporateCardNumber: true,
        dispersedTotal: true,
        user: {
          select: {
            email: true,
            manager: { select: { name: true, email: true } },
            company: { select: { name: true } },
          },
        },
        approver: { select: { name: true, email: true } },
        dispersedBy: { select: { name: true } },
        trips: {
          orderBy: { tripOrder: 'asc' },
          select: {
            tripOrder: true,
            destination: true,
            purpose: true,
            departureDate: true,
            returnDate: true,
            disbursementDate: true,
            estimatedTotal: true,
            objectives: {
              orderBy: { objectiveOrder: 'asc' },
              select: { description: true },
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
            gasoline: {
              select: {
                requiresGasoline: true,
                cardId: true,
                plate: true,
                currentMileageKm: true,
                requestedAmount: true,
                distanceKm: true,
                comments: true,
              },
            },
            tag: {
              select: {
                requiresTag: true,
                requestedAmount: true,
                comments: true,
              },
            },
          },
        },
      },
    });

    if (travelRequest === null) {
      return null;
    }

    const employeeEmail = travelRequest.user.email.trim();
    if (employeeEmail.length === 0) {
      return null;
    }

    const dispersedTotal = decimalToNumber(travelRequest.dispersedTotal);
    if (!Number.isFinite(dispersedTotal) || dispersedTotal <= 0) {
      return null;
    }

    const bossName =
      travelRequest.approver?.name ??
      travelRequest.user.manager?.name ??
      'Por asignar';

    const approverEmail = travelRequest.approver?.email?.trim() ?? '';
    const managerEmail = travelRequest.user.manager?.email?.trim() ?? '';
    const bossEmail =
      approverEmail.length > 0
        ? approverEmail
        : managerEmail.length > 0
          ? managerEmail
          : null;

    const dispersorName = travelRequest.dispersedBy?.name?.trim() ?? '';
    if (dispersorName.length === 0) {
      return null;
    }

    return {
      requestId: travelRequest.id,
      status: travelRequest.status,
      employeeName: travelRequest.employeeName,
      corporateCardNumber: travelRequest.corporateCardNumber,
      employeeEmail,
      bossName,
      bossEmail,
      dispersorName,
      companyName: travelRequest.user.company.name,
      dispersedTotal,
      trips: travelRequest.trips.map((trip) =>
        mapStoredTripToNotificationTripInput(trip),
      ),
    };
  }

  async findTreasuryDispersionNotificationRecipients(
    companyId: number,
  ): Promise<readonly TreasuryDispersionNotificationRecipientRecord[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        isActive: true,
        companyId,
        area: { name: TREASURY_AREA_NAME },
        OR: [
          {
            userExtraPermissions: {
              some: { permissionCode: PERMISO_VIATICOS_DISPERSAR },
            },
          },
          {
            role: {
              roleDefaultPermissions: {
                some: { permissionCode: PERMISO_VIATICOS_DISPERSAR },
              },
            },
          },
          {
            role: { name: 'super_administrador' },
          },
        ],
      },
      select: { email: true, name: true },
      orderBy: { name: 'asc' },
    });

    const recipientsByEmail = new Map<string, TreasuryDispersionNotificationRecipientRecord>();

    for (const user of users) {
      const normalizedEmail = user.email.trim().toLowerCase();
      const dispersorName = user.name.trim();
      if (normalizedEmail.length === 0 || dispersorName.length === 0) {
        continue;
      }
      if (!recipientsByEmail.has(normalizedEmail)) {
        recipientsByEmail.set(normalizedEmail, {
          email: normalizedEmail,
          dispersorName,
        });
      }
    }

    return [...recipientsByEmail.values()];
  }

  async findAreaById(areaId: number): Promise<AreaLookupRecord | null> {
    const prisma = this.prismaService as unknown as PrismaDelegate;
    return prisma.area.findUnique({
      where: { id: areaId },
      select: { id: true, name: true },
    });
  }

  async findFuelCardById(cardId: number): Promise<CardLookupRecord | null> {
    const prisma = this.prismaService as unknown as PrismaDelegate;
    return prisma.card.findUnique({
      where: { id: cardId },
      select: { id: true, type: true, isActive: true },
    });
  }

  async findFormDataByUserId(
    userId: number,
  ): Promise<TravelRequestFormUserRecord | null> {
    const prisma = this.prismaService as unknown as PrismaDelegate;

    return prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        branch: {
          select: {
            id: true,
            name: true,
          },
        },
        area: {
          select: {
            id: true,
            name: true,
          },
        },
        cards: {
          select: {
            id: true,
            cardNumber: true,
            type: true,
            isActive: true,
          },
        },
      },
    });
  }

  async findApprovalFilterCatalog(): Promise<ApprovalFilterCatalogRecord> {
    const prisma = this.prismaService as unknown as PrismaDelegate;
    const [areas, companies] = await Promise.all([
      prisma.area.findMany({
        orderBy: { name: 'asc' },
        select: { id: true, name: true },
      }),
      prisma.company.findMany({
        orderBy: { name: 'asc' },
        select: { id: true, name: true },
      }),
    ]);

    return { areas, companies };
  }

  async findRequestFormCatalog(): Promise<RequestFormCatalogRecord> {
    const prisma = this.prismaService as unknown as PrismaDelegate;
    const [areas, companies, branches] = await Promise.all([
      prisma.area.findMany({
        orderBy: { name: 'asc' },
        select: { id: true, name: true },
      }),
      prisma.company.findMany({
        orderBy: { name: 'asc' },
        select: { id: true, name: true },
      }),
      prisma.branch.findMany({
        orderBy: { name: 'asc' },
        select: { id: true, name: true, companyId: true },
      }),
    ]);

    return { areas, companies, branches };
  }

  async createTravelRequest(
    input: CreateTravelRequestRepositoryInput,
  ): Promise<CreatedTravelRequestRecord> {
    const prisma = this.prismaService as unknown as PrismaDelegate;

    return prisma.travelRequest.create({
      data: {
        userId: input.userId,
        companyId: input.companyId,
        branchId: input.branchId,
        areaId: input.areaId,
        approverId: input.approverId,
        employeeName: input.employeeName,
        corporateCardNumber: input.corporateCardNumber,
        status: 'submitted',
        submittedAt: new Date(),
        trips: {
          create: input.trips.map((trip) => ({
            tripOrder: trip.ordenViaje,
            destination: trip.destinoViaje,
            purpose: trip.motivoViaje,
            departureDate: trip.fechaSalida,
            returnDate: trip.fechaRegreso,
            disbursementDate: trip.fechaDispersion,
            estimatedTotal: trip.totalEstimado,
            expenses: {
              create: {
                transport: trip.gastos.transporte,
                tolls: trip.gastos.peajes,
                lodging: trip.gastos.hospedaje,
                food: trip.gastos.alimentos,
                freight: trip.gastos.fletes,
                tools: trip.gastos.herramientas,
                shipping: trip.gastos.envios,
                miscellaneous: trip.gastos.miscelaneos,
              },
            },
            objectives: {
              create: trip.objetivos.map((objective, objectiveIndex) => ({
                objectiveOrder: objectiveIndex + 1,
                description: objective,
              })),
            },
            gasoline: {
              create: buildTravelTripGasolineCreateData(trip.gasolina),
            },
            tag: {
              create: {
                requiresTag: trip.tag.necesitaTag,
                requestedAmount: trip.tag.montoSolicitado,
                comments: trip.tag.comentarios,
              },
            },
          })),
        },
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async findApprovalRequests(): Promise<readonly ApprovalRequestRecord[]> {
    const prisma = this.prismaService as unknown as PrismaDelegate;

    const rows = await prisma.travelRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        company: {
          select: {
            name: true,
          },
        },
        area: {
          select: {
            name: true,
          },
        },
        approver: {
          select: {
            name: true,
          },
        },
        dispersedBy: {
          select: {
            name: true,
          },
        },
        trips: {
          select: {
            id: true,
            tripOrder: true,
            tripApprovalStatus: true,
            approverComment: true,
            approvedBy: {
              select: {
                name: true,
              },
            },
            destination: true,
            purpose: true,
            departureDate: true,
            returnDate: true,
            disbursementDate: true,
            estimatedTotal: true,
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
            gasoline: {
              select: {
                requiresGasoline: true,
                requestedAmount: true,
              },
            },
            tag: {
              select: {
                requiresTag: true,
                requestedAmount: true,
              },
            },
          },
        },
      },
    });

    return rows.map(mapApprovalRequestRow);
  }

  async findDispersedRequestsInDateRange(input: {
    readonly dispersedFrom: Date;
    readonly dispersedTo: Date;
  }): Promise<readonly ApprovalRequestRecord[]> {
    const filas = await this.prismaService.travelRequest.findMany({
      where: {
        status: 'dispersed',
        dispersedAt: {
          gte: input.dispersedFrom,
          lte: input.dispersedTo,
        },
      },
      orderBy: {
        dispersedAt: 'desc',
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        company: {
          select: {
            name: true,
          },
        },
        area: {
          select: {
            name: true,
          },
        },
        approver: {
          select: {
            name: true,
          },
        },
        dispersedBy: {
          select: {
            name: true,
          },
        },
        trips: {
          select: {
            id: true,
            tripOrder: true,
            tripApprovalStatus: true,
            approverComment: true,
            approvedBy: {
              select: {
                name: true,
              },
            },
            destination: true,
            purpose: true,
            departureDate: true,
            returnDate: true,
            disbursementDate: true,
            estimatedTotal: true,
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
            gasoline: {
              select: {
                requiresGasoline: true,
                requestedAmount: true,
              },
            },
            tag: {
              select: {
                requiresTag: true,
                requestedAmount: true,
              },
            },
          },
        },
      },
    });

    return filas.map(mapApprovalRequestRow);
  }

  async findDispersionPendingRequests(): Promise<
    readonly ApprovalRequestRecord[]
  > {
    const prisma = this.prismaService as unknown as PrismaDelegate;

    const rows = await prisma.travelRequest.findMany({
      where: DISPERSION_QUEUE_WHERE,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        company: {
          select: {
            name: true,
          },
        },
        area: {
          select: {
            name: true,
          },
        },
        approver: {
          select: {
            name: true,
          },
        },
        dispersedBy: {
          select: {
            name: true,
          },
        },
        trips: {
          select: {
            id: true,
            tripOrder: true,
            tripApprovalStatus: true,
            approverComment: true,
            approvedBy: {
              select: {
                name: true,
              },
            },
            destination: true,
            purpose: true,
            departureDate: true,
            returnDate: true,
            disbursementDate: true,
            estimatedTotal: true,
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
            gasoline: {
              select: {
                requiresGasoline: true,
                requestedAmount: true,
              },
            },
            tag: {
              select: {
                requiresTag: true,
                requestedAmount: true,
              },
            },
          },
        },
      },
    });

    return rows.map(mapApprovalRequestRow);
  }

  async confirmTravelRequestDispersion(input: {
    readonly travelRequestId: number;
    readonly dispersedTotal: number;
    readonly dispersionComment: string | null;
    readonly dispersedByUserId: number;
  }): Promise<ConfirmTravelRequestDispersionResult> {
    return this.prismaService.$transaction(async (transaction) => {
      const request = await transaction.travelRequest.findUnique({
        where: { id: input.travelRequestId },
        select: { id: true, status: true },
      });

      if (!request) {
        return 'not_found';
      }

      if (request.status !== 'approved') {
        return 'invalid_status';
      }

      const tripsUpdated = await transaction.travelRequestTrip.updateMany({
        where: {
          travelRequestId: input.travelRequestId,
          tripApprovalStatus: 'approved',
        },
        data: { tripApprovalStatus: 'dispersed' },
      });

      if (tripsUpdated.count === 0) {
        return 'invalid_status';
      }

      await transaction.travelRequest.update({
        where: { id: input.travelRequestId },
        data: {
          status: 'dispersed',
          dispersedAt: new Date(),
          dispersedTotal: input.dispersedTotal,
          dispersionComment: input.dispersionComment,
          dispersedById: input.dispersedByUserId,
        },
      });

      return 'ok';
    });
  }

  async resolveTravelRequestTripResolution(
    input: ResolveTravelRequestTripRepositoryInput,
  ): Promise<TripResolutionResult> {
    const prisma = this
      .prismaService as unknown as PrismaWithTripResolutionTransaction;

    return prisma.$transaction(async (transaction) => {
      const trip = await transaction.travelRequestTrip.findUnique({
        where: { id: input.tripId },
        select: {
          id: true,
          travelRequestId: true,
          tripApprovalStatus: true,
        },
      });

      if (!trip) {
        return 'not_found';
      }

      if (trip.tripApprovalStatus !== 'pending') {
        return 'invalid_status';
      }

      const now = new Date();

      if (input.resolution === 'approve') {
        const notaAprobacion =
          input.comment !== null && input.comment.trim().length > 0
            ? input.comment.trim()
            : null;
        await transaction.travelRequestTrip.update({
          where: { id: input.tripId },
          data: {
            tripApprovalStatus: 'approved',
            approvedAt: now,
            rejectedAt: null,
            approverComment: notaAprobacion,
            approvedById: input.actorUserId,
          },
        });
      } else {
        await transaction.travelRequestTrip.update({
          where: { id: input.tripId },
          data: {
            tripApprovalStatus: 'rejected',
            rejectedAt: now,
            approvedAt: null,
            approvedById: null,
            approverComment: input.comment?.trim() ?? '',
          },
        });
      }

      const trips = await transaction.travelRequestTrip.findMany({
        where: { travelRequestId: trip.travelRequestId },
        select: { tripApprovalStatus: true },
      });

      const aggregate = computeTravelRequestStatusFromTrips(trips);

      await transaction.travelRequest.update({
        where: { id: trip.travelRequestId },
        data: {
          status: aggregate.status,
          approvedAt: aggregate.approvedAt,
          rejectedAt: aggregate.rejectedAt,
        },
      });

      return {
        outcome: 'ok',
        travelRequestId: trip.travelRequestId,
        requestStatus: aggregate.status,
      };
    });
  }

  async findTravelRequestsByUserId(
    userId: number,
  ): Promise<readonly MyTravelRequestListRecord[]> {
    const prisma = this.prismaService as unknown as {
      travelRequest: {
        findMany(args: {
          where: {
            userId: number;
            status: string;
            trips?: { some: { tripApprovalStatus: string } };
          };
          orderBy: { createdAt: 'desc' };
          select: {
            id: true;
            status: true;
            createdAt: true;
            trips: {
              where?: { tripApprovalStatus: string };
              orderBy: { tripOrder: 'asc' };
              select: {
                id: true;
                tripOrder: true;
                destination: true;
                tripApprovalStatus: true;
                approverComment: true;
                approvedAt: true;
                rejectedAt: true;
              };
            };
          };
        }): Promise<MyTravelRequestListRecord[]>;
      };
    };

    return prisma.travelRequest.findMany({
      where: {
        userId,
        status: 'dispersed',
        trips: { some: { tripApprovalStatus: 'dispersed' } },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        createdAt: true,
        trips: {
          where: { tripApprovalStatus: 'dispersed' },
          orderBy: { tripOrder: 'asc' },
          select: {
            id: true,
            tripOrder: true,
            destination: true,
            tripApprovalStatus: true,
            approverComment: true,
            approvedAt: true,
            rejectedAt: true,
          },
        },
      },
    });
  }

  async findTravelRequestDetailForUser(
    travelRequestId: number,
    userId: number,
  ): Promise<TravelRequestDetailForUserRecord | null> {
    const row = await this.prismaService.travelRequest.findFirst({
      where: { id: travelRequestId, userId },
      select: {
        id: true,
        status: true,
        employeeName: true,
        corporateCardNumber: true,
        company: { select: { id: true, name: true } },
        branch: { select: { id: true, name: true } },
        area: { select: { id: true, name: true } },
        trips: {
          orderBy: { tripOrder: 'asc' },
          select: {
            id: true,
            tripOrder: true,
            tripApprovalStatus: true,
            destination: true,
            purpose: true,
            departureDate: true,
            returnDate: true,
            disbursementDate: true,
            estimatedTotal: true,
            objectives: {
              orderBy: { objectiveOrder: 'asc' },
              select: { description: true },
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
            gasoline: {
              select: {
                requiresGasoline: true,
                cardId: true,
                plate: true,
                currentMileageKm: true,
                requestedAmount: true,
                distanceKm: true,
                comments: true,
                card: { select: { cardNumber: true } },
              },
            },
            tag: {
              select: {
                requiresTag: true,
                requestedAmount: true,
                comments: true,
              },
            },
          },
        },
      },
    });

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      status: row.status,
      employeeName: row.employeeName,
      corporateCardNumber: row.corporateCardNumber,
      company: row.company,
      branch: row.branch,
      area: row.area,
      trips: row.trips.map((trip) => ({
        id: trip.id,
        tripOrder: trip.tripOrder,
        tripApprovalStatus: trip.tripApprovalStatus,
        destination: trip.destination,
        purpose: trip.purpose,
        departureDate: trip.departureDate,
        returnDate: trip.returnDate,
        disbursementDate: trip.disbursementDate,
        estimatedTotal: decimalToNumber(trip.estimatedTotal),
        objectives: trip.objectives,
        expenses: trip.expenses
          ? {
              transport: decimalToNumber(trip.expenses.transport),
              tolls: decimalToNumber(trip.expenses.tolls),
              lodging: decimalToNumber(trip.expenses.lodging),
              food: decimalToNumber(trip.expenses.food),
              freight: decimalToNumber(trip.expenses.freight),
              tools: decimalToNumber(trip.expenses.tools),
              shipping: decimalToNumber(trip.expenses.shipping),
              miscellaneous: decimalToNumber(trip.expenses.miscellaneous),
            }
          : null,
        gasoline: trip.gasoline
          ? {
              requiresGasoline: trip.gasoline.requiresGasoline,
              cardId: trip.gasoline.cardId,
              cardNumber: trip.gasoline.card?.cardNumber ?? null,
              plate: trip.gasoline.plate,
              currentMileageKm: decimalToNullableNumber(
                trip.gasoline.currentMileageKm,
              ),
              requestedAmount: decimalToNullableNumber(
                trip.gasoline.requestedAmount,
              ),
              distanceKm: decimalToNullableNumber(trip.gasoline.distanceKm),
              comments: trip.gasoline.comments,
            }
          : null,
        tag: trip.tag
          ? {
              requiresTag: trip.tag.requiresTag,
              requestedAmount: decimalToNullableNumber(
                trip.tag.requestedAmount,
              ),
              comments: trip.tag.comments,
            }
          : null,
      })),
    };
  }

  async findTravelRequestDetailByTripForUser(
    tripId: number,
    userId: number,
  ): Promise<TravelRequestDetailForUserRecord | null> {
    const trip = await this.prismaService.travelRequestTrip.findFirst({
      where: {
        id: tripId,
        travelRequest: { userId },
      },
      select: { travelRequestId: true },
    });

    if (!trip) {
      return null;
    }

    return this.findTravelRequestDetailForUser(trip.travelRequestId, userId);
  }

  async correctRejectedTrip(
    userId: number,
    tripId: number,
    trip: TravelRequestTripInput,
  ): Promise<CorrectRejectedTripRepositoryResult> {
    return this.prismaService.$transaction(async (transaction) => {
      const existingTrip = await transaction.travelRequestTrip.findUnique({
        where: { id: tripId },
        select: {
          id: true,
          travelRequestId: true,
          tripApprovalStatus: true,
          travelRequest: { select: { userId: true } },
        },
      });

      if (!existingTrip) {
        return 'not_found';
      }

      if (existingTrip.travelRequest.userId !== userId) {
        return 'forbidden';
      }

      if (existingTrip.tripApprovalStatus !== 'rejected') {
        return 'invalid_status';
      }

      await transaction.travelRequestTripObjective.deleteMany({
        where: { tripId },
      });

      await transaction.travelRequestTrip.update({
        where: { id: tripId },
        data: {
          destination: trip.destinoViaje,
          purpose: trip.motivoViaje,
          departureDate: trip.fechaSalida,
          returnDate: trip.fechaRegreso,
          disbursementDate: trip.fechaDispersion,
          estimatedTotal: trip.totalEstimado,
          tripApprovalStatus: 'pending',
          approverComment: null,
          approvedAt: null,
          rejectedAt: null,
          approvedById: null,
          objectives: {
            create: trip.objetivos.map((objective, objectiveIndex) => ({
              objectiveOrder: objectiveIndex + 1,
              description: objective,
            })),
          },
          expenses: {
            update: {
              transport: trip.gastos.transporte,
              tolls: trip.gastos.peajes,
              lodging: trip.gastos.hospedaje,
              food: trip.gastos.alimentos,
              freight: trip.gastos.fletes,
              tools: trip.gastos.herramientas,
              shipping: trip.gastos.envios,
              miscellaneous: trip.gastos.miscelaneos,
            },
          },
          gasoline: {
            update: buildTravelTripGasolineUpdateData(trip.gasolina),
          },
          tag: {
            update: {
              requiresTag: trip.tag.necesitaTag,
              requestedAmount: trip.tag.montoSolicitado,
              comments: trip.tag.comentarios,
            },
          },
        },
      });

      const tripStatusRows = await transaction.travelRequestTrip.findMany({
        where: { travelRequestId: existingTrip.travelRequestId },
        select: { tripApprovalStatus: true },
      });

      const aggregate = computeTravelRequestStatusFromTrips(tripStatusRows);

      await transaction.travelRequest.update({
        where: { id: existingTrip.travelRequestId },
        data: {
          status: aggregate.status,
          approvedAt: aggregate.approvedAt,
          rejectedAt: aggregate.rejectedAt,
        },
      });

      return 'ok';
    });
  }

  async findTravelTripGasolineBridgeSource(
    tripId: number,
  ): Promise<TravelTripGasolineBridgeSourceRecord | null> {
    const trip = await this.prismaService.travelRequestTrip.findUnique({
      where: { id: tripId },
      select: {
        id: true,
        destination: true,
        travelRequest: {
          select: {
            id: true,
            userId: true,
            companyId: true,
            branchId: true,
            areaId: true,
          },
        },
        gasoline: {
          select: {
            requiresGasoline: true,
            cardId: true,
            plate: true,
            currentMileageKm: true,
            requestedAmount: true,
            distanceKm: true,
            comments: true,
            odometerPhoto: true,
          },
        },
        gasolineRequest: {
          select: { id: true },
        },
      },
    });

    if (trip === null || trip.gasoline === null) {
      return null;
    }

    const travelRequest = trip.travelRequest;

    return {
      tripId: trip.id,
      travelRequestId: travelRequest.id,
      userId: travelRequest.userId,
      companyId: travelRequest.companyId,
      branchId: travelRequest.branchId,
      areaId: travelRequest.areaId,
      destination: trip.destination,
      requiresGasoline: trip.gasoline.requiresGasoline,
      cardId: trip.gasoline.cardId,
      plate: trip.gasoline.plate,
      currentMileageKm: decimalToNullableNumber(trip.gasoline.currentMileageKm),
      requestedAmount: decimalToNullableNumber(trip.gasoline.requestedAmount),
      distanceKm: decimalToNullableNumber(trip.gasoline.distanceKm),
      comments: trip.gasoline.comments,
      odometerPhoto:
        trip.gasoline.odometerPhoto !== null &&
        trip.gasoline.odometerPhoto !== undefined
          ? Buffer.from(trip.gasoline.odometerPhoto)
          : null,
      existingGasolineRequestId: trip.gasolineRequest?.id ?? null,
    };
  }
}

type RawApprovalRequestTripRow = {
  readonly id: number;
  readonly tripOrder: number;
  readonly tripApprovalStatus: string;
  readonly approverComment: string | null;
  readonly approvedBy: { readonly name: string } | null;
  readonly destination: string;
  readonly purpose: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly disbursementDate: Date;
  readonly estimatedTotal: { toString(): string };
  readonly expenses: {
    readonly transport: { toString(): string };
    readonly tolls: { toString(): string };
    readonly lodging: { toString(): string };
    readonly food: { toString(): string };
    readonly freight: { toString(): string };
    readonly tools: { toString(): string };
    readonly shipping: { toString(): string };
    readonly miscellaneous: { toString(): string };
  } | null;
  readonly gasoline: {
    readonly requiresGasoline: boolean;
    readonly requestedAmount: { toString(): string } | null;
  } | null;
  readonly tag: {
    readonly requiresTag: boolean;
    readonly requestedAmount: { toString(): string } | null;
  } | null;
};

type RawApprovalRequestRow = {
  readonly id: number;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly status: string;
  readonly approverComment: string | null;
  readonly createdAt: Date;
  readonly approvedAt: Date | null;
  readonly rejectedAt: Date | null;
  readonly user: { readonly email: string };
  readonly company: { readonly name: string };
  readonly area: { readonly name: string };
  readonly approver: { readonly name: string } | null;
  readonly dispersedBy: { readonly name: string } | null;
  readonly trips: readonly RawApprovalRequestTripRow[];
};

function mapApprovalRequestTripRow(
  trip: RawApprovalRequestTripRow,
): ApprovalRequestRecord['trips'][number] {
  return {
    id: trip.id,
    tripOrder: trip.tripOrder,
    tripApprovalStatus: trip.tripApprovalStatus,
    approverComment: trip.approverComment,
    approvedBy: trip.approvedBy,
    destination: trip.destination,
    purpose: trip.purpose,
    departureDate: trip.departureDate,
    returnDate: trip.returnDate,
    disbursementDate: trip.disbursementDate,
    estimatedTotal: decimalToNumber(trip.estimatedTotal),
    expenses: trip.expenses
      ? {
          transport: decimalToNumber(trip.expenses.transport),
          tolls: decimalToNumber(trip.expenses.tolls),
          lodging: decimalToNumber(trip.expenses.lodging),
          food: decimalToNumber(trip.expenses.food),
          freight: decimalToNumber(trip.expenses.freight),
          tools: decimalToNumber(trip.expenses.tools),
          shipping: decimalToNumber(trip.expenses.shipping),
          miscellaneous: decimalToNumber(trip.expenses.miscellaneous),
        }
      : null,
    gasoline: trip.gasoline
      ? {
          requiresGasoline: trip.gasoline.requiresGasoline,
          requestedAmount: decimalToNullableNumber(
            trip.gasoline.requestedAmount,
          ),
        }
      : null,
    tag: trip.tag
      ? {
          requiresTag: trip.tag.requiresTag,
          requestedAmount: decimalToNullableNumber(trip.tag.requestedAmount),
        }
      : null,
  };
}

function mapApprovalRequestRow(
  row: RawApprovalRequestRow,
): ApprovalRequestRecord {
  return {
    id: row.id,
    employeeName: row.employeeName,
    corporateCardNumber: row.corporateCardNumber,
    status: row.status,
    approverComment: row.approverComment,
    createdAt: row.createdAt,
    approvedAt: row.approvedAt,
    rejectedAt: row.rejectedAt,
    user: row.user,
    company: row.company,
    area: row.area,
    approver: row.approver,
    dispersedBy: row.dispersedBy,
    trips: row.trips.map(mapApprovalRequestTripRow),
  };
}

function decimalToNumber(
  value: { toString(): string } | null | undefined,
): number {
  if (value === null || value === undefined) {
    return 0;
  }
  const parsedValue = Number.parseFloat(value.toString());
  if (!Number.isFinite(parsedValue)) {
    return 0;
  }
  return parsedValue;
}

function decimalToNullableNumber(
  value: { toString(): string } | null | undefined,
): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  const parsedValue = Number.parseFloat(value.toString());
  if (!Number.isFinite(parsedValue)) {
    return null;
  }
  return parsedValue;
}

type StoredTripForNotificationInput = {
  readonly tripOrder: number;
  readonly destination: string;
  readonly purpose: string;
  readonly departureDate: Date;
  readonly returnDate: Date;
  readonly disbursementDate: Date;
  readonly estimatedTotal: { toString(): string };
  readonly objectives: readonly { readonly description: string }[];
  readonly expenses: {
    readonly transport: { toString(): string };
    readonly tolls: { toString(): string };
    readonly lodging: { toString(): string };
    readonly food: { toString(): string };
    readonly freight: { toString(): string };
    readonly tools: { toString(): string };
    readonly shipping: { toString(): string };
    readonly miscellaneous: { toString(): string };
  } | null;
  readonly gasoline: {
    readonly requiresGasoline: boolean;
    readonly cardId: number | null;
    readonly plate: string | null;
    readonly currentMileageKm: { toString(): string } | null;
    readonly requestedAmount: { toString(): string } | null;
    readonly distanceKm: { toString(): string } | null;
    readonly comments: string | null;
  } | null;
  readonly tag: {
    readonly requiresTag: boolean;
    readonly requestedAmount: { toString(): string } | null;
    readonly comments: string | null;
  } | null;
};

function mapStoredTripToNotificationTripInput(
  trip: StoredTripForNotificationInput,
): TravelRequestTripInput {
  return {
    ordenViaje: trip.tripOrder,
    destinoViaje: trip.destination,
    motivoViaje: trip.purpose,
    fechaSalida: trip.departureDate,
    fechaRegreso: trip.returnDate,
    fechaDispersion: trip.disbursementDate,
    totalEstimado: decimalToNumber(trip.estimatedTotal),
    gastos: {
      transporte: decimalToNumber(trip.expenses?.transport),
      peajes: decimalToNumber(trip.expenses?.tolls),
      hospedaje: decimalToNumber(trip.expenses?.lodging),
      alimentos: decimalToNumber(trip.expenses?.food),
      fletes: decimalToNumber(trip.expenses?.freight),
      herramientas: decimalToNumber(trip.expenses?.tools),
      envios: decimalToNumber(trip.expenses?.shipping),
      miscelaneos: decimalToNumber(trip.expenses?.miscellaneous),
    },
    objetivos: trip.objectives.map((objective) => objective.description),
    gasolina: {
      necesitaGasolina: trip.gasoline?.requiresGasoline ?? false,
      cardId: trip.gasoline?.cardId ?? null,
      placa: trip.gasoline?.plate ?? null,
      kilometrajeActualKm: decimalToNullableNumber(
        trip.gasoline?.currentMileageKm,
      ),
      montoSolicitado: decimalToNullableNumber(trip.gasoline?.requestedAmount),
      distanciaKm: decimalToNullableNumber(trip.gasoline?.distanceKm),
      comentarios: trip.gasoline?.comments ?? null,
      fotoOdometroBase64: null,
    },
    tag: {
      necesitaTag: trip.tag?.requiresTag ?? false,
      montoSolicitado: decimalToNullableNumber(trip.tag?.requestedAmount),
      comentarios: trip.tag?.comments ?? null,
    },
  };
}

function buildTravelTripGasolineCreateData(
  gasolina: TravelRequestGasolineInput,
): {
  readonly requiresGasoline: boolean;
  readonly cardId: number | null;
  readonly plate: string | null;
  readonly currentMileageKm: number | null;
  readonly requestedAmount: number | null;
  readonly distanceKm: number | null;
  readonly comments: string | null;
  readonly odometerPhoto?: Uint8Array<ArrayBuffer>;
} {
  const decodedPhoto = decodeBase64ImageBuffer(gasolina.fotoOdometroBase64);
  const odometerPhoto = toPrismaBytesField(decodedPhoto) as
    | Uint8Array<ArrayBuffer>
    | undefined;

  return {
    requiresGasoline: gasolina.necesitaGasolina,
    cardId: gasolina.cardId,
    plate: gasolina.placa,
    currentMileageKm: gasolina.kilometrajeActualKm,
    requestedAmount: gasolina.montoSolicitado,
    distanceKm: gasolina.distanciaKm,
    comments: gasolina.comentarios,
    ...(odometerPhoto !== undefined ? { odometerPhoto } : {}),
  };
}

function buildTravelTripGasolineUpdateData(
  gasolina: TravelRequestGasolineInput,
): {
  readonly requiresGasoline: boolean;
  readonly cardId: number | null;
  readonly plate: string | null;
  readonly currentMileageKm: number | null;
  readonly requestedAmount: number | null;
  readonly distanceKm: number | null;
  readonly comments: string | null;
  readonly odometerPhoto?: Uint8Array<ArrayBuffer>;
} {
  return buildTravelTripGasolineCreateData(gasolina);
}
