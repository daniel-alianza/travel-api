export const IAM_PERMISO_ADMINISTRACION_USUARIOS = 'admin.usuarios' as const;

export const IAM_PERMISO_AUTOS_RESERVAR = 'autos.reservar' as const;

export const IAM_PERMISO_GASOLINA_SOLICITAR = 'gasolina.solicitar' as const;

/** Siempre efectivos en login, sin depender de extras IAM. */
export const IAM_PERMISOS_UNIVERSALES = [
  IAM_PERMISO_AUTOS_RESERVAR,
  IAM_PERMISO_GASOLINA_SOLICITAR,
] as const;

export const IAM_KNOWN_PERMISSION_CODES = [
  'viajes.solicitar',
  'viajes.aprobar',
  'viaticos.dispersar',
  'contabilidad.autorizar',
  'tarjetas.asignar',
  'comprobacion.revisar',
  'gasolina.solicitar',
  'gasolina.autorizar',
  'gasolina.dispersar',
  'gasolina.reporte',
  'gasolina.rendimiento',
  IAM_PERMISO_AUTOS_RESERVAR,
  IAM_PERMISO_ADMINISTRACION_USUARIOS,
] as const;

export type IamPermissionCode = (typeof IAM_KNOWN_PERMISSION_CODES)[number];

const ORDEN_PERMISOS = new Map<string, number>(
  IAM_KNOWN_PERMISSION_CODES.map((code, index) => [code, index]),
);

export function esCodigoPermisoIamConocido(
  code: string,
): code is IamPermissionCode {
  return ORDEN_PERMISOS.has(code);
}

export function ordenarCodigosPermisoIam(codes: Iterable<string>): string[] {
  return [...codes].sort((a, b) => {
    const ia = ORDEN_PERMISOS.get(a) ?? 999;
    const ib = ORDEN_PERMISOS.get(b) ?? 999;
    return ia - ib;
  });
}
