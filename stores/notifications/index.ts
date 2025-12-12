import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { NotificationType, PermissionStatus } from '@/types/notifications';
import { parseISO } from 'date-fns';
import { usePlantStore } from '@/stores';
import { calculateNextWatering } from '@/utils/watering';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { formatWateringNotificationData } from './utils';

interface NotificationsState {
  // State
  permissionStatus: PermissionStatus;
  hasRequestedPermission: boolean;
  scheduledNotifications: Record<string, ScheduledNotification>; // keyed by notification ID
  reminderTime: string; // ISO string of Date with time set (e.g., "2024-01-01T09:00:00")

  // Actions
  // Permissions
  getNotificationPermissionStatus: () => PermissionStatus;
  requestNotificationPermissions: () => Promise<PermissionStatus>;
  getSystemPermissionStatus: () => Promise<void>;
  arePermissionsDenied: () => boolean;
  arePermissionsGranted: () => boolean;

  // Notifications
  scheduleNotificationsForPlant: (plantId: string) => Promise<string[] | null>;
  cancelNotificationForPlant: (notificationId: string) => Promise<void>;
  cancelAllNotificationsForPlant: (plantId: string) => Promise<void>;
  rescheduleAllNotifications: () => Promise<void>;

  // Notification time
  setReminderTimeGlobal: (time: Date) => Promise<void>;
  getReminderTimeGlobal: () => Date;

  // Admin
  clearNotificationsStore: () => Promise<void>;
}

interface ScheduledNotification {
  id: string; // unique notification ID
  plantId: string; // reference back to plant
  scheduledFor: Date; // when notification will fire
  title: string;
  body: string;
  type: NotificationType;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      // Initial state
      permissionStatus: 'undetermined',
      hasRequestedPermission: false,
      scheduledNotifications: {},
      reminderTime: (() => {
        const date = new Date();
        // Default to 9:00 AM
        date.setHours(9, 0, 0, 0);
        return date.toISOString();
      })(),

      // Get current permission status from store
      getNotificationPermissionStatus: () => {
        return get().permissionStatus;
      },

      arePermissionsDenied: () => {
        const status = get().permissionStatus;
        return status !== 'granted';
      },

      // TODO: use this instead of denied fn as there is also undetermined status?
      arePermissionsGranted: () => {
        const status = get().permissionStatus;
        return status === 'granted';
      },

      // Request permissions from the user
      requestNotificationPermissions: async () => {
        const { status } = await Notifications.requestPermissionsAsync();

        set({
          permissionStatus: status,
          hasRequestedPermission: true
        });

        return status;
      },

      // Check current system permissions
      getSystemPermissionStatus: async () => {
        const { status } = await Notifications.getPermissionsAsync();
        set({ permissionStatus: status });
      },

      rescheduleAllNotifications: async () => {
        const state = get();
        const { plants } = usePlantStore.getState();

        // Get all plants that have notifications enabled
        const plantsWithNotifications = Object.values(plants).filter((plant) => plant.areNotificationsEnabled && plant.notificationIds.length > 0);

        // Reschedule notifications for each plant
        for (const plant of plantsWithNotifications) {
          try {
            // Cancel existing notifications
            await state.cancelAllNotificationsForPlant(plant.id);

            // Schedule new notifications with updated time
            await state.scheduleNotificationsForPlant(plant.id);
          } catch (error) {
            console.error(`Failed to reschedule notifications for plant ${plant.id}:`, error);
          }
        }
      },

      // Set reminder time
      setReminderTimeGlobal: async (time: Date) => {
        set({ reminderTime: time.toISOString() });

        // Reschedule all notifications with new time
        await get().rescheduleAllNotifications();
      },

      // Get reminder time as Date object
      getReminderTimeGlobal: () => {
        return new Date(get().reminderTime);
      },

      // Schedule a notification for a plant based on watering dates
      scheduleNotificationsForPlant: async (plantId: string) => {
        const state = get();

        const { plants, updatePlant } = usePlantStore.getState();
        const plant = plants[plantId];

        // Don't schedule if missing plant data or notifications aren't enabled globally
        if (!plant || !plant.lastWatered || state.permissionStatus !== 'granted') {
          return null;
        }

        const nextWatering = calculateNextWatering({
          lastWatered: plant.lastWatered,
          type: plant.type
        });

        // Parse ISO strings to Date objects
        const minDate = parseISO(nextWatering.min);
        const maxDate = parseISO(nextWatering.max);

        // Generate notification configs
        const notificationConfigs = formatWateringNotificationData(plant.name, minDate, maxDate);

        // If no notifications to schedule, return
        if (notificationConfigs.length === 0) {
          return [];
        }

        // Schedule all notifications concurrently
        const scheduledNotifications = await Promise.all(
          notificationConfigs.map(async (config) => {
            const notificationId = await Notifications.scheduleNotificationAsync({
              content: {
                title: config.title,
                body: config.body,
                data: { plantId, type: config.type }
              },
              trigger: {
                type: SchedulableTriggerInputTypes.DATE,
                date: config.scheduledDate
              }
            });

            // Create ScheduledNotification object
            const scheduledNotification: ScheduledNotification = {
              id: notificationId,
              plantId,
              scheduledFor: config.scheduledDate,
              type: config.type,
              title: config.title,
              body: config.body
            };

            return scheduledNotification;
          })
        );

        // Update store with all scheduled notifications
        set((state) => ({
          scheduledNotifications: {
            ...state.scheduledNotifications,
            ...Object.fromEntries(scheduledNotifications.map((n) => [n.id, n]))
          }
        }));

        // Extract notification IDs for plant store
        const notificationIds = scheduledNotifications.map((n) => n.id);

        // Update plant with notification IDs
        updatePlant(plantId, {
          notificationIds
        });

        return notificationIds;
      },

      // Cancel a specific notification
      cancelNotificationForPlant: async (notificationId: string) => {
        await Notifications.cancelScheduledNotificationAsync(notificationId);

        set((state) => {
          const { [notificationId]: removed, ...rest } = state.scheduledNotifications;
          return { scheduledNotifications: rest };
        });
      },

      // Cancel all notifications for a specific plant
      cancelAllNotificationsForPlant: async (plantId: string) => {
        const state = get();
        const notificationsToCancel = Object.values(state.scheduledNotifications).filter((notification) => notification.plantId === plantId);

        // No notifications exist - exit
        if (!notificationsToCancel.length) {
          return;
        }

        // Cancel all matching notifications
        await Promise.all(notificationsToCancel.map((notification) => Notifications.cancelScheduledNotificationAsync(notification.id)));

        // Remove from store
        set((state) => {
          const scheduledNotifications = { ...state.scheduledNotifications };
          notificationsToCancel.forEach((notification) => {
            delete scheduledNotifications[notification.id];
          });
          return { scheduledNotifications };
        });

        // Reconcile updates in plant data
        const { plants, updatePlant } = usePlantStore.getState();
        const plant = plants[plantId];

        updatePlant(plant.id, {
          notificationIds: []
        });
      },

      clearNotificationsStore: async () => {
        // Cancel all scheduled notifications
        await Notifications.cancelAllScheduledNotificationsAsync();

        // Clear store state
        set({
          // Initial state
          permissionStatus: 'undetermined',
          hasRequestedPermission: false,
          scheduledNotifications: {},
          reminderTime: (() => {
            const date = new Date();
            // Default to 9:00 AM
            date.setHours(9, 0, 0, 0);
            return date.toISOString();
          })()
        });
      }
    }),
    {
      name: 'stroma-store-notifications',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
