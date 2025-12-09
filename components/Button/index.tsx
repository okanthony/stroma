// Components
import { Pressable, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { Icon } from '@/components/Icon';
import { Row } from '@/components/Row/index';

// Internal
import { colors, spacing, typography, borderRadius } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';

// External
import { ReactNode } from 'react';

// Types
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconOnly?: boolean;
  disabled?: boolean;
  rounded?: boolean; // Add this prop
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

// Component
export function Button({ children, variant = 'primary', size = 'md', icon, iconOnly = false, disabled = false, loading = false, rounded = false, onPress, style }: ButtonProps) {
  // Call all theme colors at top level
  const primaryBg = useThemeColor(
    {
      light: colors.primary[500],
      dark: colors.primary[600]
    },
    'background'
  );

  const primaryPressedBg = useThemeColor(
    {
      light: colors.primary[600],
      dark: colors.primary[700]
    },
    'background'
  );

  const secondaryBg = useThemeColor(
    {
      light: colors.neutral[100],
      dark: colors.neutral[800]
    },
    'background'
  );

  const secondaryPressedBg = useThemeColor(
    {
      light: colors.neutral[200],
      dark: colors.neutral[700]
    },
    'background'
  );

  const secondaryText = useThemeColor(
    {
      light: colors.neutral[900],
      dark: colors.neutral[100]
    },
    'text'
  );

  const secondaryBorder = useThemeColor(
    {
      light: colors.neutral[200],
      dark: colors.neutral[700]
    },
    'border'
  );

  const ghostPressedBg = useThemeColor(
    {
      light: colors.neutral[100],
      dark: colors.neutral[800]
    },
    'background'
  );

  const ghostText = useThemeColor(
    {
      light: colors.neutral[900],
      dark: colors.neutral[100]
    },
    'text'
  );

  const destructiveBg = useThemeColor(
    {
      light: colors.error,
      dark: colors.error
    },
    'background'
  );

  const destructivePressedBg = useThemeColor(
    {
      light: '#dc2626', // Darker red
      dark: '#b91c1c' // Even darker for dark mode
    },
    'background'
  );

  // Build variant colors using the hoisted values
  const variantColors = {
    primary: {
      background: primaryBg,
      text: colors.neutral[0],
      pressedBackground: primaryPressedBg
    },
    secondary: {
      background: secondaryBg,
      text: secondaryText,
      pressedBackground: secondaryPressedBg,
      border: secondaryBorder
    },
    ghost: {
      background: 'transparent',
      text: ghostText,
      pressedBackground: ghostPressedBg
    },
    destructive: {
      background: destructiveBg,
      text: colors.neutral[0], // White text
      pressedBackground: destructivePressedBg
    }
  }[variant];

  // Size configurations
  const sizeConfig = {
    sm: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      fontSize: typography.sizes.sm,
      iconSize: 16,
      height: 36
    },
    md: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      fontSize: typography.sizes.base,
      iconSize: 20,
      height: 44
    },
    lg: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      fontSize: typography.sizes.lg,
      iconSize: 24,
      height: 52
    }
  }[size];

  const iconOnlyPadding = {
    sm: spacing.xs,
    md: spacing.sm,
    lg: spacing.md
  }[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? variantColors.pressedBackground : variantColors.background,
          paddingVertical: iconOnly ? iconOnlyPadding : sizeConfig.paddingVertical,
          paddingHorizontal: iconOnly ? iconOnlyPadding : sizeConfig.paddingHorizontal,
          height: sizeConfig.height,
          minWidth: iconOnly ? sizeConfig.height : undefined,
          borderRadius: rounded ? sizeConfig.height / 2 : borderRadius.md
        },
        variant === 'secondary' && {
          borderWidth: 1,
          borderColor: variantColors.border
        },
        (disabled || loading) && styles.disabled,
        style
      ]}
      accessibilityRole='button'
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={variantColors.text} size='small' />
      ) : (
        <Row align='center' justify='center' gap='xs'>
          {icon && !iconOnly && <Icon name={icon as any} size={sizeConfig.iconSize} color={variantColors.text} />}
          {iconOnly && icon ? (
            <Icon name={icon as any} size={sizeConfig.iconSize} color={variantColors.text} />
          ) : (
            <Text
              style={[
                styles.text,
                {
                  color: variantColors.text,
                  fontSize: sizeConfig.fontSize
                }
              ]}
            >
              {children}
            </Text>
          )}
        </Row>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: typography.weights.semibold,
    textAlign: 'center'
  },
  disabled: {
    opacity: 0.5
  }
});
