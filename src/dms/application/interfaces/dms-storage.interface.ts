export interface DmsStoragePort {
  createSignedUploadUrl(path: string): Promise<{
    readonly path: string;
    readonly token: string;
    readonly signedUrl: string;
  }>;
  createSignedDownloadUrl(
    path: string,
    expiresInSeconds: number,
  ): Promise<{ readonly signedUrl: string }>;
}
