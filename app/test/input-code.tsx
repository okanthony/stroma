import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '@/components/Text';
import { InputCode, InputCodeSeparator } from '@/components/InputCode';
import { Field } from '@/components/Field';
import { FieldLabel } from '@/components/FieldLabel';
import { FieldDescription } from '@/components/FieldDescription';
import { FieldError } from '@/components/FieldError';
import { Button } from '@/components/Button';
import { useThemeColor } from '@/hooks/use-theme-color';
import { spacing } from '@/constants/design-tokens';

export default function InputCodeTestScreen() {
  const backgroundColor = useThemeColor({}, 'background');

  // Basic example
  const [basicValue, setBasicValue] = useState('');

  // Controlled with display
  const [controlledValue, setControlledValue] = useState('');

  // With completion callback
  const [completeValue, setCompleteValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = (code: string) => {
    setIsComplete(true);
    console.log('OTP Complete:', code);
    // Auto-clear after 2 seconds for demo
    setTimeout(() => setIsComplete(false), 2000);
  };

  // With Field component
  const [fieldValue, setFieldValue] = useState('');
  const [fieldError, setFieldError] = useState('');

  const handleFieldSubmit = () => {
    if (fieldValue.length < 6) {
      setFieldError('Please enter all 6 digits');
    } else {
      setFieldError('');
      console.log('Submitted:', fieldValue);
      // Reset after success
      setTimeout(() => setFieldValue(''), 1000);
    }
  };

  // Error state example
  const [errorValue, setErrorValue] = useState('');
  const hasError = errorValue.length === 6 && errorValue !== '123456';

  // Disabled state
  const [disabledValue] = useState('123456');

  // Different lengths
  const [fourDigitValue, setFourDigitValue] = useState('');
  const [eightDigitValue, setEightDigitValue] = useState('');

  // With separator (manual composition for demo)
  const [separatorValue, setSeparatorValue] = useState('');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: 'InputCode Component Test',
          headerBackTitle: 'Back'
        }}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.section}>
          <Text variant='heading'>InputCode Component</Text>
          <Text variant='body' style={styles.description}>
            One-time password input component for verification codes
          </Text>
        </View>

        {/* Basic Usage */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Basic Usage
          </Text>
          <InputCode value={basicValue} onChangeText={setBasicValue} autoFocus />
          <Text variant='caption' style={styles.valueDisplay}>
            Value: {basicValue || '(empty)'}
          </Text>
        </View>

        {/* Controlled with Display */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Controlled Input
          </Text>
          <InputCode value={controlledValue} onChangeText={setControlledValue} />
          <Text variant='caption' style={styles.valueDisplay}>
            {controlledValue === '' ? 'Enter your one-time password' : `You entered: ${controlledValue}`}
          </Text>
        </View>

        {/* With Completion Callback */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            With Completion Callback
          </Text>
          <InputCode value={completeValue} onChangeText={setCompleteValue} onComplete={handleComplete} />
          {isComplete && (
            <Text variant='caption' style={[styles.valueDisplay, styles.successText]}>
              ✓ Code complete! Callback fired.
            </Text>
          )}
        </View>

        {/* With Field Component */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            With Field Component
          </Text>
          <Field error={!!fieldError}>
            <FieldLabel>Verification Code</FieldLabel>
            <FieldDescription>Enter the 6-digit code sent to your email</FieldDescription>
            <InputCode
              value={fieldValue}
              onChangeText={(value) => {
                setFieldValue(value);
                if (fieldError) setFieldError('');
              }}
              error={!!fieldError}
            />
            {fieldError && <FieldError>{fieldError}</FieldError>}
          </Field>
          <Button variant='primary' onPress={handleFieldSubmit} style={styles.submitButton}>
            Verify Code
          </Button>
        </View>

        {/* Error State */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Error State
          </Text>
          <Field error={hasError}>
            <FieldLabel>Enter "123456" to pass validation</FieldLabel>
            <InputCode value={errorValue} onChangeText={setErrorValue} error={hasError} />
            {hasError && <FieldError>Invalid code. Please try again.</FieldError>}
          </Field>
        </View>

        {/* Disabled State */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Disabled State
          </Text>
          <InputCode value={disabledValue} onChangeText={() => {}} disabled />
        </View>

        {/* Different Lengths */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Different Lengths
          </Text>

          <View style={styles.subsection}>
            <Text variant='caption' style={styles.subsectionLabel}>
              4 Digits
            </Text>
            <InputCode length={4} value={fourDigitValue} onChangeText={setFourDigitValue} />
          </View>

          <View style={styles.subsection}>
            <Text variant='caption' style={styles.subsectionLabel}>
              8 Digits
            </Text>
            <InputCode length={8} value={eightDigitValue} onChangeText={setEightDigitValue} />
          </View>
        </View>

        {/* With Separator (Manual Composition) */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            With Visual Separator
          </Text>
          <Text variant='caption' style={styles.note}>
            Note: Currently renders all slots in one group. Full composition with InputCodeGroup can be added later if needed.
          </Text>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorGroup}>
              <InputCode
                length={3}
                value={separatorValue.slice(0, 3)}
                onChangeText={(val) => {
                  const rest = separatorValue.slice(3);
                  setSeparatorValue(val + rest);
                }}
              />
            </View>
            <InputCodeSeparator />
            <View style={styles.separatorGroup}>
              <InputCode
                length={3}
                value={separatorValue.slice(3, 6)}
                onChangeText={(val) => {
                  const first = separatorValue.slice(0, 3);
                  setSeparatorValue(first + val);
                }}
              />
            </View>
          </View>
          <Text variant='caption' style={styles.valueDisplay}>
            Full value: {separatorValue || '(empty)'}
          </Text>
        </View>

        {/* Paste Testing */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Paste Testing
          </Text>
          <Text variant='caption' style={styles.note}>
            Try pasting: "123456" or "123-456" or "12 34 56"
          </Text>
          <InputCode value={basicValue} onChangeText={setBasicValue} />
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  content: {
    padding: spacing.lg
  },
  section: {
    marginBottom: spacing.xl
  },
  sectionTitle: {
    marginBottom: spacing.md
  },
  description: {
    marginTop: spacing.sm,
    opacity: 0.7
  },
  valueDisplay: {
    marginTop: spacing.sm,
    opacity: 0.7
  },
  successText: {
    color: '#4D9552'
  },
  submitButton: {
    marginTop: spacing.md
  },
  subsection: {
    marginBottom: spacing.md
  },
  subsectionLabel: {
    marginBottom: spacing.xs,
    opacity: 0.7
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  separatorGroup: {
    // Placeholder for future composition
  },
  note: {
    marginBottom: spacing.sm,
    opacity: 0.6,
    fontStyle: 'italic'
  },
  spacer: {
    height: spacing.xl
  }
});
