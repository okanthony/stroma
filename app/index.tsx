// Components
import { Redirect } from 'expo-router';

// Internal
import { useAuthStore, usePlantStore } from '@/stores';

// External
import React from 'react';

// Component
export default function Index() {
  // Hooks - stores
  const { session } = useAuthStore();
  const { getAllPlants } = usePlantStore();

  // Render
  // Not authenticated -> sign in
  if (!session) {
    return <Redirect href='/sign-in' />;
  }

  // Authenticated but hasn't onboarded -> onboarding
  if (getAllPlants().length === 0) {
    return <Redirect href='/onboarding' />;
  }

  // All good -> main app
  return <Redirect href='/(tabs)' />;
}
