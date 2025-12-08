import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '@/constants/design-tokens';

// FieldGroup (for horizontal/vertical layout control)
interface FieldGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

export function FieldGroup({ children, orientation = 'vertical', style }: FieldGroupProps) {
  return <View style={[styles.fieldGroup, orientation === 'horizontal' && styles.fieldGroupHorizontal, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  fieldGroup: {
    gap: spacing.sm
  },
  fieldGroupHorizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
