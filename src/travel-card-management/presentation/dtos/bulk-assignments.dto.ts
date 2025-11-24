import { IsArray, IsNumber, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from './pagination.dto';

export class BulkAssignmentsQueryDto extends PaginationDto {
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v: string) => Number(v));
    }
    if (typeof value === 'string') {
      return value.split(',').map((v: string) => Number(v.trim()));
    }
    return [Number(value)];
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  userIds: number[];
}

