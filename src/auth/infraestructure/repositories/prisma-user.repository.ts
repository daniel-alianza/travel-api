import { Injectable } from '@nestjs/common';
import { RequestUser, ValidRoles } from 'fg-portal-auth';
import { PrismaService } from '../../../infraestructure/prisma/prisma.service';
import { UserRepository, UserWithPassword } from '../../application/interfaces';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<UserWithPassword | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      paternalSurname: user.paternalSurname,
      maternalSurname: user.maternalSurname,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      role: {
        name: user.role.name,
      },
    };
  }

  async findUserWithAppPermissions(
    userId: number,
  ): Promise<RequestUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
      },
    });

    if (!user || !user.isActive) {
      return null;
    }

    const roleName = user.role.name.toUpperCase() as ValidRoles;

    return {
      id: user.id,
      name: user.name,
      lastName: user.paternalSurname,
      email: user.email,
      role: roleName,
      apps: [],
    };
  }
}
