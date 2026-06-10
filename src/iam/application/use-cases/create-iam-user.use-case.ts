import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { resolveIamRoleRecordByLabel } from '../resolve-iam-role-by-label';

export type CreateIamUserCommand = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly companyId: number;
  readonly branchId: number;
  readonly areaId: number;
  readonly roleLabel?: string;
};

export type CreateIamUserResponse = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
};

@Injectable()
export class CreateIamUserUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateIamUserCommand): Promise<CreateIamUserResponse> {
    const nombreNormalizado = command.name.trim();
    const correoNormalizado = command.email.trim().toLowerCase();
    const contrasena = command.password;
    const etiquetaRol = (command.roleLabel ?? 'Colaborador').trim();

    if (nombreNormalizado.length === 0) {
      throw new BadRequestException('El nombre es obligatorio.');
    }
    if (correoNormalizado.length === 0) {
      throw new BadRequestException('El correo es obligatorio.');
    }
    if (contrasena.length < 8) {
      throw new BadRequestException(
        'La contraseña debe tener al menos 8 caracteres.',
      );
    }

    const contrasenaHash = await hash(contrasena, 10);

    const [correoDuplicado, empresa, area, sucursal, rol] = await Promise.all([
      this.prismaService.user.findFirst({
        where: { email: correoNormalizado },
        select: { id: true },
      }),
      this.prismaService.company.findFirst({
        where: { id: command.companyId },
        select: { id: true },
      }),
      this.prismaService.area.findFirst({
        where: { id: command.areaId },
        select: { id: true },
      }),
      this.prismaService.branch.findFirst({
        where: {
          id: command.branchId,
          OR: [{ companyId: command.companyId }, { companyId: null }],
        },
        select: { id: true },
      }),
      resolveIamRoleRecordByLabel(this.prismaService, etiquetaRol),
    ]);

    if (correoDuplicado !== null) {
      throw new ConflictException('El correo ya está registrado.');
    }
    if (empresa === null) {
      throw new NotFoundException('Empresa no encontrada.');
    }
    if (area === null) {
      throw new NotFoundException('Área no encontrada.');
    }
    if (sucursal === null) {
      throw new NotFoundException(
        'Sucursal no encontrada para la empresa seleccionada.',
      );
    }
    if (rol === null) {
      throw new NotFoundException(`Rol no encontrado: ${etiquetaRol}.`);
    }

    const usuarioCreado = await this.prismaService.user.create({
      data: {
        name: nombreNormalizado,
        email: correoNormalizado,
        password: contrasenaHash,
        companyId: command.companyId,
        branchId: command.branchId,
        areaId: command.areaId,
        roleId: rol.id,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return usuarioCreado;
  }
}
