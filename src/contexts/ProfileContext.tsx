
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { fetchUserProfile, Profile } from "@/services/sparkleService";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";

interface ProfileContextType {
  profile: Profile | null;
  isLoadingProfile: boolean;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

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
            toast({
              title: "Profile Error",
              description: "Could not create your profile. Please try again.",
              variant: "destructive",
            });
          } else {
            console.log("Created new profile successfully:", data);
            setProfile(data);
            toast({
              title: "Welcome, Wizard!",
              description: "Your meme journey begins now. Start collecting sparkles!",
            });
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

  // Effect to fetch profile when user changes
  useEffect(() => {
    if (user) {
      setIsLoadingProfile(true);
      fetchProfile(user.id).finally(() => {
        setIsLoadingProfile(false);
      });
    } else {
      setProfile(null);
      setIsLoadingProfile(false);
    }
  }, [user]);

  return (
    <ProfileContext.Provider value={{
      profile,
      isLoadingProfile,
      refreshProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
