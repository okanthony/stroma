// Components
import { ScreenContainer } from '@/components/ScreenContainer';
import { NamePlant } from '@/pages/NamePlant';
import { Text } from '@/components/Text/index';

// Internal
import { usePlantStore } from '@/stores';

// External
import { router } from 'expo-router';

// Component
export default function OnboardingNamePlant() {
  // Hooks - stores
  const { getAllPlants, updatePlant } = usePlantStore();

  // Vars
  const plantSelected = getAllPlants()[0];

  // Handlers
  const handleSubmit = (data: { name: string; room: string }) => {
    if (!plantSelected) return;

    updatePlant(plantSelected.id, {
      name: data.name,
      room: data.room
    });

    router.push('/onboarding/last-watered');
  };

  // Render

  if (!plantSelected) {
    return (
      <ScreenContainer>
        <Text>No plant selected. Please go back.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padding={false}>
      <NamePlant plantType={plantSelected.type} onSubmit={handleSubmit} title='Tell us more about your plant' submitButtonLabel='Continue' />
    </ScreenContainer>
  );
}
