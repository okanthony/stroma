import { parseISO, startOfDay, differenceInDays, isAfter, isSameDay, isBefore } from 'date-fns';

export const getPlantWateringStatus = (minDate: string, maxDate: string) => {
  const today = startOfDay(new Date());
  const min = startOfDay(parseISO(minDate));
  const max = startOfDay(parseISO(maxDate));

  // Overdue: today is after max date
  if (isAfter(today, max)) {
    const daysOverdue = differenceInDays(today, max);
    return {
      text: `${daysOverdue} ${daysOverdue === 1 ? 'day' : 'days'} overdue`,
      isOverdue: true
    };
  }

  // Today: today is min date or between min and max
  if (isSameDay(today, min) || (isAfter(today, min) && isBefore(today, max))) {
    return {
      text: 'today',
      isOverdue: false
    };
  }

  // Future: today is before min date
  if (isBefore(today, min)) {
    const daysUntil = differenceInDays(min, today);
    return {
      text: `in ${daysUntil} ${daysUntil === 1 ? 'day' : 'days'}`,
      isOverdue: false
    };
  }

  // Fallback
  return {
    text: 'today',
    isOverdue: false
  };
};
