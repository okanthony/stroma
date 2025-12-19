import { NotificationConfig } from '@/types/notifications';
import { addDays, differenceInDays, isBefore, isAfter, startOfDay, format, isSameDay } from 'date-fns';
import { useNotificationsStore } from './';

// Helper to create a date at the user's preferred reminder time
export const setToReminderTime = (date: Date): Date => {
  const reminderTime = useNotificationsStore.getState().getReminderTimeGlobal();

  const newDate = new Date(date);
  newDate.setHours(reminderTime.getHours(), reminderTime.getMinutes(), 0, 0);
  return newDate;
};

// Note: some duplication here with data but keeping as is to maintain flexibility in the future if notifications per scenario are updated
export function formatWateringNotificationData(plantName: string, minDate: Date, maxDate: Date): NotificationConfig[] {
  const today = startOfDay(new Date());
  const notifications: NotificationConfig[] = [];

  // Scenario 1: Minimum date is in the future compared to today
  if (isBefore(today, startOfDay(minDate))) {
    const daysUntilMin = differenceInDays(minDate, today);

    // 1st reminder: day before min (if 2+ days away) or min date itself
    const firstReminderDate = daysUntilMin >= 2 ? setToReminderTime(addDays(minDate, -1)) : setToReminderTime(minDate);

    notifications.push({
      // TEMP: 15 seconds from now for testing
      // scheduledDate: new Date(Date.now() + 15 * 1000),
      scheduledDate: firstReminderDate,
      title: `${plantName} is thirsty!`,
      body: `Reminder to water before ${format(maxDate, 'MMM do')}`,
      type: 'reminder-initial-before-min'
    });

    // 2nd reminder: 1 day after max date
    notifications.push({
      // TEMP: 30 seconds from now for testing
      // scheduledDate: new Date(Date.now() + 30 * 1000),
      scheduledDate: setToReminderTime(addDays(maxDate, 1)),
      title: `${plantName} is 1 day overdue`,
      body: 'Reminder to water ASAP',
      type: 'reminder-overdue-1-day'
    });

    // 3rd reminder: 2 days after max date
    notifications.push({
      // TEMP: 45 seconds from now for testing
      // scheduledDate: new Date(Date.now() + 45 * 1000),
      scheduledDate: setToReminderTime(addDays(maxDate, 2)),
      title: `${plantName} is 2 days overdue`,
      body: 'Final reminder to water ASAP',
      type: 'reminder-overdue-2-days'
    });
  }

  // Scenario 2: Current date is between min and max watering dates
  else if (!isBefore(today, startOfDay(minDate)) && !isAfter(today, startOfDay(maxDate))) {
    // Edge case: if today is the max date, skip the "tomorrow" reminder
    // since it would be scheduled for the same time as the "1 day after max" reminder
    const isMaxDate = isSameDay(today, maxDate);

    if (!isMaxDate) {
      // 1st reminder: tomorrow at 9am
      notifications.push({
        scheduledDate: setToReminderTime(addDays(today, 1)),
        title: `${plantName} is thirsty!`,
        body: `Reminder to water before ${format(maxDate, 'MMM do')}`,
        type: 'reminder-initial-between-min-max'
      });
    }

    // 2nd reminder: 1 day after max date
    notifications.push({
      scheduledDate: setToReminderTime(addDays(maxDate, 1)),
      title: `${plantName} is 1 day overdue`,
      body: 'Reminder to water ASAP',
      type: 'reminder-overdue-1-day'
    });

    // 3rd reminder: 2 days after max date
    notifications.push({
      scheduledDate: setToReminderTime(addDays(maxDate, 2)),
      title: `${plantName} is 2 days overdue`,
      body: 'Final reminder to water ASAP',
      type: 'reminder-overdue-2-days'
    });
  }

  // Scenario 3: Current date is after max watering date
  else if (isAfter(today, startOfDay(maxDate))) {
    // 1st reminder: tomorrow at 9am
    const overdueCount1 = differenceInDays(addDays(today, 1), maxDate);
    notifications.push({
      scheduledDate: setToReminderTime(addDays(today, 1)),
      title: `${plantName} is ${overdueCount1} days overdue`,
      body: 'Reminder to water ASAP',
      type: 'reminder-overdue-1-day'
    });

    // 2nd reminder: day after tomorrow at 9am
    const overdueCount2 = differenceInDays(addDays(today, 2), maxDate);
    notifications.push({
      scheduledDate: setToReminderTime(addDays(today, 2)),
      title: `${plantName} is ${overdueCount2} days overdue`,
      body: 'Final reminder to water ASAP',
      type: 'reminder-overdue-2-days'
    });
  }

  return notifications;
}
