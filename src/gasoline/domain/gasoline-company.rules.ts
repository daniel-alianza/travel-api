export function normalizeCompanyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function normalizeAreaName(name: string): string {
  return normalizeCompanyName(name);
}

export function isAlianzaCompany(companyId: number, companyName: string): boolean {
  if (companyId === 1) {
    return true;
  }
  const normalized = normalizeCompanyName(companyName);
  return normalized.includes('alianza');
}

/** FG Electrical, FG Manufacturing y Tableros y Arrancadores: sucursal no aplica. */
export function isGasolineBranchOptionalCompany(
  companyId: number,
  companyName: string,
): boolean {
  const normalized = normalizeCompanyName(companyName);

  if (companyId === 2 || companyId === 3 || companyId === 4) {
    return true;
  }

  if (normalized.includes('fg') && normalized.includes('electrical')) {
    return true;
  }
  if (normalized.includes('manufacturing')) {
    return true;
  }
  if (normalized.includes('tableros') || normalized.includes('arrancadores')) {
    return true;
  }

  return false;
}

/** Alianza: sucursal obligatoria en solicitud y búsqueda de tarjetas. */
export function requiresGasolineBranch(
  companyId: number,
  companyName: string,
): boolean {
  if (isGasolineBranchOptionalCompany(companyId, companyName)) {
    return false;
  }

  return isAlianzaCompany(companyId, companyName);
}

export function requiresGasolineBranchSapFilter(
  companyId: number,
  companyName: string,
): boolean {
  return (
    isAlianzaCompany(companyId, companyName) &&
    !isGasolineBranchOptionalCompany(companyId, companyName)
  );
}
