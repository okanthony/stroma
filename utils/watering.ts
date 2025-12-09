// utils/watering.ts
import { PlantType } from '@/types/plant';
import { PlantWateringData } from '@/constants/plant-data';

import { addDays, parseISO, formatDistanceToNow, isPast, differenceInDays, isBefore, isAfter, format, startOfDay } from 'date-fns';

export const isInSeason = () => {
  // Current date
  const today = startOfDay(new Date());
  const currentMonth = today.getMonth();

  // Growing season: April (month 3) through November (month 10)
  // TODO: adjust growing season based on location
  // Month is 0-indexed: 0=Jan, 3=Apr, 10=Nov
  return currentMonth >= 3 && currentMonth <= 10;
};

/**
 * Next watering range with min and max dates
 */
export interface NextWateringRange {
  min: string; // ISO timestamp for earliest watering date
  max: string; // ISO timestamp for latest watering date
}

/**
 * Input parameters for calculating next watering
 */
export interface CalculateNextWateringInput {
  lastWatered: string | undefined; // ISO timestamp of last watering
  type: PlantType;
}

/**
 * Calculates the next watering date range for a plant based on its type
 * and last watered date. Returns a range to give users flexibility.
 *
 * @param input - Object containing lastWatered ISO timestamp and type
 * @returns Object with min and max ISO timestamps for next watering window
 *
 * @example
 * calculateNextWatering({
 *   lastWatered: '2025-11-30T13:00:00.000Z',
 *   type: PlantType.Monstera
 * })
 * // Returns:
 * // {
 * //   min: '2025-12-07T13:00:00.000Z',  // 7 days later
 * //   max: '2025-12-10T13:00:00.000Z'   // 10 days later
 * // }
 */
export function calculateNextWatering(input: CalculateNextWateringInput): NextWateringRange {
  const { lastWatered, type } = input;

  // Validate inputs
  if (!lastWatered) {
    throw new Error('lastWatered is required');
  }

  if (!type) {
    throw new Error('type is required');
  }

  // Get watering frequency for this plant type
  const frequency = PlantWateringData[type].wateringRange;

  if (!frequency) {
    throw new Error(`No watering frequency data found for plant type: ${type}`);
  }

  const frequencyKey = isInSeason() ? 'inSeason' : 'outOfSeason';

  // Parse the ISO string to a Date object
  const lastWateredDate = parseISO(lastWatered);

  // Calculate min date (earliest watering date)
  const minDate = addDays(lastWateredDate, frequency[frequencyKey].minimum);

  // Calculate max date (latest watering date)
  const maxDate = addDays(lastWateredDate, frequency[frequencyKey].maximum);

  return {
    min: minDate.toISOString(),
    max: maxDate.toISOString()
  };
}

/**
 * Check if a plant needs watering (past the max watering date)
 */
export function needsWatering(input: CalculateNextWateringInput): boolean {
  const { max } = calculateNextWatering(input);
  return isPast(parseISO(max));
}

/**
 * Get human-readable time until next watering
 */
export function getTimeUntilWatering(input: CalculateNextWateringInput): string {
  const { min } = calculateNextWatering(input);
  return formatDistanceToNow(parseISO(min), { addSuffix: true });
  // Returns: "in 5 days", "in 2 hours", etc.
}

/**
 * Get days since last watered
 */
export function getDaysSinceWatered(lastWatered: string): number {
  return differenceInDays(new Date(), parseISO(lastWatered));
}
