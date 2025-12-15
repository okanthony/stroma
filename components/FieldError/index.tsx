import { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle, View } from 'react-native';
import { colors, spacing, typography } from '@/constants/design-tokens';
import { useFieldContext } from '@/utils/field';

interface FieldErrorProps {
  children: ReactNode;
  style?: TextStyle;
}

export function FieldError({ children, style }: FieldErrorProps) {
  const { errorId, hasError } = useFieldContext();
  const isHidden = !hasError || !children;

  return (
    <View style={styles.errorContainer}>
      {isHidden ? null : (
        <Text nativeID={errorId} style={[styles.error, style]} accessibilityRole='alert'>
          {children}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    minHeight: 20 // Always reserves space for one line of error text
  },
  error: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    marginTop: spacing.xs
  }
});
