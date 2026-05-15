export interface CfdiTrasladoCommand {
  readonly Base?: number;
  readonly Impuesto: string;
  readonly TipoFactor: string;
  readonly TasaOCuota?: number;
  readonly Importe?: number;
}

export interface CfdiImpuestosConceptoCommand {
  readonly Traslados: readonly CfdiTrasladoCommand[];
}

export interface CfdiConceptoCommand {
  readonly ClaveProdServ: string;
  readonly NoIdentificacion: string;
  readonly Cantidad: number;
  readonly ClaveUnidad: string;
  readonly Unidad?: string;
  readonly Descripcion: string;
  readonly ValorUnitario: number;
  readonly Importe: number;
  readonly Descuento?: number;
  readonly ObjetoImp: string;
  readonly Impuestos: CfdiImpuestosConceptoCommand;
  readonly accountCode?: string;
  readonly taxCode?: string;
}

export interface CfdiComprobanteCommand {
  readonly Version: string;
  readonly Serie?: string;
  readonly Folio: string;
  readonly Fecha: string;
  readonly FormaPago: string;
  readonly CondicionesDePago?: string;
  readonly SubTotal: number;
  readonly Descuento?: number;
  readonly Moneda: string;
  readonly Total: number;
  readonly TipoDeComprobante: string;
  readonly MetodoPago: string;
  readonly LugarExpedicion: string;
  readonly NoCertificado: string;
  readonly Sello: string;
  readonly Exportacion?: string;
}

export interface CfdiEmisorCommand {
  readonly Rfc: string;
  readonly Nombre: string;
  readonly RegimenFiscal: string;
}

export interface CfdiReceptorCommand {
  readonly Rfc: string;
  readonly Nombre: string;
  readonly UsoCFDI: string;
  readonly DomicilioFiscalReceptor: string;
  readonly RegimenFiscalReceptor: string;
}

export interface CfdiTimbreFiscalDigitalCommand {
  readonly UUID: string;
  readonly NoCertificadoSAT?: string;
  readonly SelloSAT?: string;
  readonly SelloCFD?: string;
  readonly FechaTimbrado?: string;
  readonly RfcProvCertif?: string;
}

export interface CfdiComplementoCommand {
  readonly TimbreFiscalDigital?: CfdiTimbreFiscalDigitalCommand;
}

export interface CfdiImpuestosComprobanteCommand {
  readonly TotalImpuestosTrasladados?: number;
}

export interface CfdiAddendaCommand {
  readonly NumCtaPago?: string;
  readonly SerieFolio?: string;
  readonly CadenaOriginal?: string;
  readonly CadenaOriginalTimbre?: string;
  readonly Observaciones?: string;
}

export interface CfdiXmlDataCommand {
  readonly Comprobante: CfdiComprobanteCommand;
  readonly Emisor?: CfdiEmisorCommand;
  readonly Receptor?: CfdiReceptorCommand;
  readonly Conceptos: readonly CfdiConceptoCommand[];
  readonly Complemento?: CfdiComplementoCommand;
  readonly Impuestos?: CfdiImpuestosComprobanteCommand;
  readonly Addenda?: CfdiAddendaCommand;
}

export type SapPurchaseInvoiceDmsDocumentPaths = {
  readonly xmlFilePath: string;
  readonly pdfFilePath?: string;
};

export interface CreatePurchaseInvoiceFromCfdiCommand {
  readonly companyId: number;
  readonly sapSessionCompanyId?: number;
  readonly sapCardCode: string;
  readonly accountCode: string;
  readonly taxCode: string;
  readonly costingCode?: string;
  readonly comments?: string;
  readonly xmlData: CfdiXmlDataCommand;
  readonly sapDmsDocumentPaths?: SapPurchaseInvoiceDmsDocumentPaths;
}
