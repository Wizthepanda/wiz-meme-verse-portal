
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
    console.log("Fetching profile for user:", userId);
    try {
      const userProfile = await fetchUserProfile(userId);
      console.log("User profile fetched:", userProfile);
      setProfile(userProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (user?.id) {
      console.log("Refreshing profile for user:", user.id);
      await fetchProfile(user.id);
    }
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        console.log("Initializing auth state...");
        
        // Listen for auth state changes first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, newSession) => {
            console.log("Auth state changed:", event, newSession?.user?.id);
            console.log("Session from event:", newSession);
            
            if (mounted) {
              setSession(newSession);
              setUser(newSession?.user ?? null);
              
              if (newSession?.user) {
                console.log("User from auth change:", newSession.user);
                console.log("User metadata:", newSession.user.user_metadata);
                console.log("User identities:", newSession.user.identities);
                
                // Use setTimeout to prevent potential circular calls
                setTimeout(() => {
                  if (mounted) {
                    fetchProfile(newSession.user.id);
                  }
                }, 0);
              } else {
                setProfile(null);
              }
            }
          }
        );
        
        // Then check for existing session (this should detect URL tokens too due to detectSessionInUrl)
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Current session check:", currentSession?.user?.id);
        console.log("Full session object:", currentSession);
        
        if (currentSession && mounted) {
          setSession(currentSession);
          setUser(currentSession.user);
          
          if (currentSession.user) {
            console.log("Full user object from session:", currentSession.user);
            console.log("User metadata from session:", currentSession.user.user_metadata);
            console.log("User identities from session:", currentSession.user.identities);
            fetchProfile(currentSession.user.id);
          }
        }
        
        if (mounted) {
          setIsLoading(false);
        }
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    
    initializeAuth();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  // Debug current state
  useEffect(() => {
    console.log("AuthContext current state:", {
      user: user ? { id: user.id, email: user.email } : null,
      hasSession: !!session,
      profile: profile ? { id: profile.id, username: profile.username } : null,
      isLoading
    });
  }, [user, session, profile, isLoading]);

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
