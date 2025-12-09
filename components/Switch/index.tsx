// Components
import { Pressable, StyleSheet, Animated, ViewStyle } from 'react-native';

// Internal
import { colors } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';

// External
import React from 'react';

// Types
interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

// Components
export function Switch({ checked = false, onCheckedChange, disabled = false, style }: SwitchProps) {
  const [isChecked, setIsChecked] = React.useState(checked);
  const [animation] = React.useState(new Animated.Value(checked ? 1 : 0));

  // Theme colors
  const backgroundColor = useThemeColor(
    {
      light: isChecked ? colors.primary[500] : colors.neutral[200],
      dark: isChecked ? colors.primary[600] : colors.neutral[700]
    },
    'background'
  );

  const thumbColor = useThemeColor(
    {
      light: colors.neutral[0],
      dark: colors.neutral[0]
    },
    'background'
  );

  const handlePress = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onCheckedChange?.(newChecked);

    // Animate thumb position
    Animated.spring(animation, {
      toValue: newChecked ? 1 : 0,
      useNativeDriver: true,
      friction: 7,
      tension: 80
    }).start();
  };

  // Calculate thumb position based on animation value
  const thumbTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22] // Move thumb from left (2px) to right (22px)
  });

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, { backgroundColor }, disabled && styles.disabled, style]}
      accessibilityRole='switch'
      accessibilityState={{ checked: isChecked, disabled }}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: thumbColor,
            transform: [{ translateX: thumbTranslateX }]
          }
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center'
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2 // Android shadow
  },
  disabled: {
    opacity: 0.5
  }
});
