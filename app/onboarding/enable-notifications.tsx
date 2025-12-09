// Components
import { ScreenContainer } from '@/components/ScreenContainer';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text/index';
import { Button } from '@/components/Button';

// Internal
import { useAuthStore, usePlantStore, useNotificationsStore } from '@/stores';
import { colors, spacing } from '@/constants/design-tokens';
// External
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

// Types
import { PermissionStatus } from '@/types/notifications';

// Component
export default function OnboardingEnableNotifications() {
  // Hooks
  const { plantId } = useLocalSearchParams<{ plantId: string }>();

  // Hooks - stores
  const { logout, setIsAppLoaded } = useAuthStore();
  const { updatePlant, deleteAllPlants } = usePlantStore();
  const { requestNotificationPermissions, scheduleNotificationsForPlant } = useNotificationsStore();

  // Hooks - state
  const [permissionStatus, setPermissionStatus] = React.useState<PermissionStatus | ''>('');
  const [isReadyToRedirect, setIsReadyToRedirect] = React.useState<boolean>(false);

  // Handlers
  const handleSubmit = async () => {
    const status = await requestNotificationPermissions();
    if (status === 'granted') {
      console.log('w00t');
      updatePlant(plantId, {
        areNotificationsEnabled: true
      });
      scheduleNotificationsForPlant(plantId);
    }
    if (status === 'denied') {
      console.log('dag yo');
    }
    setPermissionStatus(status);
  };

  // Hooks - effects
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (permissionStatus !== '') {
      timer = setTimeout(() => {
        setIsReadyToRedirect(true);
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [permissionStatus]);

  React.useEffect(() => {
    if (isReadyToRedirect) {
      router.push('/(tabs)');
    }
  }, [isReadyToRedirect]);

  // Utils
  const renderBody = () => {
    switch (permissionStatus) {
      case 'granted':
        return (
          <View style={styles.content}>
            <Text variant='body' style={styles.subtitle}>
              Success placeholder
            </Text>
          </View>
        );
      case 'denied':
        return (
          <View style={styles.content}>
            <Text variant='body' style={styles.subtitle}>
              Denied placeholder
            </Text>
          </View>
        );
      default:
        return (
          <View style={styles.content}>
            <Text darkColor='#fff' variant='heading' weight='bold' style={styles.title}>
              Enable notifications to get watering reminders
            </Text>

            <Text variant='body' style={styles.subtitle}>
              This will ensure your plant is never thirsty
            </Text>

            <Button onPress={handleSubmit}>Enable notifications</Button>
          </View>
        );
    }
  };

  // Render
  return (
    <ScreenContainer padding={false}>
      <View style={styles.container}>{renderBody()}</View>

      {/* Test escape hatch - Log out button */}
      <View style={styles.logoutContainer}>
        <Text
          onPress={() => {
            logout();
            setIsAppLoaded(false);
            deleteAllPlants();
            router.replace('/');
          }}
          style={styles.logoutText}
        >
          Log out
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5'
  },
  logoutText: {
    fontSize: 16,
    color: '#0a7ea4'
  },
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.lg
  },
  title: {
    color: colors.neutral[900],
    marginBottom: spacing.sm
  },
  plantType: {
    color: colors.neutral[600],
    marginBottom: spacing.md
  },
  form: {
    gap: spacing.lg,
    flex: 1
  },
  field: {
    gap: spacing.sm
  },
  label: {
    color: colors.neutral[700]
  },
  input: {
    width: '100%'
  },
  subtitle: {
    color: '#fff',
    // color: colors.neutral[600],
    marginBottom: spacing.md
  }
});
