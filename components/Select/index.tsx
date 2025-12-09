import React, { useCallback, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, Pressable } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetFlatList, // Add this
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import { Icon } from '@/components/Icon';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Text } from '@/components/Text';
import { colors } from '@/constants/design-tokens';

// ============================================================================
// Types
// ============================================================================

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  lightColor?: string;
  darkColor?: string;
  style?: ViewStyle;
}

export interface SelectRef {
  focus: () => void;
  blur: () => void;
}

// ============================================================================
// Select Component
// ============================================================================

export const Select = forwardRef<SelectRef, SelectProps>(({ value, onValueChange, options, placeholder = 'Select an option', disabled = false, error = false, lightColor, darkColor, style }, ref) => {
  // Theme colors
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const placeholderColor = useThemeColor({ light: colors.text.secondary.light, dark: colors.text.secondary.dark }, 'text');
  const errorColor = colors.error;
  const selectedItemBg = useThemeColor({ light: colors.surface.light, dark: colors.surface.dark }, 'background');
  const disabledBg = useThemeColor({ light: colors.surface.light, dark: colors.surface.dark }, 'background');
  const disabledText = useThemeColor({ light: colors.text.tertiary.light, dark: colors.text.tertiary.dark }, 'text');

  // Bottom sheet ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Get selected option label
  const selectedOption = useMemo(() => options.find((opt) => opt.value === value), [options, value]);

  // Callbacks
  const handlePresentModalPress = useCallback(() => {
    if (!disabled) {
      bottomSheetModalRef.current?.present();
    }
  }, [disabled]);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSelectOption = useCallback(
    (optionValue: string) => {
      onValueChange?.(optionValue);
      handleDismissModalPress();
    },
    [onValueChange, handleDismissModalPress]
  );

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    focus: handlePresentModalPress,
    blur: handleDismissModalPress
  }));

  // Backdrop component
  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />, []);

  // Dynamic snap points
  const snapPoints = useMemo(() => {
    const itemHeight = 56; // Height per item
    const maxItems = 6; // Max items before scrolling
    const padding = 32; // Top/bottom padding
    const items = Math.min(options.length, maxItems);
    const calculatedHeight = items * itemHeight + padding;

    // Return percentage or pixel value
    return [Math.min(calculatedHeight, 400)];
  }, [options.length]);

  return (
    <View style={style}>
      {/* Trigger */}
      <TouchableOpacity
        onPress={handlePresentModalPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.trigger,
          {
            backgroundColor: disabled ? disabledBg : backgroundColor,
            borderColor: error ? errorColor : borderColor
          }
        ]}
        accessibilityRole='button'
        accessibilityLabel={selectedOption ? `Selected: ${selectedOption.label}` : placeholder}
        accessibilityHint='Opens a menu to select an option'
        accessibilityState={{ disabled }}
      >
        <Text
          style={[
            styles.triggerText,
            {
              color: selectedOption ? (disabled ? disabledText : textColor) : placeholderColor
            }
          ]}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Icon name='chevron.down' size={20} color={disabled ? disabledText : textColor} style={styles.icon} />
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor
        }}
        handleIndicatorStyle={{
          backgroundColor: borderColor
        }}
      >
        <BottomSheetFlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <SelectItem option={item} isSelected={item.value === value} onSelect={handleSelectOption} textColor={textColor} selectedBgColor={selectedItemBg} disabledTextColor={disabledText} />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheetModal>
    </View>
  );
});

Select.displayName = 'Select';

// ============================================================================
// SelectItem Component
// ============================================================================

interface SelectItemProps {
  option: SelectOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
  textColor: string;
  selectedBgColor: string;
  disabledTextColor: string;
}

const SelectItem: React.FC<SelectItemProps> = ({ option, isSelected, onSelect, textColor, selectedBgColor, disabledTextColor }) => {
  const handlePress = useCallback(() => {
    if (!option.disabled) {
      onSelect(option.value);
    }
  }, [option.disabled, option.value, onSelect]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={option.disabled}
      style={({ pressed }) => [styles.item, isSelected && { backgroundColor: selectedBgColor }, pressed && !option.disabled && styles.itemPressed]}
      accessibilityRole='button'
      accessibilityLabel={option.label}
      accessibilityState={{
        selected: isSelected,
        disabled: option.disabled
      }}
    >
      <Text
        style={[
          styles.itemText,
          {
            color: option.disabled ? disabledTextColor : textColor,
            fontWeight: isSelected ? '600' : '400'
          }
        ]}
      >
        {option.label}
      </Text>
      {isSelected && <Icon name='checkmark' size={20} color={textColor} />}
    </Pressable>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 48
  },
  triggerText: {
    fontSize: 16,
    flex: 1
  },
  icon: {
    marginLeft: 8
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4
  },
  itemPressed: {
    opacity: 0.7
  },
  itemText: {
    fontSize: 16,
    flex: 1
  }
});
