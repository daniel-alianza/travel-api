export interface TemplateRendererPort {
  render(
    templateName: string,
    context: Record<string, unknown>,
  ): Promise<string>;
}
