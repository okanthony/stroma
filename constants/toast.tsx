// src/config/toastConfig.tsx
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { colors, spacing, typography } from '@/constants/design-tokens';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.success[500],
        borderLeftWidth: 5,
        backgroundColor: colors.neutral[0],
        height: 70
      }}
      contentContainerStyle={{
        paddingHorizontal: spacing.md
      }}
      text1Style={{
        fontSize: typography.sizes.base,
        fontWeight: '600',
        color: colors.neutral[900]
      }}
      text2Style={{
        fontSize: typography.sizes.sm,
        color: colors.neutral[600]
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: colors.error[500],
        borderLeftWidth: 5,
        backgroundColor: colors.neutral[0],
        height: 70
      }}
      contentContainerStyle={{
        paddingHorizontal: spacing.md
      }}
      text1Style={{
        fontSize: typography.sizes.base,
        fontWeight: '600',
        color: colors.neutral[900]
      }}
      text2Style={{
        fontSize: typography.sizes.sm,
        color: colors.neutral[600]
      }}
    />
  ),

  info: (props: any) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: colors.primary[500],
        borderLeftWidth: 5,
        backgroundColor: colors.neutral[0],
        height: 70
      }}
      contentContainerStyle={{
        paddingHorizontal: spacing.md
      }}
      text1Style={{
        fontSize: typography.sizes.base,
        fontWeight: '600',
        color: colors.neutral[900]
      }}
      text2Style={{
        fontSize: typography.sizes.sm,
        color: colors.neutral[600]
      }}
    />
  )
};
