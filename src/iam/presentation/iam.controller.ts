import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtSessionGuard } from '../../auth/presentation/guards/jwt-session.guard';
import { buildSuccessResponse } from '../../common/exceptions/builders/success-response.builder';
import type { IamFilterCatalogResponse } from '../application/use-cases/list-iam-filter-catalog.use-case';
import { ListIamFilterCatalogUseCase } from '../application/use-cases/list-iam-filter-catalog.use-case';
import {
  ListIamUsersUseCase,
  type ListIamUsersCommand,
} from '../application/use-cases/list-iam-users.use-case';
import type { IamUserListItemResponse } from '../application/use-cases/list-iam-users.use-case';
import { SetIamUserExtraPermissionsRequestDto } from './dtos/set-iam-user-extra-permissions-request.dto';
import { SetIamUserPasswordRequestDto } from './dtos/set-iam-user-password-request.dto';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { SetIamUserExtraPermissionsUseCase } from '../application/use-cases/set-iam-user-extra-permissions.use-case';
import { SetIamUserPasswordUseCase } from '../application/use-cases/set-iam-user-password.use-case';

class IamUserListItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombres: string;

  @ApiProperty()
  apellidoPaterno: string;

  @ApiProperty()
  apellidoMaterno: string;

  @ApiProperty()
  jefeDirecto: string;

  @ApiProperty()
  correoElectronico: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  sucursal: string;

  @ApiProperty()
  rol: string;

  @ApiProperty()
  activo: boolean;

  @ApiProperty({ type: [String] })
  permisos: readonly string[];

  @ApiProperty({
    type: [String],
    description:
      'Códigos incluidos por el rol (RoleDefaultPermission). No se pueden quitar desde IAM.',
  })
  permisosPorDefectoRol: readonly string[];
}

class IamUsersListHttpResponseDto {
  @ApiProperty({ type: [IamUserListItemDto] })
  data: IamUserListItemResponse[];

  @ApiProperty()
  message: string;
}

class IamFilterCatalogDataDto {
  @ApiProperty({ type: [String] })
  areas: readonly string[];

  @ApiProperty({ type: [String] })
  sucursales: readonly string[];

  @ApiProperty({ type: [String] })
  rolesEtiqueta: readonly string[];
}

class IamFilterCatalogHttpResponseDto {
  @ApiProperty({ type: IamFilterCatalogDataDto })
  data: IamFilterCatalogResponse;

  @ApiProperty()
  message: string;
}

class IamSetPasswordHttpResponseDto {
  @ApiProperty({ type: Object, nullable: true })
  data: null;

  @ApiProperty()
  message: string;
}

@ApiTags('IAM')
@Controller('iam')
export class IamController {
  constructor(
    private readonly listIamUsersUseCase: ListIamUsersUseCase,
    private readonly listIamFilterCatalogUseCase: ListIamFilterCatalogUseCase,
    private readonly setIamUserPasswordUseCase: SetIamUserPasswordUseCase,
    private readonly setIamUserExtraPermissionsUseCase: SetIamUserExtraPermissionsUseCase,
  ) {}

  @Get('users')
  @UseGuards(JwtSessionGuard, SuperAdminGuard)
  @HttpCode(200)
  @ApiQuery({
    name: 'search',
    required: false,
    description:
      'Texto libre: busca en nombre, correo, área, sucursal, rol (nombre en BD) y jefe directo.',
  })
  @ApiOperation({
    summary: 'Listar usuarios para administración IAM',
    description:
      'Solo super_administrador. Incluye área, sucursal (branch), rol y jefe directo.',
  })
  @ApiOkResponse({
    description: 'Listado de usuarios',
    type: IamUsersListHttpResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'No autenticado' })
  @ApiForbiddenResponse({ description: 'Sin permisos de super administrador' })
  async listUsers(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<IamUsersListHttpResponseDto> {
    const comando: ListIamUsersCommand = { search };
    const usuarios = await this.listIamUsersUseCase.execute(comando);
    return buildSuccessResponse(
      usuarios,
      'Usuarios obtenidos correctamente.',
    );
  }

  @Put('users/:userId/password')
  @UseGuards(JwtSessionGuard, SuperAdminGuard)
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({
    summary: 'Establecer contraseña de un usuario (IAM)',
    description:
      'Solo super_administrador. No requiere contraseña actual del colaborador.',
  })
  @ApiBody({ type: SetIamUserPasswordRequestDto })
  @ApiOkResponse({
    description: 'Contraseña actualizada',
    type: IamSetPasswordHttpResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'No autenticado' })
  @ApiForbiddenResponse({ description: 'Sin permisos de super administrador' })
  async setUserPassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: SetIamUserPasswordRequestDto,
  ): Promise<IamSetPasswordHttpResponseDto> {
    await this.setIamUserPasswordUseCase.execute({
      targetUserId: userId,
      newPassword: body.newPassword,
    });
    return buildSuccessResponse(null, 'Contraseña actualizada correctamente.');
  }

  @Put('users/:userId/extra-permissions')
  @UseGuards(JwtSessionGuard, SuperAdminGuard)
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({
    summary: 'Guardar permisos extra de un usuario (IAM)',
    description:
      'Solo super_administrador. Reemplaza los extras; no incluir permisos que ya otorga el rol por defecto.',
  })
  @ApiBody({ type: SetIamUserExtraPermissionsRequestDto })
  @ApiOkResponse({
    description: 'Extras actualizados',
    type: IamSetPasswordHttpResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'No autenticado' })
  @ApiForbiddenResponse({ description: 'Sin permisos de super administrador' })
  async setUserExtraPermissions(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: SetIamUserExtraPermissionsRequestDto,
  ): Promise<IamSetPasswordHttpResponseDto> {
    await this.setIamUserExtraPermissionsUseCase.execute({
      targetUserId: userId,
      extraPermissionCodes: body.extraPermissionCodes,
    });
    return buildSuccessResponse(
      null,
      'Permisos extra del usuario actualizados correctamente.',
    );
  }

  @Get('filter-catalog')
  @UseGuards(JwtSessionGuard, SuperAdminGuard)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Catálogo para filtros IAM',
    description:
      'Todas las áreas, sucursales (branches) y etiquetas de rol del catálogo.',
  })
  @ApiOkResponse({
    description: 'Catálogo de filtros',
    type: IamFilterCatalogHttpResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'No autenticado' })
  @ApiForbiddenResponse({ description: 'Sin permisos de super administrador' })
  async listFilterCatalog(): Promise<IamFilterCatalogHttpResponseDto> {
    const catalogo = await this.listIamFilterCatalogUseCase.execute();
    return buildSuccessResponse(
      catalogo,
      'Catálogo de filtros obtenido correctamente.',
    );
  }
}
