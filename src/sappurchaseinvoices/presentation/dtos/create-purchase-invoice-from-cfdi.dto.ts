import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CfdiTrasladoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  Base?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Impuesto: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  TipoFactor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  TasaOCuota?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  Importe?: number;
}

export class CfdiImpuestosConceptoDto {
  @ApiProperty({ type: [CfdiTrasladoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CfdiTrasladoDto)
  Traslados: CfdiTrasladoDto[];
}

export class CfdiConceptoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ClaveProdServ: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  NoIdentificacion: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  Cantidad: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ClaveUnidad: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Unidad?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Descripcion: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  ValorUnitario: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  Importe: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  Descuento?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ObjetoImp: string;

  @ApiProperty({ type: () => CfdiImpuestosConceptoDto })
  @ValidateNested()
  @Type(() => CfdiImpuestosConceptoDto)
  Impuestos: CfdiImpuestosConceptoDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accountCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  taxCode?: string;
}

export class CfdiComprobanteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Version: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Serie?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Folio: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Fecha: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  FormaPago: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  CondicionesDePago?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  SubTotal: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  Descuento?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Moneda: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  Total: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  TipoDeComprobante: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  MetodoPago: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  LugarExpedicion: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  NoCertificado: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Sello: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Exportacion?: string;
}

export class CfdiEmisorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Rfc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  RegimenFiscal: string;
}

export class CfdiReceptorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Rfc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  UsoCFDI: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  DomicilioFiscalReceptor: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  RegimenFiscalReceptor: string;
}

export class CfdiTimbreFiscalDigitalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  UUID: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  NoCertificadoSAT?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  SelloSAT?: string;
}

export class CfdiComplementoDto {
  @ApiPropertyOptional({ type: () => CfdiTimbreFiscalDigitalDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CfdiTimbreFiscalDigitalDto)
  TimbreFiscalDigital?: CfdiTimbreFiscalDigitalDto;
}

export class CfdiXmlDataDto {
  @ApiProperty({ type: () => CfdiComprobanteDto })
  @ValidateNested()
  @Type(() => CfdiComprobanteDto)
  Comprobante: CfdiComprobanteDto;

  @ApiPropertyOptional({ type: () => CfdiEmisorDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CfdiEmisorDto)
  Emisor?: CfdiEmisorDto;

  @ApiPropertyOptional({ type: () => CfdiReceptorDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CfdiReceptorDto)
  Receptor?: CfdiReceptorDto;

  @ApiProperty({ type: [CfdiConceptoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CfdiConceptoDto)
  Conceptos: CfdiConceptoDto[];

  @ApiPropertyOptional({ type: () => CfdiComplementoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CfdiComplementoDto)
  Complemento?: CfdiComplementoDto;
}

export class CreatePurchaseInvoiceFromCfdiDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  companyId: number;

  @ApiPropertyOptional({
    description:
      'CompanyId para login SAP / CompanyDB al crear OPCH; si se omite se usa companyId. Debe coincidir con la base donde existe el CardCode.',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sapSessionCompanyId?: number;

  @ApiProperty({
    description: 'CardCode del proveedor en SAP (Business Partner)',
  })
  @IsString()
  @IsNotEmpty()
  sapCardCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accountCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  taxCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  costingCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty({ type: () => CfdiXmlDataDto })
  @ValidateNested()
  @Type(() => CfdiXmlDataDto)
  xmlData: CfdiXmlDataDto;
}
