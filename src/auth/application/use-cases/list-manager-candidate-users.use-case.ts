import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

const ROLES_ELEGIBLES_JEFE: readonly string[] = [
  'administrador',
  'lider/gerente',
];

export type ListManagerCandidateUsersCommand = {
  currentUserId: number;
};

export type ManagerCandidateUserRow = {
  id: number;
  nombreCompleto: string;
  correo: string;
  area: string;
};

type UserCandidateRecord = {
  id: number;
  name: string;
  email: string;
  area: { name: string };
};

type PrismaManagerCandidateReader = {
  user: {
    findMany(args: {
      where: {
        id: { not: number };
        isActive: boolean;
        role: { name: { in: readonly string[] } };
      };
      select: {
        id: true;
        name: true;
        email: true;
        area: { select: { name: true } };
      };
      orderBy: { name: 'asc' };
    }): Promise<UserCandidateRecord[]>;
  };
};

@Injectable()
export class ListManagerCandidateUsersUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    command: ListManagerCandidateUsersCommand,
  ): Promise<ManagerCandidateUserRow[]> {
    const prisma =
      this.prismaService as unknown as PrismaManagerCandidateReader;
    const rows = await prisma.user.findMany({
      where: {
        id: { not: command.currentUserId },
        isActive: true,
        role: { name: { in: ROLES_ELEGIBLES_JEFE } },
      },
      select: {
        id: true,
        name: true,
        email: true,
        area: { select: { name: true } },
      },
      orderBy: { name: 'asc' },
    });

    return rows.map((row) => ({
      id: row.id,
      nombreCompleto: row.name.trim(),
      correo: row.email.trim().toLowerCase(),
      area: row.area.name.trim(),
    }));
  }
}
