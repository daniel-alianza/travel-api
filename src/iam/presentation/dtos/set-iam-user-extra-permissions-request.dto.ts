import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsString } from 'class-validator';

export class SetIamUserExtraPermissionsRequestDto {
  @ApiProperty({
    type: [String],
    example: ['tarjetas.asignar'],
    description:
      'Solo permisos adicionales respecto al rol. No incluir códigos que ya vengan en RoleDefaultPermission.',
  })
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  extraPermissionCodes: string[];
}
