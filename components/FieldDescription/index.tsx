import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useFieldContext } from '@/utils/field';

// FieldDescription
interface FieldDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function FieldDescription({ children, style }: FieldDescriptionProps) {
  const { descriptionId } = useFieldContext();

  const textColor = useThemeColor(
    {
      light: colors.neutral[600],
      dark: colors.neutral[400]
    },
    'text'
  );

  return (
    <Text nativeID={descriptionId} style={[styles.description, { color: textColor }, style]} accessibilityRole='text'>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: typography.sizes.sm,
    lineHeight: typography.sizes.sm * 1.5
  }
});
