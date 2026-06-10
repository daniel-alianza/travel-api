export type SalesViaticosHomeNoticeKind =
  | 'solicitar'
  | 'autorizar'
  | 'dispersar';

export type SalesViaticosHomeNoticeDto = {
  readonly visible: boolean;
  readonly kind: SalesViaticosHomeNoticeKind | null;
  readonly diasHabilesRestantes: number;
  readonly mesEtiqueta: string;
  readonly personasPendientes: number | null;
  readonly tituloAccion: string | null;
  readonly mensajePrincipal: string | null;
  readonly mensajeSecundario: string | null;
  readonly timeZone: string;
};
