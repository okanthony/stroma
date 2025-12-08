import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, spacing, typography } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useFieldContext } from '@/utils/field';

interface FieldLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function FieldLabel({ children, style }: FieldLabelProps) {
  const { id } = useFieldContext();

  const textColor = useThemeColor(
    {
      light: colors.neutral[900],
      dark: colors.neutral[100]
    },
    'text'
  );

  return (
    <Text nativeID={id} style={[styles.label, { color: textColor }, style]} accessibilityRole='text'>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs
  }
});
