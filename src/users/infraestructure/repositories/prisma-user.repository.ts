import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/prisma/prisma.service';
import {
  CreateUserInput,
  UpdateUserInput,
  User,
  UserRepository,
} from '../../application/interfaces/user.repository';
import { PaginationInput } from '../../application/interfaces/pagination.input';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          company: true,
          branch: true,
          area: true,
          role: true,
          supervisor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!user) return null;

      return {
        id: user.id,
        name: user.name,
        paternalSurname: user.paternalSurname,
        maternalSurname: user.maternalSurname,
        email: user.email,
        isActive: user.isActive,
        company: {
          id: user.company.id,
          name: user.company.name,
        },
        branch: {
          id: user.branch.id,
          name: user.branch.name,
        },
        area: {
          id: user.area.id,
          name: user.area.name,
        },
        role: {
          id: user.role.id,
          name: user.role.name,
        },
        supervisor: user.supervisor
          ? {
              id: user.supervisor.id,
              name: user.supervisor.name,
              email: user.supervisor.email,
            }
          : null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(input?: PaginationInput): Promise<User[]> {
    const { limit = 20, offset = 0 } = input ?? {};

    try {
      const users = await this.prisma.user.findMany({
        take: limit,
        skip: offset,
        include: {
          company: true,
          branch: true,
          area: true,
          role: true,
          supervisor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return users.map((user) => ({
        id: user.id,
        name: user.name,
        paternalSurname: user.paternalSurname,
        maternalSurname: user.maternalSurname,
        email: user.email,
        isActive: user.isActive,
        company: {
          id: user.company.id,
          name: user.company.name,
        },
        branch: {
          id: user.branch.id,
          name: user.branch.name,
        },
        area: {
          id: user.area.id,
          name: user.area.name,
        },
        role: {
          id: user.role.id,
          name: user.role.name,
        },
        supervisor: user.supervisor
          ? {
              id: user.supervisor.id,
              name: user.supervisor.name,
              email: user.supervisor.email,
            }
          : null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));
    } catch (error) {
      throw error;
    }
  }

  async create(input: CreateUserInput): Promise<User> {
    try {
      const created = await this.prisma.user.create({
        data: {
          name: input.name,
          paternalSurname: input.paternalSurname,
          maternalSurname: input.maternalSurname,
          email: input.email,
          password: input.password,
          companyId: input.companyId,
          branchId: input.branchId,
          areaId: input.areaId,
          roleId: input.roleId,
          supervisorId: input.supervisorId,
        },
        include: {
          company: true,
          branch: true,
          area: true,
          role: true,
          supervisor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return {
        id: created.id,
        name: created.name,
        paternalSurname: created.paternalSurname,
        maternalSurname: created.maternalSurname,
        email: created.email,
        isActive: created.isActive,
        company: {
          id: created.company.id,
          name: created.company.name,
        },
        branch: {
          id: created.branch.id,
          name: created.branch.name,
        },
        area: {
          id: created.area.id,
          name: created.area.name,
        },
        role: {
          id: created.role.id,
          name: created.role.name,
        },
        supervisor: created.supervisor
          ? {
              id: created.supervisor.id,
              name: created.supervisor.name,
              email: created.supervisor.email,
            }
          : null,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, input: UpdateUserInput): Promise<User> {
    try {
      const updateData: any = {};

      if (input.name !== undefined) updateData.name = input.name;
      if (input.paternalSurname !== undefined)
        updateData.paternalSurname = input.paternalSurname;
      if (input.maternalSurname !== undefined)
        updateData.maternalSurname = input.maternalSurname;
      if (input.email !== undefined) updateData.email = input.email;
      if (input.password !== undefined) updateData.password = input.password;
      if (input.companyId !== undefined) updateData.companyId = input.companyId;
      if (input.branchId !== undefined) updateData.branchId = input.branchId;
      if (input.areaId !== undefined) updateData.areaId = input.areaId;
      if (input.roleId !== undefined) updateData.roleId = input.roleId;
      if (input.supervisorId !== undefined)
        updateData.supervisorId = input.supervisorId;
      if (input.isActive !== undefined) updateData.isActive = input.isActive;

      const updated = await this.prisma.user.update({
        where: { id },
        data: updateData,
        include: {
          company: true,
          branch: true,
          area: true,
          role: true,
          supervisor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return {
        id: updated.id,
        name: updated.name,
        paternalSurname: updated.paternalSurname,
        maternalSurname: updated.maternalSurname,
        email: updated.email,
        isActive: updated.isActive,
        company: {
          id: updated.company.id,
          name: updated.company.name,
        },
        branch: {
          id: updated.branch.id,
          name: updated.branch.name,
        },
        area: {
          id: updated.area.id,
          name: updated.area.name,
        },
        role: {
          id: updated.role.id,
          name: updated.role.name,
        },
        supervisor: updated.supervisor
          ? {
              id: updated.supervisor.id,
              name: updated.supervisor.name,
              email: updated.supervisor.email,
            }
          : null,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({ where: { email } });
      return count > 0;
    } catch (error) {
      throw error;
    }
  }
}

