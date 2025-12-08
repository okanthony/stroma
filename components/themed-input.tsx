// components/themed-input.tsx
import React from 'react';
import { TextInput, type TextInputProps, StyleSheet, type StyleProp, type TextStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedInputProps = TextInputProps & {
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
  lightPlaceholderColor?: string;
  darkPlaceholderColor?: string;
  variant?: 'default' | 'outlined' | 'ghost';
  style?: StyleProp<TextStyle>;
};

export function ThemedInput({
  lightBackgroundColor,
  darkBackgroundColor,
  lightTextColor,
  darkTextColor,
  lightPlaceholderColor,
  darkPlaceholderColor,
  variant = 'default',
  style,
  ...rest
}: ThemedInputProps) {
  const backgroundColor = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, 'background');
  const textColor = useThemeColor({ light: lightTextColor, dark: darkTextColor }, 'text');
  const placeholderColor = useThemeColor({ light: lightPlaceholderColor, dark: darkPlaceholderColor }, 'icon');

  return (
    <TextInput
      placeholderTextColor={placeholderColor}
      style={[styles.base, variant === 'default' && styles.default, variant === 'outlined' && styles.outlined, variant === 'ghost' && styles.ghost, { backgroundColor, color: textColor }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16
  },
  default: {
    borderWidth: 0
  },
  outlined: {
    borderWidth: 1
  },
  ghost: {
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 8
  }
});
