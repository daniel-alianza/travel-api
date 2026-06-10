import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type ChangePasswordCommand = {
  userId: number;
  currentPassword: string;
  newPassword: string;
};

type UserPasswordRecord = {
  id: number;
  password: string;
};

type PrismaUserPasswordReaderWriter = {
  user: {
    findFirst(args: {
      where: { id: number };
      select: { id: true; password: true };
    }): Promise<UserPasswordRecord | null>;
    update(args: {
      where: { id: number };
      data: { password: string };
    }): Promise<{ id: number }>;
  };
};

@Injectable()
export class ChangePasswordUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ChangePasswordCommand): Promise<void> {
    const nueva = command.newPassword.trim();
    const actual = command.currentPassword;

    if (nueva.length < 8) {
      throw new BadRequestException(
        'La nueva contraseña debe tener al menos 8 caracteres.',
      );
    }

    if (nueva === actual) {
      throw new BadRequestException(
        'La nueva contraseña debe ser distinta a la actual.',
      );
    }

    const prisma = this
      .prismaService as unknown as PrismaUserPasswordReaderWriter;
    const user = await prisma.user.findFirst({
      where: { id: command.userId },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!(await this.passwordMatches(actual, user.password))) {
      throw new UnauthorizedException('La contraseña actual no es correcta.');
    }

    const hashed = await hash(nueva, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });
  }

  private async passwordMatches(
    input: string,
    stored: string,
  ): Promise<boolean> {
    if (this.isBcryptHash(stored)) {
      return compare(input, stored);
    }

    const inputBuffer = Buffer.from(input, 'utf-8');
    const expectedBuffer = Buffer.from(stored, 'utf-8');

    if (inputBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(inputBuffer, expectedBuffer);
  }

  private isBcryptHash(value: string): boolean {
    return value.startsWith('$2a$') || value.startsWith('$2b$');
  }
}
