
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fufkgbehjidcoytcrdlo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1ZmtnYmVoamlkY295dGNyZGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTU0NTksImV4cCI6MjA1OTg3MTQ1OX0.dds_sB2HNUK6gSaFZCk_ghl5OtOsMCseXIGyvTGWqnI";

// Create the Supabase client with optimized configuration
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY, 
  {
    auth: {
      persistSession: true,
      storage: localStorage,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',  // Use PKCE for more secure auth flow
      // Don't store sensitive data in cookies to avoid issues
      storageKey: 'sb-fufkgbehjidcoytcrdlo-auth-token',
    },
  }
);

// Add a listener for auth state changes with minimal logging
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    // Force browser navigation to dashboard on successful login
    if (window.location.pathname !== '/dashboard') {
      window.location.href = '/dashboard';
    }
  }
});

// Export config for reference
export const SUPABASE_CONFIG = {
  url: SUPABASE_URL,
  key: SUPABASE_PUBLISHABLE_KEY.substring(0, 10) + '...' + SUPABASE_PUBLISHABLE_KEY.substring(SUPABASE_PUBLISHABLE_KEY.length - 10)
};

// Simple session check helper function
export const checkCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  } catch (e) {
    return { session: null, error: e };
  }
};
