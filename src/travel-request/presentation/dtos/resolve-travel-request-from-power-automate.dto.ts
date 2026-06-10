import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

function parseRequestId(value: unknown): unknown {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return value;
    }

    const parsed = Number.parseInt(trimmed, 10);
    return Number.isFinite(parsed) ? parsed : value;
  }

  return value;
}

function normalizeAction(value: unknown): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  return value.trim().toLowerCase();
}

function normalizeOptionalString(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
}

export class ResolveTravelRequestFromPowerAutomateDto {
  @Transform(({ value }) => parseRequestId(value))
  @IsInt()
  @Min(1)
  requestId!: number;

  @Transform(({ value }) => normalizeAction(value))
  @IsIn(['approved', 'rejected'])
  action!: 'approved' | 'rejected';

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  bossEmail!: string;

  @IsOptional()
  @Transform(({ value }) => normalizeOptionalString(value))
  @IsString()
  @MaxLength(200)
  employeeName?: string;

  @IsOptional()
  @Transform(({ value }) => normalizeOptionalString(value))
  @IsString()
  @MaxLength(8000)
  comment?: string | null;
}
