export interface ApiErrorResponse<TError = unknown> {
  readonly data: null;
  readonly message: string;
  readonly error: TError;
}
