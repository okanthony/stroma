import { usePlantStore } from '@/stores/plants';
import { Redirect } from 'expo-router';

export default function OnboardingRouter() {
  const { getAllPlants } = usePlantStore();

  // No plants yet -> go to add plant step
  if (getAllPlants.length === 0) {
    return <Redirect href='/onboarding/select-plant' />;
  }
}
