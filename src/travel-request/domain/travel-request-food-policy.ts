const FOOD_POLICY_EVENTS_PER_DAY = 3;
const FOOD_POLICY_IVA_RATE = 0.16;
const FOOD_POLICY_TIP_RATE = 0.1;
const FOOD_EVENT_COST_ADMINISTRATIVO = 250;
const FOOD_EVENT_COST_VENTAS = 250;
const FOOD_EVENT_COST_OPERACIONES = 200;

export type FoodPolicyResolution =
  | { readonly tag: 'exempt' }
  | { readonly tag: 'capped'; readonly eventCost: number }
  | { readonly tag: 'unconfigured'; readonly areaName: string };

export function normalizeTextForFoodPolicy(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function resolveFoodPolicyForAreaName(areaName: string): FoodPolicyResolution {
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
    return { tag: 'capped', eventCost: FOOD_EVENT_COST_ADMINISTRATIVO };
  }

  const salesAreas = new Set<string>([
    'atencion a clientes',
    'compras',
    'mercadotecnia',
    'ventas',
  ]);
  if (salesAreas.has(normalizedAreaName)) {
    return { tag: 'capped', eventCost: FOOD_EVENT_COST_VENTAS };
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
    return { tag: 'capped', eventCost: FOOD_EVENT_COST_OPERACIONES };
  }

  return { tag: 'unconfigured', areaName };
}

export function calculateTripDaysForFoodPolicy(startDate: Date, endDate: Date): number {
  const normalizedStart = new Date(startDate);
  normalizedStart.setHours(0, 0, 0, 0);
  const normalizedEnd = new Date(endDate);
  normalizedEnd.setHours(0, 0, 0, 0);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayDifference = Math.floor(
    (normalizedEnd.getTime() - normalizedStart.getTime()) / millisecondsPerDay,
  );
  return Math.max(dayDifference + 1, 1);
}

export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

export function computeFoodPolicyMaximumAmount(
  policy: FoodPolicyResolution,
  tripDays: number,
): number {
  if (policy.tag !== 'capped') {
    return 0;
  }
  return roundToTwoDecimals(
    tripDays *
      FOOD_POLICY_EVENTS_PER_DAY *
      policy.eventCost *
      (1 + FOOD_POLICY_IVA_RATE) *
      (1 + FOOD_POLICY_TIP_RATE),
  );
}
