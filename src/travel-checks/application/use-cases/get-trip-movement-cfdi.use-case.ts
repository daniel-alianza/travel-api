import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { xml2js } from 'xml-js';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import type { DmsBucketConfig } from '../../../config/dms-bucket/dms';
import type { DmsStoragePort } from '../../../dms/application/interfaces/dms-storage.interface';
import type { TravelChecksRepository } from '../interfaces/travel-checks-repository.interface';

type GetTripMovementCfdiData = {
  readonly movementSequence: number;
  readonly xmlFileName: string | null;
  readonly xmlRaw: string;
  readonly xmlJson: unknown;
  readonly conceptos: readonly {
    descripcion: string;
    cantidad: string;
    claveUnidad: string;
    valorUnitario: string;
    importe: string;
    objetoImp: string;
    traslados: readonly {
      base: string;
      impuesto: string;
      tipoFactor: string;
      tasaOCuota: string;
      importe: string;
    }[];
  }[];
  readonly camposXml: readonly {
    campo: string;
    valor: string;
  }[];
};

export type GetTripMovementCfdiResponse =
  ApiSuccessResponse<GetTripMovementCfdiData>;

@Injectable()
export class GetTripMovementCfdiUseCase {
  constructor(
    @Inject('TravelChecksRepository')
    private readonly travelChecksRepository: TravelChecksRepository,
    @Inject('DmsStoragePort')
    private readonly dmsStoragePort: DmsStoragePort,
    @Inject('DMS_BUCKET_CONFIG')
    private readonly dmsBucketConfig: DmsBucketConfig,
  ) {}

  async execute(
    tripId: number,
    movementSequence: number,
  ): Promise<GetTripMovementCfdiResponse> {
    const xmlFile =
      await this.travelChecksRepository.findTripMovementProofXmlFile({
        tripId,
        movementSequence,
      });

    if (xmlFile === null) {
      throw new NotFoundException({
        message: 'No se encontró XML CFDI para este movimiento.',
        error: 'CFDI no encontrado',
      });
    }

    const signedDownload = await this.dmsStoragePort.createSignedDownloadUrl(
      xmlFile.filePath,
      this.dmsBucketConfig.signedUrlExpiresInSeconds,
    );

    const xmlText = await descargarXml(signedDownload.signedUrl);
    const xmlJson = xml2js(xmlText, {
      compact: false,
      trim: true,
      ignoreComment: true,
      ignoreDeclaration: false,
      ignoreInstruction: true,
      ignoreCdata: false,
      ignoreDoctype: true,
      alwaysChildren: true,
    });
    const camposXml = extraerCamposDesdeXml(xmlText);
    const conceptos = extraerConceptosDesdeXml(xmlText);

    return buildSuccessResponse(
      {
        movementSequence,
        xmlFileName: xmlFile.fileName,
        xmlRaw: xmlText,
        xmlJson,
        conceptos,
        camposXml,
      },
      'CFDI del movimiento obtenido y parseado correctamente.',
    );
  }
}

async function descargarXml(signedUrl: string): Promise<string> {
  const response = await fetch(signedUrl);
  if (!response.ok) {
    throw new BadRequestException({
      message: 'No se pudo descargar el XML de la comprobación.',
      error: `HTTP ${String(response.status)}`,
    });
  }
  return response.text();
}

function extraerCamposDesdeXml(
  xml: string,
): readonly { campo: string; valor: string }[] {
  const xmlCompacto = xml2js(xml, {
    compact: true,
    trim: true,
    ignoreComment: true,
    ignoreDeclaration: false,
    ignoreInstruction: true,
    ignoreCdata: false,
    ignoreDoctype: true,
    alwaysChildren: true,
  }) as Record<string, unknown>;

  const camposClave = extraerCamposClaveEmisorReceptor(xmlCompacto);
  const paresGenerales = Array.from(
    xml.matchAll(/\s([A-Za-z_:][\w:.-]*)="([^"]*)"/g),
    (match) => ({
      campo: normalizarNombreAtributo(match[1] ?? ''),
      valor: match[2] ?? '',
    }),
  );
  const pares = [...camposClave, ...paresGenerales];
  const visto = new Set<string>();
  const filtrados: { campo: string; valor: string }[] = [];
  for (const par of pares) {
    if (par.campo.length === 0 || visto.has(par.campo)) {
      continue;
    }
    visto.add(par.campo);
    filtrados.push(par);
  }
  return filtrados;
}

function normalizarNombreAtributo(nombre: string): string {
  const limpio = nombre.includes(':')
    ? (nombre.split(':').at(-1) ?? nombre)
    : nombre;
  const humanizado = limpio
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .trim();
  const lower = humanizado.toLowerCase();
  if (lower === 'forma pago') {
    return 'Forma de pago';
  }
  if (lower === 'metodo pago') {
    return 'Método de pago';
  }
  return humanizado;
}

function extraerCamposClaveEmisorReceptor(
  xmlCompacto: Record<string, unknown>,
): Array<{ campo: string; valor: string }> {
  const comprobante = encontrarNodoPorSufijo(xmlCompacto, 'Comprobante');
  if (comprobante === null) {
    return [];
  }
  const emisor = encontrarNodoPorSufijo(comprobante, 'Emisor');
  const receptor = encontrarNodoPorSufijo(comprobante, 'Receptor');

  const resultado: Array<{ campo: string; valor: string }> = [];
  agregarCampoSiExiste(resultado, 'RFC Emisor', leerAtributo(emisor, 'Rfc'));
  agregarCampoSiExiste(
    resultado,
    'Nombre Emisor',
    leerAtributo(emisor, 'Nombre'),
  );
  agregarCampoSiExiste(
    resultado,
    'Régimen Fiscal Emisor',
    leerAtributo(emisor, 'RegimenFiscal'),
  );

  agregarCampoSiExiste(
    resultado,
    'RFC Receptor',
    leerAtributo(receptor, 'Rfc'),
  );
  agregarCampoSiExiste(
    resultado,
    'Nombre Receptor',
    leerAtributo(receptor, 'Nombre'),
  );
  agregarCampoSiExiste(
    resultado,
    'Régimen Fiscal Receptor',
    leerAtributo(receptor, 'RegimenFiscalReceptor'),
  );
  agregarCampoSiExiste(
    resultado,
    'Uso CFDI',
    leerAtributo(receptor, 'UsoCFDI'),
  );
  return resultado;
}

function agregarCampoSiExiste(
  resultado: Array<{ campo: string; valor: string }>,
  campo: string,
  valor: string,
): void {
  if (valor.trim().length === 0) {
    return;
  }
  resultado.push({ campo, valor });
}

function encontrarNodoPorSufijo(
  origen: unknown,
  sufijo: string,
): Record<string, unknown> | null {
  if (origen === null || typeof origen !== 'object') {
    return null;
  }
  const registro = origen as Record<string, unknown>;
  const entrada = Object.entries(registro).find((par) =>
    par[0].toLowerCase().endsWith(sufijo.toLowerCase()),
  );
  if (entrada === undefined) {
    return null;
  }
  const valor = entrada[1];
  if (valor === null || typeof valor !== 'object') {
    return null;
  }
  return valor as Record<string, unknown>;
}

function leerAtributo(
  nodo: Record<string, unknown> | null,
  atributo: string,
): string {
  if (nodo === null) {
    return '';
  }
  const atributos = nodo._attributes;
  if (atributos === null || typeof atributos !== 'object') {
    return '';
  }
  const valor = (atributos as Record<string, unknown>)[atributo];
  return typeof valor === 'string' ? valor : '';
}

function extraerConceptosDesdeXml(xml: string): readonly {
  descripcion: string;
  cantidad: string;
  claveUnidad: string;
  valorUnitario: string;
  importe: string;
  objetoImp: string;
  traslados: readonly {
    base: string;
    impuesto: string;
    tipoFactor: string;
    tasaOCuota: string;
    importe: string;
  }[];
}[] {
  const xmlCompacto = xml2js(xml, {
    compact: true,
    trim: true,
    ignoreComment: true,
    ignoreDeclaration: false,
    ignoreInstruction: true,
    ignoreCdata: false,
    ignoreDoctype: true,
    alwaysChildren: true,
  }) as Record<string, unknown>;

  const comprobante = encontrarNodoPorSufijo(xmlCompacto, 'Comprobante');
  const conceptosNodo = encontrarNodoPorSufijo(comprobante, 'Conceptos');
  const conceptosRaw = leerNodo(conceptosNodo, 'Concepto');
  const conceptos = comoArregloRegistros(conceptosRaw);

  return conceptos.map((concepto) => {
    const trasladosNodo = encontrarNodoPorSufijo(concepto, 'Traslados');
    const trasladosRaw = leerNodo(trasladosNodo, 'Traslado');
    const traslados = comoArregloRegistros(trasladosRaw).map((traslado) => ({
      base: leerAtributo(traslado, 'Base'),
      impuesto: leerAtributo(traslado, 'Impuesto'),
      tipoFactor: leerAtributo(traslado, 'TipoFactor'),
      tasaOCuota: leerAtributo(traslado, 'TasaOCuota'),
      importe: leerAtributo(traslado, 'Importe'),
    }));

    return {
      descripcion: leerAtributo(concepto, 'Descripcion'),
      cantidad: leerAtributo(concepto, 'Cantidad'),
      claveUnidad: leerAtributo(concepto, 'ClaveUnidad'),
      valorUnitario: leerAtributo(concepto, 'ValorUnitario'),
      importe: leerAtributo(concepto, 'Importe'),
      objetoImp: leerAtributo(concepto, 'ObjetoImp'),
      traslados,
    };
  });
}

function leerNodo(
  nodo: Record<string, unknown> | null,
  nombre: string,
): unknown {
  if (nodo === null) {
    return null;
  }
  const entrada = Object.entries(nodo).find((par) =>
    par[0].toLowerCase().endsWith(nombre.toLowerCase()),
  );
  return entrada?.[1] ?? null;
}

function comoArregloRegistros(valor: unknown): Record<string, unknown>[] {
  if (Array.isArray(valor)) {
    return valor.filter(
      (item): item is Record<string, unknown> =>
        item !== null && typeof item === 'object',
    );
  }
  if (valor !== null && typeof valor === 'object') {
    return [valor as Record<string, unknown>];
  }
  return [];
}
