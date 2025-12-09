import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

// FieldContent (wrapper for input and related content)
interface FieldContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function FieldContent({ children, style }: FieldContentProps) {
  return <View style={[styles.fieldContent, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  fieldContent: {
    // No default styles, just a wrapper
  }
});
