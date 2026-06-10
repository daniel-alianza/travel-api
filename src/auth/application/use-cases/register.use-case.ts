import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type RegisterCommand = {
  name: string;
  email: string;
  password: string;
  companyId: number;
  branchId: number;
  areaId: number;
};

export type RegisterResponse = {
  id: number;
  name: string;
  email: string;
  companyId: number;
  branchId: number;
  areaId: number;
};

type AuthUserRecord = {
  id: number;
  name: string;
  email: string;
  password: string;
  companyId: number;
  branchId: number;
  areaId: number;
};

type PrismaUserReaderWriter = {
  user: {
    findFirst(args: {
      where: { email: string };
    }): Promise<AuthUserRecord | null>;
    create(args: {
      data: {
        name: string;
        email: string;
        password: string;
        companyId: number;
        branchId: number;
        areaId: number;
      };
      select: {
        id: true;
        name: true;
        email: true;
        companyId: true;
        branchId: true;
        areaId: true;
      };
    }): Promise<RegisterResponse>;
  };
};

@Injectable()
export class RegisterUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: RegisterCommand): Promise<RegisterResponse> {
    const normalizedEmail = command.email.trim().toLowerCase();
    const hashedPassword = await hash(command.password, 10);
    const prismaUserReaderWriter = this
      .prismaService as unknown as PrismaUserReaderWriter;

    const existingUser = await prismaUserReaderWriter.user.findFirst({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    return prismaUserReaderWriter.user.create({
      data: {
        name: command.name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        companyId: command.companyId,
        branchId: command.branchId,
        areaId: command.areaId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        companyId: true,
        branchId: true,
        areaId: true,
      },
    });
  }
}
