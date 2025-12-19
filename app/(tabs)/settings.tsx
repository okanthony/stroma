// Components
import { View, StyleSheet, ScrollView, Linking, Pressable, Share } from 'react-native';
import { Column } from '@/components/Column';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Row } from '@/components/Row';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Card } from '@/components/Card';

// Internal
import { colors, spacing, typography, borderRadius } from '@/constants/design-tokens';
import { useAuthStore } from '@/stores';
import { useThemeColor } from '@/hooks/use-theme-color';
import appConfig from '@/app.json';

// Exteneral
import { router } from 'expo-router';
import { isAvailableAsync, requestReview } from 'expo-store-review';

// Constants
const APP_STORE_URL = 'https://apps.apple.com/app/id6756553969';

// Components
export default function Settings() {
  // Hooks - stores
  const { getUserEmail } = useAuthStore();

  // Hooks - custom
  const subtextColor = useThemeColor(
    {
      light: colors.neutral[600],
      dark: colors.neutral[400]
    },
    'text'
  );

  // Handlers
  const handleLegalLink = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  const handleShareCtaOnClick = async () => {
    try {
      await Share.share({
        message: 'Hey check out Stroma - it makes plant care easy!',
        url: APP_STORE_URL
      });
    } catch (error) {
      console.error('Error sharing app:', error);
    }
  };

  const handleRateCtaOnClick = async () => {
    try {
      const isAvailable = await isAvailableAsync();

      if (isAvailable) {
        await requestReview();
      } else {
        // Fallback to App Store URL if in-app review is not available
        const appStoreReviewUrl = APP_STORE_URL + '?action=write-review';
        const canOpen = await Linking.canOpenURL(appStoreReviewUrl);

        if (canOpen) {
          await Linking.openURL(appStoreReviewUrl);
        }
      }
    } catch (error) {
      console.error('Error requesting review:', error);
    }
  };

  // Render
  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Column gap='xl'>
          <Text variant='heading' weight='bold'>
            Settings
          </Text>

          {/* Account Details section */}
          <Column gap='md'>
            <Text variant='subheading' weight='semibold'>
              Account
            </Text>

            <Pressable onPress={() => router.push('/settings/account')} accessibilityRole='button' accessibilityLabel='View account settings'>
              <Card style={styles.card}>
                <Row align='center' justify='space-between'>
                  <Column gap='xs'>
                    <Text style={styles.cardLabel}>Email</Text>
                    <Text style={styles.cardValue}>{getUserEmail()}</Text>
                  </Column>
                  <Icon name='chevron.right' size={20} color={colors.neutral[400]} />
                </Row>
              </Card>
            </Pressable>
          </Column>

          {/* App Store section */}
          <Column gap='md'>
            <Text variant='subheading' weight='semibold'>
              App Store
            </Text>

            <Pressable onPress={handleShareCtaOnClick} accessibilityRole='button' accessibilityLabel='Share the app'>
              <Text variant='body' style={[styles.link, { color: colors.primary[500] }]}>
                Share the App
              </Text>
            </Pressable>

            <Pressable onPress={handleRateCtaOnClick} accessibilityRole='button' accessibilityLabel='Rate the app'>
              <Text variant='body' style={[styles.link, { color: colors.primary[500] }]}>
                Rate the App
              </Text>
            </Pressable>
          </Column>

          {/* Legal section */}
          <Column gap='md'>
            <Text variant='subheading' weight='semibold'>
              Legal
            </Text>

            <Pressable onPress={() => handleLegalLink('https://venturespringmedia.com/stroma/privacy-policy')} accessibilityRole='link' accessibilityLabel='Open privacy policy'>
              <Text variant='body' style={[styles.link, { color: colors.primary[500] }]}>
                Privacy Policy
              </Text>
            </Pressable>

            <Pressable onPress={() => handleLegalLink('https://venturespringmedia.com/stroma/terms-of-service')} accessibilityRole='link' accessibilityLabel='Open terms of service'>
              <Text variant='body' style={[styles.link, { color: colors.primary[500] }]}>
                Terms of Service
              </Text>
            </Pressable>
          </Column>
        </Column>
      </ScrollView>

      <View style={styles.versionContainer}>
        <Text variant='caption' style={{ color: subtextColor }}>
          Version {appConfig.expo.version}
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50]
  },
  scrollView: {
    flex: 1
  },
  card: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1
  },
  cardLabel: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[900]
  },
  cardValue: {
    fontSize: typography.sizes.base,
    color: colors.neutral[600]
  },
  link: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium
  },
  versionContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
