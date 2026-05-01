import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import type {
  AreaLookupRecord,
  CardLookupRecord,
  CreateTravelRequestRepositoryInput,
  CreatedTravelRequestRecord,
  TravelRequestRepository,
  UserLookupRecord,
} from '../application/interfaces/travel-request-repository.interface';

type PrismaDelegate = {
  user: {
    findUnique(args: {
      where: { id: number };
      select: { id: true; name: true; areaId: true; managerId: true };
    }): Promise<UserLookupRecord | null>;
  };
  area: {
    findUnique(args: {
      where: { id: number };
      select: { id: true; name: true };
    }): Promise<AreaLookupRecord | null>;
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
  };
};

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
}
