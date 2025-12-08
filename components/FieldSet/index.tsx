import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '@/constants/design-tokens';

interface FieldSetProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function FieldSet({ children, style }: FieldSetProps) {
  return (
    // Let child elements handle their own accessibility'
    <View style={[styles.fieldset, style]} accessible={false}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldset: {
    gap: spacing.md
  }
});
