import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelRequestRepository } from '../interfaces/travel-request-repository.interface';

export type ApprovalTripConcept = {
  readonly concepto: string;
  readonly monto: number;
};

export type ApprovalTrip = {
  readonly tripId: number;
  readonly estadoViaje: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Dispersado';
  readonly comentarioViaje: string | null;
  readonly destinoViaje: string;
  readonly motivoViaje: string;
  readonly fechaSalida: string;
  readonly fechaRegreso: string;
  readonly fechaDispersion: string;
  readonly montoEstimado: number;
  readonly requiereTag: boolean;
  readonly montoTag: number;
  readonly requiereGasolina: boolean;
  readonly montoGasolina: number;
  readonly conceptosSolicitados: readonly ApprovalTripConcept[];
};

export type ApprovalRequest = {
  readonly id: number;
  readonly nombreEmpleado: string;
  readonly correo: string;
  readonly area: string;
  readonly empresa: string;
  readonly fechaSolicitud: string;
  readonly estado:
    | 'Pendiente'
    | 'En corrección'
    | 'Aprobada'
    | 'Rechazada'
    | 'Dispersada';
  readonly fechaAutorizacion: string | null;
  readonly autorizadoPor: string | null;
  readonly dispersadoPor: string | null;
  readonly comentarioResolucion: string | null;
  readonly viajes: readonly ApprovalTrip[];
};

export type GetApprovalRequestsResponse =
  ApiSuccessResponse<readonly ApprovalRequest[]>;

@Injectable()
export class GetApprovalRequestsUseCase {
  constructor(
    @Inject('TravelRequestRepository')
    private readonly travelRequestRepository: TravelRequestRepository,
  ) {}

  async execute(): Promise<GetApprovalRequestsResponse> {
    const requests = await this.travelRequestRepository.findApprovalRequests();

    return buildSuccessResponse(
      requests.map((request) => ({
        id: request.id,
        nombreEmpleado: request.employeeName,
        correo: request.user.email,
        area: request.area.name,
        empresa: request.company.name,
        fechaSolicitud: formatDateToIsoDay(request.createdAt),
        estado: mapStatus(request.status),
        fechaAutorizacion:
          request.approvedAt !== null
            ? formatDateToIsoDay(request.approvedAt)
            : request.rejectedAt !== null
              ? formatDateToIsoDay(request.rejectedAt)
              : null,
        autorizadoPor: request.approver?.name ?? null,
        dispersadoPor: null,
        comentarioResolucion: request.approverComment,
        viajes: request.trips
          .slice()
          .sort((left, right) => left.tripOrder - right.tripOrder)
          .map((trip) => ({
            tripId: trip.id,
            estadoViaje: mapTripApprovalStatus(trip.tripApprovalStatus),
            comentarioViaje: trip.approverComment,
            destinoViaje: trip.destination,
            motivoViaje: trip.purpose,
            fechaSalida: formatDateToIsoDay(trip.departureDate),
            fechaRegreso: formatDateToIsoDay(trip.returnDate),
            fechaDispersion: formatDateToIsoDay(trip.disbursementDate),
            montoEstimado: Number(trip.estimatedTotal),
            requiereTag: trip.tag?.requiresTag ?? false,
            montoTag: Number(trip.tag?.requestedAmount ?? 0),
            requiereGasolina: trip.gasoline?.requiresGasoline ?? false,
            montoGasolina: Number(trip.gasoline?.requestedAmount ?? 0),
            conceptosSolicitados: mapTripConcepts(trip.expenses),
          })),
      })),
      'Solicitudes cargadas correctamente.',
    );
  }
}

type TripExpensesRecord = {
  readonly transport: number;
  readonly tolls: number;
  readonly lodging: number;
  readonly food: number;
  readonly freight: number;
  readonly tools: number;
  readonly shipping: number;
  readonly miscellaneous: number;
} | null;

function mapTripConcepts(expenses: TripExpensesRecord): readonly ApprovalTripConcept[] {
  if (!expenses) {
    return [];
  }

  const concepts: readonly ApprovalTripConcept[] = [
    { concepto: 'Transporte', monto: Number(expenses.transport) },
    { concepto: 'Peajes', monto: Number(expenses.tolls) },
    { concepto: 'Hospedaje', monto: Number(expenses.lodging) },
    { concepto: 'Alimentos', monto: Number(expenses.food) },
    { concepto: 'Fletes', monto: Number(expenses.freight) },
    { concepto: 'Herramientas', monto: Number(expenses.tools) },
    { concepto: 'Envíos', monto: Number(expenses.shipping) },
    { concepto: 'Misceláneos', monto: Number(expenses.miscellaneous) },
  ];

  return concepts.filter((concept) => concept.monto > 0);
}

function mapTripApprovalStatus(
  tripApprovalStatus: string,
): 'Pendiente' | 'Aprobado' | 'Rechazado' | 'Dispersado' {
  if (tripApprovalStatus === 'approved') {
    return 'Aprobado';
  }
  if (tripApprovalStatus === 'rejected') {
    return 'Rechazado';
  }
  if (tripApprovalStatus === 'dispersed') {
    return 'Dispersado';
  }
  return 'Pendiente';
}

function mapStatus(
  status: string,
):
  | 'Pendiente'
  | 'En corrección'
  | 'Aprobada'
  | 'Rechazada'
  | 'Dispersada' {
  if (status === 'approved') {
    return 'Aprobada';
  }
  if (status === 'rejected') {
    return 'Rechazada';
  }
  if (status === 'awaiting_trip_correction') {
    return 'En corrección';
  }
  if (status === 'dispersed') {
    return 'Dispersada';
  }
  return 'Pendiente';
}

function formatDateToIsoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}
