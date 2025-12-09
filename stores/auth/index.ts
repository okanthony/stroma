import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  email: string;
  isAuthenticated: boolean;
  setEmail: (email: string) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  login: (email: string) => void;
  logout: () => void;
  isAppLoaded: boolean;
  setIsAppLoaded: (isAppLoaded: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: '',
      isAuthenticated: false,
      setEmail: (email) => set({ email }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      login: (email) => set({ email, isAuthenticated: true }),
      logout: () => set({ email: '', isAuthenticated: false }),
      isAppLoaded: false,
      setIsAppLoaded: (isAppLoaded) => set({ isAppLoaded })
    }),
    {
      name: 'stroma-store-auth',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
