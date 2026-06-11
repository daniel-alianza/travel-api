export function decodeBase64ImageBuffer(
  value: string | null | undefined,
): Buffer | null {
  if (value === null || value === undefined) {
    return null;
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const base64Payload = trimmed.includes(',')
    ? trimmed.slice(trimmed.indexOf(',') + 1)
    : trimmed;
  try {
    const buffer = Buffer.from(base64Payload, 'base64');
    if (buffer.length === 0) {
      return null;
    }
    return buffer;
  } catch {
    return null;
  }
}
