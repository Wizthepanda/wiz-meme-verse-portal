
import React from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTwitterProfile } from "@/hooks/useTwitterProfile";

// Import our new components
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import SparkleCounter from "./SparkleCounter";
import TopBarNavigation from "./TopBarNavigation";
import MobileNavMenu from "./MobileNavMenu";

interface TopBarProps {
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ className }) => {
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { username, avatarUrl } = useTwitterProfile();

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

  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-md py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10",
      "border-b border-wiz-lavender/30 shadow-sm",
      className
    )}>
      {/* Left side - User profile */}
      <div className="flex items-center space-x-3">
        <ProfileAvatar 
          avatarUrl={avatarUrl} 
          username={username} 
        />
        
        <div className={isMobile ? "hidden sm:block" : ""}>
          <ProfileInfo 
            username={username || profile?.username || "Meme Wizard"} 
            profile={profile}
            isAuthenticated={!!user}
          />
        </div>
      </div>
      
      {/* Center - Sparkles counter */}
      <SparkleCounter count={profile?.sparkles || 0} />
      
      {/* Right - Navigation */}
      {isMobile ? (
        <MobileNavMenu 
          onLogout={handleLogout} 
          showLogoutButton={!!user} 
        />
      ) : (
        <TopBarNavigation 
          onLogout={handleLogout} 
          showLogoutButton={!!user} 
        />
      )}
    </div>
  );
};

export default TopBar;
