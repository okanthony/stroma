export type PermissionStatus = 'granted' | 'denied' | 'undetermined';

export type NotificationType = 'reminder-initial-before-min' | 'reminder-initial-between-min-max' | 'reminder-overdue-1-day' | 'reminder-overdue-2-days';

export interface NotificationConfig {
  scheduledDate: Date;
  title: string;
  body: string;
  type: NotificationType;
}
