import { Inject, Injectable, Logger } from '@nestjs/common';
import type { EmailProviderPort } from '../../domain/ports/email-provider.port';
import type { TemplateRendererPort } from '../../domain/ports/template-renderer.port';
import type { SendEmailOptions } from '../interfaces/email-options.interface';
import { EmailMessage } from '../../domain/entities/email-message.entity';

@Injectable()
export class SendEmailUseCase {
  private readonly logger = new Logger(SendEmailUseCase.name);

  constructor(
    @Inject('EmailProviderPort')
    private readonly emailProvider: EmailProviderPort,
    @Inject('TemplateRendererPort')
    private readonly templateRenderer: TemplateRendererPort,
  ) {}

  async execute(options: SendEmailOptions): Promise<boolean> {
    try {
      this.logger.log(
        `Iniciando envío de correo - Template: ${options.template} - Para: ${Array.isArray(options.to) ? options.to.join(', ') : options.to} - Asunto: ${options.subject}`,
      );

      const html = await this.templateRenderer.render(
        options.template,
        options.context,
      );

      const toEmail = Array.isArray(options.to)
        ? options.to.join(', ')
        : options.to;

      let emailBody = html;
      if (options.bcc && options.bcc.length > 0) {
        emailBody += `<br><br><small>BCC: ${options.bcc.join(', ')}</small>`;
      }

      const emailMessage = new EmailMessage(
        toEmail,
        options.subject,
        emailBody,
        options.bcc,
        'viaticos@grupo-fg.com',
      );

      const result = await this.emailProvider.sendEmail(emailMessage);

      if (result) {
        this.logger.log(
          `✅ Correo enviado exitosamente - Template: ${options.template}`,
        );
      } else {
        this.logger.warn(
          `⚠️ Fallo el envío de correo - Template: ${options.template}`,
        );
      }

      return result;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(
        `❌ Error al enviar correo - Template: ${options.template} - Error: ${errorMessage}`,
      );
      return false;
    }
  }
}
