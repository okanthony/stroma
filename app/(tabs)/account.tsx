import { ScreenContainer } from '@/components/ScreenContainer';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text/index';
import { useAuthStore, usePlantStore } from '@/stores';

export default function Account() {
  // Hooks - stores
  const { logout, setIsAppLoaded } = useAuthStore();
  const { deleteAllPlants } = usePlantStore();

  return (
    <ScreenContainer padding={false}>
      {/* Test escape hatch - Log out button */}
      <View style={styles.logoutContainer}>
        <Text
          onPress={() => {
            deleteAllPlants();
            logout();
            setIsAppLoaded(false);
            // router.replace('/');
          }}
          style={styles.logoutText}
        >
          Log out
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5'
  },
  logoutText: {
    fontSize: 16,
    color: '#0a7ea4'
  }
});
