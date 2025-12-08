// utils/watering.ts
import { subWeeks, startOfDay, addHours } from 'date-fns';

export enum WateringTimeframe {
  Today = 'today',
  ThisWeek = 'this-week',
  TwoWeeks = 'two-weeks',
  FourWeeks = 'four-weeks',
  Undetermined = 'undetermined'
}

/**
 * Helper: Get date at noon UTC
 */
export function getDateAtNoon(date: Date): Date {
  const startOfDayDate = startOfDay(date);
  return addHours(startOfDayDate, 12);
}

/**
 * Converts a user-selected watering timeframe to an ISO timestamp (UTC)
 * with time set to 12:00:00 (noon) for consistency.
 */
export function getTimestampFromTimeframe(timeframe: WateringTimeframe | undefined): string {
  // TODO: how to handle undetermined and not just empty string
  if (timeframe === 'undetermined' || !timeframe) {
    return '';
  }

  const today = new Date();
  const todayAtNoon = getDateAtNoon(today);

  switch (timeframe) {
    case 'today':
      return todayAtNoon.toISOString();

    case 'this-week':
      return getDateAtNoon(subWeeks(today, 1)).toISOString();

    case 'two-weeks':
      return getDateAtNoon(subWeeks(today, 2)).toISOString();

    case 'four-weeks':
      return getDateAtNoon(subWeeks(today, 4)).toISOString();

    default:
      const _exhaustive: never = timeframe;
      throw new Error(`Unhandled timeframe: ${_exhaustive}`);
  }
}
