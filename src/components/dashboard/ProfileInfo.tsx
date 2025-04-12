
import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRankDisplayName } from "@/services/sparkleService";
import { Profile } from "@/services/sparkleService";

interface ProfileInfoProps {
  username: string | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  username, 
  profile,
  isAuthenticated,
  onLogout
}) => {
  return (
    <div>
      <p className="font-medium text-wiz-dark">
        {username ? (
          <span className="text-wiz-purple">{username}</span>
        ) : (
          <span className="text-wiz-purple">Meme Wizard</span>
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
  );
};

export default ProfileInfo;
