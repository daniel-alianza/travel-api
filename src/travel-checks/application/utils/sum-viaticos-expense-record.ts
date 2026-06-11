import type { ExpenseTripExpenseAmountsRecord } from '../interfaces/travel-checks-repository.interface';

export function roundViaticosAmount(value: number): number {
  return Math.round(value * 100) / 100;
}

export function sumViaticosExpenseRecord(
  expenses: ExpenseTripExpenseAmountsRecord | null,
): number {
  if (expenses === null) {
    return 0;
  }

  return roundViaticosAmount(
    expenses.transport +
      expenses.tolls +
      expenses.lodging +
      expenses.food +
      expenses.freight +
      expenses.tools +
      expenses.shipping +
      expenses.miscellaneous,
  );
}
