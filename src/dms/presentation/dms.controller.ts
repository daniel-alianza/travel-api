import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../auth/presentation/decorators/current-user.decorator';
import { JwtSessionGuard } from '../../auth/presentation/guards/jwt-session.guard';
import {
  CreateTripFileUploadUrlUseCase,
  type CreateTripFileUploadUrlResponse,
} from '../application/use-cases/create-trip-file-upload-url.use-case';
import {
  CreateTripFileDownloadUrlUseCase,
  type CreateTripFileDownloadUrlResponse,
} from '../application/use-cases/create-trip-file-download-url.use-case';
import {
  ListTripFilesForUserUseCase,
  type ListTripFilesForUserResponse,
} from '../application/use-cases/list-trip-files-for-user.use-case';
import {
  RegisterTripFileUseCase,
  type RegisterTripFileResponse,
} from '../application/use-cases/register-trip-file.use-case';
import {
  GetDmsUsageForUserUseCase,
  type GetDmsUsageForUserResponse,
} from '../application/use-cases/get-dms-usage-for-user.use-case';
import { CreateTripFileUploadUrlDto } from './dtos/create-trip-file-upload-url.dto';
import { CreateTripFileDownloadUrlDto } from './dtos/create-trip-file-download-url.dto';
import { RegisterTripFileDto } from './dtos/register-trip-file.dto';

class CreateTripFileUploadUrlDataDto {
  @ApiProperty()
  path: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  signedUrl: string;

  @ApiProperty()
  expiresInSeconds: number;
}

class CreateTripFileUploadUrlHttpDto {
  @ApiProperty({ type: CreateTripFileUploadUrlDataDto })
  data: CreateTripFileUploadUrlDataDto;

  @ApiProperty()
  message: string;
}

class TripFileItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tripId: number;

  @ApiProperty()
  fileType: string;

  @ApiProperty()
  filePath: string;

  @ApiProperty({ nullable: true })
  fileName: string | null;

  @ApiProperty({ nullable: true })
  mimeType: string | null;

  @ApiProperty()
  createdAt: string;
}

class ListTripFilesForUserDataDto {
  @ApiProperty({ type: [TripFileItemDto] })
  files: TripFileItemDto[];
}

class ListTripFilesForUserHttpDto {
  @ApiProperty({ type: ListTripFilesForUserDataDto })
  data: ListTripFilesForUserDataDto;

  @ApiProperty()
  message: string;
}

class CreateTripFileDownloadUrlDataDto {
  @ApiProperty()
  fileId: number;

  @ApiProperty()
  signedUrl: string;

  @ApiProperty()
  expiresInSeconds: number;
}

class CreateTripFileDownloadUrlHttpDto {
  @ApiProperty({ type: CreateTripFileDownloadUrlDataDto })
  data: CreateTripFileDownloadUrlDataDto;

  @ApiProperty()
  message: string;
}

class RegisterTripFileDataDto {
  @ApiProperty()
  fileId: number;

  @ApiProperty()
  deduplicated: boolean;
}

class RegisterTripFileHttpDto {
  @ApiProperty({ type: RegisterTripFileDataDto })
  data: RegisterTripFileDataDto;

  @ApiProperty()
  message: string;
}

class DmsUsageDataDto {
  @ApiProperty()
  uploadUrlRequests: number;

  @ApiProperty()
  uploadRegisteredFiles: number;

  @ApiProperty()
  downloadUrlRequests: number;

  @ApiProperty()
  uploadedBytes: number;
}

class GetDmsUsageHttpDto {
  @ApiProperty({ type: DmsUsageDataDto })
  data: DmsUsageDataDto;

  @ApiProperty()
  message: string;
}

@ApiTags('DMS')
@Controller('dms')
@UseGuards(JwtSessionGuard)
export class DmsController {
  constructor(
    private readonly createTripFileUploadUrlUseCase: CreateTripFileUploadUrlUseCase,
    private readonly listTripFilesForUserUseCase: ListTripFilesForUserUseCase,
    private readonly createTripFileDownloadUrlUseCase: CreateTripFileDownloadUrlUseCase,
    private readonly registerTripFileUseCase: RegisterTripFileUseCase,
    private readonly getDmsUsageForUserUseCase: GetDmsUsageForUserUseCase,
  ) {}

  @Post('users/:userId/trips/:tripId/files/upload-url')
  @ApiOperation({ summary: 'Generar URL firmada para subir archivo de viaje' })
  @ApiOkResponse({ type: CreateTripFileUploadUrlHttpDto })
  async createUploadUrl(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() body: CreateTripFileUploadUrlDto,
    @CurrentUser() user: unknown,
  ): Promise<CreateTripFileUploadUrlResponse> {
    assertUserOwnership(userId, user);
    return this.createTripFileUploadUrlUseCase.execute({
      userId,
      tripId,
      fileName: body.fileName,
      mimeType: body.mimeType,
      fileSizeBytes: body.fileSizeBytes,
    });
  }

  @Post('users/:userId/trips/:tripId/files/register')
  @ApiOperation({ summary: 'Registrar archivo subido al bucket para el viaje' })
  @ApiOkResponse({ type: RegisterTripFileHttpDto })
  async registerTripFile(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() body: RegisterTripFileDto,
    @CurrentUser() user: unknown,
  ): Promise<RegisterTripFileResponse> {
    assertUserOwnership(userId, user);
    return this.registerTripFileUseCase.execute({
      userId,
      tripId,
      fileType: body.fileType,
      fileName: body.fileName,
      mimeType: body.mimeType,
      path: body.path,
      fileSizeBytes: body.fileSizeBytes,
    });
  }

  @Get('users/:userId/trips/:tripId/files')
  @ApiOperation({ summary: 'Listar archivos de viaje del usuario' })
  @ApiOkResponse({ type: ListTripFilesForUserHttpDto })
  async listTripFiles(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('tripId', ParseIntPipe) tripId: number,
    @CurrentUser() user: unknown,
  ): Promise<ListTripFilesForUserResponse> {
    assertUserOwnership(userId, user);
    return this.listTripFilesForUserUseCase.execute(userId, tripId);
  }

  @Get('users/:userId/usage')
  @ApiOperation({
    summary: 'Consultar métricas operativas de uso DMS por usuario',
  })
  @ApiOkResponse({ type: GetDmsUsageHttpDto })
  getDmsUsage(
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() user: unknown,
  ): GetDmsUsageForUserResponse {
    assertUserOwnership(userId, user);
    return this.getDmsUsageForUserUseCase.execute(userId);
  }

  @Post('users/:userId/files/download-url')
  @ApiOperation({ summary: 'Generar URL firmada para descargar archivo' })
  @ApiOkResponse({ type: CreateTripFileDownloadUrlHttpDto })
  async createDownloadUrl(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: CreateTripFileDownloadUrlDto,
    @CurrentUser() user: unknown,
  ): Promise<CreateTripFileDownloadUrlResponse> {
    assertUserOwnership(userId, user);
    return this.createTripFileDownloadUrlUseCase.execute(userId, body.fileId);
  }
}

function assertUserOwnership(userId: number, user: unknown): void {
  if (!isAuthUserWithSub(user) || Number(user.sub) !== userId) {
    throw new ForbiddenException({
      message: 'No puedes acceder a archivos de otro usuario.',
      error: 'Prohibido',
    });
  }
}

function isAuthUserWithSub(value: unknown): value is { readonly sub: string } {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const valueWithSub = value as { readonly sub?: unknown };
  return typeof valueWithSub.sub === 'string';
}
