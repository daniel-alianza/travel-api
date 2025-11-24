import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import type { TemplateRendererPort } from '../../../domain/ports/template-renderer.port';
import type { EmailTemplate } from '../../../domain/ports/template-renderer.port';

@Injectable()
export class HandlebarsTemplateRendererAdapter
  implements TemplateRendererPort
{
  private readonly logger = new Logger(
    HandlebarsTemplateRendererAdapter.name,
  );
  private readonly templates: Map<EmailTemplate, HandlebarsTemplateDelegate>;

  constructor() {
    this.templates = new Map();
    this.registerHandlebarsHelpers();
    this.loadTemplates();
  }

  private registerHandlebarsHelpers(): void {
    Handlebars.registerHelper('formatDate', (date: Date | string) => {
      if (!date) return '';
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    });

    Handlebars.registerHelper('formatCurrency', (amount: number) => {
      if (typeof amount !== 'number') return '0.00';
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
      }).format(amount);
    });

    Handlebars.registerHelper('lastFourDigits', (cardNumber: string) => {
      if (!cardNumber || typeof cardNumber !== 'string') return '****';
      return cardNumber.slice(-4);
    });
  }

  private loadTemplates(): void {
    const templatesPath = path.join(
      process.cwd(),
      'src',
      'mail',
      'infraestructure',
      'templates',
    );

    const templateMapping: Record<EmailTemplate, string> = {
      request: 'expense-request.hbs',
      approved: 'expense-request-approved.hbs',
      rejected: 'expense-request-rejected.hbs',
      treasurer: 'expense-request-treasurer.hbs',
      approvalConfirmation: 'approval-confirmation.hbs',
      sent: 'expense-request-sent.hbs',
      dispersed: 'expense-request-dispersed.hbs',
    };

    for (const [templateName, fileName] of Object.entries(templateMapping)) {
      try {
        const templatePath = path.join(templatesPath, fileName);
        const templateContent = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = Handlebars.compile(templateContent);
        this.templates.set(
          templateName as EmailTemplate,
          compiledTemplate,
        );
        this.logger.debug(`Template cargado: ${templateName}`);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error desconocido';
        this.logger.error(
          `Error al cargar template ${templateName}: ${errorMessage}`,
        );
      }
    }
  }

  async render(
    templateName: EmailTemplate,
    context: Record<string, unknown>,
  ): Promise<string> {
    const template = this.templates.get(templateName);

    if (!template) {
      this.logger.error(`Template no encontrado: ${templateName}`);
      throw new Error(`Template ${templateName} no encontrado`);
    }

    try {
      return template(context);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(
        `Error al renderizar template ${templateName}: ${errorMessage}`,
      );
      throw error;
    }
  }
}

