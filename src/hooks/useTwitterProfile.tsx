
import { useAuth } from "@/contexts/AuthContext";

interface TwitterProfile {
  username: string | null;
  avatarUrl: string | null;
}

export function useTwitterProfile(): TwitterProfile {
  const { user, profile } = useAuth();
  
  const getTwitterAvatar = (): string | null => {
    console.log("Getting Twitter avatar from user:", user);
    
    // First check profile's avatar_url if it exists in user_metadata
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }
    
    // Then try from Twitter identity
    if (user?.identities && user.identities.length > 0) {
      const twitterIdentity = user.identities.find(
        identity => identity.provider === "twitter"
      );
      
      if (twitterIdentity?.identity_data?.avatar_url) {
        return twitterIdentity.identity_data.avatar_url;
      }
    }
    
    return null;
  };

  const getTwitterUsername = (): string | null => {
    console.log("Getting Twitter username from user:", user);
    
    // First check profile's username if it exists
    if (profile?.username) {
      return profile.username;
    }
    
    // Then try from Twitter identity
    if (user?.identities && user.identities.length > 0) {
      const twitterIdentity = user.identities.find(
        identity => identity.provider === "twitter"
      );

      if (twitterIdentity?.identity_data) {
        const username = twitterIdentity.identity_data.preferred_username || 
               twitterIdentity.identity_data.full_name ||
               twitterIdentity.identity_data.name;
        
        return username || null;
      }
    }
    
    // Try from user metadata
    if (user?.user_metadata) {
      const username = user.user_metadata.preferred_username || 
             user.user_metadata.full_name ||
             user.user_metadata.name ||
             user.user_metadata.user_name;
      
      return username || null;
    }
    
    return null;
  };
  
  return {
    username: getTwitterUsername(),
    avatarUrl: getTwitterAvatar()
  };
}
