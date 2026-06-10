import { Injectable } from '@nestjs/common';
import { existsSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as hbs from 'hbs';
import type { TemplateRendererPort } from '../../application/interfaces/template-renderer.port';

function resolveTemplatesDir(): string {
  const candidates = [
    path.resolve(__dirname, 'templates'),
    path.resolve(
      process.cwd(),
      'dist',
      'src',
      'notifications',
      'infrastructure',
      'mail',
      'templates',
    ),
    path.resolve(
      process.cwd(),
      'dist',
      'notifications',
      'infrastructure',
      'mail',
      'templates',
    ),
    path.resolve(
      process.cwd(),
      'src',
      'notifications',
      'infrastructure',
      'mail',
      'templates',
    ),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return candidates[0];
}

@Injectable()
export class HandlebarsRenderService implements TemplateRendererPort {
  private readonly templatesDir: string;

  constructor() {
    this.templatesDir = resolveTemplatesDir();

    hbs.handlebars.registerHelper('formatCurrency', (value: unknown) => {
      if (value === null || value === undefined || value === '') {
        return '0.00';
      }
      const num = Number(value);
      if (!Number.isFinite(num)) {
        return '0.00';
      }
      return num.toLocaleString('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    });
  }

  async render(
    templateName: string,
    context: Record<string, unknown>,
  ): Promise<string> {
    const templatePath = path.resolve(this.templatesDir, `${templateName}.hbs`);

    if (!existsSync(templatePath)) {
      throw new Error(
        `Plantilla no encontrada: ${templatePath} (directorio base: ${this.templatesDir})`,
      );
    }

    const source = await fs.readFile(templatePath, 'utf-8');
    const template = hbs.handlebars.compile(source);
    return template(context);
  }
}
