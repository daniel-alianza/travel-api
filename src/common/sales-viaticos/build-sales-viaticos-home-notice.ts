import type { CalendarDateParts } from '../date/calendar-date-parts-in-time-zone';
import { contarDiasHabilesInclusive } from '../working_time/business-schedule';
import {
  DIA_DISPERSION_VIATICOS_VENTAS,
  DIA_LIMITE_AUTORIZACION_VIATICOS_VENTAS,
  DIA_LIMITE_SOLICITUD_VIATICOS_VENTAS,
  PERMISO_VIAJES_APROBAR,
  PERMISO_VIATICOS_DISPERSAR,
} from './sales-viaticos-monthly-deadlines';
import type {
  SalesViaticosHomeNoticeDto,
  SalesViaticosHomeNoticeKind,
} from './sales-viaticos-home-notice.types';

export type BuildSalesViaticosHomeNoticeInput = {
  readonly permisosSesion: readonly string[];
  readonly areaUsuario: string;
  readonly personasPendientes: number | null;
  readonly calendarToday: CalendarDateParts;
  readonly timeZone: string;
};

export function esAreaVentas(area: string): boolean {
  return area.trim().toLowerCase() === 'ventas';
}

export function resolverTipoAvisoViaticosVentas(
  permisosSesion: readonly string[],
  esVentas: boolean,
): SalesViaticosHomeNoticeKind | null {
  if (permisosSesion.includes(PERMISO_VIATICOS_DISPERSAR)) {
    return 'dispersar';
  }
  if (permisosSesion.includes(PERMISO_VIAJES_APROBAR)) {
    return 'autorizar';
  }
  if (esVentas) {
    return 'solicitar';
  }
  return null;
}

function fechaDesdePartesCalendario(
  parts: CalendarDateParts,
  dia: number,
): Date {
  return new Date(parts.year, parts.month - 1, dia, 12, 0, 0, 0);
}

export function contarDiasHabilesHastaDiaCalendarioMes(
  diaLimiteCalendario: number,
  calendarToday: CalendarDateParts,
): number {
  const hoy = fechaDesdePartesCalendario(calendarToday, calendarToday.day);
  const limite = fechaDesdePartesCalendario(calendarToday, diaLimiteCalendario);
  if (hoy.getTime() > limite.getTime()) {
    return 0;
  }
  return contarDiasHabilesInclusive(hoy, limite);
}

export function etiquetaMesViaticos(calendarToday: CalendarDateParts): string {
  const referencia = fechaDesdePartesCalendario(
    calendarToday,
    calendarToday.day,
  );
  const etiqueta = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    year: 'numeric',
  }).format(referencia);
  return etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1);
}

function textoDiasHabilesRestantes(cantidad: number): string {
  if (cantidad <= 0) {
    return 'Sin días hábiles';
  }
  if (cantidad === 1) {
    return '1 día hábil';
  }
  return `${String(cantidad)} días hábiles`;
}

function etiquetaAccion(kind: SalesViaticosHomeNoticeKind): string {
  if (kind === 'solicitar') {
    return 'Solicitud de viáticos';
  }
  if (kind === 'autorizar') {
    return 'Autorización de viáticos';
  }
  return 'Dispersión de viáticos';
}

function construirMensajePrincipal(
  kind: SalesViaticosHomeNoticeKind,
  diasHabilesRestantes: number,
  mesEtiqueta: string,
): string {
  const diasTexto = textoDiasHabilesRestantes(diasHabilesRestantes);
  const prefijoDias =
    diasHabilesRestantes > 0
      ? `Te quedan ${diasTexto}`
      : 'El plazo del calendario cerró; aún tienes pendientes';

  if (kind === 'solicitar') {
    return `${prefijoDias} para solicitar tus viáticos de ${mesEtiqueta}.`;
  }
  if (kind === 'autorizar') {
    return `${prefijoDias} para autorizar viáticos de ${mesEtiqueta}.`;
  }
  return `${prefijoDias} para dispersar viáticos de ${mesEtiqueta}.`;
}

function construirMensajeSecundario(
  kind: SalesViaticosHomeNoticeKind,
  personasPendientes: number | null,
): string | null {
  if (personasPendientes === null || personasPendientes <= 0) {
    return null;
  }
  const etiquetaPersonas =
    personasPendientes === 1
      ? '1 persona'
      : `${String(personasPendientes)} personas`;
  if (kind === 'autorizar') {
    return `Tienes solicitudes pendientes de ${etiquetaPersonas} por revisar.`;
  }
  if (kind === 'dispersar') {
    return `Hay ${etiquetaPersonas} con viáticos listos para dispersión.`;
  }
  return null;
}

export function buildSalesViaticosHomeNotice(
  input: BuildSalesViaticosHomeNoticeInput,
): SalesViaticosHomeNoticeDto {
  const ventas = esAreaVentas(input.areaUsuario);
  const kind = resolverTipoAvisoViaticosVentas(input.permisosSesion, ventas);

  if (kind === null) {
    return {
      visible: false,
      kind: null,
      diasHabilesRestantes: 0,
      mesEtiqueta: etiquetaMesViaticos(input.calendarToday),
      personasPendientes: null,
      tituloAccion: null,
      mensajePrincipal: null,
      mensajeSecundario: null,
      timeZone: input.timeZone,
    };
  }

  let diasHabilesRestantes = 0;
  if (kind === 'solicitar') {
    diasHabilesRestantes = contarDiasHabilesHastaDiaCalendarioMes(
      DIA_LIMITE_SOLICITUD_VIATICOS_VENTAS,
      input.calendarToday,
    );
  } else if (kind === 'autorizar') {
    diasHabilesRestantes = contarDiasHabilesHastaDiaCalendarioMes(
      DIA_LIMITE_AUTORIZACION_VIATICOS_VENTAS,
      input.calendarToday,
    );
  } else {
    diasHabilesRestantes = contarDiasHabilesHastaDiaCalendarioMes(
      DIA_DISPERSION_VIATICOS_VENTAS,
      input.calendarToday,
    );
  }

  const personasPendientes = input.personasPendientes;
  const visible =
    diasHabilesRestantes > 0 ||
    (personasPendientes !== null && personasPendientes > 0);

  if (!visible) {
    return {
      visible: false,
      kind,
      diasHabilesRestantes,
      mesEtiqueta: etiquetaMesViaticos(input.calendarToday),
      personasPendientes,
      tituloAccion: null,
      mensajePrincipal: null,
      mensajeSecundario: null,
      timeZone: input.timeZone,
    };
  }

  const mesEtiqueta = etiquetaMesViaticos(input.calendarToday);
  const mensajePrincipal = construirMensajePrincipal(
    kind,
    diasHabilesRestantes,
    mesEtiqueta,
  );
  const mensajeSecundario = construirMensajeSecundario(
    kind,
    personasPendientes,
  );

  return {
    visible: true,
    kind,
    diasHabilesRestantes,
    mesEtiqueta,
    personasPendientes,
    tituloAccion: etiquetaAccion(kind),
    mensajePrincipal,
    mensajeSecundario,
    timeZone: input.timeZone,
  };
}
