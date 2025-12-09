// app/plant/add.tsx
import { ScreenContainer } from '@/components/ScreenContainer';
import { SelectPlantType } from '@/pages/SelectPlantType';
import { usePlantStore } from '@/stores';
import { router } from 'expo-router';
import { PlantType } from '@/types/plant';

export default function AddPlantChooseType() {
  const { addPlant } = usePlantStore();

  const handleSelectPlant = (plantType: PlantType) => {
    const plantId = addPlant({ type: plantType });
    router.push({ pathname: '/plant/name', params: { plantId } });
  };

  return (
    <ScreenContainer padding={false}>
      <SelectPlantType onSelectPlant={handleSelectPlant} title="Let's get started" subtitle='What type of plant are you adding?' />
    </ScreenContainer>
  );
}
