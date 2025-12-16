// Components
import { StyleSheet, Dimensions, View, Text, AppState, AppStateStatus, Pressable } from 'react-native';
import { Stack, router, usePathname } from 'expo-router';
import Toast from 'react-native-toast-message';
import { ErrorBoundary } from 'react-error-boundary';
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

// Sub-component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  const handleRestart = async () => {
    // Option 1: Just reset the error boundary
    resetErrorBoundary();

    // Option 2: Force app reload (more thorough)
    // await Updates.reloadAsync();
  };

  // TODO: log this error to analytics service
  // logErrorToBackend(error);

  return (
    <View style={styles.errorBoundaryContainer}>
      <Text style={styles.errorBoundaryEmoji}>🌱</Text>
      <Text style={styles.errorBoundaryTitle}>Oops! Something went wrong</Text>
      <Text style={styles.errorBoundaryMessage}>We've been notified and are working on a fix.</Text>

      <Pressable style={styles.errorBoundaryButton} onPress={handleRestart}>
        <Text style={styles.errorBoundaryButtonText}>Restart App</Text>
      </Pressable>

      {__DEV__ && (
        <View style={styles.errorBoundaryDevError}>
          <Text style={styles.errorBoundaryDevErrorText}>{error.message}</Text>
          <Text style={styles.errorBoundaryDevErrorStack}>{error.stack}</Text>
        </View>
      )}
    </View>
  );
}

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
        <Image contentFit='contain' source={require('@/assets/images/splash.png')} style={styles.splashImage} />
      </View>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        if (!__DEV__) {
          // TODO: log error in analytics service
          // logErrorToService(error, errorInfo);
          console.error('Error caught by boundary:', error);
        }
      }}
    >
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
              <Stack.Screen name='plant/[id]/edit/name' options={{ headerShown: false, presentation: 'modal' }} />
              <Stack.Screen name='plant/[id]/edit/location' options={{ headerShown: false, presentation: 'modal' }} />

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
    </ErrorBoundary>
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
  },
  errorBoundaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFAE9' // Your cream color
  },
  errorBoundaryEmoji: {
    fontSize: 64,
    marginBottom: 16
  },
  errorBoundaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center'
  },
  errorBoundaryMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24
  },
  errorBoundaryButton: {
    backgroundColor: '#4D9552',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12
  },
  errorBoundaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  errorBoundaryDevError: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    maxWidth: '100%'
  },
  errorBoundaryDevErrorText: {
    color: '#991B1B',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8
  },
  errorBoundaryDevErrorStack: {
    color: '#991B1B',
    fontSize: 12,
    fontFamily: 'monospace'
  }
});
