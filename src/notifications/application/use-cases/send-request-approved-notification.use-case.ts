import { Inject, Injectable, Logger } from '@nestjs/common';
import { buildSuccessResponse } from '../../../common/exceptions/builders/success-response.builder';
import type { ApiSuccessResponse } from '../../../common/exceptions/interfaces/api-success-response.interface';
import { resolveCompanyEmailBrand } from '../../domain/resolve-company-email-brand';
import type { MailerPort } from '../interfaces/mailer.port';
import type { TemplateRendererPort } from '../interfaces/template-renderer.port';

export type RequestApprovedNotificationCommand = {
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

export type SendRequestApprovedNotificationResponse = ApiSuccessResponse<{
  readonly rendered: boolean;
  readonly sent: boolean;
}>;

@Injectable()
export class SendRequestApprovedNotificationUseCase {
  private readonly logger = new Logger(SendRequestApprovedNotificationUseCase.name);

  constructor(
    @Inject('MailerPort')
    private readonly mailerPort: MailerPort,
    @Inject('TemplateRendererPort')
    private readonly templateRendererPort: TemplateRendererPort,
  ) {}

  async execute(
    command: RequestApprovedNotificationCommand,
  ): Promise<SendRequestApprovedNotificationResponse> {
    this.logger.debug(
      `Renderizando request_approved solicitud #${command.requestId} → ${command.recipientEmail}`,
    );

    const brand = resolveCompanyEmailBrand(command.companyName);
    const htmlContent = await this.templateRendererPort.render('request_approved', {
      ...command,
      companyName: brand.companyName,
      brandColorPrimary: brand.brandColorPrimary,
      brandColorSecondary: brand.brandColorSecondary,
      brandButtonTextColor: brand.brandButtonTextColor,
      logoUrl: brand.logoUrl,
      logoWidth: brand.logoWidth,
    });

    this.logger.debug(
      `Plantilla request_approved renderizada solicitud #${command.requestId} (${htmlContent.length} caracteres)`,
    );

    await this.mailerPort.notifyRequestApproved(command, htmlContent);

    return buildSuccessResponse(
      { rendered: true, sent: true },
      'Notificación de aprobación enviada correctamente.',
    );
  }
}
