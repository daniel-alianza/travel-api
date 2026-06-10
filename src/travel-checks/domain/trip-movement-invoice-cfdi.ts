import { BadRequestException } from '@nestjs/common';
import { xml2js } from 'xml-js';

import type { TripMovementProofCfdiXmlFileRole } from '../../../generated/prisma/enums';

export type InvoiceXmlProofFileRole =
  | 'invoice_xml'
  | 'invoice_xml_outbound'
  | 'invoice_xml_return';

export type InvoicePdfProofFileRole =
  | 'invoice_pdf'
  | 'invoice_pdf_outbound'
  | 'invoice_pdf_return';

export const INVOICE_CFDI_XML_PDF_PAIRS: ReadonlyArray<{
  readonly xml: InvoiceXmlProofFileRole;
  readonly pdf: InvoicePdfProofFileRole;
}> = [
  { xml: 'invoice_xml', pdf: 'invoice_pdf' },
  { xml: 'invoice_xml_outbound', pdf: 'invoice_pdf_outbound' },
  { xml: 'invoice_xml_return', pdf: 'invoice_pdf_return' },
];

export type InvoiceProofPairBuffersInput = {
  readonly xmlText: string;
  readonly pdfBuffer: Buffer;
  readonly xmlRole: InvoiceXmlProofFileRole;
};

export type ExtractPdfPlainText = (buffer: Buffer) => Promise<string>;

export type ValidatedInvoiceProofMetadata = {
  readonly cfdiUuid: string;
  readonly fechaEmision: Date;
  readonly xmlRole: InvoiceXmlProofFileRole;
};

export async function validateInvoiceProofPairsFromBuffers(input: {
  readonly tripDeparture: Date;
  readonly tripReturn: Date;
  readonly pairs: readonly InvoiceProofPairBuffersInput[];
  readonly extractPdfPlainText: ExtractPdfPlainText;
}): Promise<readonly ValidatedInvoiceProofMetadata[]> {
  if (input.pairs.length === 0) {
    throw new BadRequestException({
      message: 'No se encontraron XML de factura para validar.',
      error: 'CFDI_XML_FALTANTE',
    });
  }

  const uuidsInBatch = new Set<string>();
  const resultados: ValidatedInvoiceProofMetadata[] = [];

  for (const pair of input.pairs) {
    const metadata = extractCfdiComprobanteMetadata(pair.xmlText);
    assertCfdiFechaWithinTripRange({
      cfdiFechaEmision: metadata.fechaEmision,
      tripDeparture: input.tripDeparture,
      tripReturn: input.tripReturn,
    });

    if (uuidsInBatch.has(metadata.uuid)) {
      throw new BadRequestException({
        message:
          'No puedes comprobar el mismo UUID de CFDI dos veces en un solo envío.',
        error: 'CFDI_UUID_REPETIDO_EN_LOTE',
      });
    }
    uuidsInBatch.add(metadata.uuid);

    if (
      !(await pdfBufferContainsCfdiUuid(
        pair.pdfBuffer,
        metadata.uuid,
        input.extractPdfPlainText,
      ))
    ) {
      throw new BadRequestException({
        message:
          'El PDF no contiene el UUID del CFDI del XML asociado; verifica que sea el PDF correcto de la misma factura.',
        error: 'CFDI_PDF_UUID_NO_COINCIDE',
      });
    }

    resultados.push({
      cfdiUuid: metadata.uuid,
      fechaEmision: metadata.fechaEmision,
      xmlRole: pair.xmlRole,
    });
  }

  return resultados;
}

export type CfdiComprobanteMetadata = {
  readonly fechaEmision: Date;
  readonly uuid: string;
};

export function mapInvoiceXmlRoleToCfdiEnum(
  role: InvoiceXmlProofFileRole,
): TripMovementProofCfdiXmlFileRole {
  if (role === 'invoice_xml') {
    return 'invoice_xml';
  }
  if (role === 'invoice_xml_outbound') {
    return 'invoice_xml_outbound';
  }
  return 'invoice_xml_return';
}

export function assertCfdiFechaWithinTripRange(input: {
  readonly cfdiFechaEmision: Date;
  readonly tripDeparture: Date;
  readonly tripReturn: Date;
}): void {
  const cfdiDay = dateOnlyUtc(input.cfdiFechaEmision);
  const startDay = dateOnlyUtc(input.tripDeparture);
  const endDay = dateOnlyUtc(input.tripReturn);
  if (cfdiDay < startDay || cfdiDay > endDay) {
    throw new BadRequestException({
      message:
        'La fecha de emisión del CFDI no está dentro del periodo del viaje (salida a regreso).',
      error: 'CFDI_FECHA_FUERA_DE_VIAJE',
    });
  }
}

export async function pdfBufferContainsCfdiUuid(
  buffer: Buffer,
  cfdiUuid: string,
  extractPdfPlainText: ExtractPdfPlainText,
): Promise<boolean> {
  const targetHyphen = cfdiUuid.trim().toLowerCase();
  const uuidStrict =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (!uuidStrict.test(targetHyphen)) {
    return false;
  }
  const targetLoose = targetHyphen.replace(/-/g, '');

  for (const text of bufferToPdfSearchStrings(buffer)) {
    if (pdfTextContainsUuidFlexible(text, targetHyphen, targetLoose)) {
      return true;
    }
  }

  const textoExtraido = await extractPdfPlainText(buffer);
  if (
    textoExtraido.length > 0 &&
    pdfTextContainsUuidFlexible(textoExtraido, targetHyphen, targetLoose)
  ) {
    return true;
  }

  return false;
}

function bufferToPdfSearchStrings(buffer: Buffer): readonly string[] {
  const latin1 = buffer.toString('latin1');
  const resultados: string[] = [latin1];
  try {
    const utf8 = buffer.toString('utf8');
    if (utf8 !== latin1) {
      resultados.push(utf8);
    }
  } catch {
    // ignorar
  }
  return resultados;
}

function pdfTextContainsUuidFlexible(
  text: string,
  targetHyphen: string,
  targetLoose: string,
): boolean {
  const lower = text.toLowerCase();
  if (lower.includes(targetHyphen)) {
    return true;
  }

  const flexible = buildFlexibleHyphenatedUuidPattern(targetHyphen);
  if (flexible.test(text)) {
    return true;
  }

  const uuidSegmentado =
    /([0-9a-f]{8})[\s:;\-\u00a0\r\n]*([0-9a-f]{4})[\s:;\-\u00a0\r\n]*([0-9a-f]{4})[\s:;\-\u00a0\r\n]*([0-9a-f]{4})[\s:;\-\u00a0\r\n]*([0-9a-f]{12})/gi;
  for (const coincidencia of text.matchAll(uuidSegmentado)) {
    const junto =
      `${coincidencia[1]}${coincidencia[2]}${coincidencia[3]}${coincidencia[4]}${coincidencia[5]}`.toLowerCase();
    if (junto === targetLoose) {
      return true;
    }
  }

  if (findUuidNearFolioFiscalLabel(text, targetLoose)) {
    return true;
  }

  return false;
}

function buildFlexibleHyphenatedUuidPattern(uuidLower: string): RegExp {
  const partes = uuidLower.split('-');
  if (partes.length !== 5) {
    return /$^/;
  }
  const [a, b, c, d, e] = partes;
  const sep = '[\\s\\-\\u00a0\\u200b\\r\\n]*';
  return new RegExp(`${a}${sep}${b}${sep}${c}${sep}${d}${sep}${e}`, 'i');
}

function findUuidNearFolioFiscalLabel(
  text: string,
  targetLoose: string,
): boolean {
  const plano = text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\u00a0/g, ' ');
  const lower = plano.toLowerCase();

  for (const coincidencia of lower.matchAll(/folio[\s\r\n]+fiscal/gi)) {
    const inicio = coincidencia.index ?? 0;
    const ventana = lower.slice(inicio, inicio + 360);
    const candidato = extraerUuidDesdeVentanaFolioFiscal(ventana);
    if (candidato !== null && candidato === targetLoose) {
      return true;
    }
  }

  return false;
}

function extraerUuidDesdeVentanaFolioFiscal(ventana: string): string | null {
  const conGuiones =
    /([0-9a-f]{8})[\s:;\-\u00a0\r\n]*([0-9a-f]{4})[\s:;\-\u00a0\r\n]*([0-9a-f]{4})[\s:;\-\u00a0\r\n]*([0-9a-f]{4})[\s:;\-\u00a0\r\n]*([0-9a-f]{12})/i;
  const m1 = conGuiones.exec(ventana);
  if (m1) {
    return `${m1[1]}${m1[2]}${m1[3]}${m1[4]}${m1[5]}`.toLowerCase();
  }
  const sinGuiones = /folio[\s\r\n]+fiscal[^0-9a-f]*([0-9a-f]{32})/i;
  const m2 = sinGuiones.exec(ventana);
  if (m2?.[1] !== undefined && m2[1].length === 32) {
    return m2[1].toLowerCase();
  }
  return null;
}

export function extractCfdiComprobanteMetadata(
  xml: string,
): CfdiComprobanteMetadata {
  const trimmed = xml.trim();
  if (trimmed.length === 0) {
    throw new BadRequestException({
      message: 'El archivo XML del CFDI está vacío.',
      error: 'CFDI_XML_INVALIDO',
    });
  }

  let compact: Record<string, unknown>;
  try {
    compact = xml2js(trimmed, {
      compact: true,
      trim: true,
      ignoreComment: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreCdata: false,
      ignoreDoctype: true,
      alwaysChildren: true,
    }) as Record<string, unknown>;
  } catch {
    throw new BadRequestException({
      message: 'El archivo XML del CFDI no es un XML válido.',
      error: 'CFDI_XML_INVALIDO',
    });
  }

  const comprobante = buscarNodoPorSufijoEnArbol(compact, 'Comprobante');
  if (comprobante === null) {
    throw new BadRequestException({
      message: 'El XML no contiene un comprobante CFDI reconocible.',
      error: 'CFDI_SIN_COMPROBANTE',
    });
  }

  const fechaRaw = leerAtributoNodo(comprobante, 'Fecha');
  if (fechaRaw.trim().length === 0) {
    throw new BadRequestException({
      message: 'El CFDI no incluye el atributo Fecha del comprobante.',
      error: 'CFDI_SIN_FECHA',
    });
  }

  const fechaEmision = parseCfdiFechaOrThrow(fechaRaw);

  const timbre = buscarNodoPorSufijoEnArbol(comprobante, 'TimbreFiscalDigital');
  if (timbre === null) {
    throw new BadRequestException({
      message: 'El CFDI no incluye TimbreFiscalDigital (UUID).',
      error: 'CFDI_SIN_TIMBRE',
    });
  }

  const uuidRaw = leerAtributoNodo(timbre, 'UUID');
  const uuid = normalizarUuid(uuidRaw);
  if (uuid === null) {
    throw new BadRequestException({
      message: 'El CFDI no incluye un UUID de timbre válido.',
      error: 'CFDI_SIN_UUID',
    });
  }

  return { fechaEmision, uuid };
}

function dateOnlyUtc(value: Date): number {
  return Date.UTC(
    value.getUTCFullYear(),
    value.getUTCMonth(),
    value.getUTCDate(),
  );
}

function parseCfdiFechaOrThrow(value: string): Date {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new BadRequestException({
      message: 'La fecha de emisión del CFDI no es válida.',
      error: 'CFDI_FECHA_INVALIDA',
    });
  }
  return parsed;
}

function normalizarUuid(value: string): string | null {
  const trimmed = value.trim().toLowerCase();
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (!uuidRegex.test(trimmed)) {
    return null;
  }
  return trimmed;
}

function leerAtributoNodo(
  nodo: Record<string, unknown>,
  atributo: string,
): string {
  const attrs = nodo._attributes;
  if (attrs === null || typeof attrs !== 'object') {
    return '';
  }
  const raw = (attrs as Record<string, unknown>)[atributo];
  return typeof raw === 'string' ? raw : '';
}

function buscarNodoPorSufijoEnArbol(
  origen: unknown,
  sufijo: string,
): Record<string, unknown> | null {
  if (origen === null || typeof origen !== 'object') {
    return null;
  }
  if (Array.isArray(origen)) {
    for (const item of origen) {
      const found = buscarNodoPorSufijoEnArbol(item, sufijo);
      if (found !== null) {
        return found;
      }
    }
    return null;
  }

  const registro = origen as Record<string, unknown>;
  for (const [clave, valor] of Object.entries(registro)) {
    if (clave === '_attributes' || clave === '_text') {
      continue;
    }
    if (clave.toLowerCase().endsWith(sufijo.toLowerCase())) {
      if (
        valor !== null &&
        typeof valor === 'object' &&
        !Array.isArray(valor)
      ) {
        return valor as Record<string, unknown>;
      }
    }
  }

  for (const [, valor] of Object.entries(registro)) {
    if (valor === null || typeof valor !== 'object') {
      continue;
    }
    const found = buscarNodoPorSufijoEnArbol(valor, sufijo);
    if (found !== null) {
      return found;
    }
  }

  return null;
}
