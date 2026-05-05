export interface ApiSuccessResponse<TData> {
  readonly data: TData;
  readonly message: string;
}
