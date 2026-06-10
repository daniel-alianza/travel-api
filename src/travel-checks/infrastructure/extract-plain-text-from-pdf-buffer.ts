import pdfParse from 'pdf-parse';

export async function extractPlainTextFromPdfBuffer(
  buffer: Buffer,
): Promise<string> {
  try {
    const resultado = await pdfParse(buffer);
    const texto = resultado.text;
    return typeof texto === 'string' ? texto : '';
  } catch {
    return '';
  }
}
