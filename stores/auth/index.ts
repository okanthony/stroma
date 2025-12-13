import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/clients/supabase';

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

      // Supabase
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),

      // signInWithOtp handles both sign in and sign up
      requestOTP: async (email) => {
        set({ isLoading: true, error: null });

        const { error } = await supabase.auth.signInWithOtp({ email });

        if (error) {
          set({ error: error.message });
          throw error;
        }
        set({ isLoading: false });
      },

      verifyOTP: async (email, token) => {
        set({ isLoading: true, error: null });

        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'email'
        });

        if (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        } else if (data.session) {
          set({
            session: data.session,
            user: data.session.user,
            isLoading: false
          });
        }
      },

      signOut: async () => {
        set({ isLoading: true, error: null });

        const { error } = await supabase.auth.signOut();

        if (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        } else {
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
