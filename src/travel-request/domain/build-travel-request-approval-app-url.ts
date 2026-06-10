export function buildTravelRequestApprovalAppUrl(frontendUrl: string): string {
  const normalizedBase = frontendUrl.trim().replace(/\/+$/, '');
  if (normalizedBase.length === 0) {
    return '/travel-approval';
  }
  return `${normalizedBase}/travel-approval`;
}
