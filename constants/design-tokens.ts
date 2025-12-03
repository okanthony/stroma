// config/design-tokens.ts

/**
 * Design Tokens for Stroma Plant Watering App
 *
 * This file defines the core design system that ensures visual consistency
 * throughout the app. All components should reference these tokens rather
 * than using hardcoded values.
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Primary - Plant/Growth Theme (greens from your logo)
  primary: {
    50: '#f0fdf4', // Very light green - backgrounds, subtle highlights
    100: '#dcfce7', // Light green - hover states, secondary backgrounds
    200: '#bbf7d0', // Soft green
    300: '#86efac', // Medium-light green
    400: '#4ade80', // Bright green
    500: '#4D9552', // Main brand green (adjust to match your logo exactly)
    // 500: '#22c55e', // Main brand green (adjust to match your logo exactly)
    600: '#16a34a', // Darker green - pressed states
    700: '#15803d', // Deep green
    800: '#166534', // Very deep green
    900: '#14532d' // Darkest green
  },

  // Neutrals - Grays for text, borders, backgrounds
  neutral: {
    0: '#ffffff', // Pure white
    50: '#fafafa', // Almost white - subtle backgrounds
    100: '#f5f5f5', // Very light gray - card backgrounds
    200: '#e5e5e5', // Light gray - borders, dividers
    300: '#d4d4d4', // Medium-light gray - disabled states
    400: '#a3a3a3', // Medium gray - placeholder text
    500: '#737373', // True middle gray - secondary text
    600: '#525252', // Medium-dark gray - body text
    700: '#404040', // Dark gray - headings
    800: '#262626', // Very dark gray
    900: '#171717', // Almost black - primary text in light mode
    950: '#0a0a0a' // Darkest - backgrounds in dark mode
  },

  // Semantic Colors - Contextual meanings
  success: '#4D9552', // Matches primary green - healthy plants, completed actions
  warning: '#f59e0b', // Amber - needs attention, reminders
  error: '#ef4444', // Red - errors, dead plants, overdue
  info: '#3b82f6', // Blue - informational messages

  // Functional Colors
  background: {
    light: '#ffffff',
    dark: '#0a0a0a'
  },
  surface: {
    light: '#f5f5f5', // Cards, elevated surfaces in light mode
    dark: '#171717' // Cards, elevated surfaces in dark mode
  },
  border: {
    light: '#e5e5e5',
    dark: '#404040'
  },
  text: {
    primary: {
      light: '#171717',
      dark: '#fafafa'
    },
    secondary: {
      light: '#737373',
      dark: '#a3a3a3'
    },
    tertiary: {
      light: '#a3a3a3',
      dark: '#737373'
    }
  }
};

// ============================================================================
// SPACING
// ============================================================================

/**
 * Spacing scale based on 4px grid system
 * Use these for margins, padding, and gaps
 *
 * Most mobile apps use: md (16) and lg (24) for 90% of spacing
 */
export const spacing = {
  xxs: 2, // Tight spacing, badges
  xs: 4, // Very tight spacing
  sm: 8, // Small gaps, icon padding
  md: 16, // Standard spacing - use this most often
  lg: 24, // Screen padding, section gaps - use this often
  xl: 32, // Large section separation
  xxl: 48, // Major section breaks
  xxxl: 64 // Rare - very large spacing
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

/**
 * Font sizes and weights
 * Mobile apps typically use 3-4 sizes for 90% of text
 *
 * Common pattern:
 * - Headings: xl, lg
 * - Body text: base
 * - Secondary text: sm
 * - Small labels: xs
 */
export const typography = {
  sizes: {
    xs: 12, // Timestamps, tiny labels
    sm: 14, // Secondary text, captions
    base: 16, // Body text - use this most often
    lg: 18, // Subheadings, emphasized text
    xl: 20, // Card titles, section headers
    '2xl': 24, // Screen titles
    '3xl': 30, // Large headings
    '4xl': 36 // Hero text (rare)
  },

  weights: {
    normal: '400' as const, // Regular body text
    medium: '500' as const, // Slightly emphasized
    semibold: '600' as const, // Subheadings, buttons
    bold: '700' as const // Headings, important text
  },

  lineHeights: {
    tight: 1.2, // Headings
    normal: 1.5, // Body text
    relaxed: 1.75 // Longer form content
  }
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

/**
 * Border radius values for rounded corners
 * Pick 1-2 values for consistency
 *
 * Recommendation: Use 'md' (8px) for almost everything
 */
export const borderRadius = {
  none: 0,
  sm: 4, // Tight corners
  md: 8, // Standard - use this for cards, buttons, inputs
  lg: 12, // Larger corners
  xl: 16, // Very rounded
  '2xl': 24, // Heavily rounded
  full: 9999 // Circular/pill shapes
};

// ============================================================================
// SHADOWS
// ============================================================================

/**
 * Shadow definitions for elevation
 * Mobile apps typically use subtle shadows
 */
export const shadows = {
  // iOS-style shadows
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1 // Android
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3 // Android
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5 // Android
  }
};

// ============================================================================
// ANIMATION
// ============================================================================

/**
 * Animation durations and easing
 * Keep mobile animations snappy (200-300ms)
 */
export const animation = {
  duration: {
    fast: 150,
    normal: 200,
    slow: 300
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
};

// ============================================================================
// LAYOUT
// ============================================================================

/**
 * Common layout values
 */
export const layout = {
  // Screen padding - how far from edge content should be
  screenPadding: spacing.lg, // 24px

  // Card padding - internal padding for cards
  cardPadding: spacing.md, // 16px

  // Maximum content width (for tablets/large screens)
  maxContentWidth: 600,

  // Minimum touch target size (accessibility)
  minTouchTarget: 44,

  // Common gaps between elements
  gap: {
    sm: spacing.sm, // 8px between related items
    md: spacing.md, // 16px between sections
    lg: spacing.lg // 24px between major sections
  }
};

// ============================================================================
// COMPONENT SPECIFIC TOKENS
// ============================================================================

/**
 * Tokens specific to common components
 * Helps ensure consistency across the app
 */
export const components = {
  button: {
    height: {
      sm: 36,
      md: 44, // Default - meets accessibility minimum
      lg: 52
    },
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md
  },

  input: {
    height: 44, // Accessibility minimum
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1
  },

  card: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm
  },

  list: {
    itemHeight: 72, // Comfortable tap target with content
    itemPadding: spacing.md,
    gap: spacing.sm
  }
};

// ============================================================================
// THEME VARIANTS
// ============================================================================

/**
 * Helper to get color based on theme
 * Usage: getThemeColor('background', 'light')
 */
export const getThemeColor = (colorKey: keyof typeof colors.background, theme: 'light' | 'dark') => {
  const colorMap: any = {
    background: colors.background[theme],
    surface: colors.surface[theme],
    border: colors.border[theme],
    textPrimary: colors.text.primary[theme],
    textSecondary: colors.text.secondary[theme],
    textTertiary: colors.text.tertiary[theme]
  };

  return colorMap[colorKey];
};

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Export everything as a single theme object for convenience
 */
export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animation,
  layout,
  components
};

// Export type for TypeScript
export type Theme = typeof theme;
