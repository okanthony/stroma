// Components
import { ScreenContainer } from '@/components/ScreenContainer';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Column } from '@/components/Column';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

// Internal
import { usePlantStore, useNotificationsStore } from '@/stores';
import { colors, spacing, typography } from '@/constants/design-tokens';

// External
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

// Types
type NotificationState = 'prompt' | 'granted' | 'denied';

// Component
export default function OnboardingEnableNotifications() {
  // Hooks
  const { plantId } = useLocalSearchParams<{ plantId: string }>();

  // Hooks - stores
  const { updatePlant } = usePlantStore();
  const { requestNotificationPermissions, scheduleNotificationsForPlant } = useNotificationsStore();

  // Hooks - state
  const [state, setState] = React.useState<NotificationState>('prompt');

  // Handlers
  const handleAcceptCtaOnClick = async () => {
    const status = await requestNotificationPermissions();

    // User enabled notifications - update plant status and schedule notifications
    if (status === 'granted') {
      updatePlant(plantId, {
        areNotificationsEnabled: true
      });
      scheduleNotificationsForPlant(plantId);
      setState('granted');
    } else {
      setState('denied');
    }
  };

  const handleSkipCtaOnClick = () => {
    setState('denied');
  };

  // Redirect after 5 seconds when in success/denied state
  React.useEffect(() => {
    if (state !== 'prompt') {
      const timer = setTimeout(() => {
        router.replace('/(tabs)');
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [state]);

  // Utils
  const renderContent = () => {
    switch (state) {
      case 'granted':
        return (
          <View style={styles.stateContainer}>
            {/* Success Icon */}
            <View style={styles.iconContainer}>
              <Svg width='80' height='80' viewBox='0 0 80 80'>
                <Circle cx='40' cy='40' r='38' fill={colors.primary[500]} stroke={colors.primary[600]} strokeWidth='2' />
                <Path d='M 25 40 L 35 50 L 55 30' fill='none' stroke={colors.neutral[0]} strokeWidth='4' strokeLinecap='round' strokeLinejoin='round' />
              </Svg>
            </View>

            <Column gap='md' style={styles.textContainer}>
              <Text variant='heading' style={styles.stateTitle}>
                Reminders enabled!
              </Text>
              <Text variant='body' style={styles.stateSubtitle}>
                You&apos;ll get watering reminders for all your plants
              </Text>
            </Column>
          </View>
        );

      case 'denied':
        return (
          <View style={styles.stateContainer}>
            {/* Denied Icon */}
            <View style={styles.iconContainer}>
              <Svg width='70' height='70' viewBox='0 0 80 80'>
                <Circle cx='40' cy='40' r='38' fill={colors.neutral[300]} stroke={colors.neutral[300]} strokeWidth='2' />
                <Path d='M 25 40 L 35 50 L 55 30' fill='none' stroke={colors.neutral[0]} strokeWidth='4' strokeLinecap='round' strokeLinejoin='round' />
              </Svg>
            </View>

            <Column gap='md' style={styles.textContainer}>
              <Text variant='heading' style={styles.stateTitle}>
                Reminders skipped
              </Text>
              <Text variant='body' style={styles.stateSubtitle}>
                You can enable them anytime in iOS Settings if you change your mind
              </Text>
            </Column>
          </View>
        );

      default: // 'prompt'
        return (
          <View style={styles.promptContainer}>
            {/* Calendar Icon */}
            <View style={styles.iconContainer}>
              <Svg width='90' height='90' viewBox='0 0 80 80'>
                {/* Calendar body */}
                <Rect x='15' y='20' width='50' height='45' rx='4' fill={colors.neutral[0]} stroke={colors.primary[500]} strokeWidth='2' />

                {/* Calendar header */}
                <Rect x='15' y='20' width='50' height='12' rx='4' fill={colors.primary[500]} />

                {/* Left binding ring */}
                <Rect x='25' y='15' width='3' height='10' rx='1.5' fill={colors.primary[600]} />

                {/* Right binding ring */}
                <Rect x='52' y='15' width='3' height='10' rx='1.5' fill={colors.primary[600]} />

                {/* Calendar dots (dates) */}
                <Circle cx='25' cy='42' r='2' fill={colors.primary[400]} />
                <Circle cx='33' cy='42' r='2' fill={colors.primary[400]} />
                <Circle cx='41' cy='42' r='2' fill={colors.primary[400]} />
                <Circle cx='49' cy='42' r='2' fill={colors.primary[400]} />
                <Circle cx='57' cy='42' r='2' fill={colors.primary[400]} />

                <Circle cx='25' cy='50' r='2' fill={colors.primary[400]} />
                <Circle cx='33' cy='50' r='2' fill={colors.primary[400]} />
                <Circle cx='41' cy='50' r='2' fill={colors.primary[400]} />
                <Circle cx='49' cy='50' r='2' fill={colors.primary[400]} />
                <Circle cx='57' cy='50' r='2' fill={colors.primary[400]} />

                <Circle cx='25' cy='58' r='2' fill={colors.primary[400]} />
                <Circle cx='33' cy='58' r='2' fill={colors.primary[400]} />
                <Circle cx='41' cy='58' r='2' fill={colors.primary[400]} />

                {/* Highlighted date (today) */}
                <Circle cx='49' cy='58' r='3.5' fill={colors.warning} />
              </Svg>
            </View>

            <Column gap='md' style={styles.textContainer}>
              <Text variant='heading' style={styles.title}>
                Keep your plants thriving
              </Text>
              <Text variant='body' style={styles.subtitle}>
                Enable reminders and we’ll let you know when it’s time to water them.
              </Text>
            </Column>

            <Column gap='sm' style={styles.buttons}>
              <Button onPress={handleAcceptCtaOnClick}>Enable reminders</Button>
              <Button variant='ghost' onPress={handleSkipCtaOnClick}>
                Maybe later
              </Button>
            </Column>
          </View>
        );
    }
  };

  // Render
  return (
    <ScreenContainer>
      <View style={styles.container}>{renderContent()}</View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  promptContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
    marginTop: 200
  },
  iconContainer: {
    alignItems: 'center'
  },
  stateContainer: {
    flex: 1,
    marginTop: 215,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xl
  },
  textContainer: {
    alignItems: 'center'
  },
  title: {
    color: colors.neutral[900],
    textAlign: 'center'
  },
  subtitle: {
    color: colors.neutral[600],
    textAlign: 'center'
  },
  stateTitle: {
    color: colors.neutral[900],
    textAlign: 'center'
  },
  stateSubtitle: {
    color: colors.neutral[600],
    textAlign: 'center'
  },
  buttons: {
    width: '100%'
  },
  logoutContainer: {
    padding: spacing.md,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border.light
  },
  logoutText: {
    fontSize: typography.sizes.base,
    color: colors.primary[600]
  }
});
