import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SubmitTripMovementProofFileDto {
  @ApiProperty({ example: 123 })
  @IsInt()
  @IsPositive()
  tripFileId: number;

  @ApiProperty({
    enum: [
      'ticket',
      'invoice_xml',
      'invoice_pdf',
      'invoice_xml_outbound',
      'invoice_pdf_outbound',
      'invoice_xml_return',
      'invoice_pdf_return',
    ],
  })
  @IsString()
  @IsIn([
    'ticket',
    'invoice_xml',
    'invoice_pdf',
    'invoice_xml_outbound',
    'invoice_pdf_outbound',
    'invoice_xml_return',
    'invoice_pdf_return',
  ])
  fileRole:
    | 'ticket'
    | 'invoice_xml'
    | 'invoice_pdf'
    | 'invoice_xml_outbound'
    | 'invoice_pdf_outbound'
    | 'invoice_xml_return'
    | 'invoice_pdf_return';
}

export class SubmitTripMovementProofDto {
  @ApiProperty({ enum: ['ticket', 'invoice'] })
  @IsString()
  @IsIn(['ticket', 'invoice'])
  proofType: 'ticket' | 'invoice';

  @ApiProperty({ nullable: true, maxLength: 500 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  comment?: string;

  @ApiProperty({ type: [SubmitTripMovementProofFileDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitTripMovementProofFileDto)
  files: SubmitTripMovementProofFileDto[];
}
