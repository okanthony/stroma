// Components
import { Button } from '@/components/Button';
import { Card } from '@/components/Card/index';
import { Column } from '@/components/Column/index';
import { Icon } from '@/components/Icon';
import { Row } from '@/components/Row/index';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Switch } from '@/components/Switch';
import { Text, StyleSheet, Pressable, View, Alert, Platform } from 'react-native';

// Internal
import { colors, typography, spacing } from '@/constants/design-tokens';
import { useNotificationsStore, usePlantStore } from '@/stores';
import { formatTitleCase } from '@/utils/formatTitleCase';

// External
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import React from 'react';

// Components
export default function EditPlantDetails() {
  // Hooks
  const { id } = useLocalSearchParams<{ id: string }>();

  // Hooks - stores
  const { getPlantById, deletePlant, updatePlant } = usePlantStore();
  const { scheduleNotificationsForPlant, cancelAllNotificationsForPlant, getSystemPermissionStatus, arePermissionsDenied } = useNotificationsStore();

  // Vars
  const plant = getPlantById(id);
  const notificationsEnabled = plant.areNotificationsEnabled;
  const platformNotIos = Platform.OS !== 'ios';

  // Hooks - state
  const [notificationsToggle, setNotificationsToggle] = React.useState(notificationsEnabled);
  const [areNotificationsPermissionsDenied, setAreNotificationsPermissionsDenied] = React.useState(notificationsEnabled);

  // Hooks - effects
  // Check permissions on mount in case user navigates back from iOS settings screen
  React.useEffect(() => {
    const checkPermissions = async () => {
      await getSystemPermissionStatus();
      setAreNotificationsPermissionsDenied(arePermissionsDenied());
    };

    checkPermissions();
  }, []);

  // Handlers
  const handleOnNotificationsToggleClick = async (checked: boolean) => {
    // Optimistically update UI
    setNotificationsToggle(checked);

    try {
      if (checked) {
        updatePlant(id, {
          areNotificationsEnabled: true
        });
        await scheduleNotificationsForPlant(id);

        // Show confirmation toast
        Toast.show({
          type: 'success',
          text1: 'Reminders enabled'
        });
      } else {
        updatePlant(id, {
          areNotificationsEnabled: false
        });
        await cancelAllNotificationsForPlant(id);

        // Show confirmation toast
        Toast.show({
          type: 'success',
          text1: 'Reminders disabled'
        });
      }
      // Success - do nothing, Toast already displayed
    } catch (error) {
      // Revert the switch
      setNotificationsToggle(!checked);
      console.error('Edit page: Notifications toggle failed', error);

      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Notification preferences not saved',
        text2: 'Please try again'
      });
    }
  };

  const handleOnDeleteButtonClick = () => {
    if (Platform.OS === 'web') {
      alert('Delete functionality is only available on mobile devices');
      return;
    }

    Alert.alert('Delete Plant', `Are you sure you want to delete ${plant.name}? This action cannot be undone.`, [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          // Cancel all notifications for this plant
          await cancelAllNotificationsForPlant(id);

          // Delete the plant
          deletePlant(id);

          // Navigate back to plants list
          router.replace('/');

          Toast.show({
            type: 'success',
            text1: 'Your plant was removed',
            position: 'bottom',
            visibilityTime: 4000
          });
        }
      }
    ]);
  };

  // Utils
  const getNotificationsToggleLabel = () => {
    switch (true) {
      case platformNotIos:
        return 'Reminders only available on iOS';
      case notificationsEnabled:
        return 'Enabled';
      case !notificationsEnabled:
        return 'Disabled';
      default:
        return 'Error';
    }
  };

  const renderNotificationsCard = () => {
    switch (true) {
      // User on iOS and notifications permissions previously denied - prompt to enable
      case Platform.OS === 'ios' && areNotificationsPermissionsDenied:
        return (
          <>
            <Text style={[styles.label, styles.flexText]}>Notifications are disabled on your device</Text>
            <Pressable>
              <Text style={styles.allowText}>Allow</Text>
            </Pressable>
          </>
        );
      // Notifications permissions enabled - display toggle
      default:
        return (
          <>
            <Text style={styles.label}>{getNotificationsToggleLabel()}</Text>
            <Switch checked={notificationsToggle} disabled={platformNotIos} onCheckedChange={handleOnNotificationsToggleClick} />
          </>
        );
    }
  };

  // Render
  if (!plant) {
    return (
      <ScreenContainer style={styles.container}>
        <Text>Plant not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={styles.container}>
      {/* Header */}
      <Row align='center' justify='space-between' style={styles.header}>
        <Pressable onPress={() => router.dismissTo(`/plant/${id}`)} style={styles.backButton}>
          <Icon name='chevron.left' size={24} color={colors.neutral[900]} />
        </Pressable>
      </Row>

      <Text style={styles.title}>Edit plant details</Text>

      <Column gap='md' style={styles.content}>
        {/* Name Card */}
        <Pressable onPress={() => router.push(`/plant/${id}/edit/name`)}>
          <Card style={styles.card}>
            <Row align='center' justify='space-between'>
              <Column gap='xs'>
                <Text style={styles.cardLabel}>Name</Text>
                <Text style={styles.cardValue}>{plant.name}</Text>
              </Column>
              <Icon name='chevron.right' size={20} color={colors.neutral[400]} />
            </Row>
          </Card>
        </Pressable>

        {/* Location Card */}
        <Pressable onPress={() => router.push(`/plant/${id}/edit/location`)}>
          <Card style={styles.card}>
            <Row align='center' justify='space-between'>
              <Column gap='xs'>
                <Text style={styles.cardLabel}>Room</Text>
                <Text style={styles.cardValue}>{formatTitleCase(plant.room)}</Text>
              </Column>
              <Icon name='chevron.right' size={20} color={colors.neutral[400]} />
            </Row>
          </Card>
        </Pressable>

        {/* Notifications Card */}
        <Card style={styles.card}>
          <Column gap='md'>
            <Text style={styles.cardLabel}>Reminders</Text>
            <Row align='center' justify='space-between'>
              {renderNotificationsCard()}
              {/* <Text style={styles.label}>{getNotificationsToggleLabel()}</Text>
              <Switch checked={notificationsToggle} disabled={platformNotIos} onCheckedChange={handleOnNotificationsToggleClick} /> */}
            </Row>
          </Column>
        </Card>
      </Column>

      {/* Delete Button */}
      <View style={styles.deleteButtonContainer}>
        <Button variant='destructive' onPress={handleOnDeleteButtonClick} icon='trash'>
          Delete plant
        </Button>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFAE9'
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    marginBottom: spacing.lg
  },
  backButton: {
    padding: spacing.sm
  },
  title: {
    fontSize: typography.sizes['3xl'], // Changed from '2xl' to '3xl' (30px)
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl // Changed from lg to xl for more space
  },
  content: {
    paddingHorizontal: spacing.md,
    flex: 1
  },
  card: {
    padding: spacing.lg, // Changed from md to lg for more breathing room
    backgroundColor: colors.neutral[0] // Override the theme color
  },
  cardLabel: {
    fontSize: typography.sizes.lg, // Changed from sm to lg (18px)
    fontWeight: typography.weights.semibold,
    color: colors.neutral[900] // Changed from 700 to 900 for darker text
  },
  cardValue: {
    fontSize: typography.sizes.base,
    color: colors.neutral[600] // Keep as secondary text color
  },
  deleteButtonContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl
  },
  // Switch
  label: {
    fontSize: typography.sizes.base,
    color: colors.neutral[900]
  },
  notificationsEnablePermissionContainer: {
    // padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  flexText: {
    flex: 1, // Takes up remaining space, prevents overflow
    marginRight: spacing.sm // Gap before button/switch
  },
  allowText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold
    // color: colors.error
  }
});
