// Internal
import { supabase } from '@/clients/supabase';

// External
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';

// Types
interface AuthState {
  // Track app hydrated in root layout before rendering UI
  isAppLoaded: boolean;
  setIsAppLoaded: (isAppLoaded: boolean) => void;

  // New
  isLoading: boolean;
  error: string | null;

  // Supabase - data
  session: Session | null;
  user: User | null;

  // Supabase - actions
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  requestOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;

  // Helpers
  getUserEmail: () => string;
}

// Constants
const NETWORK_ERROR = "We ran into an issue and can't process your request, please try again later";

// Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAppLoaded: false,
      session: null,
      user: null,
      isLoading: false,
      error: null,

      // Actions
      setIsAppLoaded: (isAppLoaded) => set({ isAppLoaded }),

      // Actions - Supabase data
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),

      // Actions - async
      // signInWithOtp handles both sign in and sign up
      requestOTP: async (email) => {
        set({ isLoading: true, error: null });

        try {
          const { error } = await supabase.auth.signInWithOtp({ email });

          // Request returned 200 but with error
          if (error) {
            console.error('Error requestOTP', `Supabase error: ${error.message}`);
            set({ error: error.message });
            throw error;
          }
        } catch (err) {
          // All other errors
          console.error('Caught Error requestOTP', err instanceof Error ? err.message : String(err));
          set({ error: NETWORK_ERROR });
          throw err;
        } finally {
          // Always set loading false
          set({ isLoading: false });
        }
      },

      verifyOTP: async (email, token) => {
        set({ isLoading: true, error: null });

        try {
          const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email'
          });

          // Request returned 200 but with error
          if (error) {
            console.error('Error verifyOTP', `Supabase error: ${error.message}`);
            set({ error: error.message });
            throw error;
          }

          if (data.session) {
            set({
              session: data.session,
              user: data.session.user
            });
          }
        } catch (err) {
          // All other errors
          console.error('Caught Error verifyOTP', err instanceof Error ? err.message : String(err));
          set({ error: NETWORK_ERROR });
          throw err;
        } finally {
          // Always set loading false
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        set({ isLoading: true, error: null });

        try {
          const { error } = await supabase.auth.signOut();

          // Request returned 200 but with error
          if (error) {
            console.error('Error signOut', `Supabase error: ${error.message}`);
            set({ error: error.message });
            throw error;
          }
        } catch (err) {
          // All other errors
          console.error('Caught Error signOut', err instanceof Error ? err.message : String(err));
          set({ error: NETWORK_ERROR });
        } finally {
          // Always set loading false
          set({ isLoading: false });
        }
      },

      // Helpers
      getUserEmail: () => get().user?.email || 'No email available'
    }),
    {
      name: 'stroma-store-auth',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
