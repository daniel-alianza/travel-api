export interface MailerPort {
  notifyRequestSent(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void>;

  notifyBossAuth(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void>;

  notifyRequestApproved(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void>;

  notifyApprovedSent(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void>;

  notifyDispersionMessage(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void>;

  notifyDispersionApplicant(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void>;

  notifyDispersionApplicantForBoss(
    command: Record<string, unknown>,
    htmlContent: string,
  ): Promise<void>;
}
