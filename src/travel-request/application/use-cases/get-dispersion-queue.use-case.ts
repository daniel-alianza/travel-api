import { Inject, Injectable } from '@nestjs/common';
import type {
  ApprovalRequestRecord,
  TravelRequestRepository,
} from '../interfaces/travel-request-repository.interface';

export type DispersionQueueItem = {
  readonly id: number;
  readonly nombreSolicitante: string;
  readonly numeroTarjeta: string;
  readonly descripcion: string;
  readonly montoSolicitado: number;
  readonly fechaInicioViaje: string;
  readonly fechaFinViaje: string;
};

export type GetDispersionQueueResponse = {
  readonly data: readonly DispersionQueueItem[];
  readonly message: string;
};

@Injectable()
export class GetDispersionQueueUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(): Promise<GetDispersionQueueResponse> {
    const requests = await this.travelRequestRepository.findDispersionPendingRequests();

    return {
      data: requests.map((request) => mapRequestToDispersionItem(request)),
      message: 'Solicitudes aprobadas pendientes de dispersión.',
    };
  }
}

function mapRequestToDispersionItem(request: ApprovalRequestRecord): DispersionQueueItem {
  const tripsOrdenados = request.trips.slice().sort((a, b) => a.tripOrder - b.tripOrder);
  const salidasIso = tripsOrdenados
    .map((trip) => formatDateToIsoDay(trip.departureDate))
    .filter((fecha) => fecha.length > 0)
    .sort();
  const regresosIso = tripsOrdenados
    .map((trip) => formatDateToIsoDay(trip.returnDate))
    .filter((fecha) => fecha.length > 0)
    .sort();
  const fechaInicioViaje = salidasIso[0] ?? '';
  const fechaFinViaje = regresosIso[regresosIso.length - 1] ?? '';
  const montoSolicitado = tripsOrdenados.reduce(
    (total, trip) => total + Number(trip.estimatedTotal),
    0,
  );
  const destinos = tripsOrdenados.map((trip) => trip.destination).filter((d) => d.trim().length > 0);
  const resumenDestinos =
    destinos.length === 0
      ? 'Sin destinos'
      : destinos.length === 1
        ? destinos[0]
        : `${destinos[0]} +${destinos.length - 1} más`;
  const descripcion = `${request.company.name} — ${request.area.name} — ${resumenDestinos}`;

  return {
    id: request.id,
    nombreSolicitante: request.employeeName,
    numeroTarjeta: formatMaskedCorporateCard(request.corporateCardNumber),
    descripcion,
    montoSolicitado,
    fechaInicioViaje,
    fechaFinViaje,
  };
}

function formatMaskedCorporateCard(value: string | null): string {
  if (value === null || value.trim().length === 0) {
    return 'Sin tarjeta corporativa';
  }
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) {
    return 'Sin tarjeta corporativa';
  }
  const last4 = digits.slice(-4);
  return `**** **** **** ${last4}`;
}

function formatDateToIsoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}
