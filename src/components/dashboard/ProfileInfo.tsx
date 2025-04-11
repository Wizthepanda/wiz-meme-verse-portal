
import React from "react";
import { Link } from "react-router-dom";
import { getRankDisplayName } from "@/services/sparkleService";
import { Profile } from "@/services/sparkleService";

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
  return (
    <div>
      <p className="font-medium text-wiz-dark">
        {isAuthenticated ? (
          <span className="text-wiz-purple">{username}</span>
        ) : (
          <Link to="/" className="text-wiz-purple hover:underline flex items-center">
            Return Home
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
  );
};

export default ProfileInfo;
