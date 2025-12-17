// Components
import { StyleSheet, ScrollView, Alert, Pressable, Linking } from 'react-native';
import { Icon } from '@/components/Icon';
import { Column } from '@/components/Column';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { ScreenContainer } from '@/components/ScreenContainer';

// Internal
import { colors, shadows } from '@/constants/design-tokens';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useNotificationsStore, usePlantStore, useAuthStore } from '@/stores';

// External
import React from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Component
export default function SettingsAccount() {
  // Hooks - stores
  const { getUserEmail, signOut, isLoading } = useAuthStore();
  const { clearPlantsStore } = usePlantStore();
  const { clearNotificationsStore } = useNotificationsStore();

  // Hooks - state
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [generatedDeletionEmail, setGeneratedDeletionEmail] = React.useState(false);

  // Hooks - custom
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
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    // User did not yet generate deletion email - open email client
    if (!generatedDeletionEmail) {
      try {
        const subject = 'Account Deletion Request';
        const body = `Please delete my account: ${getUserEmail()}`;

        // Open email client with deletion request
        await Linking.openURL(`mailto:support@stroma.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

        // Track that email client opened successfully
        setGeneratedDeletionEmail(true);
      } catch (error) {
        console.error('Error generating email:', error);
        Alert.alert('Error', 'Failed to process deletion request, please try again.');
        setIsDeleting(false);
        return;
      }
    }

    // Attempt to sign out
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
      setIsDeleting(false);
      return;
    }

    // Deletion email triggered and user signed out - clear store data and redirect to Sign In page
    try {
      await AsyncStorage.clear();
      await clearNotificationsStore();
    } catch (error) {
      // Swallow error as we don't want to throw on clearing async store data
      console.error('Error clearing async store data:', error);
    }

    clearPlantsStore();
    setIsDeleting(false);
    router.replace('/sign-in');
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Column gap='xl'>
          {/* Floating Back Button */}
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Icon name='chevron.left' size={24} color={colors.neutral[900]} />
          </Pressable>

          {/* Page Heading */}
          <Text variant='heading' weight='bold'>
            Account
          </Text>

          {/* Email Display */}
          <Column gap='xs'>
            <Text variant='label' style={{ color: subtextColor }}>
              Email
            </Text>
            <Text variant='body' style={{ color: textColor }}>
              {getUserEmail()}
            </Text>
          </Column>

          {/* Sign Out Button */}
          <Button loading={isLoading} variant='secondary' onPress={handleSignOut}>
            Sign Out
          </Button>

          {/* Delete Account Button */}
          <Button variant='destructive' onPress={() => setShowDeleteModal(true)}>
            Delete Account
          </Button>
        </Column>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title='Delete Account?'
        description='This action is permanent and cannot be undone. All your data including scheduled reminders will be deleted.'
        confirmText='Confirm'
        cancelText='Cancel'
        onConfirm={handleDeleteAccount}
        variant='destructive'
        isConfirmLoading={isDeleting}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[0],
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md
  }
});
