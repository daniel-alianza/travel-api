import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';
import type {
  SapExpenseMovementRecord,
  TravelChecksSapMovementsPort,
} from '../interfaces/travel-checks-sap-movements.interface';

type ExpenseMovimientoItem = {
  readonly id: string;
  readonly numeroMovimiento: number;
  readonly fecha: string;
  readonly descripcion: string;
  readonly numeroTarjeta: string;
  readonly gasto: number;
  readonly estado: 'pendiente' | 'comprobado';
};

type ListExpenseTripMovementsData = {
  readonly movimientos: readonly ExpenseMovimientoItem[];
};

export type ListExpenseTripMovementsForUserResponse =
  ApiSuccessResponse<ListExpenseTripMovementsData>;

@Injectable()
export class ListExpenseTripMovementsForUserUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
    @Inject('TravelChecksSapMovementsPort')
    private readonly travelChecksSapMovementsPort: TravelChecksSapMovementsPort,
  ) {}

  async execute(
    userId: number,
    tripId: number,
  ): Promise<ListExpenseTripMovementsForUserResponse> {
    const context =
      await this.travelChecksRepository.findExpenseTripMovementContext(
        tripId,
        userId,
      );
    if (context === null) {
      throw new NotFoundException({
        message: 'Viaje no encontrado o no dispersado para este usuario.',
        error: 'Viaje no encontrado',
      });
    }
    if (context.corporateCardNumber === null) {
      throw new BadRequestException({
        message: 'El viaje no tiene tarjeta corporativa asociada.',
        error: 'Tarjeta no encontrada',
      });
    }
    const movimientosSap =
      await this.travelChecksSapMovementsPort.fetchByReference(context);
    const movementProofs = await this.travelChecksRepository.listTripMovementProofsByTripId(
      context.tripId,
    );
    return buildSuccessResponse(
      {
        movimientos: construirMovimientos(
          movimientosSap,
          movementProofs,
          context.tripId,
          context.destination,
          context.corporateCardNumber,
        ),
      },
      'Movimientos del viaje cargados desde Service Layer por referencia.',
    );
  }
}

function construirMovimientos(
  movimientosSap: readonly SapExpenseMovementRecord[],
  movementProofs: readonly {
    movementSequence: number;
    movementAmount: number;
    status: 'submitted' | 'approved' | 'rejected';
  }[],
  tripId: number,
  destination: string,
  corporateCardNumber: string,
): readonly ExpenseMovimientoItem[] {
  const tarjeta = enmascararTarjetaCorporativa(corporateCardNumber);
  const proofBySequence = new Map<number, 'submitted' | 'approved' | 'rejected'>(
    movementProofs.map((proof) => [proof.movementSequence, proof.status]),
  );
  return movimientosSap.map((movimiento, index) => ({
    id: `${String(tripId)}-mov-${String(movimiento.sequence)}-${String(index + 1)}`,
    numeroMovimiento: movimiento.sequence,
    fecha: toIsoDateOnly(new Date(movimiento.dueDate)),
    descripcion: construirDescripcionMovimiento(movimiento.memo, destination),
    numeroTarjeta: tarjeta,
    gasto: movimiento.debitAmount,
    estado: mapMovementStatus(proofBySequence.get(movimiento.sequence)),
  }));
}

function mapMovementStatus(
  status: 'submitted' | 'approved' | 'rejected' | undefined,
): 'pendiente' | 'comprobado' {
  if (status === 'submitted' || status === 'approved') {
    return 'comprobado';
  }
  return 'pendiente';
}

function construirDescripcionMovimiento(memo: string, destination: string): string {
  const memoNormalizado = memo.trim();
  if (memoNormalizado.length === 0) {
    return `Movimiento — ${destination}`;
  }

  const categoria = resolverCategoriaMovimiento(memoNormalizado);
  const comercio = extraerComercioDesdeMemo(memoNormalizado);
  if (comercio === null) {
    return categoria;
  }
  return `${categoria} — ${comercio}`;
}

function resolverCategoriaMovimiento(memo: string): string {
  const texto = normalizarTexto(memo);

  if (
    contieneAlgunTermino(texto, [
      'GASOLINA',
      'GAS ',
      'PETRO',
      'SHELL',
      'PEMEX',
      'OXXO GAS',
    ])
  ) {
    return 'Gasolina';
  }
  if (contieneAlgunTermino(texto, ['PEAJE', 'CASETA', 'AUTOPISTA'])) {
    return 'Peaje';
  }
  if (
    contieneAlgunTermino(texto, ['HOTEL', 'HOSPEDAJE', 'INN', 'SUITES', 'HOSTAL'])
  ) {
    return 'Hospedaje';
  }
  if (
    contieneAlgunTermino(texto, [
      'RESTAURANTE',
      'ALIMENTO',
      'COMIDA',
      'CAFE',
      'BAR',
      'PIZZA',
      'BURGER',
    ])
  ) {
    return 'Alimentos';
  }
  if (
    contieneAlgunTermino(texto, [
      'UBER',
      'DIDI',
      'TAXI',
      'TRANSPORTE',
      'AEROPUERTO',
      'VUELO',
      'AEROMEXICO',
      'VOLARIS',
      'VIVAAEROBUS',
    ])
  ) {
    return 'Transporte';
  }
  if (contieneAlgunTermino(texto, ['ESTACIONAMIENTO', 'PARKING'])) {
    return 'Estacionamiento';
  }
  if (contieneAlgunTermino(texto, ['FLETE', 'PAQUETERIA', 'ENVIO'])) {
    return 'Flete / Envío';
  }
  return 'Movimiento';
}

function contieneAlgunTermino(texto: string, terminos: readonly string[]): boolean {
  return terminos.some((termino) => texto.includes(termino));
}

function normalizarTexto(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

function extraerComercioDesdeMemo(memo: string): string | null {
  const matchConEn = memo.match(/\ben\s+(.+?)(?:\s*\||$)/i);
  const matchConEnMayus = memo.match(/\bEN\s+(.+?)(?:\s*\||$)/);
  const comercioCrudo = matchConEn?.[1] ?? matchConEnMayus?.[1] ?? null;
  if (comercioCrudo === null) {
    return null;
  }
  const limpio = comercioCrudo.replace(/\s+/g, ' ').trim();
  return limpio.length > 0 ? limpio : null;
}

function toIsoDateOnly(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

function enmascararTarjetaCorporativa(valor: string): string {
  const digitos = valor.replace(/\D/g, '');
  if (digitos.length === 0) {
    return 'Sin tarjeta corporativa';
  }
  const ultimos4 = digitos.slice(-4);
  return `**** **** **** ${ultimos4}`;
}
