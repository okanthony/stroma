import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false, title: 'Settings' }} />
      <Stack.Screen name='account' options={{ headerShown: false, title: 'Account' }} />
    </Stack>
  );
}
