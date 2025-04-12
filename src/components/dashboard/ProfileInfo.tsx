
import React from "react";
import { Link } from "react-router-dom";
import { getRankDisplayName } from "@/services/sparkleService";
import { Profile } from "@/services/sparkleService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTwitterProfile } from "@/hooks/useTwitterProfile";

interface ProfileInfoProps {
  username: string | null;
  profile: Profile | null;
  isAuthenticated: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  username, 
  profile,
  isAuthenticated
}) => {
  const { avatarUrl } = useTwitterProfile();
  
  // Use Twitter username if available, otherwise use profile username
  const displayName = username || (profile?.username || "Wizard");

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated && (
        <Link to="/dashboard/profile" className="hover:opacity-80 transition-opacity">
          <Avatar className="h-8 w-8 border border-wiz-lavender/30">
            <AvatarImage src={avatarUrl || ''} alt={displayName} />
            <AvatarFallback className="bg-wiz-purple/10 text-wiz-purple">
              {displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
      )}
      
      <div>
        <p className="font-medium text-wiz-dark">
          {isAuthenticated ? (
            <span className="text-wiz-purple">{displayName}</span>
          ) : (
            <Link to="/auth" className="text-wiz-purple hover:underline flex items-center">
              Sign In
            </Link>
          )}
        </p>
        {profile && (
          <div className="flex items-center">
            <span className="text-xs bg-wiz-mint/30 text-wiz-purple px-2 py-0.5 rounded-full">
              {getRankDisplayName(profile.rank)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
