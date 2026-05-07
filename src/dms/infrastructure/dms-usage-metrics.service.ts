import { Injectable } from '@nestjs/common';

type DmsUsageEntry = {
  uploadUrlRequests: number;
  uploadRegisteredFiles: number;
  downloadUrlRequests: number;
  uploadedBytes: number;
};

@Injectable()
export class DmsUsageMetricsService {
  private readonly usageByUserId = new Map<number, DmsUsageEntry>();

  recordUploadUrlRequest(userId: number): void {
    const usage = this.getOrCreateUsage(userId);
    usage.uploadUrlRequests += 1;
  }

  recordFileRegistered(userId: number, fileSizeBytes: number): void {
    const usage = this.getOrCreateUsage(userId);
    usage.uploadRegisteredFiles += 1;
    usage.uploadedBytes += Math.max(fileSizeBytes, 0);
  }

  recordDownloadUrlRequest(userId: number): void {
    const usage = this.getOrCreateUsage(userId);
    usage.downloadUrlRequests += 1;
  }

  getUserUsage(userId: number): DmsUsageEntry {
    return this.usageByUserId.get(userId) ?? {
      uploadUrlRequests: 0,
      uploadRegisteredFiles: 0,
      downloadUrlRequests: 0,
      uploadedBytes: 0,
    };
  }

  private getOrCreateUsage(userId: number): DmsUsageEntry {
    const current = this.usageByUserId.get(userId);
    if (current) {
      return current;
    }
    const created: DmsUsageEntry = {
      uploadUrlRequests: 0,
      uploadRegisteredFiles: 0,
      downloadUrlRequests: 0,
      uploadedBytes: 0,
    };
    this.usageByUserId.set(userId, created);
    return created;
  }
}
