// Components
import { StyleSheet, Dimensions, View, AppState, AppStateStatus } from 'react-native';
import { Stack, router, usePathname } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Image } from 'expo-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Internal
import { useColorScheme } from '@/hooks/use-color-scheme';
import { toastConfig } from '@/constants/toast';
import { useAuthStore, useNotificationsStore } from '@/stores';
import { supabase } from '@/clients/supabase';

// External
import React from 'react';
import 'react-native-reanimated';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { setNotificationHandler } from 'expo-notifications';

// Constants
const { width, height } = Dimensions.get('window');

// Component
export default function RootLayout() {
  // Any initialization code you may have previously put in App.jsx should go here.

  // Hooks
  const pathname = usePathname(); // Get current route

  // Hooks - stores
  const { getSystemPermissionStatus } = useNotificationsStore();
  const permissionStatus = useNotificationsStore((state) => state.permissionStatus);

  // Hooks - state
  const [isAppLoaded, setIsAppLoaded] = React.useState(false);

  // Hooks - refs
  const previousStatusRef = React.useRef(permissionStatus);

  // Hooks - custom
  const colorScheme = useColorScheme();

  // Hooks - effects
  // Display splash screen after initial app load while store hydrates
  React.useEffect(() => {
    const minDisplayTime = 1500; // 1.5 seconds
    let hydrated = false;

    // Wait for hydration
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      hydrated = true;
    });

    // Also check if already hydrated
    if (useAuthStore.persist.hasHydrated()) {
      hydrated = true;
    }

    // Always wait minimum time
    const timer = setTimeout(() => {
      if (hydrated) {
        setIsAppLoaded(true);
      }
    }, minDisplayTime);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  // Manage Supabase user session
  React.useEffect(() => {
    // Check for existing session on app start
    const initAuth = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      // Always set explicitly, even if null, to clear any potential stale data
      useAuthStore.getState().setSession(session);
      useAuthStore.getState().setUser(session?.user ?? null);
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Always set explicitly, even if null, to clear any potential stale data
      useAuthStore.getState().setSession(session);
      useAuthStore.getState().setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Configure expo notifications
  React.useEffect(() => {
    setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowList: true
      })
    });
  }, []);

  // Check permissions when app comes to foreground, and if user updates permissions prompt them to navigate to notifications page
  React.useEffect(() => {
    // Check on initial mount
    getSystemPermissionStatus();

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        const previousStatus = previousStatusRef.current;

        // Check permissions
        await getSystemPermissionStatus();

        // Get updated status
        const currentStatus = useNotificationsStore.getState().permissionStatus;

        // User toggled permissions to "granted" and not on notifications page - prompt them to enable reminders
        if (previousStatus === 'denied' && currentStatus === 'granted' && pathname !== '/(tabs)/notifications') {
          Toast.show({
            type: 'success',
            text1: 'Notifications now enabled',
            text2: 'Tap to set up reminders for your plants',
            position: 'top',
            visibilityTime: 5000,
            onPress: () => {
              router.push('/(tabs)/notifications');
            }
          });
        }

        // Update ref for next check
        previousStatusRef.current = currentStatus;
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.remove();
    };
  }, [pathname]);

  // Render
  if (!isAppLoaded) {
    return (
      <View style={styles.titleContainer}>
        <Image contentFit='contain' source={require('@/assets/images/splash-1.png')} style={styles.splashImage} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='sign-in' options={{ headerShown: false }} />
            <Stack.Screen name='onboarding' options={{ headerShown: false }} />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

            {/* Add plant flow */}
            <Stack.Screen name='plant/add' options={{ headerShown: false }} />
            <Stack.Screen name='plant/name' options={{ headerShown: false }} />

            {/* Plant details pages */}
            <Stack.Screen name='plant/[id]' options={{ headerShown: false }} />
            <Stack.Screen name='plant/[id]/edit' options={{ headerShown: false }} />
            <Stack.Screen name='plant/[id]/edit/name' options={{ headerShown: false }} />
            <Stack.Screen name='plant/[id]/edit/location' options={{ headerShown: false }} />

            {/* Test pages */}
            <Stack.Screen name='test/switch' options={{ headerShown: false }} />
            <Stack.Screen name='test/field' options={{ headerShown: false }} />
            <Stack.Screen name='test/input' options={{ headerShown: false }} />
            <Stack.Screen name='test/button' options={{ headerShown: false }} />
            <Stack.Screen name='test/select' options={{ headerShown: false }} />
          </Stack>
          <StatusBar style='auto' />

          <Toast config={toastConfig} />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splashImage: {
    width: width * 0.7, // 70% of screen width
    height: height * 0.5 // 50% of screen height
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAE9',
    gap: 8
  }
});
