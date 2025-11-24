import { EmailTemplate } from '../../domain/ports/template-renderer.port';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  context: Record<string, unknown>;
  template: EmailTemplate;
  bcc?: string[];
}
