import { Inject, Injectable, Logger } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { resolveCompanyEmailBrand } from '../../domain/resolve-company-email-brand';
import type { MailerPort } from '../interfaces/mailer.port';
import type { TemplateRendererPort } from '../interfaces/template-renderer.port';

export type BossAuthNotificationCommand = {
  readonly recipientEmail: string;
  readonly employeeName: string;
  readonly bossName: string;
  readonly companyName: string;
  readonly cardNumber: string;
  readonly requestId: string;
  readonly motivo: string;
  readonly destinos: string;
  readonly totalAmount: number;
  readonly gasolinaAmount: number;
  readonly tagAmount: number;
  readonly tripCount: number;
  readonly appUrl: string;
};

export type SendBossAuthNotificationResponse = ApiSuccessResponse<{
  readonly rendered: boolean;
  readonly sent: boolean;
}>;

@Injectable()
export class SendBossAuthNotificationUseCase {
  private readonly logger = new Logger(SendBossAuthNotificationUseCase.name);

  constructor(
    @Inject('MailerPort')
    private readonly mailerPort: MailerPort,
    @Inject('TemplateRendererPort')
    private readonly templateRendererPort: TemplateRendererPort,
  ) {}

  async execute(
    command: BossAuthNotificationCommand,
  ): Promise<SendBossAuthNotificationResponse> {
    this.logger.debug(
      `Renderizando boss-auth solicitud #${command.requestId} → ${command.recipientEmail}`,
    );

    const brand = resolveCompanyEmailBrand(command.companyName);
    const htmlContent = await this.templateRendererPort.render('boss-auth', {
      ...command,
      companyName: brand.companyName,
      brandColorPrimary: brand.brandColorPrimary,
      brandColorSecondary: brand.brandColorSecondary,
      brandButtonTextColor: brand.brandButtonTextColor,
      logoUrl: brand.logoUrl,
      logoWidth: brand.logoWidth,
    });

    this.logger.debug(
      `Plantilla boss-auth renderizada solicitud #${command.requestId} (${htmlContent.length} caracteres)`,
    );

    await this.mailerPort.notifyBossAuth(command, htmlContent);

    return buildSuccessResponse(
      { rendered: true, sent: true },
      'Notificación de autorización enviada correctamente.',
    );
  }
}
