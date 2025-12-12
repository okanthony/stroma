// Components
import { ScreenContainer } from '@/components/ScreenContainer';
import { NamePlant, NamePlantSubmitData } from '@/pages/NamePlant';
import { Text } from '@/components/Text/index';

// Internal
import { usePlantStore } from '@/stores';

// External
import { router } from 'expo-router';
import { Platform } from 'react-native';

// Component
export default function OnboardingNamePlant() {
  // Hooks - stores
  const { getAllPlants, updatePlant } = usePlantStore();

  // Vars
  const { id: plantId } = getAllPlants()[0];
  const isIos = Platform.OS === 'ios';

  // Handlers
  const handleSubmit = async (data: NamePlantSubmitData) => {
    if (!plantId) return;

    // Update plant data
    updatePlant(plantId, data);

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
      <NamePlant onSubmit={handleSubmit} />
    </ScreenContainer>
  );
}
