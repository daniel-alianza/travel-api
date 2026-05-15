import type {
  CfdiConceptoCommand,
  CfdiXmlDataCommand,
} from '../application/interfaces/create-purchase-invoice-from-cfdi-command.interface';
import { asignarCampoSapSiHayValor } from './sap-purchase-invoice-payload.util';

export function buildCfdiHeaderXmlFields(
  xmlData: CfdiXmlDataCommand,
): Record<string, string> {
  const comprobante = xmlData.Comprobante;
  const timbre = xmlData.Complemento?.TimbreFiscalDigital;
  const addenda = xmlData.Addenda;
  const emisor = xmlData.Emisor;
  const receptor = xmlData.Receptor;
  const campos: Record<string, string> = {};

  asignarCampoSapSiHayValor(campos, 'Reference1', timbre?.UUID);
  asignarCampoSapSiHayValor(campos, 'Reference2', emisor?.Rfc);
  asignarCampoSapSiHayValor(campos, 'FederalTaxID', emisor?.Rfc);
  asignarCampoSapSiHayValor(
    campos,
    'ShipToCode',
    receptor?.DomicilioFiscalReceptor,
  );
  asignarCampoSapSiHayValor(campos, 'NumAtCard', addenda?.SerieFolio);

  asignarCampoSapSiHayValor(campos, 'U_RS_UUID', timbre?.UUID);
  asignarCampoSapSiHayValor(campos, 'U_UUID', timbre?.UUID);
  asignarCampoSapSiHayValor(campos, 'U_UDF_UUID', timbre?.UUID);
  asignarCampoSapSiHayValor(campos, 'U_RS_RFC', emisor?.Rfc);
  asignarCampoSapSiHayValor(campos, 'U_SAT_SERIECFD', comprobante.Serie);
  asignarCampoSapSiHayValor(campos, 'U_FECHAEMISION', comprobante.Fecha);
  asignarCampoSapSiHayValor(campos, 'U_FECHATIMBRE', timbre?.FechaTimbrado);
  asignarCampoSapSiHayValor(
    campos,
    'U_CFDI4_EXPORTACION',
    comprobante.Exportacion,
  );
  asignarCampoSapSiHayValor(campos, 'U_FAE_MET_PAGO', comprobante.FormaPago);
  asignarCampoSapSiHayValor(campos, 'U_FAE_NUM_CTA', addenda?.NumCtaPago);
  asignarCampoSapSiHayValor(campos, 'U_SelloSAT', timbre?.SelloSAT);
  asignarCampoSapSiHayValor(
    campos,
    'U_SelloCFDI',
    timbre?.SelloCFD ?? comprobante.Sello,
  );
  asignarCampoSapSiHayValor(campos, 'U_CertiSAT', timbre?.NoCertificadoSAT);
  asignarCampoSapSiHayValor(campos, 'U_CadenaCFDI', addenda?.CadenaOriginal);

  return campos;
}

export function buildCfdiLineXmlFields(
  xmlData: CfdiXmlDataCommand,
  concepto: CfdiConceptoCommand,
): Record<string, string> {
  const comprobante = xmlData.Comprobante;
  const timbre = xmlData.Complemento?.TimbreFiscalDigital;
  const addenda = xmlData.Addenda;
  const emisor = xmlData.Emisor;
  const campos: Record<string, string> = {};

  asignarCampoSapSiHayValor(campos, 'U_RS_UUID', timbre?.UUID);
  asignarCampoSapSiHayValor(campos, 'U_UUID', timbre?.UUID);
  asignarCampoSapSiHayValor(campos, 'U_RS_RFC', emisor?.Rfc);
  asignarCampoSapSiHayValor(campos, 'U_SAT_SERIECFD', comprobante.Serie);
  asignarCampoSapSiHayValor(campos, 'U_FECHAEMISION', comprobante.Fecha);
  asignarCampoSapSiHayValor(
    campos,
    'U_CFDI4_EXPORTACION',
    comprobante.Exportacion,
  );
  asignarCampoSapSiHayValor(campos, 'U_CFDI4_OBJETOIMP', concepto.ObjetoImp);
  asignarCampoSapSiHayValor(campos, 'U_SAT_METPAGO', comprobante.MetodoPago);
  asignarCampoSapSiHayValor(campos, 'U_SAT_FOLIO', comprobante.Folio);
  asignarCampoSapSiHayValor(campos, 'U_FAE_MET_PAGO', comprobante.FormaPago);
  asignarCampoSapSiHayValor(campos, 'U_FAE_NUM_CTA', addenda?.NumCtaPago);
  asignarCampoSapSiHayValor(campos, 'U_SelloSAT', timbre?.SelloSAT);
  asignarCampoSapSiHayValor(
    campos,
    'U_SelloCFDI',
    timbre?.SelloCFD ?? comprobante.Sello,
  );
  asignarCampoSapSiHayValor(campos, 'U_CertiSAT', timbre?.NoCertificadoSAT);

  return campos;
}

export function resolveTaxLiableFromObjetoImp(
  objetoImp: string | undefined,
): 'tYES' | 'tNO' | undefined {
  if (objetoImp === undefined || objetoImp.trim().length === 0) {
    return undefined;
  }
  const codigo = objetoImp.trim();
  if (codigo === '01') {
    return 'tNO';
  }
  if (codigo === '02' || codigo === '03') {
    return 'tYES';
  }
  return undefined;
}
