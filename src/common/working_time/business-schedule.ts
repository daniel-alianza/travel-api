const HORA_ENTRADA = 8;
const MINUTO_ENTRADA = 30;
const HORA_SALIDA_LUNES_VIERNES = 18;
const MINUTO_SALIDA_LUNES_VIERNES = 30;
const HORA_SALIDA_SABADO = 12;
const MINUTO_SALIDA_SABADO = 30;
const MILISEGUNDOS_POR_HORA = 3_600_000;

export function esDiaHabil(fecha: Date): boolean {
  const dia = fecha.getDay();
  return dia >= 1 && dia <= 6;
}

function finJornada(fecha: Date): Date {
  const fin = new Date(fecha);
  if (fecha.getDay() === 6) {
    fin.setHours(HORA_SALIDA_SABADO, MINUTO_SALIDA_SABADO, 0, 0);
    return fin;
  }
  fin.setHours(HORA_SALIDA_LUNES_VIERNES, MINUTO_SALIDA_LUNES_VIERNES, 0, 0);
  return fin;
}

export function esHorarioLaboral(fecha: Date): boolean {
  const inicio = new Date(fecha);
  inicio.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
  const fin = finJornada(fecha);
  return fecha.getTime() >= inicio.getTime() && fecha.getTime() < fin.getTime();
}

export function estaEnHorarioHabil(fecha: Date): boolean {
  return esDiaHabil(fecha) && esHorarioLaboral(fecha);
}

function siguienteInicioJornadaHabil(desde: Date): Date {
  const siguiente = new Date(desde);
  siguiente.setDate(siguiente.getDate() + 1);
  siguiente.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
  while (!esDiaHabil(siguiente)) {
    siguiente.setDate(siguiente.getDate() + 1);
  }
  return siguiente;
}

function ajustarAHorarioHabil(fecha: Date): Date {
  const ajustada = new Date(fecha);
  while (!esDiaHabil(ajustada)) {
    ajustada.setDate(ajustada.getDate() + 1);
    ajustada.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
  }
  const inicio = new Date(ajustada);
  inicio.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
  const fin = finJornada(ajustada);
  if (ajustada.getTime() < inicio.getTime()) {
    ajustada.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
    return ajustada;
  }
  if (ajustada.getTime() >= fin.getTime()) {
    return siguienteInicioJornadaHabil(ajustada);
  }
  return ajustada;
}

export function sumarHorasHabiles(fechaBase: Date, horas: number): Date {
  let restante = horas;
  let cursor = ajustarAHorarioHabil(fechaBase);
  while (restante > 0) {
    const finJornadaActual = finJornada(cursor);
    const horasDisponibles =
      (finJornadaActual.getTime() - cursor.getTime()) / MILISEGUNDOS_POR_HORA;
    if (horasDisponibles >= restante) {
      return new Date(cursor.getTime() + restante * MILISEGUNDOS_POR_HORA);
    }
    restante -= horasDisponibles;
    cursor = siguienteInicioJornadaHabil(cursor);
  }
  return cursor;
}

function sumarDiasHabiles(
  fechaInicio: Date,
  cantidadDiasHabiles: number,
): Date {
  const fecha = new Date(fechaInicio);
  let agregados = 0;
  while (agregados < cantidadDiasHabiles) {
    if (esDiaHabil(fecha)) {
      agregados += 1;
    }
    if (agregados >= cantidadDiasHabiles) {
      break;
    }
    fecha.setDate(fecha.getDate() + 1);
    fecha.setHours(HORA_ENTRADA, MINUTO_ENTRADA, 0, 0);
  }
  const fin = finJornada(fecha);
  fecha.setHours(fin.getHours(), fin.getMinutes(), 0, 0);
  return fecha;
}

export function calcularLimiteComprobacionMesAnterior(
  referencia: Date = new Date(),
): Date {
  const inicioMesActual = new Date(
    referencia.getFullYear(),
    referencia.getMonth(),
    1,
    HORA_ENTRADA,
    MINUTO_ENTRADA,
    0,
    0,
  );
  return sumarDiasHabiles(inicioMesActual, 7);
}

export function ventanaComprobacionMesAnteriorSigueAbierta(
  referencia: Date = new Date(),
): boolean {
  const limite = calcularLimiteComprobacionMesAnterior(referencia);
  return referencia.getTime() <= limite.getTime();
}

export function puedeComprobarMesAnterior(
  referencia: Date = new Date(),
): boolean {
  const limite = calcularLimiteComprobacionMesAnterior(referencia);
  return (
    referencia.getTime() <= limite.getTime() && estaEnHorarioHabil(referencia)
  );
}

export function contarDiasHabilesInclusive(inicio: Date, fin: Date): number {
  const cursor = new Date(
    inicio.getFullYear(),
    inicio.getMonth(),
    inicio.getDate(),
  );
  const finNorm = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate());
  let total = 0;
  while (cursor.getTime() <= finNorm.getTime()) {
    if (esDiaHabil(cursor)) {
      total += 1;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return total;
}
