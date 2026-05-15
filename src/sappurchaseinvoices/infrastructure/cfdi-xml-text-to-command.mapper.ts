import { BadRequestException } from '@nestjs/common';
import { xml2js } from 'xml-js';

import type {
  CfdiAddendaCommand,
  CfdiComplementoCommand,
  CfdiConceptoCommand,
  CfdiImpuestosComprobanteCommand,
  CfdiImpuestosConceptoCommand,
  CfdiXmlDataCommand,
  CfdiTrasladoCommand,
} from '../application/interfaces/create-purchase-invoice-from-cfdi-command.interface';

export function parseCfdiXmlDataCommandFromXml(
  xml: string,
): CfdiXmlDataCommand {
  const trimmed = xml.trim();
  if (trimmed.length === 0) {
    throw new BadRequestException({
      message: 'El XML del CFDI está vacío.',
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
      message: 'El XML del CFDI no es un XML válido.',
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

  const emisor = buscarNodoPorSufijoEnArbol(comprobante, 'Emisor');
  const receptor = buscarNodoPorSufijoEnArbol(comprobante, 'Receptor');
  const conceptosNodo = buscarNodoPorSufijoEnArbol(comprobante, 'Conceptos');
  const complementoRaiz = buscarNodoPorSufijoEnArbol(
    comprobante,
    'Complemento',
  );

  const timbre =
    complementoRaiz === null
      ? null
      : buscarNodoPorSufijoEnArbol(complementoRaiz, 'TimbreFiscalDigital');

  if (timbre === null) {
    throw new BadRequestException({
      message: 'El CFDI no incluye TimbreFiscalDigital.',
      error: 'CFDI_SIN_TIMBRE',
    });
  }

  const uuidTimbre = leerAtributoNodo(timbre, 'UUID').trim();
  if (uuidTimbre.length === 0) {
    throw new BadRequestException({
      message: 'El CFDI no incluye UUID en el TimbreFiscalDigital.',
      error: 'CFDI_SIN_UUID',
    });
  }

  const complemento: CfdiComplementoCommand = {
    TimbreFiscalDigital: {
      UUID: uuidTimbre,
      NoCertificadoSAT: opcionalString(
        leerAtributoNodo(timbre, 'NoCertificadoSAT'),
      ),
      SelloSAT: opcionalString(leerAtributoNodo(timbre, 'SelloSAT')),
      SelloCFD: opcionalString(leerAtributoNodo(timbre, 'SelloCFD')),
      FechaTimbrado: opcionalString(leerAtributoNodo(timbre, 'FechaTimbrado')),
      RfcProvCertif: opcionalString(leerAtributoNodo(timbre, 'RfcProvCertif')),
    },
  };

  const impuestosComprobante = mapearImpuestosComprobante(comprobante);
  const addenda = mapearAddenda(comprobante);

  if (conceptosNodo === null) {
    throw new BadRequestException({
      message: 'El CFDI no contiene la sección de conceptos.',
      error: 'CFDI_SIN_CONCEPTOS',
    });
  }

  const conceptosRaw = leerHijosPorSufijo(conceptosNodo, 'Concepto');
  const conceptos: CfdiConceptoCommand[] = conceptosRaw.map((nodoConcepto) =>
    mapearConcepto(nodoConcepto),
  );

  if (conceptos.length === 0) {
    throw new BadRequestException({
      message: 'El CFDI no contiene conceptos facturados.',
      error: 'CFDI_SIN_CONCEPTOS',
    });
  }

  const folioRaw = leerAtributoNodo(comprobante, 'Folio');
  const folio = folioRaw.trim().length > 0 ? folioRaw.trim() : '0';

  return {
    Comprobante: {
      Version: requeridoString(
        leerAtributoNodo(comprobante, 'Version'),
        'Version',
      ),
      Serie: opcionalString(leerAtributoNodo(comprobante, 'Serie')),
      Folio: folio,
      Fecha: requeridoString(leerAtributoNodo(comprobante, 'Fecha'), 'Fecha'),
      FormaPago: requeridoString(
        leerAtributoNodo(comprobante, 'FormaPago'),
        'FormaPago',
      ),
      CondicionesDePago: opcionalString(
        leerAtributoNodo(comprobante, 'CondicionesDePago'),
      ),
      SubTotal: requeridoNumero(
        leerAtributoNodo(comprobante, 'SubTotal'),
        'SubTotal',
      ),
      Descuento: opcionalNumero(leerAtributoNodo(comprobante, 'Descuento')),
      Moneda: requeridoString(
        leerAtributoNodo(comprobante, 'Moneda'),
        'Moneda',
      ),
      Total: requeridoNumero(leerAtributoNodo(comprobante, 'Total'), 'Total'),
      TipoDeComprobante: requeridoString(
        leerAtributoNodo(comprobante, 'TipoDeComprobante'),
        'TipoDeComprobante',
      ),
      MetodoPago: requeridoString(
        leerAtributoNodo(comprobante, 'MetodoPago'),
        'MetodoPago',
      ),
      LugarExpedicion: requeridoString(
        leerAtributoNodo(comprobante, 'LugarExpedicion'),
        'LugarExpedicion',
      ),
      NoCertificado: requeridoString(
        leerAtributoNodo(comprobante, 'NoCertificado'),
        'NoCertificado',
      ),
      Sello: requeridoString(leerAtributoNodo(comprobante, 'Sello'), 'Sello'),
      Exportacion: opcionalString(leerAtributoNodo(comprobante, 'Exportacion')),
    },
    Emisor:
      emisor === null
        ? undefined
        : {
            Rfc: requeridoString(leerAtributoNodo(emisor, 'Rfc'), 'Emisor.Rfc'),
            Nombre: requeridoString(
              leerAtributoNodo(emisor, 'Nombre'),
              'Emisor.Nombre',
            ),
            RegimenFiscal: requeridoString(
              leerAtributoNodo(emisor, 'RegimenFiscal'),
              'Emisor.RegimenFiscal',
            ),
          },
    Receptor:
      receptor === null
        ? undefined
        : {
            Rfc: requeridoString(
              leerAtributoNodo(receptor, 'Rfc'),
              'Receptor.Rfc',
            ),
            Nombre: requeridoString(
              leerAtributoNodo(receptor, 'Nombre'),
              'Receptor.Nombre',
            ),
            UsoCFDI: requeridoString(
              leerAtributoNodo(receptor, 'UsoCFDI'),
              'Receptor.UsoCFDI',
            ),
            DomicilioFiscalReceptor: requeridoString(
              leerAtributoNodo(receptor, 'DomicilioFiscalReceptor'),
              'Receptor.DomicilioFiscalReceptor',
            ),
            RegimenFiscalReceptor: requeridoString(
              leerAtributoNodo(receptor, 'RegimenFiscalReceptor'),
              'Receptor.RegimenFiscalReceptor',
            ),
          },
    Conceptos: conceptos,
    Complemento: complemento,
    Impuestos: impuestosComprobante,
    Addenda: addenda,
  };
}

function mapearImpuestosComprobante(
  comprobante: Record<string, unknown>,
): CfdiImpuestosComprobanteCommand | undefined {
  const impuestosNodo = buscarNodoPorSufijoEnArbol(comprobante, 'Impuestos');
  if (impuestosNodo === null) {
    return undefined;
  }
  const totalTrasladados = opcionalNumero(
    leerAtributoNodo(impuestosNodo, 'TotalImpuestosTrasladados'),
  );
  if (totalTrasladados === undefined) {
    return undefined;
  }
  return { TotalImpuestosTrasladados: totalTrasladados };
}

function mapearAddenda(
  comprobante: Record<string, unknown>,
): CfdiAddendaCommand | undefined {
  const addendaNodo = buscarNodoPorSufijoEnArbol(comprobante, 'Addenda');
  if (addendaNodo === null) {
    return undefined;
  }
  const encabezado = buscarNodoPorSufijoEnArbol(addendaNodo, 'Encabezado');
  if (encabezado === null) {
    const numCtaPagoDirecto = buscarAtributoEnArbol(addendaNodo, 'NumCtaPago');
    if (numCtaPagoDirecto === undefined) {
      return undefined;
    }
    return { NumCtaPago: numCtaPagoDirecto };
  }
  const numCtaPago = opcionalString(leerAtributoNodo(encabezado, 'NumCtaPago'));
  const serieFolio = opcionalString(leerAtributoNodo(encabezado, 'SerieFolio'));
  const cadenaOriginal = opcionalString(
    leerAtributoNodo(encabezado, 'cadenaOriginal'),
  );
  const cadenaOriginalTimbre = opcionalString(
    leerAtributoNodo(encabezado, 'cadenaOriginalTimbre'),
  );
  const observaciones = opcionalString(
    leerAtributoNodo(encabezado, 'Observaciones'),
  );
  if (
    numCtaPago === undefined &&
    serieFolio === undefined &&
    cadenaOriginal === undefined &&
    cadenaOriginalTimbre === undefined &&
    observaciones === undefined
  ) {
    return undefined;
  }
  return {
    NumCtaPago: numCtaPago,
    SerieFolio: serieFolio,
    CadenaOriginal: cadenaOriginal,
    CadenaOriginalTimbre: cadenaOriginalTimbre,
    Observaciones: observaciones,
  };
}

function buscarAtributoEnArbol(
  origen: Record<string, unknown>,
  nombreAtributo: string,
): string | undefined {
  const directo = opcionalString(leerAtributoNodo(origen, nombreAtributo));
  if (directo !== undefined) {
    return directo;
  }
  for (const [, valor] of Object.entries(origen)) {
    if (valor === null || typeof valor !== 'object') {
      continue;
    }
    if (Array.isArray(valor)) {
      for (const item of valor) {
        if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
          const encontrado = buscarAtributoEnArbol(
            item as Record<string, unknown>,
            nombreAtributo,
          );
          if (encontrado !== undefined) {
            return encontrado;
          }
        }
      }
    } else {
      const encontrado = buscarAtributoEnArbol(
        valor as Record<string, unknown>,
        nombreAtributo,
      );
      if (encontrado !== undefined) {
        return encontrado;
      }
    }
  }
  return undefined;
}

function mapearConcepto(
  nodoConcepto: Record<string, unknown>,
): CfdiConceptoCommand {
  const impuestosNodo = buscarNodoPorSufijoEnArbol(nodoConcepto, 'Impuestos');
  const trasladosNodo =
    impuestosNodo === null
      ? null
      : buscarNodoPorSufijoEnArbol(impuestosNodo, 'Traslados');
  const trasladosRaw = leerHijosPorSufijo(trasladosNodo, 'Traslado');
  const traslados: CfdiTrasladoCommand[] = trasladosRaw.map((t) => ({
    Base: opcionalNumero(leerAtributoNodo(t, 'Base')),
    Impuesto: requeridoString(
      leerAtributoNodo(t, 'Impuesto'),
      'Traslado.Impuesto',
    ),
    TipoFactor: requeridoString(
      leerAtributoNodo(t, 'TipoFactor'),
      'Traslado.TipoFactor',
    ),
    TasaOCuota: opcionalNumero(leerAtributoNodo(t, 'TasaOCuota')),
    Importe: opcionalNumero(leerAtributoNodo(t, 'Importe')),
  }));

  const impuestos: CfdiImpuestosConceptoCommand = {
    Traslados: traslados,
  };

  const claveProd = leerAtributoNodo(nodoConcepto, 'ClaveProdServ');
  const noIdent = leerAtributoNodo(nodoConcepto, 'NoIdentificacion').trim();
  const noIdentificacion =
    noIdent.length > 0
      ? noIdent
      : claveProd.trim().length > 0
        ? claveProd
        : 'NA';

  return {
    ClaveProdServ: requeridoString(claveProd, 'Concepto.ClaveProdServ'),
    NoIdentificacion: noIdentificacion,
    Cantidad: requeridoNumero(
      leerAtributoNodo(nodoConcepto, 'Cantidad'),
      'Concepto.Cantidad',
    ),
    ClaveUnidad: requeridoString(
      leerAtributoNodo(nodoConcepto, 'ClaveUnidad'),
      'Concepto.ClaveUnidad',
    ),
    Unidad: opcionalString(leerAtributoNodo(nodoConcepto, 'Unidad')),
    Descripcion: requeridoString(
      leerAtributoNodo(nodoConcepto, 'Descripcion'),
      'Concepto.Descripcion',
    ),
    ValorUnitario: requeridoNumero(
      leerAtributoNodo(nodoConcepto, 'ValorUnitario'),
      'Concepto.ValorUnitario',
    ),
    Importe: requeridoNumero(
      leerAtributoNodo(nodoConcepto, 'Importe'),
      'Concepto.Importe',
    ),
    Descuento: opcionalNumero(leerAtributoNodo(nodoConcepto, 'Descuento')),
    ObjetoImp: requeridoString(
      leerAtributoNodo(nodoConcepto, 'ObjetoImp'),
      'Concepto.ObjetoImp',
    ),
    Impuestos: impuestos,
  };
}

function leerHijosPorSufijo(
  padre: Record<string, unknown> | null,
  sufijoHijo: string,
): Record<string, unknown>[] {
  if (padre === null) {
    return [];
  }
  const resultado: Record<string, unknown>[] = [];
  for (const [clave, valor] of Object.entries(padre)) {
    if (clave === '_attributes' || clave === '_text') {
      continue;
    }
    if (!clave.toLowerCase().endsWith(sufijoHijo.toLowerCase())) {
      continue;
    }
    if (Array.isArray(valor)) {
      for (const item of valor) {
        if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
          resultado.push(item as Record<string, unknown>);
        }
      }
    } else if (valor !== null && typeof valor === 'object') {
      resultado.push(valor as Record<string, unknown>);
    }
  }
  return resultado;
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

function requeridoString(valor: string, etiqueta: string): string {
  const t = valor.trim();
  if (t.length === 0) {
    throw new BadRequestException({
      message: `El CFDI no incluye el campo obligatorio ${etiqueta}.`,
      error: 'CFDI_DATOS_INCOMPLETOS',
    });
  }
  return t;
}

function opcionalString(valor: string): string | undefined {
  const t = valor.trim();
  return t.length > 0 ? t : undefined;
}

function requeridoNumero(valor: string, etiqueta: string): number {
  const t = valor.trim();
  if (t.length === 0) {
    throw new BadRequestException({
      message: `El CFDI no incluye el campo numérico obligatorio ${etiqueta}.`,
      error: 'CFDI_DATOS_INCOMPLETOS',
    });
  }
  const n = Number.parseFloat(t);
  if (Number.isNaN(n)) {
    throw new BadRequestException({
      message: `El valor numérico de ${etiqueta} en el CFDI no es válido.`,
      error: 'CFDI_DATOS_INCOMPLETOS',
    });
  }
  return n;
}

function opcionalNumero(valor: string): number | undefined {
  const t = valor.trim();
  if (t.length === 0) {
    return undefined;
  }
  const n = Number.parseFloat(t);
  return Number.isNaN(n) ? undefined : n;
}
