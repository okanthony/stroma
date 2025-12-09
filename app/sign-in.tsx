import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Field } from '@/components/Field';
import { FieldError } from '@/components/FieldError';
import { FieldLabel } from '@/components/FieldLabel';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Column } from '@/components/Column/index';
import { useAuthStore } from '@/stores';
import { colors, spacing, typography } from '@/constants/design-tokens';

interface SignInFormData {
  email: string;
}

export default function SignIn() {
  const { login } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    defaultValues: {
      email: ''
    }
  });

  // Mock API call
  const mockSignIn = async (email: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real implementation, this would call Supabase
    // For now, just store email and mark as authenticated
    login(email);
  };

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsSubmitting(true);
      await mockSignIn(data.email);

      // Navigate to root - routing logic will handle redirect
      router.replace('/');
    } catch (error) {
      console.error('Sign in error:', error);
      // In real implementation, would show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.content}>
          <Column gap='lg'>
            {/* Header */}
            <Column gap='sm'>
              <Text style={styles.title}>Welcome to Stroma</Text>
              <Text style={styles.subtitle}>Enter your email to get started</Text>
            </Column>

            {/* Form */}
            <Column gap='lg'>
              <Controller
                control={control}
                name='email'
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email address'
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Field error={Boolean(errors.email)}>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type='email'
                      placeholder='you@example.com'
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={Boolean(errors.email)}
                      autoCapitalize='none'
                      autoCorrect={false}
                      autoComplete='email'
                      keyboardType='email-address'
                      editable={!isSubmitting}
                    />
                    <FieldError>{errors.email?.message}</FieldError>
                  </Field>
                )}
              />

              <Button onPress={handleSubmit(onSubmit)} loading={isSubmitting} disabled={isSubmitting}>
                Get started
              </Button>
            </Column>
          </Column>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    textAlign: 'center'
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.neutral[600],
    textAlign: 'center'
  }
});
