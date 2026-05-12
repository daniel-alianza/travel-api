import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type SetIamUserPasswordCommand = {
  targetUserId: number;
  newPassword: string;
};

@Injectable()
export class SetIamUserPasswordUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: SetIamUserPasswordCommand): Promise<void> {
    const nueva = command.newPassword.trim();
    if (nueva.length < 8) {
      throw new BadRequestException(
        'La nueva contraseña debe tener al menos 8 caracteres.',
      );
    }

    const existente = await this.prismaService.user.findFirst({
      where: { id: command.targetUserId },
      select: { id: true },
    });

    if (existente === null) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const hashed = await hash(nueva, 10);
    await this.prismaService.user.update({
      where: { id: command.targetUserId },
      data: { password: hashed },
    });
  }
}
