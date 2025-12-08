import { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, spacing, typography } from '@/constants/design-tokens';
import { useFieldContext } from '@/utils/field';

interface FieldErrorProps {
  children: ReactNode;
  style?: TextStyle;
}

export function FieldError({ children, style }: FieldErrorProps) {
  const { errorId, hasError } = useFieldContext();

  if (!hasError || !children) return null;

  return (
    <Text nativeID={errorId} style={[styles.error, style]} accessibilityRole='alert'>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    marginTop: spacing.xs
  }
});
