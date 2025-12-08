import { View, StyleSheet, type ViewStyle } from 'react-native';
import { spacing } from '@/constants/design-tokens';

type ColumnProps = {
  children: React.ReactNode;
  gap?: keyof typeof spacing;
  style?: ViewStyle;
};

/**
 * Vertical stack with consistent spacing
 * Like flexbox column with gap
 */
export function Column({ children, gap = 'md', style }: ColumnProps) {
  return <View style={[styles.stack, { gap: spacing[gap] }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  stack: {
    flexDirection: 'column'
  }
});
