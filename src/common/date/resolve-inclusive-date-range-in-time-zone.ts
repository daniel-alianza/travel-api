import {
  formatIsoCalendarDay,
  getCalendarDatePartsInTimeZone,
} from './calendar-date-parts-in-time-zone';

const ISO_DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export type InclusiveCalendarDateRange = {
  readonly fromIso: string;
  readonly toIso: string;
  readonly startInstant: Date;
  readonly endInstant: Date;
};

function parseIsoDayOrThrow(value: string, fieldLabel: string): string {
  const trimmed = value.trim();
  if (!ISO_DAY_PATTERN.test(trimmed)) {
    throw new Error(
      `${fieldLabel} debe tener el formato YYYY-MM-DD.`,
    );
  }
  const [yearText, monthText, dayText] = trimmed.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const valid =
    Number.isInteger(year) &&
    Number.isInteger(month) &&
    Number.isInteger(day) &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31;
  if (!valid) {
    throw new Error(`${fieldLabel} no es una fecha válida.`);
  }
  return trimmed;
}

function getUtcOffsetHoursForTimeZone(timeZone: string): number {
  if (timeZone === 'America/Mexico_City') {
    return 6;
  }
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
    hour: 'numeric',
  });
  const part = formatter
    .formatToParts(now)
    .find((p) => p.type === 'timeZoneName')?.value;
  if (part === undefined) {
    return 6;
  }
  const match = part.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (match === null) {
    return 6;
  }
  const sign = match[1] === '-' ? 1 : -1;
  const hours = Number(match[2]);
  const minutes = match[3] !== undefined ? Number(match[3]) : 0;
  return sign * (hours + minutes / 60);
}

function startOfCalendarDayUtc(isoDay: string, utcOffsetHours: number): Date {
  const [yearText, monthText, dayText] = isoDay.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  return new Date(Date.UTC(year, month - 1, day, utcOffsetHours, 0, 0, 0));
}

function endOfCalendarDayUtc(isoDay: string, utcOffsetHours: number): Date {
  const start = startOfCalendarDayUtc(isoDay, utcOffsetHours);
  return new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
}

function defaultMonthToTodayRangeIso(
  instant: Date,
  timeZone: string,
): { readonly fromIso: string; readonly toIso: string } {
  const hoy = getCalendarDatePartsInTimeZone(instant, timeZone);
  const fromIso = formatIsoCalendarDay({
    year: hoy.year,
    month: hoy.month,
    day: 1,
  });
  const toIso = formatIsoCalendarDay(hoy);
  return { fromIso, toIso };
}

export function resolveInclusiveDateRangeInTimeZone(input: {
  readonly fromInput: string | undefined;
  readonly toInput: string | undefined;
  readonly timeZone: string;
  readonly now?: Date;
}): InclusiveCalendarDateRange {
  const fromRaw = input.fromInput?.trim() ?? '';
  const toRaw = input.toInput?.trim() ?? '';
  const now = input.now ?? new Date();
  const utcOffsetHours = getUtcOffsetHoursForTimeZone(input.timeZone);

  let fromIso: string;
  let toIso: string;

  if (fromRaw.length === 0 && toRaw.length === 0) {
    const defecto = defaultMonthToTodayRangeIso(now, input.timeZone);
    fromIso = defecto.fromIso;
    toIso = defecto.toIso;
  } else if (fromRaw.length > 0 && toRaw.length > 0) {
    fromIso = parseIsoDayOrThrow(fromRaw, 'Fecha inicial');
    toIso = parseIsoDayOrThrow(toRaw, 'Fecha final');
    if (fromIso > toIso) {
      throw new Error(
        'La fecha inicial no puede ser posterior a la fecha final.',
      );
    }
  } else {
    const unica = parseIsoDayOrThrow(
      fromRaw.length > 0 ? fromRaw : toRaw,
      'Fecha',
    );
    fromIso = unica;
    toIso = unica;
  }

  return {
    fromIso,
    toIso,
    startInstant: startOfCalendarDayUtc(fromIso, utcOffsetHours),
    endInstant: endOfCalendarDayUtc(toIso, utcOffsetHours),
  };
}
