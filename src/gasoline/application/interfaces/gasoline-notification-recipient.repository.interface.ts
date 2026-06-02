export type GasolineNotificationRecipientRoleValue =
  | 'treasury_approver'
  | 'dispersal_notify';

export type GasolineNotificationFlags = {
  readonly treasuryApprover: boolean;
  readonly dispersalNotify: boolean;
};

export interface GasolineNotificationRecipientRepository {
  findFlagsByUserIds(
    userIds: readonly number[],
  ): Promise<Map<number, GasolineNotificationFlags>>;
  isActiveRecipient(
    email: string,
    role: GasolineNotificationRecipientRoleValue,
  ): Promise<boolean>;
  isActiveRecipientByUserId(
    userId: number,
    role: GasolineNotificationRecipientRoleValue,
  ): Promise<boolean>;
  listActiveEmailsByRole(
    role: GasolineNotificationRecipientRoleValue,
  ): Promise<readonly string[]>;
  setUserNotificationFlags(
    userId: number,
    flags: GasolineNotificationFlags,
  ): Promise<void>;
}
