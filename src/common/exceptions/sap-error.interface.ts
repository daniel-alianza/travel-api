export interface SapServiceLayerError {
  error?: {
    code?: number;
    message?: {
      lang?: string;
      value?: string;
    };
  };
}
