// Components
import { ScreenContainer } from '@/components/ScreenContainer';
import { SelectPlantType } from '@/pages/SelectPlantType';

// Internal
import { usePlantStore } from '@/stores';

// External
import { router } from 'expo-router';
import { PlantType } from '@/types/plant';

// Component
export default function OnboardingSelectPlant() {
  // Hooks - stores
  const { addPlant } = usePlantStore();

  // Handlers
  const handleSelectPlant = (plantType: PlantType) => {
    addPlant({ type: plantType });
    router.push('/onboarding/plant-details');
  };

  // Render
  return (
    <ScreenContainer padding={false}>
      <SelectPlantType hideBackButton onSelectPlant={handleSelectPlant} title="Let's add your first plant" subtitle='Choose the type of plant you have' />
    </ScreenContainer>
  );
}
