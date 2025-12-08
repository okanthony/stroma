// Components
import { TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';

// Internal
import { colors, spacing, typography, borderRadius } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';

// External
import React, { forwardRef } from 'react';

// Types
interface InputProps extends Omit<TextInputProps, 'style' | 'onChangeText'> {
  type?: 'text' | 'email' | 'number' | 'tel' | 'url';
  error?: boolean;
  disabled?: boolean;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
}

// Util
// Format phone number to (xxx) xxx-xxxx
const formatPhoneNumber = (text: string): string => {
  // Remove all non-digit characters
  const cleaned = text.replace(/\D/g, '');

  // Limit to 10 digits
  const limited = cleaned.slice(0, 10);

  // Format based on length
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  } else {
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
  }
};

// Component
export const Input = forwardRef<TextInput, InputProps>(({ type = 'text', error = false, disabled = false, value, onChangeText, ...props }, ref) => {
  // For tel type, we need to manage the displayed (formatted) value internally
  const [displayValue, setDisplayValue] = React.useState(type === 'tel' && value ? formatPhoneNumber(value) : value);

  // Theme-aware colors
  const backgroundColor = useThemeColor(
    {
      light: colors.neutral[0],
      dark: colors.neutral[900]
    },
    'background'
  );

  const borderColor = useThemeColor(
    {
      light: error ? colors.error : colors.neutral[200],
      dark: error ? colors.error : colors.neutral[700]
    },
    'border'
  );

  const textColor = useThemeColor(
    {
      light: colors.neutral[900],
      dark: colors.neutral[100]
    },
    'text'
  );

  const placeholderColor = useThemeColor(
    {
      light: colors.neutral[400],
      dark: colors.neutral[600]
    },
    'text'
  );

  // Map type to keyboard type
  const getKeyboardType = (): TextInputProps['keyboardType'] => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      case 'tel':
        return 'phone-pad';
      case 'url':
        return 'url';
      default:
        return 'default';
    }
  };

  // Map type to textContentType for iOS autofill
  const getTextContentType = (): TextInputProps['textContentType'] => {
    switch (type) {
      case 'email':
        return 'emailAddress';
      case 'tel':
        return 'telephoneNumber';
      case 'url':
        return 'URL';
      default:
        return 'none';
    }
  };

  // Handle text change with formatting for phone numbers
  const handleChangeText = (text: string) => {
    if (type === 'tel') {
      // Extract raw digits
      const rawDigits = text.replace(/\D/g, '');

      // Update display with formatted version
      const formatted = formatPhoneNumber(text);
      setDisplayValue(formatted);

      // Pass raw digits to parent
      onChangeText?.(rawDigits);
    } else {
      onChangeText?.(text);
    }
  };

  // Determine what value to display
  const inputValue = type === 'tel' ? displayValue : value;

  return (
    <TextInput
      ref={ref}
      keyboardType={getKeyboardType()}
      textContentType={getTextContentType()}
      editable={!disabled}
      placeholderTextColor={placeholderColor}
      value={inputValue}
      onChangeText={handleChangeText}
      style={[
        styles.input,
        {
          backgroundColor,
          borderColor,
          color: textColor
        },
        disabled && styles.disabled,
        props.style
      ]}
      {...props}
    />
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.normal
  },
  disabled: {
    opacity: 0.5
  }
});
