// Components
import { View, StyleSheet, ScrollView, Linking, Pressable } from 'react-native';
import { Column } from '@/components/Column';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Row } from '@/components/Row';
import { ScreenContainer } from '@/components/ScreenContainer';

// Internal
import { colors, spacing, typography, borderRadius } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';
import appConfig from '@/app.json';

// Exteneral
import { router } from 'expo-router';

// Components
export default function Account() {
  // Hooks - custom
  const cardBg = useThemeColor(
    {
      light: colors.neutral[0],
      dark: colors.neutral[800]
    },
    'background'
  );

  const cardBorder = useThemeColor(
    {
      light: colors.neutral[200],
      dark: colors.neutral[700]
    },
    'border'
  );

  const textColor = useThemeColor(
    {
      light: colors.neutral[900],
      dark: colors.neutral[100]
    },
    'text'
  );

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
              Account Details
            </Text>

            <Pressable
              style={[
                styles.card,
                {
                  backgroundColor: cardBg,
                  borderColor: cardBorder
                }
              ]}
              onPress={() => router.push('/account/details')}
              accessibilityRole='button'
              accessibilityLabel='View account settings'
            >
              <Row align='center' justify='space-between'>
                <Text variant='body' style={{ color: textColor }}>
                  Account Details
                </Text>
                <Icon name='chevron.right' size={20} color={subtextColor} />
              </Row>
            </Pressable>
          </Column>

          {/* App Store section */}
          {/* <Column gap='md'>
            <Text variant='subheading' weight='semibold'>
              App Store
            </Text>

            <Pressable
              onPress={() => {
                // TODO: Implement share functionality
                console.log('Share app');
              }}
              accessibilityRole='button'
              accessibilityLabel='Share the app'
            >
              <Text variant='body' style={[styles.link, { color: colors.primary[500] }]}>
                Share the App
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                // TODO: Implement rate app functionality
                console.log('Rate app');
              }}
              accessibilityRole='button'
              accessibilityLabel='Rate the app'
            >
              <Text variant='body' style={[styles.link, { color: colors.primary[500] }]}>
                Rate the App
              </Text>
            </Pressable>
          </Column> */}

          {/* Legal section */}
          <Column gap='md'>
            <Text variant='subheading' weight='semibold'>
              Legal
            </Text>

            <Pressable onPress={() => handleLegalLink('https://venturespringmedia.com/privacy')} accessibilityRole='link' accessibilityLabel='Open privacy policy'>
              <Text variant='body' style={[styles.link, { color: colors.primary[500] }]}>
                Privacy Policy
              </Text>
            </Pressable>

            <Pressable onPress={() => handleLegalLink('https://venturespringmedia.com/terms')} accessibilityRole='link' accessibilityLabel='Open terms of service'>
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
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1
  },
  link: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium
  },
  versionContainer: {
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
