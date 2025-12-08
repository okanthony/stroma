// Components
import { View, StyleSheet, Pressable, type ViewStyle } from 'react-native';

// Internal
import { useThemeColor } from '@/hooks/use-theme-color';
import { spacing, borderRadius, shadows } from '@/constants/design-tokens';

// Types
type CardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
};

/**
 * Card component for elevated content
 * - Optional tap functionality
 * - Consistent styling
 * - Theme-aware
 */
export function Card({ children, onPress, style, padding = 'md' }: CardProps) {
  const backgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  const cardStyle = [
    styles.card,
    {
      backgroundColor,
      borderColor,
      padding: spacing[padding]
    },
    style
  ];

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [cardStyle, pressed && styles.pressed]}>
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    ...shadows.sm
  },
  pressed: {
    opacity: 0.7
  }
});
