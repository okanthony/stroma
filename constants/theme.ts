/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
import { colors } from './design-tokens';

export const ThemeColors = {
  light: {
    text: colors.text.primary.light, // '#171717'
    background: colors.background.light, // '#ffffff'
    tint: colors.primary[500], // Your primary green
    icon: colors.neutral[600], // '#525252'
    tabIconDefault: colors.neutral[400], // '#a3a3a3'
    tabIconSelected: colors.primary[500],
    border: colors.border.light, // '#e5e5e5'
    card: colors.surface.light // '#f5f5f5'
    // Add any other colors you need
  },
  dark: {
    text: colors.text.primary.dark, // '#fafafa'
    background: colors.background.dark, // '#0a0a0a'
    tint: colors.primary[400], // Slightly lighter green for dark mode
    icon: colors.neutral[400], // '#a3a3a3'
    tabIconDefault: colors.neutral[600], // '#525252'
    tabIconSelected: colors.primary[400],
    border: colors.border.dark, // '#404040'
    card: colors.surface.dark // '#171717'
  }
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace'
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace'
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
  }
});
