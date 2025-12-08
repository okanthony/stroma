// Components
import { Field } from '@/components/Field';
import { FieldDescription } from '@/components/FieldDescription';
import { FieldError } from '@/components/FieldError';
import { FieldGroup } from '@/components/FieldGroup';
import { FieldLabel } from '@/components/FieldLabel';
import { FieldLegend } from '@/components/FieldLegend';
import { FieldSet } from '@/components/FieldSet';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card/index';
import { Column } from '@/components/Column/index';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';

// Internal
import { colors, spacing, typography } from '@/constants/design-tokens';

// External
import React from 'react';

export default function TestFieldScreen() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    bio: ''
  });

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    phone: ''
  });

  const [submitted, setSubmitted] = React.useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Field Component Demo</Text>

          {/* Basic Field with Label */}
          <Card style={styles.card}>
            <Column gap='lg'>
              <Text style={styles.cardTitle}>Basic Field</Text>

              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input placeholder='Enter your name' />
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldDescription>We'll never share your email.</FieldDescription>
                <Input type='email' placeholder='you@example.com' autoCapitalize='none' />
              </Field>
            </Column>
          </Card>

          {/* Field with Error */}
          <Card style={styles.card}>
            <Column gap='lg'>
              <Text style={styles.cardTitle}>Field with Error</Text>

              <Field error={!!errors.name}>
                <FieldLabel>Name</FieldLabel>
                <Input
                  placeholder='Enter your name'
                  value={formData.name}
                  onChangeText={(text) => {
                    setFormData({ ...formData, name: text });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  error={!!errors.name}
                />
                <FieldError>{errors.name}</FieldError>
              </Field>

              <Field error={!!errors.email}>
                <FieldLabel>Email</FieldLabel>
                <FieldDescription>Enter a valid email address</FieldDescription>
                <Input
                  type='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChangeText={(text) => {
                    setFormData({ ...formData, email: text });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  error={!!errors.email}
                  autoCapitalize='none'
                />
                <FieldError>{errors.email}</FieldError>
              </Field>
            </Column>
          </Card>

          {/* Complete Form Example */}
          <Card style={styles.card}>
            <Column gap='lg'>
              <Text style={styles.cardTitle}>Complete Form</Text>

              {submitted && (
                <View style={styles.successBanner}>
                  <Text style={styles.successText}>✓ Form submitted successfully!</Text>
                </View>
              )}

              <Field error={!!errors.name}>
                <FieldLabel>Full Name *</FieldLabel>
                <Input
                  placeholder='John Doe'
                  value={formData.name}
                  onChangeText={(text) => {
                    setFormData({ ...formData, name: text });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  error={!!errors.name}
                />
                <FieldError>{errors.name}</FieldError>
              </Field>

              <Field error={!!errors.email}>
                <FieldLabel>Email Address *</FieldLabel>
                <FieldDescription>We'll use this to contact you</FieldDescription>
                <Input
                  type='email'
                  placeholder='john@example.com'
                  value={formData.email}
                  onChangeText={(text) => {
                    setFormData({ ...formData, email: text });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  error={!!errors.email}
                  autoCapitalize='none'
                />
                <FieldError>{errors.email}</FieldError>
              </Field>

              <Field error={!!errors.phone}>
                <FieldLabel>Phone Number</FieldLabel>
                <FieldDescription>Optional - for SMS notifications</FieldDescription>
                <Input
                  type='tel'
                  placeholder='(555) 123-4567'
                  value={formData.phone}
                  onChangeText={(text) => {
                    setFormData({ ...formData, phone: text });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  error={!!errors.phone}
                />
                <FieldError>{errors.phone}</FieldError>
              </Field>

              <Field>
                <FieldLabel>Bio</FieldLabel>
                <Input
                  placeholder='Tell us about yourself...'
                  multiline
                  numberOfLines={4}
                  value={formData.bio}
                  onChangeText={(text) => setFormData({ ...formData, bio: text })}
                  style={{ height: 100, textAlignVertical: 'top', paddingTop: spacing.sm }}
                />
              </Field>

              <Button onPress={handleSubmit}>Submit Form</Button>
            </Column>
          </Card>

          {/* FieldSet Example */}
          <Card style={styles.card}>
            <Column gap='lg'>
              <Text style={styles.cardTitle}>FieldSet for Grouping</Text>

              <FieldSet>
                <FieldLegend>Contact Information</FieldLegend>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type='email' placeholder='you@example.com' autoCapitalize='none' />
                </Field>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input type='tel' placeholder='(555) 123-4567' />
                </Field>
              </FieldSet>

              <FieldSet>
                <FieldLegend>Personal Details</FieldLegend>

                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input placeholder='John Doe' />
                </Field>

                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <Input placeholder='New York, NY' />
                </Field>
              </FieldSet>
            </Column>
          </Card>

          {/* FieldGroup Orientation */}
          <Card style={styles.card}>
            <Column gap='lg'>
              <Text style={styles.cardTitle}>FieldGroup Layouts</Text>

              <Text style={styles.sectionLabel}>Vertical (Default)</Text>
              <FieldGroup orientation='vertical'>
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input placeholder='John' />
                </Field>
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input placeholder='Doe' />
                </Field>
              </FieldGroup>

              <Text style={styles.sectionLabel}>Horizontal</Text>
              <FieldGroup orientation='horizontal'>
                <Field style={{ flex: 1 }}>
                  <FieldLabel>First Name</FieldLabel>
                  <Input placeholder='John' />
                </Field>
                <Field style={{ flex: 1 }}>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input placeholder='Doe' />
                </Field>
              </FieldGroup>
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
  sectionLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.md
  },
  successBanner: {
    backgroundColor: colors.primary[50],
    padding: spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary[500]
  },
  successText: {
    color: colors.primary[700],
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold
  }
});
