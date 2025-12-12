// Components
import { ScreenContainer } from '@/components/ScreenContainer';
import { NamePlant, NamePlantSubmitData } from '@/pages/SelectPlantDetails';
import { Text } from '@/components/Text/index';

// Internal
import { useNotificationsStore, usePlantStore } from '@/stores';

// External
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

// Component
export default function AddPlantDetails() {
  // Hooks
  const { plantId } = useLocalSearchParams<{ plantId: string }>();

  // Hooks - stores
  const { getPlantById, updatePlant } = usePlantStore();
  const { arePermissionsGranted, scheduleNotificationsForPlant } = useNotificationsStore();

  // Hooks - state
  const [isLoading, setIsLoading] = React.useState(false);

  // Vars
  const plant = plantId ? getPlantById(plantId) : null;
  const areNotificationsEnabled = arePermissionsGranted();

  // Handlers
  const handleSubmit = async (data: NamePlantSubmitData) => {
    if (!plantId) return;

    setIsLoading(true);

    // Update plant data
    updatePlant(plantId, {
      ...data,
      areNotificationsEnabled // Ensure this flag is up to date based on current state of permissions
    });

    // User granted permission for notifications - scheduled notifications
    if (areNotificationsEnabled) {
      await scheduleNotificationsForPlant(plantId);
    }

    router.push({ pathname: '/(tabs)', params: { showWelcomeToast: 'true' } });

    setIsLoading(false);
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
      <NamePlant isLoading={isLoading} onSubmit={handleSubmit} submitButtonLabel='Save' />
    </ScreenContainer>
  );
}
