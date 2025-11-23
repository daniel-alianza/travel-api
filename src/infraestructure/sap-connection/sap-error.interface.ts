export interface SapServiceLayerError {
  error: {
    code: number;
    message: {
      lang: string;
      value: string;
    };
    innererror?: {
      context?: string | null;
      trace?: string | null;
    };
  };
}

