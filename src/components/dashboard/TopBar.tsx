
import React from "react";
import { cn } from "@/lib/utils";
import { Home, Laugh, Sparkles, Trophy, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getRankDisplayName } from "@/services/sparkleService";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ className }) => {
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "See you soon, meme lord!",
        variant: "default",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  // Get Twitter avatar and username with better console logging
  const getTwitterAvatar = () => {
    console.log("Getting Twitter avatar");
    console.log("User:", user);
    console.log("User identities:", user?.identities);
    console.log("User metadata:", user?.user_metadata);
    
    if (user?.identities && user.identities.length > 0) {
      const twitterIdentity = user.identities.find(
        identity => identity.provider === "twitter"
      );
      
      console.log("Twitter identity:", twitterIdentity);
      
      if (twitterIdentity?.identity_data?.avatar_url) {
        console.log("Found avatar in identity_data:", twitterIdentity.identity_data.avatar_url);
        return twitterIdentity.identity_data.avatar_url;
      }
    }
    
    // Try from user metadata
    if (user?.user_metadata?.avatar_url) {
      console.log("Found avatar in user_metadata:", user.user_metadata.avatar_url);
      return user.user_metadata.avatar_url;
    }
    
    console.log("No avatar found, using fallback");
    return null;
  };

  const getTwitterUsername = () => {
    console.log("Getting Twitter username");
    console.log("User:", user);
    
    if (user?.identities && user.identities.length > 0) {
      const twitterIdentity = user.identities.find(
        identity => identity.provider === "twitter"
      );

      console.log("Twitter identity:", twitterIdentity);

      // Try to get the twitter username from different possible locations
      if (twitterIdentity?.identity_data) {
        const username = twitterIdentity.identity_data.full_name || 
               twitterIdentity.identity_data.preferred_username ||
               twitterIdentity.identity_data.name;
        
        console.log("Username from identity_data:", username);
        return username;
      }
    }
    
    // Try from user metadata
    if (user?.user_metadata) {
      const username = user.user_metadata.full_name || 
             user.user_metadata.preferred_username ||
             user.user_metadata.name ||
             user.user_metadata.user_name;
      
      console.log("Username from user_metadata:", username);
      return username;
    }
    
    console.log("Using profile username fallback:", profile?.username);
    return profile?.username || "Meme Wizard";
  };
  
  const twitterAvatar = getTwitterAvatar();
  const twitterUsername = getTwitterUsername();
  
  console.log("Final username:", twitterUsername);
  console.log("Final avatar:", twitterAvatar);

  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-md py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10",
      "border-b border-wiz-lavender/30 shadow-sm",
      className
    )}>
      {/* Left side - User profile */}
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10 border-2 border-wiz-lavender hover:scale-110 transition-transform">
          {twitterAvatar ? (
            <AvatarImage 
              src={twitterAvatar} 
              alt={`${twitterUsername}'s profile`} 
            />
          ) : (
            <AvatarFallback className="bg-wiz-purple/20 text-wiz-purple">
              {twitterUsername ? twitterUsername.charAt(0).toUpperCase() : '🧙'}
            </AvatarFallback>
          )}
        </Avatar>
        <div className={isMobile ? "hidden sm:block" : ""}>
          <p className="font-medium text-wiz-dark">
            {user ? (
              <span className="text-wiz-purple">{twitterUsername}</span>
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
      </div>
      
      {/* Center - Sparkles counter */}
      <div className="flex items-center space-x-2 bg-wiz-banana/20 px-4 py-2 rounded-full hover:bg-wiz-banana/30 transition-all cursor-pointer">
        <span className="text-xl animate-pulse">✨</span>
        <span className="font-bubblegum text-xl text-wiz-purple">{profile?.sparkles || 0}</span>
      </div>
      
      {/* Right - Navigation */}
      {isMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
              <Menu size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
            <DropdownMenuItem asChild>
              <Link to="/dashboard" className="flex items-center gap-2 p-2">
                <Home size={18} /> Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/meme-feed" className="flex items-center gap-2 p-2">
                <Laugh size={18} /> Meme Feed
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/magic-missions" className="flex items-center gap-2 p-2">
                <Sparkles size={18} /> Missions
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/leaderboard" className="flex items-center gap-2 p-2">
                <Trophy size={18} /> Leaderboard
              </Link>
            </DropdownMenuItem>
            {user && (
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 p-2 text-wiz-coral">
                <LogOut size={18} /> Logout
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
            <Home size={20} />
          </Link>
          <Link to="/meme-feed" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
            <Laugh size={20} />
          </Link>
          <Link to="/magic-missions" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
            <Sparkles size={20} />
          </Link>
          <Link to="/leaderboard" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
            <Trophy size={20} />
          </Link>
          {user && (
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full bg-wiz-coral/10 text-wiz-coral hover:bg-wiz-coral/20 transition-all"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TopBar;
