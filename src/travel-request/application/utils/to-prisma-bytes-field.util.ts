export function toPrismaBytesField(
  value: Buffer | null | undefined,
): Uint8Array | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  return new Uint8Array(value);
}
