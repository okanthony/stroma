// Components
import { View, StyleSheet, KeyboardAvoidingView, Platform, Linking, Image } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Field } from '@/components/Field';
import { FieldError } from '@/components/FieldError';
import { FieldLabel } from '@/components/FieldLabel';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Column } from '@/components/Column';
import { Text } from '@/components/Text';

// Internal
import { borderRadius, colors, spacing, typography } from '@/constants/design-tokens';
import { useAuthStore } from '@/stores';

// External
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { InputCode } from '@/components/InputCode';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Toast from 'react-native-toast-message';

// Types
interface SignInFormData {
  email: string;
}
interface CodeFormData {
  code: string;
}

// Constants
const emailSchema = z.object({
  email: z.email('Please enter a valid email address')
});

const codeSchema = z.object({
  code: z
    .string()
    .min(1, 'Code is required')
    .length(8, 'Please enter the full 8-digit code')
    .regex(/^\d{8}$/, 'Code must be 8 digits')
});

// Component
export default function SignIn() {
  // Hooks - stores
  const { requestOTP, verifyOTP, isLoading, error: authError } = useAuthStore();

  // Hooks - state
  const [step, setStep] = React.useState<'email' | 'code'>('email');
  const [submittedEmail, setSubmittedEmail] = React.useState('');
  const [resendCooldown, setResendCooldown] = React.useState(0);

  // Hooks - effects
  // Manage cooldown after resending OTP as Supabase requires 60s before next code can be requested
  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Start cooldown when code form is displayed
  React.useEffect(() => {
    if (step === 'code') {
      setResendCooldown(60);
    }
  }, [step]);

  // Hooks - forms
  const {
    control: controlEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: formErrorsEmail }
  } = useForm<SignInFormData>({
    resolver: zodResolver(emailSchema),
    mode: 'onSubmit', // Only run first client side validation on submit
    reValidateMode: 'onChange', // Fix errors as user types for immediate feedback
    defaultValues: {
      email: ''
    }
  });

  const {
    control: controlCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: formErrorsCode, isSubmitted },
    setValue
  } = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    mode: 'onSubmit', // Only run first client side validation on submit
    defaultValues: {
      code: ''
    }
  });

  // Vars
  const inputNameEmail = 'email';
  const inputNameCode = 'code';
  const title = step === 'email' ? "Let's get growing" : 'Check your email';
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

  const handleResendCodeCtaOnClick = async () => {
    try {
      await requestOTP(submittedEmail);

      // Start 60 second countdown
      setResendCooldown(60);

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Code sent!',
        text2: 'Check your email for a new code',
        position: 'bottom',
        visibilityTime: 3500
      });
    } catch (error) {
      console.error('Resend code error:', error);
      // Errors already displayed in callout above form
    }
  };

  const handleChangeEmailCtaOnClick = () => {
    setResendCooldown(0); // Reset countdown
    setStep('email');
  };

  // Vars
  const ctaResendCodeIsDisabled = isLoading || resendCooldown > 0;
  const ctaResendCodeLabel = resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Didn't receive code? Resend it";

  // Utils
  const renderForm = () => {
    if (step === 'email') {
      return (
        <>
          <Controller
            control={controlEmail}
            name={inputNameEmail}
            render={({ field: { onChange, onBlur, value } }) => (
              <Field error={Boolean(formErrorsEmail[inputNameEmail])}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type='email'
                  placeholder='you@plantexpert.com'
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

          {/* Terms acceptance text */}
          <View style={styles.termsContainer}>
            <Text variant='caption' style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text variant='caption' style={styles.termsLink} onPress={() => Linking.openURL('https://venturespringmedia.com/stroma/privacy-policy')} accessibilityRole='link'>
                Privacy Policy
              </Text>{' '}
              and{' '}
              <Text variant='caption' style={styles.termsLink} onPress={() => Linking.openURL('https://venturespringmedia.com/stroma/terms-of-service')} accessibilityRole='link'>
                Terms of Service
              </Text>
            </Text>
          </View>
        </>
      );
    } else if (step === 'code') {
      return (
        <>
          <Controller
            control={controlCode}
            name={inputNameCode}
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
                      // Manually call setValue instead of passing onChange
                      // Only validate input once form submitted, so user doesn't get premature errors befor submission
                      setValue('code', newValue, { shouldValidate: isSubmitted });
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

          <Button disabled={ctaResendCodeIsDisabled} variant='ghost' onPress={handleResendCodeCtaOnClick}>
            {ctaResendCodeLabel}
          </Button>

          <Button disabled={isLoading} variant='ghost' onPress={handleChangeEmailCtaOnClick}>
            Use a different email
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
              {/* Logo */}
              <View style={styles.logoContainer}>
                <Image source={require('@/assets/images/logo-transparent.png')} style={styles.logo} resizeMode='contain' />
              </View>

              <Text variant='heading' style={styles.title}>
                {title}
              </Text>
              <Text variant='body' style={styles.subtitle}>
                {subtitle}
              </Text>
            </Column>

            {/* Form */}
            <Column style={styles.formContainer}>
              {/* Server errors */}
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
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 120
  },
  title: {
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  },
  formContainer: {
    gap: 12
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
  },
  termsContainer: {
    marginTop: spacing.md,
    alignItems: 'center'
  },
  termsText: {
    textAlign: 'center',
    color: colors.neutral[600],
    lineHeight: 20
  },
  termsLink: {
    color: colors.primary[500],
    textDecorationLine: 'underline'
  }
});
