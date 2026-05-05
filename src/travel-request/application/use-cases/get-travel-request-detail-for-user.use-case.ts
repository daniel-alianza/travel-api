import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

type TravelRequestDetailForUserData = {
  readonly solicitudId: number;
  readonly status: string;
  readonly employeeName: string;
  readonly corporateCardNumber: string | null;
  readonly company: { readonly id: number; readonly name: string };
  readonly branch: { readonly id: number; readonly name: string };
  readonly area: { readonly id: number; readonly name: string };
  readonly viajes: readonly {
    readonly tripId: number;
    readonly tripOrder: number;
    readonly estadoViaje: string;
    readonly destinoViaje: string;
    readonly motivoViaje: string;
    readonly fechaSalida: string;
    readonly fechaRegreso: string;
    readonly fechaDispersion: string;
    readonly gastos: {
      readonly transporte: number;
      readonly peajes: number;
      readonly hospedaje: number;
      readonly alimentos: number;
      readonly fletes: number;
      readonly herramientas: number;
      readonly envios: number;
      readonly miscelaneos: number;
    };
    readonly objetivos: readonly string[];
    readonly gasolina: {
      readonly necesitaGasolina: boolean;
      readonly cardId: number | null;
      readonly cardNumber: string | null;
      readonly placa: string | null;
      readonly kilometrajeActualKm: number | null;
      readonly montoSolicitado: number | null;
      readonly distanciaKm: number | null;
      readonly comentarios: string | null;
    };
    readonly tag: {
      readonly necesitaTag: boolean;
      readonly montoSolicitado: number | null;
      readonly comentarios: string | null;
    };
  }[];
};

export type GetTravelRequestDetailForUserResponse =
  ApiSuccessResponse<TravelRequestDetailForUserData>;

@Injectable()
export class GetTravelRequestDetailForUserUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(
    travelRequestId: number,
    userId: number,
  ): Promise<GetTravelRequestDetailForUserResponse> {
    const solicitud = await this.travelRequestRepository.findTravelRequestDetailForUser(
      travelRequestId,
      userId,
    );

    if (!solicitud) {
      throw new NotFoundException('No se encontró la solicitud o no pertenece al usuario.');
    }

    return buildSuccessResponse(
      {
        solicitudId: solicitud.id,
        status: solicitud.status,
        employeeName: solicitud.employeeName,
        corporateCardNumber: solicitud.corporateCardNumber,
        company: solicitud.company,
        branch: solicitud.branch,
        area: solicitud.area,
        viajes: solicitud.trips.map((viaje) => ({
          tripId: viaje.id,
          tripOrder: viaje.tripOrder,
          estadoViaje: viaje.tripApprovalStatus,
          destinoViaje: viaje.destination,
          motivoViaje: viaje.purpose,
          fechaSalida: formatLocalDate(viaje.departureDate),
          fechaRegreso: formatLocalDate(viaje.returnDate),
          fechaDispersion: formatLocalDate(viaje.disbursementDate),
          gastos: {
            transporte: viaje.expenses?.transport ?? 0,
            peajes: viaje.expenses?.tolls ?? 0,
            hospedaje: viaje.expenses?.lodging ?? 0,
            alimentos: viaje.expenses?.food ?? 0,
            fletes: viaje.expenses?.freight ?? 0,
            herramientas: viaje.expenses?.tools ?? 0,
            envios: viaje.expenses?.shipping ?? 0,
            miscelaneos: viaje.expenses?.miscellaneous ?? 0,
          },
          objetivos: viaje.objectives.map((objective) => objective.description),
          gasolina: {
            necesitaGasolina: viaje.gasoline?.requiresGasoline ?? false,
            cardId: viaje.gasoline?.cardId ?? null,
            cardNumber: viaje.gasoline?.cardNumber ?? null,
            placa: viaje.gasoline?.plate ?? null,
            kilometrajeActualKm: viaje.gasoline?.currentMileageKm ?? null,
            montoSolicitado: viaje.gasoline?.requestedAmount ?? null,
            distanciaKm: viaje.gasoline?.distanceKm ?? null,
            comentarios: viaje.gasoline?.comments ?? null,
          },
          tag: {
            necesitaTag: viaje.tag?.requiresTag ?? false,
            montoSolicitado: viaje.tag?.requestedAmount ?? null,
            comentarios: viaje.tag?.comments ?? null,
          },
        })),
      },
      'Detalle de solicitud cargado correctamente.',
    );
  }
}

function formatLocalDate(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
