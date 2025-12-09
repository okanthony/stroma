// app/plant/name.tsx
import { ScreenContainer } from '@/components/ScreenContainer';
import { NamePlant } from '@/pages/NamePlant';
import { usePlantStore } from '@/stores';
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text/index';

export default function AddPlantChooseName() {
  const { plantId } = useLocalSearchParams<{ plantId: string }>();
  const { getPlantById, updatePlant } = usePlantStore();

  const plant = getPlantById(plantId);

  const handleSubmit = (data: { name: string; room: string }) => {
    if (!plantId) return;

    updatePlant(plantId, {
      name: data.name,
      room: data.room
    });

    router.push({ pathname: '/plant/last-watered', params: { plantId } });
  };

  if (!plant.id) {
    return (
      <ScreenContainer>
        <Text>Plant not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padding={false}>
      <NamePlant plantType={plant.type} onSubmit={handleSubmit} title='Tell us more about your plant' submitButtonLabel='Save' />
    </ScreenContainer>
  );
}
