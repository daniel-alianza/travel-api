import { Inject, Injectable } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';
import { sumViaticosExpenseRecord } from '../utils/sum-viaticos-expense-record';

type ListDispersedTravelChecksData = {
  readonly solicitudes: readonly {
    readonly id: number;
    readonly status: string;
    readonly nombreEmpleado: string;
    readonly tarjetaCorporativaEnmascarada: string;
    readonly dispersadoEn: string | null;
    readonly montoDispersado: number | null;
    readonly expenseCatalogCompanyId: number;
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
      readonly motivoViaje: string;
      readonly destino: string;
      readonly estadoViaje: string;
      readonly fechaSalida: string;
      readonly fechaRegreso: string;
      readonly fechaDispersion: string;
      readonly totalEstimado: number;
      readonly movimientosComprobados: number;
      readonly totalComprobadoMovimientos: number;
      readonly movimientosComprobadosDetalle: readonly {
        readonly tripMovementProofId: number;
        readonly movementSequence: number;
        readonly movementDate: string;
        readonly movementAmount: number;
        readonly movementMemo: string | null;
        readonly movementComment: string | null;
        readonly proofStatus: 'submitted' | 'approved' | 'rejected';
        readonly proofType: 'ticket' | 'invoice';
      }[];
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
    const solicitudes = await Promise.all(
      registros.map(async (solicitud) => ({
        id: solicitud.id,
        status: solicitud.status,
        nombreEmpleado: solicitud.employeeName,
        tarjetaCorporativaEnmascarada: enmascararTarjetaCorporativa(
          solicitud.corporateCardNumber,
        ),
        dispersadoEn: solicitud.dispersedAt?.toISOString() ?? null,
        montoDispersado: solicitud.dispersedTotal,
        expenseCatalogCompanyId: solicitud.expenseCatalogCompanyId,
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
        viajes: await Promise.all(
          solicitud.trips.map(async (viaje) => {
            const movementProofs =
              await this.travelChecksRepository.listTripMovementProofsByTripId(
                viaje.id,
              );
            const movementProofsComprobados = movementProofs.filter(
              (proof) =>
                proof.status === 'submitted' || proof.status === 'approved',
            );
            const totalComprobadoMovimientos = movementProofsComprobados.reduce(
              (acc, movement) => acc + movement.movementAmount,
              0,
            );

            return {
              tripId: viaje.id,
              tripOrder: viaje.tripOrder,
              motivoViaje: viaje.purpose,
              destino: viaje.destination,
              estadoViaje: viaje.tripApprovalStatus,
              fechaSalida: viaje.departureDate.toISOString(),
              fechaRegreso: viaje.returnDate.toISOString(),
              fechaDispersion: viaje.disbursementDate.toISOString(),
              totalEstimado: sumViaticosExpenseRecord(viaje.expenses),
              movimientosComprobados: movementProofsComprobados.length,
              totalComprobadoMovimientos,
              movimientosComprobadosDetalle: movementProofsComprobados.map(
                (proof) => ({
                  tripMovementProofId: proof.id,
                  movementSequence: proof.movementSequence,
                  movementDate: (
                    proof.movementDate ?? viaje.returnDate
                  ).toISOString(),
                  movementAmount: proof.movementAmount,
                  movementMemo: proof.movementMemo ?? null,
                  movementComment: proof.comment ?? null,
                  proofStatus: proof.status,
                  proofType: proof.proofType,
                }),
              ),
            };
          }),
        ),
      })),
    );

    return buildSuccessResponse(
      {
        solicitudes,
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
