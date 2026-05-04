import { Inject, Injectable } from '@nestjs/common';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

export type GetMyTravelRequestsResponse = {
  readonly data: {
    readonly solicitudes: readonly {
      readonly id: number;
      readonly status: string;
      readonly createdAt: string;
      readonly viajes: readonly {
        readonly tripId: number;
        readonly tripOrder: number;
        readonly destino: string;
        readonly estadoViaje: string;
        readonly comentarioAprobador: string | null;
        readonly aprobadoEn: string | null;
        readonly rechazadoEn: string | null;
      }[];
    }[];
  };
  readonly message: string;
};

@Injectable()
export class GetMyTravelRequestsUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(userId: number): Promise<GetMyTravelRequestsResponse> {
    const solicitudes =
      await this.travelRequestRepository.findTravelRequestsByUserId(userId);

    return {
      data: {
        solicitudes: solicitudes.map((solicitud) => ({
          id: solicitud.id,
          status: solicitud.status,
          createdAt: solicitud.createdAt.toISOString(),
          viajes: solicitud.trips.map((viaje) => ({
            tripId: viaje.id,
            tripOrder: viaje.tripOrder,
            destino: viaje.destination,
            estadoViaje: viaje.tripApprovalStatus,
            comentarioAprobador: viaje.approverComment,
            aprobadoEn: viaje.approvedAt?.toISOString() ?? null,
            rechazadoEn: viaje.rejectedAt?.toISOString() ?? null,
          })),
        })),
      },
      message: 'Solicitudes del usuario cargadas correctamente.',
    };
  }
}
