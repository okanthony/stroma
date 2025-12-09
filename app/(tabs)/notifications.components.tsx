// components/ui/Callout.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';

// Internal
import { colors, spacing, typography, borderRadius } from '@/constants/design-tokens';

// External
import React from 'react';

// Types
interface CalloutProps {
  children: React.ReactNode;
  ctaLabel: string;
  ctaOnPress: () => void;
}

// Components
export function Callout({ children, ctaLabel, ctaOnPress }: CalloutProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>!</Text>
        </View>
      </View>

      <View style={styles.content}>{children}</View>

      {ctaLabel && (
        <Pressable onPress={ctaOnPress} style={styles.actionButton}>
          <Text style={styles.actionText}>{ctaLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

export function CalloutTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function CalloutDescription({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.error + '15', // error color with 15% opacity
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  iconContainer: {
    alignSelf: 'flex-start'
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    color: colors.neutral[0],
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold
  },
  content: {
    flex: 1,
    marginLeft: spacing.xs,
    gap: spacing.xs
  },
  actionButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  actionText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.error
  },
  title: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.normal,
    color: colors.error
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    lineHeight: typography.sizes.sm * 1.5
  }
});
