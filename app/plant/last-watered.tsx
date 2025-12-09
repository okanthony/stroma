// Components
import { ScreenContainer } from '@/components/ScreenContainer';
import { LogLastWatered } from '@/pages/LogLastWatered';
import { Text } from '@/components/Text/index';

// Internal
import { useNotificationsStore, usePlantStore } from '@/stores';

// External
import { router, useLocalSearchParams } from 'expo-router';
import { Platform } from 'react-native';

// Component
export default function AddPlantLastWatered() {
  // Hooks
  const { plantId } = useLocalSearchParams<{ plantId: string }>();

  // Hooks - stores
  const { getPlantById, updatePlant } = usePlantStore();
  const { arePermissionsGranted, scheduleNotificationsForPlant } = useNotificationsStore();

  // Vars
  const plant = plantId ? getPlantById(plantId) : null;
  const areNotificationsEnabled = arePermissionsGranted();

  // Handlers
  const handleSubmit = async (lastWatered: string) => {
    if (!plantId) return;

    // Update plant data
    updatePlant(plantId, {
      lastWatered,
      areNotificationsEnabled
    });

    // User granted permission for notifications - scheduled notifications
    if (areNotificationsEnabled) {
      await scheduleNotificationsForPlant(plantId);
    }

    router.push({ pathname: '/(tabs)', params: { showWelcomeToast: 'true' } });
  };

  // Render
  if (!plant) {
    return (
      <ScreenContainer>
        <Text>Plant not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padding={false}>
      <LogLastWatered onSubmit={handleSubmit} submitButtonLabel='Save' />
    </ScreenContainer>
  );
}
