import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

let instance: SupabaseClient | null = null;

export const supabase = new Proxy({} as SupabaseClient, {
  get: (_, prop) => {
    if (!instance) {
      // Create client only when first accessed (React Native is ready by then)
      instance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false
        }
      });
    }
    return instance[prop as keyof SupabaseClient];
  }
});
