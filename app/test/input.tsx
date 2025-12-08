// app/test-input.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card/index';
import { Column } from '@/components/Column/index';
import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/constants/design-tokens';

export default function TestInputScreen() {
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [telValue, setTelValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [errorValue, setErrorValue] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  return (
    <ScreenContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Input Component Demo</Text>

          {/* Basic Inputs */}
          <Card style={styles.card}>
            <Column gap='md'>
              <Text style={styles.cardTitle}>Input Types</Text>

              <Column gap='sm'>
                <Text style={styles.label}>Text Input</Text>
                <Input type='text' placeholder='Enter text...' value={textValue} onChangeText={setTextValue} />
                {textValue ? <Text style={styles.valueDisplay}>Value: {textValue}</Text> : null}
              </Column>

              <Column gap='sm'>
                <Text style={styles.label}>Email Input</Text>
                <Input type='email' placeholder='you@example.com' value={emailValue} onChangeText={setEmailValue} autoCapitalize='none' autoCorrect={false} />
              </Column>

              <Column gap='sm'>
                <Text style={styles.label}>Number Input</Text>
                <Input type='number' placeholder='123' value={numberValue} onChangeText={setNumberValue} />
              </Column>

              <Column gap='sm'>
                <Text style={styles.label}>Phone Input</Text>
                <Input type='tel' placeholder='(555) 123-4567' value={telValue} onChangeText={setTelValue} />
              </Column>

              <Column gap='sm'>
                <Text style={styles.label}>URL Input</Text>
                <Input type='url' placeholder='https://example.com' value={urlValue} onChangeText={setUrlValue} autoCapitalize='none' autoCorrect={false} />
              </Column>
            </Column>
          </Card>

          {/* States */}
          <Card style={styles.card}>
            <Column gap='md'>
              <Text style={styles.cardTitle}>States</Text>

              <Column gap='sm'>
                <Text style={styles.label}>Default</Text>
                <Input placeholder='Default input' />
              </Column>

              <Column gap='sm'>
                <Text style={styles.label}>Disabled</Text>
                <Input placeholder='Disabled input' disabled value="Can't edit this" />
              </Column>

              <Column gap='sm'>
                <Text style={styles.label}>Error State</Text>
                <Input placeholder='Enter valid email' error value={errorValue} onChangeText={setErrorValue} />
                <Text style={styles.errorText}>Please enter a valid email address</Text>
              </Column>

              <Column gap='sm'>
                <Text style={styles.label}>With Default Value</Text>
                <Input placeholder='Placeholder' value='Pre-filled value' />
              </Column>
            </Column>
          </Card>

          {/* Form Example */}
          <Card style={styles.card}>
            <Column gap='md'>
              <Text style={styles.cardTitle}>Form Example</Text>

              <Column gap='sm'>
                <Text style={styles.label}>Name</Text>
                <Input placeholder='John Doe' value={formData.name} onChangeText={(text) => setFormData({ ...formData, name: text })} />
              </Column>

              <Column gap='sm'>
                <Text style={styles.label}>Email</Text>
                <Input type='email' placeholder='john@example.com' value={formData.email} onChangeText={(text) => setFormData({ ...formData, email: text })} autoCapitalize='none' />
              </Column>

              <Column gap='sm'>
                <Text style={styles.label}>Phone</Text>
                <Input type='tel' placeholder='(555) 123-4567' value={formData.phone} onChangeText={(text) => setFormData({ ...formData, phone: text })} />
              </Column>

              <Button
                onPress={() => {
                  console.log('Form submitted:', formData);
                  alert(`Form submitted!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`);
                }}
              >
                Submit
              </Button>
            </Column>
          </Card>

          {/* Multiline */}
          <Card style={styles.card}>
            <Column gap='md'>
              <Text style={styles.cardTitle}>Multiline Input</Text>

              <Column gap='sm'>
                <Text style={styles.label}>Notes (multiline)</Text>
                <Input placeholder='Enter notes...' multiline numberOfLines={4} style={{ height: 100, textAlignVertical: 'top', paddingTop: spacing.sm }} />
              </Column>
            </Column>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xl
  },
  card: {
    padding: spacing.lg,
    backgroundColor: colors.neutral[0],
    marginBottom: spacing.lg
  },
  cardTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900]
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[700]
  },
  valueDisplay: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    fontStyle: 'italic'
  },
  errorText: {
    fontSize: typography.sizes.sm,
    color: colors.error
  }
});
