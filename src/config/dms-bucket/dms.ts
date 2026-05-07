import { InternalServerErrorException } from '@nestjs/common';

export type DmsBucketConfig = {
  readonly supabaseUrl: string;
  readonly supabaseServiceRoleKey: string;
  readonly invoicesBucket: string;
  readonly signedUrlExpiresInSeconds: number;
  readonly maxUploadBytes: number;
  readonly allowedMimeTypes: readonly string[];
  readonly downloadUrlCacheTtlSeconds: number;
  readonly uploadRequestsPerMinutePerUser: number;
  readonly deduplicationWindowMinutes: number;
};

export function getDmsBucketConfig(): DmsBucketConfig {
  const supabaseUrl = process.env.SUPABASE_URL ?? '';
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  const invoicesBucket = process.env.SUPABASE_STORAGE_BUCKET_INVOICES ?? '';
  const signedUrlExpiresInSeconds = Number(
    process.env.SUPABASE_SIGNED_URL_EXPIRES_IN_SECONDS ?? 3600,
  );
  const maxUploadBytes = Number(
    process.env.SUPABASE_MAX_UPLOAD_BYTES ?? 5242880,
  );
  const allowedMimeTypes = parseAllowedMimeTypes(
    process.env.SUPABASE_ALLOWED_MIME_TYPES,
  );
  const downloadUrlCacheTtlSeconds = Number(
    process.env.SUPABASE_DOWNLOAD_URL_CACHE_TTL_SECONDS ?? 300,
  );
  const uploadRequestsPerMinutePerUser = Number(
    process.env.SUPABASE_UPLOAD_REQUESTS_PER_MINUTE_PER_USER ?? 30,
  );
  const deduplicationWindowMinutes = Number(
    process.env.SUPABASE_FILE_DEDUPLICATION_WINDOW_MINUTES ?? 10,
  );

  if (
    !supabaseUrl ||
    !supabaseServiceRoleKey ||
    !invoicesBucket ||
    Number.isNaN(signedUrlExpiresInSeconds) ||
    Number.isNaN(maxUploadBytes) ||
    maxUploadBytes <= 0 ||
    Number.isNaN(downloadUrlCacheTtlSeconds) ||
    downloadUrlCacheTtlSeconds <= 0 ||
    Number.isNaN(uploadRequestsPerMinutePerUser) ||
    uploadRequestsPerMinutePerUser <= 0 ||
    Number.isNaN(deduplicationWindowMinutes) ||
    deduplicationWindowMinutes <= 0
  ) {
    throw new InternalServerErrorException(
      'Faltan variables de entorno de DMS/Supabase.',
    );
  }

  return {
    supabaseUrl,
    supabaseServiceRoleKey,
    invoicesBucket,
    signedUrlExpiresInSeconds,
    maxUploadBytes,
    allowedMimeTypes,
    downloadUrlCacheTtlSeconds,
    uploadRequestsPerMinutePerUser,
    deduplicationWindowMinutes,
  };
}

function parseAllowedMimeTypes(
  rawValue: string | undefined,
): readonly string[] {
  if (!rawValue) {
    return ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  }

  return rawValue
    .split(',')
    .map((mimeType) => mimeType.trim())
    .filter((mimeType) => mimeType.length > 0);
}
