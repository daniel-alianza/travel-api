export function omitEmptySapFields<T>(value: T): T {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => omitEmptySapFields(item)) as T;
  }
  if (typeof value !== 'object') {
    return value;
  }
  const entrada = value as Record<string, unknown>;
  const salida: Record<string, unknown> = {};
  for (const [clave, valor] of Object.entries(entrada)) {
    if (valor === undefined) {
      continue;
    }
    if (typeof valor === 'string' && valor.trim().length === 0) {
      continue;
    }
    if (Array.isArray(valor)) {
      salida[clave] = valor.map((item) => omitEmptySapFields(item));
      continue;
    }
    if (valor !== null && typeof valor === 'object') {
      salida[clave] = omitEmptySapFields(valor);
      continue;
    }
    salida[clave] = valor;
  }
  return salida as T;
}

export function asignarCampoSapSiHayValor(
  destino: Record<string, string>,
  clave: string,
  valor: string | null | undefined,
): void {
  if (valor === null || valor === undefined) {
    return;
  }
  const normalizado = valor.trim();
  if (normalizado.length === 0) {
    return;
  }
  destino[clave] = normalizado;
}
