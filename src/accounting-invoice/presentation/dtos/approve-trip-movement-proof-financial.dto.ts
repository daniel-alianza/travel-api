import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ApproveTripMovementProofFinancialDto {
  @ApiProperty({ example: '6001-055-000' })
  @IsString()
  @IsNotEmpty()
  accountCode: string;

  @ApiProperty({ example: 'IVA_C_16' })
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
  reviewerNotes?: string;

  @ApiPropertyOptional({
    description:
      'CardCode del socio en SAP para la cabecera OPCH; si se omite se resuelve vía Service Layer (BusinessPartners con CardCode PRT/PTR y CardForeignName = tarjeta corporativa de la solicitud), alineado con Travel-Expenses V1.',
  })
  @IsOptional()
  @IsString()
  sapCardCode?: string;
}
