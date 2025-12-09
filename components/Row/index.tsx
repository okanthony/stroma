import { View, StyleSheet, type ViewStyle } from 'react-native';
import { spacing } from '@/constants/design-tokens';

type RowProps = {
  children: React.ReactNode;
  gap?: keyof typeof spacing;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  style?: ViewStyle;
};

/**
 * Horizontal row with consistent spacing
 * Like flexbox row with gap
 */
export function Row({ children, gap = 'md', align = 'center', justify = 'flex-start', style }: RowProps) {
  return (
    <View
      style={[
        styles.row,
        {
          gap: spacing[gap],
          alignItems: align,
          justifyContent: justify
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});
