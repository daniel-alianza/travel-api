export function maskCardNumber(cardNumber: string): string {
  const digitos = cardNumber.replace(/\D/g, '');
  const ultimosCuatro =
    digitos.length > 0 ? digitos.slice(-4) : cardNumber.slice(-4);
  return `**** **** **** ${ultimosCuatro}`;
}

export function maskCardNumberNullable(
  cardNumber: string | null | undefined,
): string | null {
  if (cardNumber === null || cardNumber === undefined) {
    return null;
  }
  const valor = cardNumber.trim();
  if (valor.length === 0) {
    return null;
  }
  return maskCardNumber(valor);
}
