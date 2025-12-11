// Components
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '@/components/Text';

// Intenral
import { useThemeColor } from '@/hooks/use-theme-color';
import { colors, spacing, borderRadius } from '@/constants/design-tokens';

// External
import React from 'react';

// ============================================================================
// Types
// ============================================================================

export interface InputCodeProps {
  /** Number of code digits */
  length?: number;
  /** Current code value */
  value: string;
  /** Callback when value changes */
  onChangeText: (value: string) => void;
  /** Callback when all digits are filled */
  onComplete?: (value: string) => void;
  /** Disable input */
  disabled?: boolean;
  /** Show error state */
  error?: boolean;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Light theme color override */
  lightColor?: string;
  /** Dark theme color override */
  darkColor?: string;
}

export interface InputCodeSeparatorProps {
  /** Custom style */
  style?: ViewStyle;
}

// ============================================================================
// InputCode Component
// ============================================================================

export function InputCode({ length = 6, value, onChangeText, onComplete, disabled = false, error = false, autoFocus = false, style, lightColor, darkColor }: InputCodeProps) {
  const inputRefs = React.useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

  // Theme colors
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColorNormal = useThemeColor({}, 'border');
  const borderColorFocused = useThemeColor({ light: colors.primary[500], dark: colors.primary[400] }, 'text');
  const borderColorError = colors.error;
  const disabledBg = useThemeColor({ light: colors.neutral[100], dark: colors.neutral[800] }, 'background');
  const disabledText = useThemeColor({ light: colors.neutral[400], dark: colors.neutral[500] }, 'text');

  // Normalize value to only include valid digits
  const normalizedValue = value.slice(0, length).replace(/[^0-9]/g, '');

  // Pad value to length with empty strings
  const digits = normalizedValue.split('');
  while (digits.length < length) {
    digits.push('');
  }

  // Handle text change for a specific input
  const handleChangeText = (text: string, index: number) => {
    // Handle paste - if multiple characters, fill all remaining slots
    if (text.length > 1) {
      const pastedText = text
        .replace(/[\s-]/g, '')
        .replace(/[^0-9]/g, '')
        .slice(0, length);
      const newValue = normalizedValue.slice(0, index) + pastedText;
      const limited = newValue.slice(0, length);

      onChangeText(limited);

      // Focus the next empty slot or the last slot
      const nextIndex = Math.min(limited.length, length - 1);
      setTimeout(() => inputRefs.current[nextIndex]?.focus(), 10);

      // Call onComplete if filled
      if (limited.length === length && onComplete) {
        onComplete(limited);
      }
      return;
    }

    // Single character input
    const cleaned = text.replace(/[^0-9]/g, '');

    if (cleaned) {
      // Replace digit at current index
      const newDigits = [...digits];
      newDigits[index] = cleaned[cleaned.length - 1]; // Take last char if multiple
      const newValue = newDigits.join('').slice(0, length);

      onChangeText(newValue);

      // Auto-advance to next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call onComplete if filled
      if (newValue.length === length && onComplete) {
        onComplete(newValue);
      }
    }
  };

  // Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // If current input is empty, move to previous and clear it
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        const newValue = newDigits.join('').replace(/\s/g, '');
        onChangeText(newValue);
        inputRefs.current[index - 1]?.focus();
      } else if (digits[index]) {
        // Clear current digit
        const newDigits = [...digits];
        newDigits[index] = '';
        const newValue = newDigits.join('').replace(/\s/g, '');
        onChangeText(newValue);
      }
    }
  };

  // Auto-focus first input on mount if requested
  React.useEffect(() => {
    if (autoFocus && !disabled) {
      const timer = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus, disabled]);

  // Get border color for a slot
  const getBorderColor = (index: number) => {
    if (error) return borderColorError;
    if (focusedIndex === index) return borderColorFocused;
    return borderColorNormal;
  };

  return (
    <View
      style={[styles.container, style]}
      accessible={true}
      accessibilityRole='none'
      accessibilityLabel={`Verification code input, ${normalizedValue.length} of ${length} digits entered`}
      accessibilityHint='Enter verification code'
      accessibilityState={{ disabled }}
    >
      <View style={styles.slotsContainer}>
        {digits.map((digit, index) => (
          <View
            key={index}
            style={[
              styles.slot,
              {
                backgroundColor: disabled ? disabledBg : backgroundColor,
                borderColor: getBorderColor(index)
              },
              focusedIndex === index && styles.slotActive,
              disabled && styles.slotDisabled
            ]}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              keyboardType='decimal-pad'
              //   keyboardType='default'
              maxLength={10} // Allow paste of full code
              editable={!disabled}
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              textContentType={index === 0 ? 'oneTimeCode' : 'none'}
              style={[
                styles.input,
                {
                  color: disabled ? disabledText : textColor
                }
              ]}
              selectTextOnFocus
              accessible={true}
              accessibilityLabel={`Digit ${index + 1} of ${length}`}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

// ============================================================================
// InputCodeSeparator Component
// ============================================================================

export function InputCodeSeparator({ style }: InputCodeSeparatorProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.separator, style]}>
      <Text style={[styles.separatorText, { color: textColor }]}>-</Text>
    </View>
  );
}

// ============================================================================
// InputCodeGroup Component (for composition if needed later)
// ============================================================================

export function InputCodeGroup({ children }: { children: React.ReactNode }) {
  return <View style={styles.group}>{children}</View>;
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  slotActive: {
    borderWidth: 2
  },
  slotDisabled: {
    opacity: 0.5
  },
  slotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs // Reduce gap from spacing.sm to spacing.xs
  },
  slot: {
    width: 38, // Smaller to fit 8 boxes
    height: 50,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 18, // Smaller font
    fontWeight: '600',
    textAlign: 'center',
    padding: 0
  },
  separator: {
    width: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separatorText: {
    fontSize: 20,
    fontWeight: '400'
  },
  group: {
    flexDirection: 'row',
    gap: spacing.sm
  }
});
