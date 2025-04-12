
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
      console.log("User profile fetched successfully:", userProfile);
      setProfile(userProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Create a new profile if one doesn't exist
      if (user) {
        try {
          console.log("Attempting to create profile for new user:", userId);
          // Extract Twitter data from user metadata
          const twitterData = user.app_metadata?.provider === 'twitter' ? 
            user.identities?.find(identity => identity.provider === 'twitter')?.identity_data : null;
          
          console.log("Twitter data for profile creation:", twitterData);
          console.log("User metadata for profile creation:", user.user_metadata);
          
          const username = twitterData?.preferred_username || 
                          twitterData?.full_name || 
                          twitterData?.name ||
                          user.user_metadata?.preferred_username || 
                          user.user_metadata?.full_name || 
                          user.user_metadata?.name || 
                          'New Wizard';
          
          const avatarUrl = twitterData?.avatar_url || 
                           user.user_metadata?.avatar_url;
          
          console.log("Creating profile with username:", username, "and avatar:", avatarUrl);
          
          // Insert new profile
          const { data, error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: userId, 
              username, 
              sparkles: 0, 
              rank: 'meme_peasant' 
            }])
            .select()
            .single();
            
          if (insertError) {
            console.error("Error creating new profile:", insertError);
          } else {
            console.log("Created new profile successfully:", data);
            setProfile(data);
          }
        } catch (createError) {
          console.error("Failed to create profile:", createError);
        }
      }
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
        
        // IMPORTANT: Set up auth state change listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, newSession) => {
            console.log("AUTH STATE CHANGED - EVENT:", event);
            console.log("AUTH STATE CHANGED - SESSION:", newSession?.user?.id);
            console.log("AUTH STATE CHANGED - Full session data:", JSON.stringify(newSession, null, 2));
            
            if (mounted) {
              // Update state with new session information
              setSession(newSession);
              setUser(newSession?.user ?? null);
              
              if (newSession?.user) {
                console.log("User from auth change:", newSession.user.id);
                console.log("User details:", JSON.stringify(newSession.user, null, 2));
                
                // Use setTimeout to prevent circular calls
                setTimeout(() => {
                  if (mounted && newSession?.user) {
                    fetchProfile(newSession.user.id);
                  }
                }, 0);
              } else {
                setProfile(null);
              }
            }
          }
        );
        
        console.log("Auth state change listener registered");
        
        // THEN check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Current session check:", currentSession?.user?.id);
        
        if (currentSession && mounted) {
          console.log("Existing session found, updating state");
          setSession(currentSession);
          setUser(currentSession.user);
          
          if (currentSession.user) {
            fetchProfile(currentSession.user.id);
          }
        } else {
          console.log("No existing session found");
        }
        
        // Always set loading to false after initialization
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

  // Sign out function
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
