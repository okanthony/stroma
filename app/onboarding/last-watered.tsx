// Components
import { ScreenContainer } from '@/components/ScreenContainer';
import { LogLastWatered } from '@/pages/LogLastWatered';
import { Platform } from 'react-native';
import { Text } from '@/components/Text/index';

// Internal
import { usePlantStore } from '@/stores';

// External
import { router } from 'expo-router';

// Component
export default function OnboardingLastWatered() {
  // Hooks - stores
  const { getAllPlants, updatePlant } = usePlantStore();

  // Vars
  const { id: plantId } = getAllPlants()[0];
  const isIos = Platform.OS === 'ios';

  // Handlers
  const handleSubmit = (lastWatered: string) => {
    if (!plantId) return;

    updatePlant(plantId, {
      lastWatered
    });

    // Only navigate to notifications page if iOS device
    const pathname = isIos ? '/onboarding/enable-notifications' : '/';
    router.push({ pathname, params: { plantId, showWelcomeToast: String(!isIos) } });
  };

  // Render
  if (!plantId) {
    return (
      <ScreenContainer>
        <Text>No plant selected. Please go back.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padding={false}>
      <LogLastWatered onSubmit={handleSubmit} title='When was it last watered?' subtitle='This helps us create the ideal watering schedule' submitButtonLabel='Finish' />
    </ScreenContainer>
  );
}
