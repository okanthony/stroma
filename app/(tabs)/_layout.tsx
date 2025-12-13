import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { Icon } from '@/components/Icon';
import { ThemeColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/stores';

export default function TabLayout() {
  // Hooks - custom
  const colorScheme = useColorScheme();

  // Hooks - stories
  const { session } = useAuthStore();

  // Render
  if (!session) {
    return <Redirect href='/sign-in' />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ThemeColors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon size={28} name='leaf.fill' color={color} />
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon size={28} name='bell.fill' color={color} />
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon size={28} name='person.fill' color={color} />
        }}
      />
      <Tabs.Screen
        name='settings/account'
        options={{
          href: null // This hides it from tabs
        }}
      />
    </Tabs>
  );
}
