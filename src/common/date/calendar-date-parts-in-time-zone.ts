export type CalendarDateParts = {
  readonly year: number;
  readonly month: number;
  readonly day: number;
};

export function getCalendarDatePartsInTimeZone(
  instant: Date,
  timeZone: string,
): CalendarDateParts {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const parts = formatter.formatToParts(instant);
  const yearPart = parts.find((p) => p.type === 'year')?.value;
  const monthPart = parts.find((p) => p.type === 'month')?.value;
  const dayPart = parts.find((p) => p.type === 'day')?.value;
  if (
    yearPart === undefined ||
    monthPart === undefined ||
    dayPart === undefined
  ) {
    throw new Error(
      'No se pudieron resolver las partes de la fecha en la zona indicada.',
    );
  }
  return {
    year: Number(yearPart),
    month: Number(monthPart),
    day: Number(dayPart),
  };
}

export function formatIsoCalendarDay(parts: CalendarDateParts): string {
  const month = String(parts.month).padStart(2, '0');
  const day = String(parts.day).padStart(2, '0');
  return `${parts.year}-${month}-${day}`;
}
