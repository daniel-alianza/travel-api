import { Injectable } from '@nestjs/common';
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
  TravelRequestDetailForUserRecord,
  TravelRequestFormUserRecord,
  TravelRequestRepository,
  TravelRequestTripInput,
  TripResolutionResult,
  UserLookupRecord,
} from '../application/interfaces/travel-request-repository.interface';

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
        status: 'submitted' | 'awaiting_trip_correction' | 'approved';
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
  readonly status: 'submitted' | 'awaiting_trip_correction' | 'approved';
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
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(userId: number): Promise<UserLookupRecord | null> {
    const prisma = this.prismaService as unknown as PrismaDelegate;
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, areaId: true, managerId: true },
    });
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
              create: {
                requiresGasoline: trip.gasolina.necesitaGasolina,
                cardId: trip.gasolina.cardId,
                plate: trip.gasolina.placa,
                currentMileageKm: trip.gasolina.kilometrajeActualKm,
                requestedAmount: trip.gasolina.montoSolicitado,
                distanceKm: trip.gasolina.distanciaKm,
                comments: trip.gasolina.comentarios,
              },
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

    return prisma.travelRequest.findMany({
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

    return filas as unknown as readonly ApprovalRequestRecord[];
  }

  async findDispersionPendingRequests(): Promise<
    readonly ApprovalRequestRecord[]
  > {
    const prisma = this.prismaService as unknown as PrismaDelegate;

    return prisma.travelRequest.findMany({
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

      return 'ok';
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
            update: {
              requiresGasoline: trip.gasolina.necesitaGasolina,
              cardId: trip.gasolina.cardId,
              plate: trip.gasolina.placa,
              currentMileageKm: trip.gasolina.kilometrajeActualKm,
              requestedAmount: trip.gasolina.montoSolicitado,
              distanceKm: trip.gasolina.distanciaKm,
              comments: trip.gasolina.comentarios,
            },
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
