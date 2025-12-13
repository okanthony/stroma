// Components
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Linking } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card/index';
import { Row } from '@/components/Row/index';
import { Modal } from '@/components/Modal';
import { Column } from '@/components/Column/index';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Callout, CalloutTitle } from './notifications.components';

// Internal
import { usePlantStore, useNotificationsStore } from '@/stores';
import { colors, spacing, typography, borderRadius } from '@/constants/design-tokens';
import { Plant } from '@/types/plant';
import { formatTitleCase } from '@/utils/formatTitleCase';

// External
import React from 'react';
import { format } from 'date-fns';

// Component
export default function NotificationsScreen() {
  // Hooks - stores
  const { plants, plantIds, updatePlant } = usePlantStore();
  const { cancelAllNotificationsForPlant, scheduleNotificationsForPlant, setReminderTimeGlobal, getReminderTimeGlobal, arePermissionsDenied, getSystemPermissionStatus } = useNotificationsStore();
  const reminderTimeISO = useNotificationsStore((state) => state.reminderTime);

  // Hooks - state
  const [plantToDisable, setPlantToDisable] = React.useState<Plant | null>(null);
  const [showDatePickerModal, setShowDatePickerModal] = React.useState(false);
  const [reminderTimeLocal, setReminderTimeLocal] = React.useState(getReminderTimeGlobal());
  const [showNotificationPermissionCallout, setShowNotificationPermissionCallout] = React.useState(false);

  // Vars
  const reminderTimeGlobal = new Date(reminderTimeISO);
  // Map plantIds to plants array and sort alphabetically by name
  const plantsSorted = plantIds.map((id) => plants[id]).sort((a, b) => a.name.localeCompare(b.name));
  const areNotificationsPermissionsDisabled = arePermissionsDenied();
  // Uncomment to test disabled on mobile
  // const areNotificationsPermissionsDisabled = true;
  const notificationsPermissionsCalloutCopy = Platform.OS === 'web' ? 'Reminders only available on iOS' : 'Notifications are disabled on your device';
  const notificationsPermissionsCalloutLabel = Platform.OS === 'web' ? '' : 'Allow';

  // Hooks - effects
  // Check permissions on mount in case user navigates back from iOS settings screen
  React.useEffect(() => {
    const checkPermissions = async () => {
      await getSystemPermissionStatus();
      setShowNotificationPermissionCallout(arePermissionsDenied());
    };

    checkPermissions();
  }, []);

  // Handlers
  const handleNotificationPermissionCalloutOnClick = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error('Failed to open settings:', error);
      Toast.show({
        type: 'error',
        text1: 'Could not open system settings',
        text2: 'Please open Settings manually',
        position: 'bottom'
      });
    }
  };

  const handleEnableNotifications = async (plant: Plant) => {
    try {
      // Update plant to enable notifications
      updatePlant(plant.id, {
        areNotificationsEnabled: true
      });

      // Schedule notifications
      await scheduleNotificationsForPlant(plant.id);

      Toast.show({
        type: 'success',
        text1: 'Notifications enabled',
        text2: `You'll receive watering reminders for ${plant.name}`,
        position: 'bottom'
      });
    } catch (error) {
      console.error('Error enabling notifications:', error);

      // Revert on failure
      updatePlant(plant.id, {
        areNotificationsEnabled: false
      });

      Toast.show({
        type: 'error',
        text1: 'Failed to enable notifications',
        text2: 'Please try again',
        position: 'bottom'
      });
    }
  };

  const handleDisableNotifications = async (plant: Plant) => {
    try {
      // Cancel all notifications
      await cancelAllNotificationsForPlant(plant.id);

      // Update plant to disable notifications
      updatePlant(plant.id, {
        areNotificationsEnabled: false
      });

      Toast.show({
        type: 'success',
        text1: 'Notifications disabled',
        text2: `No more reminders for ${plant.name}`,
        position: 'bottom'
      });
    } catch (error) {
      console.error('Error disabling notifications:', error);

      Toast.show({
        type: 'error',
        text1: 'Failed to disable notifications',
        text2: 'Please try again',
        position: 'bottom'
      });
    }
  };

  const handleDatePickerOnChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePickerModal(false);
    }

    if (selectedDate) {
      setReminderTimeLocal(selectedDate);
    }
  };

  const handleDatePickerModalCtaOnClick = async () => {
    // Save to store and reschedule all existing notifications
    await setReminderTimeGlobal(reminderTimeLocal);

    // Close modal
    setShowDatePickerModal(false);

    Toast.show({
      type: 'success',
      text1: 'Time updated',
      text2: `Reminders will be sent at ${format(reminderTimeLocal, 'h:mm a')}`,
      position: 'bottom'
    });
  };

  const handleDatePickerModalOnClose = () => {
    // Close modal
    setShowDatePickerModal(false);

    // Reset local reminder
    setReminderTimeLocal(reminderTimeGlobal);
  };

  // Utils
  const renderPlantRow = (plant: Plant) => {
    const isEnabled = plant.areNotificationsEnabled;

    return (
      <View key={plant.id} style={styles.plantRow}>
        {/* Left side - Plant info */}
        <Column gap='xs' style={styles.plantInfo}>
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantLocation}>{formatTitleCase(plant.room)}</Text>
        </Column>

        {/* Right side - Toggle button */}
        <Button
          disabled={areNotificationsPermissionsDisabled}
          variant={isEnabled ? 'secondary' : 'primary'}
          size='sm'
          onPress={() => {
            if (isEnabled) {
              setPlantToDisable(plant);
            } else {
              handleEnableNotifications(plant);
            }
          }}
        >
          {isEnabled ? 'Disable' : 'Enable'}
        </Button>
      </View>
    );
  };

  if (plantsSorted.length === 0) {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <Text style={styles.title}>Reminders</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No plants yet</Text>
            <Text style={styles.emptySubtext}>Add a plant to start receiving watering reminders</Text>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  // Render
  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Reminders</Text>

        <Column gap='xl' style={styles.content}>
          {/* Permission Callout */}
          {/* Uncomment to test disabled on mobile
           {true && ( */}
          {showNotificationPermissionCallout && (
            <Callout ctaLabel={notificationsPermissionsCalloutLabel} ctaOnPress={handleNotificationPermissionCalloutOnClick}>
              <CalloutTitle>{notificationsPermissionsCalloutCopy}</CalloutTitle>
            </Callout>
          )}

          {/* Global Settings */}
          <Column gap='sm'>
            <Text style={styles.sectionHeader}>Global Settings</Text>
            <Card style={styles.settingsCard}>
              <Pressable
                disabled={areNotificationsPermissionsDisabled}
                style={[styles.settingRow, areNotificationsPermissionsDisabled && styles.disabledSettingRow]}
                onPress={() => setShowDatePickerModal(true)}
              >
                <Text style={styles.settingLabel}>Time</Text>
                <Row align='center' gap='sm'>
                  <Text style={styles.timeValue}>{format(reminderTimeGlobal, 'h:mm a')}</Text>
                  <Text style={styles.chevron}>›</Text>
                </Row>
              </Pressable>
            </Card>
          </Column>

          {/* Plants grouped by type */}
          <Column gap='lg' style={styles.content}>
            <Text style={styles.sectionHeader}>Plant Settings</Text>
            {plantsSorted.map((plant) => (
              <Column key={plant.id} gap='sm'>
                {/* Plants of this type */}
                <View style={styles.typeCard}>{renderPlantRow(plant)}</View>
              </Column>
            ))}
          </Column>
        </Column>
      </ScrollView>

      {/* Time Picker Modal */}
      {showDatePickerModal && (
        <Modal visible={showDatePickerModal} onClose={handleDatePickerModalOnClose} title='Reminder Time' confirmText='Save' cancelText='Cancel' onConfirm={handleDatePickerModalCtaOnClick}>
          <View style={styles.timePickerContainer}>
            <DateTimePicker value={reminderTimeLocal} mode='time' display='spinner' onChange={handleDatePickerOnChange} style={styles.timePicker} />
          </View>
        </Modal>
      )}

      {/* Disable confirmation modal */}
      <Modal
        visible={plantToDisable !== null}
        onClose={() => setPlantToDisable(null)}
        title='Disable reminders?'
        description={`Without reminders, it will be harder to maintain ${plantToDisable?.name}'s health. Are you sure you want to turn them off?`}
        confirmText='Disable'
        cancelText='Keep enabled'
        variant='default'
        onConfirm={() => {
          if (plantToDisable) {
            handleDisableNotifications(plantToDisable);
            setPlantToDisable(null);
          }
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xl
  },
  content: {
    paddingBottom: spacing.xl
  },
  sectionHeader: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    paddingHorizontal: spacing.sm
  },
  settingsCard: {
    backgroundColor: colors.neutral[0],
    padding: 0,
    overflow: 'hidden'
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md
  },
  disabledSettingRow: {
    opacity: 0.5
  },
  settingLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[900]
  },
  timeValue: {
    fontSize: typography.sizes.base,
    color: colors.neutral[600]
  },
  chevron: {
    fontSize: typography.sizes.xl,
    color: colors.neutral[400],
    fontWeight: typography.weights.normal
  },
  timePickerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md
  },
  timePicker: {
    width: '100%'
  },
  typeHeader: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    paddingHorizontal: spacing.sm
  },
  typeCard: {
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    overflow: 'hidden'
  },
  plantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md
  },
  plantInfo: {
    flex: 1,
    marginRight: spacing.md
  },
  plantName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[900]
  },
  plantLocation: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600]
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginHorizontal: spacing.md
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm
  },
  emptyText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[700]
  },
  emptySubtext: {
    fontSize: typography.sizes.base,
    color: colors.neutral[500],
    textAlign: 'center'
  }
});
