import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type GetCurrentUserProfileCommand = {
  userId: number;
};

export type GetCurrentUserProfileResponse = {
  nombreCompleto: string;
  correoElectronico: string;
  area: string;
  sucursal: string | null;
  departamento: string;
  jefeDirecto: string;
  tieneJefeDirectoAsignado: boolean;
};

type UserProfileRecord = {
  name: string;
  email: string;
  area: { name: string };
  branch: { name: string };
  company: { name: string };
  manager: { name: string } | null;
};

type PrismaUserProfileReader = {
  user: {
    findFirst(args: {
      where: { id: number };
      select: {
        name: true;
        email: true;
        area: { select: { name: true } };
        branch: { select: { name: true } };
        company: { select: { name: true } };
        manager: { select: { name: true } };
      };
    }): Promise<UserProfileRecord | null>;
  };
};

@Injectable()
export class GetCurrentUserProfileUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    command: GetCurrentUserProfileCommand,
  ): Promise<GetCurrentUserProfileResponse> {
    const prisma = this.prismaService as unknown as PrismaUserProfileReader;
    const user = await prisma.user.findFirst({
      where: { id: command.userId },
      select: {
        name: true,
        email: true,
        area: { select: { name: true } },
        branch: { select: { name: true } },
        company: { select: { name: true } },
        manager: { select: { name: true } },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const sucursalNombre = user.branch.name.trim();
    const sucursal = sucursalNombre.length > 0 ? sucursalNombre : null;
    const jefeNombre = user.manager?.name?.trim() ?? '';
    const jefeDirecto =
      jefeNombre.length > 0 ? jefeNombre : 'Sin jefe directo asignado';
    const tieneJefeDirectoAsignado = user.manager !== null;

    return {
      nombreCompleto: user.name.trim(),
      correoElectronico: user.email.trim().toLowerCase(),
      area: user.area.name.trim(),
      sucursal,
      departamento: user.company.name.trim(),
      jefeDirecto,
      tieneJefeDirectoAsignado,
    };
  }
}
