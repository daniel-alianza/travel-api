import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AssignCardToUserUseCase,
  type AssignCardToUserResponse,
} from '../application/use-cases/assign-card-to-user.use-case';
import {
  DeactivateUserCardUseCase,
  type DeactivateUserCardResponse,
} from '../application/use-cases/deactivate-user-card.use-case';
import {
  GetCardAssignmentUsersUseCase,
  type GetCardAssignmentUsersResponse,
} from '../application/use-cases/get-card-assignment-users.use-case';
import {
  GetCardAssignmentFilterCatalogUseCase,
  type CardAssignmentFilterCatalogResponse,
} from '../application/use-cases/get-card-assignment-filter-catalog.use-case';
import { AssignCardDto } from './dtos/assign-card.dto';
import { DeactivateCardDto } from './dtos/deactivate-card.dto';

@ApiTags('Card Assignment')
@Controller('card-assignment')
export class CardsController {
  constructor(
    private readonly getCardAssignmentUsersUseCase: GetCardAssignmentUsersUseCase,
    private readonly getCardAssignmentFilterCatalogUseCase: GetCardAssignmentFilterCatalogUseCase,
    private readonly assignCardToUserUseCase: AssignCardToUserUseCase,
    private readonly deactivateUserCardUseCase: DeactivateUserCardUseCase,
  ) {}

  @Get('users')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar colaboradores para asignación de tarjeta' })
  @ApiOkResponse({
    description: 'Listado paginado de colaboradores con tarjeta viatic activa.',
  })
  async getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(9), ParseIntPipe) pageSize: number,
    @Query('search', new DefaultValuePipe('')) search: string,
    @Query('compania', new DefaultValuePipe('')) compania: string,
    @Query('area', new DefaultValuePipe('')) area: string,
  ): Promise<GetCardAssignmentUsersResponse> {
    return this.getCardAssignmentUsersUseCase.execute({
      page,
      pageSize,
      search,
      compania,
      area,
    });
  }

  @Get('filters')
  @HttpCode(200)
  @ApiOperation({ summary: 'Obtener catálogo de filtros para card assignment' })
  @ApiOkResponse({
    description: 'Catálogo de compañías y áreas disponibles para filtrar.',
  })
  async getFilters(): Promise<CardAssignmentFilterCatalogResponse> {
    return this.getCardAssignmentFilterCatalogUseCase.execute();
  }

  @Post('users/:userId/assign')
  @HttpCode(200)
  @ApiOperation({ summary: 'Asignar tarjeta viatic a colaborador' })
  @ApiBody({ type: AssignCardDto })
  @ApiOkResponse({
    description: 'Tarjeta asignada y colaborador actualizado.',
  })
  async assignCard(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: AssignCardDto,
  ): Promise<AssignCardToUserResponse> {
    const validatedCardType: 'VIATIC' | 'FUEL' =
      body.cardType === 'VIATIC'
        ? 'VIATIC'
        : body.cardType === 'FUEL'
          ? 'FUEL'
          : (() => {
              throw new BadRequestException('cardType inválido.');
            })();
    return this.assignCardToUserUseCase.execute({
      userId,
      actorUserId: body.actorUserId,
      cardNumber: body.cardNumber,
      companyName: body.companyName,
      cardType: validatedCardType,
      fuelName: body.fuelName,
      fuelCardKind: body.fuelCardKind,
      fuelAssignmentType: body.fuelAssignmentType,
      fuelGroup: body.fuelGroup,
      fuelStatus: body.fuelStatus,
    });
  }

  @Post('users/:userId/deactivate')
  @HttpCode(200)
  @ApiOperation({ summary: 'Desactivar tarjeta viatic del colaborador' })
  @ApiOkResponse({
    description: 'Tarjeta viatic activa removida del colaborador.',
  })
  @ApiBody({ type: DeactivateCardDto })
  async deactivateCard(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: DeactivateCardDto,
  ): Promise<DeactivateUserCardResponse> {
    const validatedCardType: 'VIATIC' | 'FUEL' =
      body.cardType === 'VIATIC'
        ? 'VIATIC'
        : body.cardType === 'FUEL'
          ? 'FUEL'
          : (() => {
              throw new BadRequestException('cardType inválido.');
            })();
    return this.deactivateUserCardUseCase.execute({
      userId,
      actorUserId: body.actorUserId,
      cardType: validatedCardType,
    });
  }
}
