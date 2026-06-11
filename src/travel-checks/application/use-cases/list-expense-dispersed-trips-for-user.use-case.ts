import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type {
  DispersedExpenseTripListRecord,
  ExpenseTripExpenseAmountsRecord,
  TravelChecksRepository,
} from '../interfaces/travel-checks-repository.interface';
import { sumViaticosExpenseRecord } from '../utils/sum-viaticos-expense-record';

type ExpenseDispersedTripItem = {
  readonly id: string;
  readonly solicitudId: string;
  readonly titulo: string;
  readonly motivo: string;
  readonly emailSolicitante: string;
  readonly compania: string;
  readonly montoSolicitado: number;
  readonly fechaAutorizacion: string;
  readonly numeroTarjeta: string;
  readonly fechaSalida: string;
  readonly fechaRegreso: string;
  readonly pendientesComprobacion: number;
  readonly conciliacionVerificada: boolean;
};

type ListExpenseDispersedTripsData = {
  readonly viajes: readonly ExpenseDispersedTripItem[];
};

export type ListExpenseDispersedTripsForUserResponse =
  ApiSuccessResponse<ListExpenseDispersedTripsData>;

@Injectable()
export class ListExpenseDispersedTripsForUserUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
  ) {}

  async execute(
    userId: number,
  ): Promise<ListExpenseDispersedTripsForUserResponse> {
    const registros =
      await this.travelChecksRepository.findDispersedExpenseTripsForUser(
        userId,
      );

    return buildSuccessResponse(
      {
        viajes: registros.map((registro) => mapTrip(registro)),
      },
      'Viajes dispersados disponibles para comprobación.',
    );
  }
}

function mapTrip(
  registro: DispersedExpenseTripListRecord,
): ExpenseDispersedTripItem {
  const solicitud = registro.travelRequest;
  const fechaAutorizacion =
    registro.approvedAt ??
    solicitud.approvedAt ??
    solicitud.dispersedAt ??
    registro.departureDate;
  return {
    id: String(registro.id),
    solicitudId: String(solicitud.id),
    titulo: registro.destination,
    motivo: registro.purpose,
    emailSolicitante: solicitud.user.email,
    compania: solicitud.company.name,
    montoSolicitado: sumViaticosExpenseRecord(registro.expenses),
    fechaAutorizacion: toIsoDateOnly(fechaAutorizacion),
    numeroTarjeta: enmascararTarjetaCorporativa(solicitud.corporateCardNumber),
    fechaSalida: toIsoDateOnly(registro.departureDate),
    fechaRegreso: toIsoDateOnly(registro.returnDate),
    pendientesComprobacion: contarLineasGastoPendientes(registro.expenses),
    conciliacionVerificada: solicitud.hasVerifiedReconciliation,
  };
}

function contarLineasGastoPendientes(
  expenses: ExpenseTripExpenseAmountsRecord | null,
): number {
  if (expenses === null) {
    return 0;
  }
  const montos = [
    expenses.transport,
    expenses.tolls,
    expenses.lodging,
    expenses.food,
    expenses.freight,
    expenses.tools,
    expenses.shipping,
    expenses.miscellaneous,
  ];
  return montos.filter((monto) => monto > 0).length;
}

function toIsoDateOnly(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
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
