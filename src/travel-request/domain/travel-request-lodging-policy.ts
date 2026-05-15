import {
  calculateTripDaysForFoodPolicy,
  normalizeTextForFoodPolicy,
  roundToTwoDecimals,
} from './travel-request-food-policy';

const LODGING_CAP_VENTAS_PER_NIGHT = 1600;
const LODGING_CAP_OPERACIONES_PER_NIGHT = 900;
const LODGING_CAP_ADMINISTRATIVO_PER_NIGHT = 1600;

export type LodgingPolicyResolution =
  | { readonly tag: 'exempt' }
  | { readonly tag: 'capped'; readonly perNightCap: number }
  | { readonly tag: 'unconfigured'; readonly areaName: string };

export function resolveNationalLodgingPolicyForAreaName(
  areaName: string,
): LodgingPolicyResolution {
  const normalizedAreaName = normalizeTextForFoodPolicy(areaName);
  if (normalizedAreaName === 'direccion') {
    return { tag: 'exempt' };
  }

  const administrativeAreas = new Set<string>([
    'administracion',
    'contabilidad',
    'recursos humanos',
    'tecnologias de la informacion',
  ]);
  if (administrativeAreas.has(normalizedAreaName)) {
    return {
      tag: 'capped',
      perNightCap: LODGING_CAP_ADMINISTRATIVO_PER_NIGHT,
    };
  }

  const salesAreas = new Set<string>([
    'atencion a clientes',
    'compras',
    'mercadotecnia',
    'ventas',
  ]);
  if (salesAreas.has(normalizedAreaName)) {
    return { tag: 'capped', perNightCap: LODGING_CAP_VENTAS_PER_NIGHT };
  }

  const operationAreas = new Set<string>([
    'almacen',
    'logistica',
    'auditoria externa',
    'auditoria interna',
    'calidad',
    'ingenieria',
    'mantenimiento',
    'manufactura',
    'produccion',
    'seguridad e higiene',
  ]);
  if (operationAreas.has(normalizedAreaName)) {
    return {
      tag: 'capped',
      perNightCap: LODGING_CAP_OPERACIONES_PER_NIGHT,
    };
  }

  return { tag: 'unconfigured', areaName };
}

export function calculateLodgingNights(
  startDate: Date,
  endDate: Date,
): number {
  const tripDays = calculateTripDaysForFoodPolicy(startDate, endDate);
  return Math.max(0, tripDays - 1);
}

export function computeLodgingPolicyMaximumAmount(
  policy: LodgingPolicyResolution,
  startDate: Date,
  endDate: Date,
): number {
  if (policy.tag !== 'capped') {
    return 0;
  }
  const nights = calculateLodgingNights(startDate, endDate);
  return roundToTwoDecimals(nights * policy.perNightCap);
}
