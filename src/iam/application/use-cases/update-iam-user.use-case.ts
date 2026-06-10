import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { resolveIamRoleRecordByLabel } from '../resolve-iam-role-by-label';

export type UpdateIamUserCommand = {
  readonly targetUserId: number;
  readonly name: string;
  readonly email: string;
  readonly isActive: boolean;
  readonly roleLabel: string;
  readonly areaName: string;
  readonly branchName: string;
  readonly managerUserId: number | null;
};

@Injectable()
export class UpdateIamUserUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: UpdateIamUserCommand): Promise<void> {
    const nombreNormalizado = command.name.trim();
    const correoNormalizado = command.email.trim().toLowerCase();
    const areaNombre = command.areaName.trim();
    const sucursalNombre = command.branchName.trim();

    if (nombreNormalizado.length === 0) {
      throw new BadRequestException('El nombre es obligatorio.');
    }
    if (areaNombre.length === 0 || sucursalNombre.length === 0) {
      throw new BadRequestException('Área y sucursal son obligatorias.');
    }

    const usuarioActual = await this.prismaService.user.findFirst({
      where: { id: command.targetUserId },
      select: { id: true, companyId: true },
    });

    if (usuarioActual === null) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    if (
      command.managerUserId !== null &&
      command.managerUserId === command.targetUserId
    ) {
      throw new BadRequestException(
        'Un usuario no puede ser su propio jefe directo.',
      );
    }

    const [rol, area, sucursal, correoDuplicado, jefe] = await Promise.all([
      resolveIamRoleRecordByLabel(this.prismaService, command.roleLabel),
      this.prismaService.area.findFirst({
        where: { name: areaNombre },
        select: { id: true },
      }),
      this.prismaService.branch.findFirst({
        where: {
          name: sucursalNombre,
          OR: [{ companyId: usuarioActual.companyId }, { companyId: null }],
        },
        select: { id: true },
      }),
      this.prismaService.user.findFirst({
        where: {
          email: correoNormalizado,
          NOT: { id: command.targetUserId },
        },
        select: { id: true },
      }),
      command.managerUserId === null
        ? Promise.resolve(null)
        : this.prismaService.user.findFirst({
            where: { id: command.managerUserId },
            select: { id: true },
          }),
    ]);

    if (rol === null) {
      throw new NotFoundException(
        `Rol no encontrado: ${command.roleLabel.trim()}.`,
      );
    }
    if (area === null) {
      throw new NotFoundException(`Área no encontrada: ${areaNombre}.`);
    }
    if (sucursal === null) {
      throw new NotFoundException(
        `Sucursal no encontrada para la compañía del usuario: ${sucursalNombre}.`,
      );
    }
    if (correoDuplicado !== null) {
      throw new BadRequestException(
        'Ya existe otro usuario con ese correo electrónico.',
      );
    }
    if (command.managerUserId !== null && jefe === null) {
      throw new NotFoundException('Jefe directo no encontrado.');
    }

    await this.prismaService.user.update({
      where: { id: command.targetUserId },
      data: {
        name: nombreNormalizado,
        email: correoNormalizado,
        isActive: command.isActive,
        roleId: rol.id,
        areaId: area.id,
        branchId: sucursal.id,
        managerId: command.managerUserId,
      },
    });
  }
}
