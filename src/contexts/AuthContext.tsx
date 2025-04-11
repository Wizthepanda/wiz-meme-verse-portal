
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { fetchUserProfile, Profile } from "@/services/sparkleService";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile when user changes
  const fetchProfile = async (userId: string) => {
    try {
      const userProfile = await fetchUserProfile(userId);
      setProfile(userProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user) {
            // Use setTimeout to prevent potential circular calls
            setTimeout(() => {
              fetchProfile(currentSession.user.id);
            }, 0);
          } else {
            setProfile(null);
          }
        }
      );
      
      // Check for existing session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await fetchProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      isLoading,
      signOut,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
