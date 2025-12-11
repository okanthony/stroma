import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';

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
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
        // Prevent supabase client failure if RN's environment is not fully initialized
        const { supabase } = await import('@/clients/supabase');

        set({ isLoading: true, error: null });

        const { error } = await supabase.auth.signInWithOtp({ email });

        if (error) {
          set({ error: error.message });
        }
        set({ isLoading: false });
      },

      verifyOTP: async (email, token) => {
        // Prevent supabase client failure if RN's environment is not fully initialized
        const { supabase } = await import('@/clients/supabase');

        set({ isLoading: true, error: null });

        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'email'
        });

        if (error) {
          set({ error: error.message, isLoading: false });
        } else if (data.session) {
          set({
            session: data.session,
            user: data.session.user,
            isLoading: false
          });
        }
      },

      signOut: async () => {
        // Prevent supabase client failure if RN's environment is not fully initialized
        const { supabase } = await import('@/clients/supabase');

        await supabase.auth.signOut();
        set({ session: null, user: null });
      }
    }),
    {
      name: 'stroma-store-auth',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
