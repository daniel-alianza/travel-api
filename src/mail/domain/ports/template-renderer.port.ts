export type EmailTemplate =
  | 'request'
  | 'approved'
  | 'rejected'
  | 'treasurer'
  | 'approvalConfirmation'
  | 'sent'
  | 'dispersed';

export interface TemplateRendererPort {
  render(
    templateName: EmailTemplate,
    context: Record<string, unknown>,
  ): Promise<string>;
}

