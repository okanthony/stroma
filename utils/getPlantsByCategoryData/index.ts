import { parseISO, isWithinInterval, startOfDay, differenceInDays, isAfter, isSameDay, isBefore, format } from 'date-fns';
import type { Plant } from '@/types/plant';
import { calculateNextWatering, NextWateringRange } from '@/utils/watering';
import { PlantWithWateringInfo, NextWateringCopy } from '@/types/plant';

/**
 * Generates dynamic copy for next watering date based on current date
 * relative to the watering range.
 *
 * @param range - Next watering range with min and max ISO timestamps
 * @returns Object with label and value for UI display
 *
 * @example
 * // Current date is before min
 * getNextWateringCopy({ min: '2025-12-05T12:00:00.000Z', max: '2025-12-08T12:00:00.000Z' })
 * // { label: 'Earliest watering', value: '12/05' }
 *
 * // Current date is between min and max
 * getNextWateringCopy({ min: '2025-11-28T12:00:00.000Z', max: '2025-12-02T12:00:00.000Z' })
 * // { label: 'Water before', value: '12/02' }
 *
 * // Current date is after max (overdue)
 * getNextWateringCopy({ min: '2025-11-20T12:00:00.000Z', max: '2025-11-23T12:00:00.000Z' })
 * // { label: 'Watering overdue', value: '7 days' }
 */
function getNextWateringCopy(range: NextWateringRange): NextWateringCopy {
  const now = new Date();
  const minDate = parseISO(range.min);
  const maxDate = parseISO(range.max);

  // Case 1: Current date is before min value
  if (isBefore(now, minDate)) {
    return {
      label: 'Earliest watering',
      value: format(minDate, 'MM/dd')
    };
  }

  // Case 2: Current date is after min but before max
  if (isAfter(now, minDate) && isBefore(now, maxDate)) {
    return {
      label: 'Water before',
      value: format(maxDate, 'MM/dd')
    };
  }

  // Case 3: Current date is after max (overdue)
  const daysOverdue = differenceInDays(now, maxDate);
  return {
    label: 'Watering overdue',
    value: `${daysOverdue} ${daysOverdue === 1 ? 'day' : 'days'}`
  };
}

export const getPlantsByCategoryData = (plants: Plant[]) => {
  const plantsGrouped = plants.reduce(
    (acc, plant) => {
      if (!plant.lastWatered) {
        return acc;
      }

      const nextWatering = calculateNextWatering({
        lastWatered: plant.lastWatered,
        type: plant.type
      });

      const wateringCopy = getNextWateringCopy(nextWatering);
      const plantWithInfo: PlantWithWateringInfo = {
        ...plant,
        wateringCopy
      };

      const minDate = parseISO(nextWatering.min);
      const maxDate = parseISO(nextWatering.max);
      const now = startOfDay(new Date());

      // Calculate days until min watering date
      const daysUntilWatering = differenceInDays(minDate, now);

      // Check if overdue (current date is after max date)
      const isOverdue = isAfter(now, maxDate);

      // Today: min date is today, current date between min/max, or overdue
      if (isSameDay(minDate, now) || isWithinInterval(now, { start: minDate, end: maxDate }) || isOverdue) {
        acc.today.push({ ...plantWithInfo, isOverdue });
      }
      // This week: min date within 7 days
      else if (daysUntilWatering > 0 && daysUntilWatering <= 7) {
        acc.thisWeek.push(plantWithInfo);
      }
      // Next week: min date between 7 and 14 days
      else if (daysUntilWatering > 7 && daysUntilWatering <= 14) {
        acc.nextWeek.push(plantWithInfo);
      }
      // This month: min date between 14 and 30 days
      else if (daysUntilWatering > 14 && daysUntilWatering <= 30) {
        acc.thisMonth.push(plantWithInfo);
      }

      return acc;
    },
    {
      today: [] as (PlantWithWateringInfo & { isOverdue?: boolean })[],
      thisWeek: [] as PlantWithWateringInfo[],
      nextWeek: [] as PlantWithWateringInfo[],
      thisMonth: [] as PlantWithWateringInfo[]
    }
  );

  // Helper function to get min date for sorting
  const getMinDate = (plant: PlantWithWateringInfo) => {
    return parseISO(
      calculateNextWatering({
        lastWatered: plant.lastWatered,
        type: plant.type
      }).min
    );
  };

  // Sort today's plants: overdue first, then by min date
  plantsGrouped.today.sort((a, b) => {
    if (a.isOverdue && !b.isOverdue) return -1;
    if (!a.isOverdue && b.isOverdue) return 1;

    const aMinDate = parseISO(
      calculateNextWatering({
        lastWatered: a.lastWatered,
        type: a.type
      }).min
    );
    const bMinDate = parseISO(
      calculateNextWatering({
        lastWatered: b.lastWatered,
        type: b.type
      }).min
    );

    return aMinDate.getTime() - bMinDate.getTime();
  });

  // Sort thisWeek by min date ascending
  plantsGrouped.thisWeek.sort((a, b) => {
    return getMinDate(a).getTime() - getMinDate(b).getTime();
  });

  // Sort nextWeek by min date ascending
  plantsGrouped.nextWeek.sort((a, b) => {
    return getMinDate(a).getTime() - getMinDate(b).getTime();
  });

  // Sort thisMonth by min date ascending
  plantsGrouped.thisMonth.sort((a, b) => {
    return getMinDate(a).getTime() - getMinDate(b).getTime();
  });

  return plantsGrouped;
};
