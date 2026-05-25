import { getCalendarDatePartsInTimeZone } from './calendar-date-parts-in-time-zone';

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
