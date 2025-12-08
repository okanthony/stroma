// components/ui/Field.tsx
import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, spacing, typography } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';

// FieldLegend (title for FieldSet)
interface FieldLegendProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function FieldLegend({ children, style }: FieldLegendProps) {
  const textColor = useThemeColor(
    {
      light: colors.neutral[900],
      dark: colors.neutral[100]
    },
    'text'
  );

  return (
    <Text style={[styles.legend, { color: textColor }, style]} accessibilityRole='header'>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  legend: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md
  }
});
