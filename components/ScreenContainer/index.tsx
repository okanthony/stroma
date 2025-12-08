import { View, ScrollView, StyleSheet, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { spacing } from '@/constants/design-tokens';

type ScreenContainerProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: boolean;
  style?: ViewStyle;
};

/**
 * Standard screen container
 * - Handles safe areas (notches, status bar)
 * - Optional scrolling
 * - Consistent padding
 */
export function ScreenContainer({ children, scrollable = false, padding = true, style }: ScreenContainerProps) {
  const backgroundColor = useThemeColor({}, 'background');

  const containerStyle = [styles.container, { backgroundColor }, padding && styles.padding, style];

  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView style={containerStyle} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={containerStyle}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1
  },
  padding: {
    padding: spacing.lg
  },
  scrollContent: {
    flexGrow: 1
  }
});
