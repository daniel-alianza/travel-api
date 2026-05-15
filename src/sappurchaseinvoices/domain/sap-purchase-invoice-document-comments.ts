export function construirTextoComentariosFacturaSap(input: {
  readonly comentarioAlComprobar: string | null | undefined;
  readonly notasRevisor: string | null | undefined;
}): string {
  const alComprobar = input.comentarioAlComprobar?.trim() ?? '';
  const textoComprobar =
    alComprobar.length > 0
      ? alComprobar
      : 'Sin comentario al enviar la comprobación.';

  const revisor = input.notasRevisor?.trim() ?? '';
  const lineas: string[] = [textoComprobar];
  if (revisor.length > 0) {
    lineas.push('', revisor);
  }
  return lineas.join('\n');
}
