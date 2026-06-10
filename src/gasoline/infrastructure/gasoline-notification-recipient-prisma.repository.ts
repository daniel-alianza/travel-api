import { Injectable } from '@nestjs/common';
import type { GasolineNotificationRecipientRole } from '../../../generated/prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import type {
  GasolineNotificationFlags,
  GasolineNotificationRecipientRepository,
  GasolineNotificationRecipientRoleValue,
} from '../application/interfaces/gasoline-notification-recipient.repository.interface';

@Injectable()
export class GasolineNotificationRecipientPrismaRepository implements GasolineNotificationRecipientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findFlagsByUserIds(
    userIds: readonly number[],
  ): Promise<Map<number, GasolineNotificationFlags>> {
    const map = new Map<number, GasolineNotificationFlags>();
    if (userIds.length === 0) {
      return map;
    }

    const rows =
      await this.prismaService.gasolineNotificationRecipient.findMany({
        where: {
          userId: { in: [...userIds] },
          isActive: true,
        },
        select: { userId: true, role: true },
      });

    for (const userId of userIds) {
      map.set(userId, {
        treasuryApprover: false,
        dispersalNotify: false,
      });
    }

    for (const row of rows) {
      const current = map.get(row.userId);
      if (current === undefined) {
        continue;
      }
      if (row.role === 'treasury_approver') {
        map.set(row.userId, { ...current, treasuryApprover: true });
      }
      if (row.role === 'dispersal_notify') {
        map.set(row.userId, { ...current, dispersalNotify: true });
      }
    }

    return map;
  }

  async isActiveRecipient(
    email: string,
    role: GasolineNotificationRecipientRoleValue,
  ): Promise<boolean> {
    const normalized = email.trim().toLowerCase();
    if (normalized.length === 0) {
      return false;
    }

    const count = await this.prismaService.gasolineNotificationRecipient.count({
      where: {
        role: role,
        isActive: true,
        user: { email: normalized },
      },
    });

    return count > 0;
  }

  async isActiveRecipientByUserId(
    userId: number,
    role: GasolineNotificationRecipientRoleValue,
  ): Promise<boolean> {
    const count = await this.prismaService.gasolineNotificationRecipient.count({
      where: {
        userId,
        role: role,
        isActive: true,
      },
    });

    return count > 0;
  }

  async listActiveEmailsByRole(
    role: GasolineNotificationRecipientRoleValue,
  ): Promise<readonly string[]> {
    const rows =
      await this.prismaService.gasolineNotificationRecipient.findMany({
        where: {
          role: role,
          isActive: true,
        },
        select: { user: { select: { email: true } } },
      });

    return rows.map((row) => row.user.email.trim().toLowerCase());
  }

  async setUserNotificationFlags(
    userId: number,
    flags: GasolineNotificationFlags,
  ): Promise<void> {
    await this.upsertRole(userId, 'treasury_approver', flags.treasuryApprover);
    await this.upsertRole(userId, 'dispersal_notify', flags.dispersalNotify);
  }

  private async upsertRole(
    userId: number,
    role: GasolineNotificationRecipientRoleValue,
    active: boolean,
  ): Promise<void> {
    const prismaRole = role;

    if (active) {
      await this.prismaService.gasolineNotificationRecipient.upsert({
        where: { userId_role: { userId, role: prismaRole } },
        create: { userId, role: prismaRole, isActive: true },
        update: { isActive: true },
      });
      return;
    }

    await this.prismaService.gasolineNotificationRecipient.updateMany({
      where: { userId, role: prismaRole },
      data: { isActive: false },
    });
  }
}
