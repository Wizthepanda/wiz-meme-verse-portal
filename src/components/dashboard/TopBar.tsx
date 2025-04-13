
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { useTwitterProfile } from "@/hooks/useTwitterProfile";
import ProfileInfo from "./ProfileInfo";
import TopBarNavigation from "./TopBarNavigation";
import SparkleCounter from "./SparkleCounter";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const TopBar = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { username } = useTwitterProfile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account"
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-wiz-lavender/10 py-3 px-4 sm:px-6">
      <div className="flex justify-between items-center">
        <ProfileInfo 
          username={username} 
          profile={profile} 
          isAuthenticated={!!user}
        />
        
        <div className="flex items-center gap-2 sm:gap-6">
          {profile && (
            <SparkleCounter sparkles={profile.sparkles} />
          )}
          
          <TopBarNavigation onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
