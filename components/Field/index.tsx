// components/ui/Field.tsx
import { useId, ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '@/constants/design-tokens';
import { FieldContext } from '@/utils/field';

// Field (Root Container)
interface FieldProps {
  children: ReactNode;
  error?: boolean;
  style?: ViewStyle;
}

export function Field({ children, error = false, style }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <FieldContext.Provider value={{ id, errorId, descriptionId, hasError: error }}>
      <View style={[styles.field, style]}>{children}</View>
    </FieldContext.Provider>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.xs
  }
});
