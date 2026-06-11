import { Inject, Injectable, Logger } from '@nestjs/common';
import type { GasolineRequestRepository } from '../../../gasoline/application/interfaces/gasoline-request.repository.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

export type SpawnApprovedGasolineForTravelTripCommand = {
  readonly tripId: number;
  readonly approverId: number;
  readonly approverComment: string | null;
  readonly approvedAt: Date;
};

@Injectable()
export class SpawnApprovedGasolineForTravelTripUseCase {
  private readonly logger = new Logger(
    SpawnApprovedGasolineForTravelTripUseCase.name,
  );

  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
    @Inject('GasolineRequestRepository')
    private readonly gasolineRequestRepository: GasolineRequestRepository,
  ) {}

  async execute(
    command: SpawnApprovedGasolineForTravelTripCommand,
  ): Promise<void> {
    const source =
      await this.travelRequestRepository.findTravelTripGasolineBridgeSource(
        command.tripId,
      );

    if (source === null || !source.requiresGasoline) {
      return;
    }

    if (source.existingGasolineRequestId !== null) {
      return;
    }

    if (
      source.cardId === null ||
      source.plate === null ||
      source.plate.trim().length === 0 ||
      source.currentMileageKm === null ||
      source.requestedAmount === null ||
      source.requestedAmount <= 0 ||
      source.distanceKm === null ||
      source.distanceKm <= 0
    ) {
      this.logger.warn(
        `Puente gasolina omitido para viaje #${command.tripId}: datos incompletos.`,
      );
      return;
    }

    await this.gasolineRequestRepository.createApprovedFromTravelTrip({
      travelRequestTripId: source.tripId,
      userId: source.userId,
      companyId: source.companyId,
      branchId: source.branchId,
      areaId: source.areaId,
      cardId: source.cardId,
      plate: source.plate.trim(),
      currentMileageKm: source.currentMileageKm,
      requestedAmount: source.requestedAmount,
      distanceKm: source.distanceKm,
      routeToTake: source.destination.trim(),
      applicantComments: source.comments,
      odometerPhoto: source.odometerPhoto,
      approverId: command.approverId,
      approverComment: command.approverComment,
      approvedAt: command.approvedAt,
    });

    this.logger.log(
      `Solicitud de gasolina aprobada creada desde viaje #${command.tripId}.`,
    );
  }
}
