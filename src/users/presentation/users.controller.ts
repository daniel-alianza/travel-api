import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateUserInput,
  UpdateUserInput,
} from '../application/interfaces/user.repository';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id.use-case';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { DeleteUserByIdUseCase } from '../application/use-cases/delete-user-by-id.use-case';
import { CreateUserDto, UpdateUserDto, PaginationDto } from './dtos';
import { PaginationInput } from '../application/interfaces/pagination.input';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly deleteUserById: DeleteUserByIdUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Query() dto: PaginationDto) {
    const input: PaginationInput = { ...dto };
    const users = await this.getAllUsers.execute(input);

    return {
      data: users,
      message: 'Usuarios obtenidos correctamente',
      error: null,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.getUserById.execute(id);

    return {
      data: user,
      message: 'Usuario obtenido correctamente',
      error: null,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const input: CreateUserInput = { ...dto };
    const user = await this.createUser.execute(input);

    return {
      data: user,
      message: 'Usuario creado correctamente',
      error: null,
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const input: UpdateUserInput = { ...dto };
    const user = await this.updateUser.execute(id, input);

    return {
      data: user,
      message: 'Usuario actualizado correctamente',
      error: null,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteUserById.execute(id);

    return {
      data: null,
      message: `Usuario con ID ${id} eliminado correctamente`,
      error: null,
    };
  }
}
