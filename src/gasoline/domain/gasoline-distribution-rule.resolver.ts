function normalizeFuelLookupKey(value: string): string {
  return value
    .toUpperCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function resolveFuelDistributionRuleName(
  areaName: string,
  branchName: string | null,
): string | null {
  const normalizedArea = normalizeFuelLookupKey(areaName);

  if (normalizedArea === 'ADMINISTRACION') {
    return 'VENTAS CORPORITIVAS';
  }

  if (branchName !== null && branchName.trim().length > 0) {
    const normalizedBranch = normalizeFuelLookupKey(branchName);
    const branchToken =
      normalizedBranch === 'DFCENTRO' ? 'DF' : normalizedBranch;

    if (normalizedArea === 'LOGISTICA' || normalizedArea.includes('LOGIST')) {
      return `${branchToken} OPERACIONES`;
    }

    if (normalizedArea === 'VENTAS') {
      return `${branchToken} VENTAS`;
    }
  }

  if (normalizedArea === 'DIRECCION') {
    return 'Direccion';
  }
  if (normalizedArea === 'MERCADOTECNIA') {
    return 'Marketing';
  }
  if (normalizedArea === 'LOGISTICA' || normalizedArea.includes('LOGIST')) {
    return 'Operaciones';
  }
  if (normalizedArea === 'VENTAS') {
    return 'Ventas';
  }

  return null;
}
