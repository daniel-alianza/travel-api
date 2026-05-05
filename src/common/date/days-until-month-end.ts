export type CalendarDateParts = {
  readonly year: number;
  readonly month: number;
  readonly day: number;
};

function getCalendarDatePartsInTimeZone(
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

function getLastDayOfMonth(year: number, monthOneToTwelve: number): number {
  const monthIndexZeroBased = monthOneToTwelve - 1;
  return new Date(Date.UTC(year, monthIndexZeroBased + 1, 0)).getUTCDate();
}

export function getDaysUntilMonthEnd(instant: Date, timeZone: string): number {
  const { year, month, day } = getCalendarDatePartsInTimeZone(
    instant,
    timeZone,
  );
  const lastDay = getLastDayOfMonth(year, month);
  return Math.max(0, lastDay - day);
}
