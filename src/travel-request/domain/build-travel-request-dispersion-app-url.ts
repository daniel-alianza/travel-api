export function buildTravelRequestDispersionAppUrl(frontendUrl: string): string {
  const normalizedBase = frontendUrl.trim().replace(/\/+$/, '');
  if (normalizedBase.length === 0) {
    return '/dispersion-travel';
  }
  return `${normalizedBase}/dispersion-travel`;
}
