export type HttpConfig = {
  readonly maxJsonBodyBytes: number;
};

const DEFAULT_MAX_JSON_BODY_BYTES = 15 * 1024 * 1024;

export function getHttpConfig(): HttpConfig {
  const maxJsonBodyBytes = Number(
    process.env.HTTP_MAX_JSON_BODY_BYTES ?? DEFAULT_MAX_JSON_BODY_BYTES,
  );

  if (!Number.isFinite(maxJsonBodyBytes) || maxJsonBodyBytes <= 0) {
    throw new Error(
      'HTTP_MAX_JSON_BODY_BYTES debe ser un número entero positivo.',
    );
  }

  return {
    maxJsonBodyBytes,
  };
}
