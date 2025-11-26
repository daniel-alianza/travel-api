export function maskCardNumber(cardNumber: string): string {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return '****';
  }

  const trimmed = cardNumber.trim();

  if (trimmed.length <= 4) {
    return trimmed;
  }

  const lastFour = trimmed.slice(-4);
  const maskedLength = trimmed.length - 4;
  const masked = '*'.repeat(maskedLength);

  return masked + lastFour;
}
