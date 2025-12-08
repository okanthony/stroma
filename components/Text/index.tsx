import { Text as RNText, StyleSheet, type TextProps as RNTextProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { typography } from '@/constants/design-tokens';

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'body' | 'heading' | 'subheading' | 'caption' | 'label';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
};

export function Text({ style, lightColor, darkColor, variant = 'body', weight, ...rest }: TextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Determine weight - use prop if provided, otherwise use variant default
  const textWeight = weight || getDefaultWeight(variant);

  return <RNText style={[{ color }, styles[variant], { fontWeight: typography.weights[textWeight] }, style]} {...rest} />;
}

// Helper to get default weight for each variant
function getDefaultWeight(variant: TextProps['variant']): 'normal' | 'medium' | 'semibold' | 'bold' {
  switch (variant) {
    case 'heading':
      return 'bold';
    case 'subheading':
      return 'semibold';
    case 'label':
      return 'medium';
    case 'body':
    case 'caption':
    default:
      return 'normal';
  }
}

const styles = StyleSheet.create({
  body: {
    fontSize: typography.sizes.base,
    lineHeight: typography.sizes.base * typography.lineHeights.normal
  },
  heading: {
    fontSize: typography.sizes['3xl'],
    lineHeight: typography.sizes['3xl'] * typography.lineHeights.tight
  },
  subheading: {
    fontSize: typography.sizes.xl,
    lineHeight: typography.sizes.xl * typography.lineHeights.tight
  },
  caption: {
    fontSize: typography.sizes.sm,
    lineHeight: typography.sizes.sm * typography.lineHeights.normal
  },
  label: {
    fontSize: typography.sizes.xs,
    lineHeight: typography.sizes.xs * typography.lineHeights.normal
  }
});
