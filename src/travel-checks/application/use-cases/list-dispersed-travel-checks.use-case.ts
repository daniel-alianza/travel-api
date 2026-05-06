import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

type ListDispersedTravelChecksData = {
  readonly solicitudes: readonly {
    readonly id: number;
    readonly status: string;
    readonly nombreEmpleado: string;
    readonly tarjetaCorporativaEnmascarada: string;
    readonly dispersadoEn: string | null;
    readonly montoDispersado: number | null;
    readonly usuario: {
      readonly id: number;
      readonly nombre: string;
      readonly correo: string;
    };
    readonly compania: { readonly id: number; readonly nombre: string };
    readonly sucursal: { readonly id: number; readonly nombre: string };
    readonly area: { readonly id: number; readonly nombre: string };
    readonly viajes: readonly {
      readonly tripId: number;
      readonly tripOrder: number;
      readonly destino: string;
      readonly estadoViaje: string;
      readonly fechaSalida: string;
      readonly fechaRegreso: string;
      readonly fechaDispersion: string;
      readonly totalEstimado: number;
    }[];
  }[];
};

export type ListDispersedTravelChecksResponse =
  ApiSuccessResponse<ListDispersedTravelChecksData>;

@Injectable()
export class ListDispersedTravelChecksUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
  ) {}

  async execute(): Promise<ListDispersedTravelChecksResponse> {
    const registros =
      await this.travelChecksRepository.findDispersedTravelRequestsWithDispersedTrips();

    return buildSuccessResponse(
      {
        solicitudes: registros.map((solicitud) => ({
          id: solicitud.id,
          status: solicitud.status,
          nombreEmpleado: solicitud.employeeName,
          tarjetaCorporativaEnmascarada: enmascararTarjetaCorporativa(
            solicitud.corporateCardNumber,
          ),
          dispersadoEn: solicitud.dispersedAt?.toISOString() ?? null,
          montoDispersado: solicitud.dispersedTotal,
          usuario: {
            id: solicitud.user.id,
            nombre: solicitud.user.name,
            correo: solicitud.user.email,
          },
          compania: {
            id: solicitud.company.id,
            nombre: solicitud.company.name,
          },
          sucursal: {
            id: solicitud.branch.id,
            nombre: solicitud.branch.name,
          },
          area: {
            id: solicitud.area.id,
            nombre: solicitud.area.name,
          },
          viajes: solicitud.trips.map((viaje) => ({
            tripId: viaje.id,
            tripOrder: viaje.tripOrder,
            destino: viaje.destination,
            estadoViaje: viaje.tripApprovalStatus,
            fechaSalida: viaje.departureDate.toISOString(),
            fechaRegreso: viaje.returnDate.toISOString(),
            fechaDispersion: viaje.disbursementDate.toISOString(),
            totalEstimado: viaje.estimatedTotal,
          })),
        })),
      },
      'Solicitudes dispersadas con viajes en estado dispersado.',
    );
  }
}

function enmascararTarjetaCorporativa(valor: string | null): string {
  if (valor === null || valor.trim().length === 0) {
    return 'Sin tarjeta corporativa';
  }
  const digitos = valor.replace(/\D/g, '');
  if (digitos.length === 0) {
    return 'Sin tarjeta corporativa';
  }
  const ultimos4 = digitos.slice(-4);
  return `**** **** **** ${ultimos4}`;
}
