
import React, { useCallback } from "react";
import TopBar from "@/components/dashboard/TopBar";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { completeMission, Mission } from "@/services/sparkleService";
import { playSoundEffect } from "@/utils/soundEffects";
import { useNavigate } from "react-router-dom";
import MissionsContent from "@/components/missions/MissionsContent";
import { useMissionCategories } from "@/hooks/useMissionCategories";

const MagicMissions = () => {
  const { toast } = useToast();
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { missionCategories, completedMissionIds, loading } = useMissionCategories();
  
  // Redirect to auth if not logged in
  React.useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);
  
  // Handle quest completion
  const handleQuestClick = useCallback(async (mission: Mission) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    try {
      const success = await completeMission(mission.id, user.id);
      
      if (success) {
        // Refresh user profile to get updated sparkles
        await refreshProfile();
        
        toast({
          title: "Quest Completed! ✨",
          description: `You've earned ${mission.reward} Sparkles for completing "${mission.title}"!`,
          variant: "default",
        });
        
        playSoundEffect('reward');
      } else {
        toast({
          title: "Couldn't complete quest",
          description: "This quest may have been completed already or is no longer available.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error completing mission:", error);
      toast({
        title: "Error",
        description: "Failed to complete mission. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, navigate, toast, refreshProfile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30">
      {/* Top navigation */}
      <TopBar />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bubblegum text-wiz-purple">Magic Missions</h1>
          <p className="text-gray-600">Complete quests to earn Sparkles and level up!</p>
        </div>
        
        <MissionsContent 
          loading={loading}
          dailyMissions={missionCategories.daily}
          weeklyMissions={missionCategories.weekly}
          specialMissions={missionCategories.special}
          completedMissionIds={completedMissionIds}
          onQuestComplete={handleQuestClick}
        />
      </div>
    </div>
  );
};

export default MagicMissions;
