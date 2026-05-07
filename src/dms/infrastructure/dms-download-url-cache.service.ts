import { Injectable } from '@nestjs/common';

@Injectable()
export class DmsDownloadUrlCacheService {
  private readonly cache = new Map<
    string,
    { signedUrl: string; expiresAt: number }
  >();

  get(path: string): { signedUrl: string } | null {
    const hit = this.cache.get(path);
    if (!hit) {
      return null;
    }
    if (Date.now() >= hit.expiresAt) {
      this.cache.delete(path);
      return null;
    }
    return { signedUrl: hit.signedUrl };
  }

  set(path: string, signedUrl: string, ttlSeconds: number): void {
    this.cache.set(path, {
      signedUrl,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
}
