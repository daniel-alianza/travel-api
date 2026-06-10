import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { DmsBucketConfig } from '../../config/dms-bucket/dms';
import type { DmsStoragePort } from '../application/interfaces/dms-storage.interface';

@Injectable()
export class SupabaseDmsStorageService implements DmsStoragePort {
  private readonly supabaseClient: SupabaseClient;

  constructor(
    @Inject('DMS_BUCKET_CONFIG')
    private readonly dmsBucketConfig: DmsBucketConfig,
  ) {
    this.supabaseClient = createClient(
      this.dmsBucketConfig.supabaseUrl,
      this.dmsBucketConfig.supabaseServiceRoleKey,
      {
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
  }

  async createSignedUploadUrl(path: string): Promise<{
    readonly path: string;
    readonly token: string;
    readonly signedUrl: string;
  }> {
    const uploadResult = await this.supabaseClient.storage
      .from(this.dmsBucketConfig.invoicesBucket)
      .createSignedUploadUrl(path);

    if (uploadResult.error) {
      throw new InternalServerErrorException({
        message: 'No se pudo generar la URL firmada de carga.',
        error: uploadResult.error.message,
      });
    }

    return {
      path: uploadResult.data.path,
      token: uploadResult.data.token,
      signedUrl: uploadResult.data.signedUrl,
    };
  }

  async createSignedDownloadUrl(
    path: string,
    expiresInSeconds: number,
  ): Promise<{ readonly signedUrl: string }> {
    const downloadResult = await this.supabaseClient.storage
      .from(this.dmsBucketConfig.invoicesBucket)
      .createSignedUrl(path, expiresInSeconds);

    if (downloadResult.error) {
      throw new InternalServerErrorException({
        message: 'No se pudo generar la URL firmada de descarga.',
        error: downloadResult.error.message,
      });
    }

    return {
      signedUrl: downloadResult.data.signedUrl,
    };
  }
}
