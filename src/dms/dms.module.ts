import { Module } from '@nestjs/common';
import { getDmsBucketConfig } from '../config/dms-bucket/dms';
import { AuthModule } from '../auth/auth.module';
import { DmsController } from './presentation/dms.controller';
import { DmsPrismaRepository } from './infrastructure/dms-prisma.repository';
import { SupabaseDmsStorageService } from './infrastructure/supabase-dms-storage.service';
import { CreateTripFileUploadUrlUseCase } from './application/use-cases/create-trip-file-upload-url.use-case';
import { ListTripFilesForUserUseCase } from './application/use-cases/list-trip-files-for-user.use-case';
import { CreateTripFileDownloadUrlUseCase } from './application/use-cases/create-trip-file-download-url.use-case';
import { RegisterTripFileUseCase } from './application/use-cases/register-trip-file.use-case';
import { DmsUsageMetricsService } from './infrastructure/dms-usage-metrics.service';
import { DmsUploadRateLimitService } from './infrastructure/dms-upload-rate-limit.service';
import { DmsDownloadUrlCacheService } from './infrastructure/dms-download-url-cache.service';
import { GetDmsUsageForUserUseCase } from './application/use-cases/get-dms-usage-for-user.use-case';

@Module({
  imports: [AuthModule],
  controllers: [DmsController],
  providers: [
    DmsPrismaRepository,
    SupabaseDmsStorageService,
    DmsUsageMetricsService,
    DmsUploadRateLimitService,
    DmsDownloadUrlCacheService,
    CreateTripFileUploadUrlUseCase,
    ListTripFilesForUserUseCase,
    CreateTripFileDownloadUrlUseCase,
    RegisterTripFileUseCase,
    GetDmsUsageForUserUseCase,
    {
      provide: 'DMS_BUCKET_CONFIG',
      useFactory: () => getDmsBucketConfig(),
    },
    {
      provide: 'DmsRepository',
      useExisting: DmsPrismaRepository,
    },
    {
      provide: 'DmsStoragePort',
      useExisting: SupabaseDmsStorageService,
    },
  ],
  exports: [
    SupabaseDmsStorageService,
    {
      provide: 'DmsStoragePort',
      useExisting: SupabaseDmsStorageService,
    },
    {
      provide: 'DMS_BUCKET_CONFIG',
      useFactory: () => getDmsBucketConfig(),
    },
  ],
})
export class DmsModule {}
