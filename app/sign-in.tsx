// Components
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Field } from '@/components/Field';
import { FieldError } from '@/components/FieldError';
import { FieldLabel } from '@/components/FieldLabel';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Column } from '@/components/Column/index';

// Internal
import { borderRadius, colors, spacing, typography } from '@/constants/design-tokens';
import { useAuthStore } from '@/stores';

// External
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { InputCode } from '@/components/InputCode';

// Types
interface SignInFormData {
  email: string;
}
interface CodeFormData {
  code: string;
}

// Component
export default function SignIn() {
  // Hooks - stores
  const { requestOTP, verifyOTP, isLoading, error: authError } = useAuthStore();

  // Hooks - state
  const [step, setStep] = React.useState<'email' | 'code'>('email');
  const [submittedEmail, setSubmittedEmail] = React.useState('');

  // Hooks
  const {
    control: controlEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: formErrorsEmail }
  } = useForm<SignInFormData>({
    defaultValues: {
      email: ''
    }
  });

  const {
    control: controlCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: formErrorsCode },
    setValue
  } = useForm<CodeFormData>({
    defaultValues: {
      code: ''
    }
  });

  // Vars
  const inputNameEmail = 'email';
  const inputNameCode = 'code';
  const title = step === 'email' ? 'Welcome to Stroma' : 'Check your email';
  const subtitle = step === 'email' ? 'Enter your email to get started' : `We sent a verification code to ${submittedEmail}`;

  // Handlers
  const onSubmitEmail = async ({ email }: SignInFormData) => {
    try {
      // Store email for display in code form
      setSubmittedEmail(email);

      // Dispatch email with sign in code
      await requestOTP(email);

      // Success - set state to display code form
      setStep('code');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const onSubmitCode = async (data: CodeFormData) => {
    try {
      // Verif code
      await verifyOTP(submittedEmail, data.code);

      // Success - navigate to root which handles redirect logic
      router.replace('/');
    } catch (error) {
      console.error('OTP error:', error);
    }
  };

  // Utils
  const renderForm = () => {
    if (step === 'email') {
      return (
        <>
          <Controller
            control={controlEmail}
            name={inputNameEmail}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email address'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Field error={Boolean(formErrorsEmail[inputNameEmail])}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type='email'
                  placeholder='you@example.com'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={Boolean(formErrorsEmail[inputNameEmail])}
                  autoCapitalize='none'
                  autoCorrect={false}
                  autoComplete='email'
                  keyboardType='email-address'
                  editable={!isLoading}
                />
                <FieldError>{formErrorsEmail[inputNameEmail]?.message}</FieldError>
              </Field>
            )}
          />

          <Button onPress={handleSubmitEmail(onSubmitEmail)} loading={isLoading}>
            Get started
          </Button>
        </>
      );
    } else if (step === 'code') {
      return (
        <>
          <Controller
            control={controlCode}
            name={inputNameCode}
            rules={{
              required: 'Code is required',
              minLength: {
                value: 8,
                message: 'Please enter the full 8-digit code'
              },
              pattern: {
                value: /^\d{8}$/,
                message: 'Code must be 8 digits'
              }
            }}
            render={({ field: { onBlur, value } }) => {
              return (
                <Field error={Boolean(formErrorsCode[inputNameCode])}>
                  <FieldLabel>Verification code</FieldLabel>
                  <InputCode
                    autoFocus
                    disabled={false}
                    length={8}
                    value={value || ''}
                    onChangeText={(newValue) => {
                      // InputCode is numerous text inputs to facilitate paste functionality, but this breaks refs in react-hook-form
                      // Manually call setValue instead of passing
                      setValue('code', newValue, { shouldValidate: true }); // Use setValue instead
                    }}
                    error={Boolean(formErrorsCode[inputNameCode])}
                  />
                  <FieldError>{formErrorsCode[inputNameCode]?.message}</FieldError>
                </Field>
              );
            }}
          />

          <Button onPress={handleSubmitCode(onSubmitCode)} loading={isLoading}>
            Verify
          </Button>

          <Button variant='ghost' onPress={() => setStep('email')}>
            ← Change email
          </Button>

          <Button variant='ghost' onPress={() => null}>
            Didn't receive it? Resend code
          </Button>
        </>
      );
    }

    return null;
  };

  // Render
  return (
    <ScreenContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.content}>
          <Column gap='lg'>
            {/* Header */}
            <Column gap='sm'>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </Column>

            {/* Form */}
            <Column gap='lg'>
              {' '}
              {/* Store error - shows server errors */}
              {authError && !isLoading && (
                <View style={styles.authErrorContainer}>
                  <Text style={styles.authErrorText}>{authError}</Text>
                </View>
              )}
              {renderForm()}
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
  },
  authErrorContainer: {
    backgroundColor: colors.error + '10', // 10% opacity
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.sm
  },
  authErrorText: {
    fontSize: typography.sizes.sm,
    color: colors.error,
    textAlign: 'center',
    fontWeight: typography.weights.medium
  }
});
