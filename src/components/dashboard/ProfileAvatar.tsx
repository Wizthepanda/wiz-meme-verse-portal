
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  username?: string | null;
  className?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl,
  username,
  className
}) => {
  return (
    <Avatar className={cn("w-10 h-10 border-2 border-wiz-lavender hover:scale-110 transition-transform", className)}>
      {avatarUrl ? (
        <AvatarImage 
          src={avatarUrl} 
          alt={`${username}'s profile`} 
        />
      ) : (
        <AvatarFallback className="bg-wiz-purple/20 text-wiz-purple">
          {username ? username.charAt(0).toUpperCase() : '🧙'}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default ProfileAvatar;
