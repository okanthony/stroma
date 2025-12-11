import { useAuthStore } from '@/stores';
import { Redirect, Stack } from 'expo-router';

export default function OnboardingLayout() {
  // Hooks - stories
  const { session } = useAuthStore();

  // Render
  if (!session) {
    return <Redirect href='/sign-in' />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right' // Smooth transitions between steps
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='select-plant' />
      <Stack.Screen name='name-plant' />
      <Stack.Screen name='last-watered' />
      <Stack.Screen name='enable-notifications' />
    </Stack>
  );
}
