declare module 'pdf-parse' {
  export interface PdfParseResult {
    readonly numpages: number;
    readonly text: string;
  }

  function pdfParse(
    dataBuffer: Uint8Array | Buffer,
    options?: Record<string, unknown>,
  ): Promise<PdfParseResult>;

  export default pdfParse;
}
