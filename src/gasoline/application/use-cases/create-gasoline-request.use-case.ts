import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { requiresGasolineBranch } from '../../domain/gasoline-company.rules';
import { GasolineFuelCardResolverService } from '../../infrastructure/gasoline-fuel-card-resolver.service';
import type {
  GasolineRequestRepository,
  GasolineRequestSummaryRecord,
} from '../interfaces/gasoline-request.repository.interface';

export type CreateGasolineRequestCommand = {
  readonly userId: number;
  readonly companyId: number;
  readonly branchId?: number;
  readonly areaId?: number;
  readonly cardId?: number;
  readonly sapCode?: string;
  readonly plate: string;
  readonly currentMileageKm: number;
  readonly requestedAmount: number;
  readonly distanceKm: number;
  readonly routeToTake: string;
  readonly applicantComments?: string;
  readonly odometerPhoto: Buffer;
};

export type CreateGasolineRequestResponse =
  ApiSuccessResponse<GasolineRequestSummaryRecord>;

@Injectable()
export class CreateGasolineRequestUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('GasolineRequestRepository')
    private readonly gasolineRequestRepository: GasolineRequestRepository,
    private readonly gasolineFuelCardResolverService: GasolineFuelCardResolverService,
  ) {}

  async execute(
    command: CreateGasolineRequestCommand,
  ): Promise<CreateGasolineRequestResponse> {
    const company = await this.prismaService.company.findUnique({
      where: { id: command.companyId },
      select: { id: true, name: true },
    });
    if (company === null) {
      throw new NotFoundException(
        `La empresa con ID ${command.companyId} no existe.`,
      );
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: command.userId },
      select: { id: true },
    });
    if (user === null) {
      throw new NotFoundException(
        `El usuario con ID ${command.userId} no existe.`,
      );
    }

    if (command.branchId !== undefined) {
      const branch = await this.prismaService.branch.findUnique({
        where: { id: command.branchId },
        select: { id: true },
      });
      if (branch === null) {
        throw new NotFoundException(
          `La sucursal con ID ${command.branchId} no existe.`,
        );
      }
    }

    if (command.areaId !== undefined) {
      const area = await this.prismaService.area.findUnique({
        where: { id: command.areaId },
        select: { id: true },
      });
      if (area === null) {
        throw new NotFoundException(
          `El área con ID ${command.areaId} no existe.`,
        );
      }
    }

    if (
      requiresGasolineBranch(company.id, company.name) &&
      command.branchId === undefined
    ) {
      throw new BadRequestException(
        'La sucursal es obligatoria para Alianza Eléctrica.',
      );
    }

    const cardId = await this.gasolineFuelCardResolverService.resolveCardId({
      companyId: command.companyId,
      cardId: command.cardId,
      sapCode: command.sapCode,
    });

    const request = await this.gasolineRequestRepository.create({
      userId: command.userId,
      companyId: command.companyId,
      branchId: command.branchId ?? null,
      areaId: command.areaId ?? null,
      cardId,
      plate: command.plate.trim(),
      currentMileageKm: command.currentMileageKm,
      requestedAmount: command.requestedAmount,
      distanceKm: command.distanceKm,
      routeToTake: command.routeToTake.trim(),
      applicantComments: command.applicantComments?.trim() ?? null,
      odometerPhoto: command.odometerPhoto,
    });

    return buildSuccessResponse(
      request,
      'Solicitud de gasolina creada correctamente.',
    );
  }
}
