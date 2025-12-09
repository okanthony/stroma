import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '@/components/Text';
import { Select, SelectOption } from '@/components/Select';
import { Field } from '@/components/Field';
import { useThemeColor } from '@/hooks/use-theme-color';

const PLANT_OPTIONS: SelectOption[] = [
  { label: 'Monstera Deliciosa', value: 'monstera' },
  { label: 'Snake Plant', value: 'snake-plant' },
  { label: 'Pothos', value: 'pothos' },
  { label: 'Fiddle Leaf Fig', value: 'fiddle-leaf' },
  { label: 'Peace Lily', value: 'peace-lily' },
  { label: 'Spider Plant', value: 'spider-plant' },
  { label: 'ZZ Plant', value: 'zz-plant' },
  { label: 'Philodendron', value: 'philodendron' }
];

const SMALL_OPTIONS: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
];

const OPTIONS_WITH_DISABLED: SelectOption[] = [
  { label: 'Available Option 1', value: '1' },
  { label: 'Disabled Option', value: '2', disabled: true },
  { label: 'Available Option 3', value: '3' },
  { label: 'Another Disabled', value: '4', disabled: true },
  { label: 'Available Option 5', value: '5' }
];

export default function SelectTestScreen() {
  const backgroundColor = useThemeColor({}, 'background');

  const [basicValue, setBasicValue] = useState<string>('');
  const [smallValue, setSmallValue] = useState<string>('2');
  const [disabledValue, setDisabledValue] = useState<string>('');
  const [fieldValue, setFieldValue] = useState<string>('');
  const [errorValue, setErrorValue] = useState<string>('');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: 'Select Component Test',
          headerBackTitle: 'Back'
        }}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.section}>
          <Text variant='heading'>Select Component</Text>
          <Text variant='body' style={styles.description}>
            A bottom sheet select component for choosing options
          </Text>
        </View>

        {/* Basic Select */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Basic Select
          </Text>
          <Select value={basicValue} onValueChange={setBasicValue} options={PLANT_OPTIONS} placeholder='Select a plant' />
          <Text variant='caption' style={styles.selectedValue}>
            Selected: {basicValue || 'None'}
          </Text>
        </View>

        {/* Pre-selected Value */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Pre-selected Value
          </Text>
          <Select value={smallValue} onValueChange={setSmallValue} options={SMALL_OPTIONS} placeholder='Select an option' />
          <Text variant='caption' style={styles.selectedValue}>
            Selected: {smallValue}
          </Text>
        </View>

        {/* With Disabled Options */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            With Disabled Options
          </Text>
          <Select value={disabledValue} onValueChange={setDisabledValue} options={OPTIONS_WITH_DISABLED} placeholder='Select an option' />
          <Text variant='caption' style={styles.selectedValue}>
            Selected: {disabledValue || 'None'}
          </Text>
        </View>

        {/* Disabled Select */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Disabled State
          </Text>
          <Select value='pothos' onValueChange={() => {}} options={PLANT_OPTIONS} disabled />
        </View>

        {/* With Field Component */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            With Field Component
          </Text>
          <Field label='Favorite Plant' description='Choose your favorite houseplant'>
            <Select value={fieldValue} onValueChange={setFieldValue} options={PLANT_OPTIONS} placeholder='Select a plant' />
          </Field>
        </View>

        {/* Error State */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Error State
          </Text>
          <Field label='Required Field' error={!errorValue ? 'Please select an option' : undefined}>
            <Select value={errorValue} onValueChange={setErrorValue} options={SMALL_OPTIONS} placeholder='Select an option' error={!errorValue} />
          </Field>
        </View>

        {/* Custom Styling */}
        <View style={styles.section}>
          <Text variant='subheading' style={styles.sectionTitle}>
            Custom Styling
          </Text>
          <Select value='' onValueChange={() => {}} options={SMALL_OPTIONS} placeholder='Custom styled select' style={styles.customSelect} />
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
    padding: 16
  },
  section: {
    marginBottom: 32
  },
  sectionTitle: {
    marginBottom: 12
  },
  description: {
    marginTop: 8,
    opacity: 0.7
  },
  selectedValue: {
    marginTop: 8,
    opacity: 0.7
  },
  customSelect: {
    borderWidth: 2
  },
  spacer: {
    height: 32
  }
});
