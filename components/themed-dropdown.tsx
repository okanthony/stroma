// components/themed-dropdown.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Pressable, StyleSheet, type StyleProp, type ViewStyle, Modal, Platform, ScrollView } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '@/components/themed-text';

export type DropdownOption<T = string> = {
  label: string;
  value: T;
  disabled?: boolean;
};

export type ThemedDropdownProps<T = string> = {
  options: DropdownOption<T>[];
  value?: T;
  onValueChange?: (value: T) => void;
  placeholder?: string;
  variant?: 'default' | 'outlined' | 'ghost';
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * Accessibility label for the dropdown trigger
   */
  accessibilityLabel?: string;
  /**
   * Accessibility hint for the dropdown trigger
   */
  accessibilityHint?: string;
};

export function ThemedDropdown<T = string>({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  variant = 'default',
  lightBackgroundColor,
  darkBackgroundColor,
  lightTextColor,
  darkTextColor,
  lightBorderColor,
  darkBorderColor,
  disabled = false,
  style,
  accessibilityLabel,
  accessibilityHint
}: ThemedDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const triggerRef = useRef<View>(null);
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const backgroundColor = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, 'background');
  const textColor = useThemeColor({ light: lightTextColor, dark: darkTextColor }, 'text');
  const borderColor = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'icon');
  // These hooks must be called unconditionally at the top level
  const optionBackgroundColor = useThemeColor({ light: lightBackgroundColor, dark: darkBackgroundColor }, 'background');
  const optionTextColor = useThemeColor({ light: lightTextColor, dark: darkTextColor }, 'text');
  const hoverBackgroundColor = useThemeColor({}, 'tint');
  // Find selected option - use strict equality comparison
  const selectedOption = useMemo(() => {
    if (value === undefined || value === null) return undefined;
    return options.find((opt) => opt.value === value);
  }, [value, options]);

  // Close dropdown when clicking outside (web only, handled by Modal on native)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (Platform.OS === 'web' && triggerRef.current) {
        // Check if click is outside the dropdown
        const target = event.target as HTMLElement;
        if (!target.closest('[data-dropdown-container]')) {
          setIsOpen(false);
        }
      }
    };

    if (Platform.OS === 'web') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else if (focusedIndex !== null && options[focusedIndex]) {
        const option = options[focusedIndex];
        if (!option.disabled) {
          onValueChange?.(option.value);
          setIsOpen(false);
          setFocusedIndex(null);
        }
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setFocusedIndex(null);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        const nextIndex = focusedIndex === null ? 0 : Math.min(focusedIndex + 1, options.length - 1);
        setFocusedIndex(nextIndex);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (isOpen && focusedIndex !== null) {
        const prevIndex = Math.max(focusedIndex - 1, 0);
        setFocusedIndex(prevIndex);
      }
    }
  };

  const handleSelectOption = (option: DropdownOption<T>) => {
    if (option.disabled) return;
    onValueChange?.(option.value);
    setIsOpen(false);
    setFocusedIndex(null);
  };

  const handleTriggerPress = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(null); // Start with no focus
    }
  };

  const onTriggerLayout = () => {
    triggerRef.current?.measureInWindow((px, py, fwidth, fheight) => {
      setTriggerLayout({ x: px, y: py, width: fwidth, height: fheight });
    });
  };

  const renderDropdownContent = () => {
    const webProps = Platform.OS === 'web' ? ({ role: 'listbox', 'aria-label': 'Dropdown options' } as any) : {};

    return (
      <View
        style={[
          styles.dropdownMenu,
          {
            backgroundColor: optionBackgroundColor,
            borderColor: variant === 'outlined' ? borderColor : 'transparent',
            borderWidth: variant === 'outlined' ? 1 : 0
          }
        ]}
        data-dropdown-container
        {...webProps}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true} nestedScrollEnabled={true}>
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isFocused = focusedIndex === index;
            const isDisabled = option.disabled || false;

            return (
              <Pressable
                key={index}
                disabled={isDisabled}
                onPress={() => handleSelectOption(option)}
                {...(Platform.OS === 'web' && {
                  // @ts-ignore - web-only event handlers
                  onClick: (e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleSelectOption(option);
                  },
                  onMouseDown: (e: any) => {
                    e.stopPropagation();
                  },
                  role: 'option',
                  'aria-selected': isSelected,
                  'aria-disabled': isDisabled
                })}
                style={({ pressed, hovered }) => [
                  styles.option,
                  isSelected && styles.selectedOption,
                  hovered && !isDisabled && { backgroundColor: `${hoverBackgroundColor}20` }, // ← Use built-in hovered
                  isDisabled && styles.disabledOption,
                  pressed && !isDisabled && { opacity: 0.7 }
                ]}
              >
                <ThemedText style={[{ color: isDisabled ? `${optionTextColor}66` : optionTextColor }, isSelected && styles.selectedText]}>{option.label}</ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, style]}
      {...(Platform.OS === 'web' && {
        // @ts-ignore - web-only keyboard handler
        onKeyDown: handleKeyPress
      })}
    >
      <Pressable
        ref={triggerRef}
        disabled={disabled}
        onPress={handleTriggerPress}
        onLayout={onTriggerLayout}
        style={({ pressed }) => [
          styles.trigger,
          variant === 'default' && styles.default,
          variant === 'outlined' && styles.outlined,
          variant === 'ghost' && styles.ghost,
          {
            backgroundColor: disabled ? `${backgroundColor}55` : backgroundColor,
            borderColor: variant === 'outlined' ? borderColor : 'transparent',
            borderWidth: variant === 'outlined' ? 1 : 0,
            opacity: pressed && !disabled ? 0.8 : 1
          }
        ]}
        accessibilityRole={Platform.OS === 'web' ? 'combobox' : 'button'}
        accessibilityLabel={accessibilityLabel || (selectedOption ? selectedOption.label : placeholder)}
        accessibilityHint={accessibilityHint || 'Double tap to open dropdown'}
        accessibilityState={{ expanded: isOpen, disabled }}
        {...(Platform.OS === 'web' && {
          // @ts-ignore - web-only props
          'aria-expanded': isOpen,
          'aria-haspopup': 'listbox'
        })}
      >
        <ThemedText style={[styles.triggerText, { color: disabled ? `${textColor}99` : textColor }, !selectedOption && styles.placeholderText]}>
          {selectedOption ? selectedOption.label : placeholder}
        </ThemedText>
        <ThemedText style={[styles.chevron, { color: disabled ? `${textColor}66` : textColor }]}>{isOpen ? '▲' : '▼'}</ThemedText>
      </Pressable>

      {isOpen && (
        <Modal transparent visible={isOpen} animationType='fade' onRequestClose={() => setIsOpen(false)} accessibilityViewIsModal>
          <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)} accessible={false}>
            <View
              style={[
                styles.dropdownWrapper,
                {
                  top: triggerLayout.y + triggerLayout.height + 4,
                  left: triggerLayout.x,
                  minWidth: triggerLayout.width
                }
              ]}
              {...(Platform.OS === 'web' && {
                // @ts-ignore - web-only event handlers
                onClick: (e: any) => {
                  e.stopPropagation();
                },
                onMouseDown: (e: any) => {
                  e.stopPropagation();
                }
              })}
            >
              {renderDropdownContent()}
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    minWidth: 150 // Add minimum width
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    minHeight: 44 // Accessibility minimum touch target
  },
  default: {
    borderWidth: 0
  },
  outlined: {
    borderWidth: 1
  },
  ghost: {
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 8
  },
  triggerText: {
    flex: 1,
    fontSize: 16
  },
  placeholderText: {
    opacity: 0.6
  },
  chevron: {
    fontSize: 12,
    marginLeft: 8
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  dropdownWrapper: {
    position: 'absolute',
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  scrollView: {
    maxHeight: 200
  },
  dropdownMenu: {
    borderRadius: 8,
    overflow: 'hidden'
    // Remove maxHeight from here since it's now on scrollView
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 44, // Accessibility minimum touch target
    justifyContent: 'center'
  },
  selectedOption: {
    backgroundColor: 'rgba(10, 126, 164, 0.1)' // tint color with opacity
  },
  disabledOption: {
    opacity: 0.5
  },
  selectedText: {
    fontWeight: '600'
  }
});
