import type { GasolineReportHistoryRow } from '../application/interfaces/gasoline-report.repository.interface';

export type GasolineReportMetrics = {
  readonly kmAnterior: number | null;
  readonly kmRecorridoReal: number | null;
  readonly rendimientoRealKmPeso: number | null;
  readonly rendimientoEsperado: number | null;
  readonly variacionRendimiento: number | null;
  readonly montoRecorrido: number | null;
};

export function computeGasolineReportMetrics(
  history: readonly GasolineReportHistoryRow[],
  requestId: number,
  currentMileageKm: number,
  requestedAmount: number,
  distanceKm: number,
): GasolineReportMetrics {
  const currentIndex = history.findIndex((row) => row.id === requestId);
  const previousRow = currentIndex > 0 ? history[currentIndex - 1] : null;
  const kmAnterior = previousRow?.currentMileageKm ?? null;

  const kmRecorridoReal =
    kmAnterior !== null ? currentMileageKm - kmAnterior : null;

  const rendimientoRealKmPeso =
    kmRecorridoReal !== null && kmRecorridoReal > 0 && requestedAmount > 0
      ? kmRecorridoReal / requestedAmount
      : null;

  const historicalRendimientos: number[] = [];
  for (let index = 1; index < currentIndex; index += 1) {
    const prev = history[index - 1];
    const curr = history[index];
    const km = curr.currentMileageKm - prev.currentMileageKm;
    if (km > 0 && curr.requestedAmount > 0) {
      historicalRendimientos.push(km / curr.requestedAmount);
    }
  }

  let rendimientoEsperado: number | null = null;
  if (historicalRendimientos.length > 0) {
    rendimientoEsperado =
      historicalRendimientos.reduce((sum, value) => sum + value, 0) /
      historicalRendimientos.length;
  } else if (distanceKm > 0 && requestedAmount > 0) {
    rendimientoEsperado = distanceKm / requestedAmount;
  }

  const variacionRendimiento =
    rendimientoRealKmPeso !== null &&
    rendimientoEsperado !== null &&
    rendimientoEsperado !== 0
      ? ((rendimientoRealKmPeso - rendimientoEsperado) / rendimientoEsperado) *
        100
      : null;

  const montoRecorrido =
    kmRecorridoReal !== null && kmRecorridoReal > 0
      ? requestedAmount / kmRecorridoReal
      : null;

  return {
    kmAnterior,
    kmRecorridoReal,
    rendimientoRealKmPeso:
      rendimientoRealKmPeso !== null ? round3(rendimientoRealKmPeso) : null,
    rendimientoEsperado:
      rendimientoEsperado !== null ? round3(rendimientoEsperado) : null,
    variacionRendimiento:
      variacionRendimiento !== null ? round2(variacionRendimiento) : null,
    montoRecorrido: montoRecorrido !== null ? round3(montoRecorrido) : null,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function round3(value: number): number {
  return Math.round(value * 1000) / 1000;
}
