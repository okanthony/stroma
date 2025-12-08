// Components
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text/index';
import { Button } from '@/components/Button';
import { ThemedDropdown } from '@/components/themed-dropdown';

// Internal
import { getTimestampFromTimeframe, WateringTimeframe } from '@/utils/time-comparison';
import { LogLastWateredProps, TIMEFRAME_OPTIONS } from './data';
import { spacing, colors } from '@/constants/design-tokens';

// External
import React from 'react';

// Component
export function LogLastWatered({ initialTimeframe, onSubmit, submitButtonLabel = 'Continue', title = 'When was it last watered?', subtitle }: LogLastWateredProps) {
  // Hooks - state
  const [timeframe, setTimeframe] = React.useState<WateringTimeframe | undefined>(initialTimeframe);

  // Handlers
  const handleSubmit = () => {
    if (!timeframe) return;

    const lastWatered = getTimestampFromTimeframe(timeframe);
    onSubmit(lastWatered);
  };

  // Vars
  const isSubmitDisabled = !timeframe;

  // Render
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant='heading' weight='bold' style={styles.title}>
          {title}
        </Text>

        {subtitle && (
          <Text variant='body' style={styles.subtitle}>
            {subtitle}
          </Text>
        )}

        <View style={styles.form}>
          <View style={styles.field}>
            <Text variant='label' weight='medium' style={styles.label}>
              Last watered
            </Text>
            <ThemedDropdown<WateringTimeframe>
              options={TIMEFRAME_OPTIONS}
              value={timeframe}
              onValueChange={setTimeframe}
              placeholder='Select timeframe'
              variant='outlined'
              accessibilityLabel='Select when you last watered this plant'
            />
          </View>
        </View>

        <Button disabled={isSubmitDisabled} variant='primary' onPress={handleSubmit}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  subtitle: {
    color: colors.neutral[600],
    marginBottom: spacing.md
  },
  plantName: {
    color: colors.neutral[700],
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
  }
});
