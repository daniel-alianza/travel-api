import { Injectable } from '@nestjs/common';
import type { CfdiConceptoCommand } from '../application/interfaces/create-purchase-invoice-from-cfdi-command.interface';
import type { CreatePurchaseInvoiceFromCfdiCommand } from '../application/interfaces/create-purchase-invoice-from-cfdi-command.interface';
import type {
  ServiceLayerPurchaseInvoiceLine,
  ServiceLayerPurchaseInvoicePayload,
} from '../application/interfaces/service-layer-purchase-invoice.interface';
import {
  buildCfdiHeaderXmlFields,
  buildCfdiLineXmlFields,
  resolveTaxLiableFromObjetoImp,
} from './cfdi-sap-xml-udf-fields';
import { omitEmptySapFields } from './sap-purchase-invoice-payload.util';

@Injectable()
export class CfdiSapPurchaseInvoiceAssembler {
  assemble(
    command: CreatePurchaseInvoiceFromCfdiCommand,
    docCurrency: string,
  ): ServiceLayerPurchaseInvoicePayload {
    const { xmlData } = command;
    const comprobante = xmlData.Comprobante;
    const docDate = new Date(comprobante.Fecha).toISOString().split('T')[0];
    const docDueDate = new Date(comprobante.Fecha);
    docDueDate.setDate(docDueDate.getDate() + 30);
    const docDueDateStr = docDueDate.toISOString().split('T')[0];

    const documentComments = command.comments?.trim() ?? '';
    const headerXmlFields = buildCfdiHeaderXmlFields(xmlData);

    const documentLines: ServiceLayerPurchaseInvoiceLine[] =
      xmlData.Conceptos.map((concepto) =>
        this.mapConceptoToLine(
          xmlData,
          concepto,
          command.accountCode,
          command.taxCode,
          command.costingCode,
        ),
      );

    const payload: ServiceLayerPurchaseInvoicePayload = {
      CardCode: command.sapCardCode,
      DocDate: docDate,
      DocDueDate: docDueDateStr,
      TaxDate: docDate,
      DocTotal: comprobante.Total,
      DocTotalFC: comprobante.Total,
      Comments: documentComments,
      JournalMemo: documentComments,
      DocumentLines: documentLines,
      DocType: 'dDocument_Service',
      DocCurrency: docCurrency,
      ...headerXmlFields,
      ...(comprobante.Descuento !== undefined
        ? { TotalDiscount: comprobante.Descuento }
        : {}),
      ...(xmlData.Impuestos?.TotalImpuestosTrasladados !== undefined
        ? { VatSum: xmlData.Impuestos.TotalImpuestosTrasladados }
        : {}),
    };

    return omitEmptySapFields(payload);
  }

  private mapConceptoToLine(
    xmlData: CreatePurchaseInvoiceFromCfdiCommand['xmlData'],
    concepto: CfdiConceptoCommand,
    defaultAccountCode: string,
    defaultTaxCode: string,
    costingCode: string | undefined,
  ): ServiceLayerPurchaseInvoiceLine {
    const ivaTraslado = concepto.Impuestos?.Traslados?.find(
      (t) => t.Impuesto === '002' && t.TipoFactor === 'Tasa',
    );
    const hasIvaZeroRate =
      ivaTraslado !== undefined &&
      typeof ivaTraslado.TasaOCuota === 'number' &&
      ivaTraslado.TasaOCuota === 0;
    const lineTaxCode = hasIvaZeroRate
      ? (concepto.taxCode ?? 'IVA_C_0')
      : (concepto.taxCode ?? defaultTaxCode);
    const lineAccountCode = concepto.accountCode ?? defaultAccountCode;
    const lineTotal = concepto.Importe;
    const unitPrice =
      concepto.Cantidad > 0
        ? lineTotal / concepto.Cantidad
        : concepto.ValorUnitario;

    const lineText = construirLineTextDesdeConcepto(concepto, ivaTraslado);
    const lineXmlFields = buildCfdiLineXmlFields(xmlData, concepto);
    const taxLiable = resolveTaxLiableFromObjetoImp(concepto.ObjetoImp);

    const lineBase: ServiceLayerPurchaseInvoiceLine = {
      Quantity: concepto.Cantidad,
      UnitPrice: unitPrice,
      LineTotal: lineTotal,
      LineMemo: concepto.Descripcion,
      ItemDescription: concepto.Descripcion,
      Text: concepto.Descripcion,
      TaxCode: lineTaxCode,
      AccountCode: lineAccountCode,
      ...lineXmlFields,
      ...(taxLiable !== undefined ? { TaxLiable: taxLiable } : {}),
      ...(lineText.length > 0 ? { LineText: lineText } : {}),
      ...(costingCode !== undefined && costingCode.trim().length > 0
        ? { CostingCode: costingCode.trim() }
        : {}),
    };

    return omitEmptySapFields(lineBase);
  }
}

function construirLineTextDesdeConcepto(
  concepto: CfdiConceptoCommand,
  ivaTraslado:
    | {
        readonly TasaOCuota?: number;
      }
    | undefined,
): string {
  let lineText = '';
  if (concepto.ClaveProdServ) {
    lineText += `ClaveProdServ: ${concepto.ClaveProdServ}`;
  }
  if (concepto.ClaveUnidad) {
    lineText += lineText
      ? `, ClaveUnidad: ${concepto.ClaveUnidad}`
      : `ClaveUnidad: ${concepto.ClaveUnidad}`;
  }
  if (concepto.Unidad) {
    lineText += lineText
      ? `, Unidad: ${concepto.Unidad}`
      : `Unidad: ${concepto.Unidad}`;
  }
  if (concepto.ObjetoImp) {
    lineText += lineText
      ? `, ObjetoImp: ${concepto.ObjetoImp}`
      : `ObjetoImp: ${concepto.ObjetoImp}`;
  }
  if (concepto.NoIdentificacion && concepto.NoIdentificacion !== 'NA') {
    lineText += lineText
      ? `, NoIdentificacion: ${concepto.NoIdentificacion}`
      : `NoIdentificacion: ${concepto.NoIdentificacion}`;
  }
  if (ivaTraslado !== undefined && ivaTraslado.TasaOCuota !== undefined) {
    const ivaPorcentaje = (ivaTraslado.TasaOCuota * 100).toFixed(0);
    lineText += lineText
      ? `, IVA: ${ivaPorcentaje}%`
      : `IVA: ${ivaPorcentaje}%`;
  }
  return lineText;
}
