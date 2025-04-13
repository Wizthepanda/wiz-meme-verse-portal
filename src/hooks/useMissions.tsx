
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { completeMission, fetchMissions, Mission } from "@/services/sparkleService";
import { supabase } from "@/integrations/supabase/client";
import { playSoundEffect } from "@/utils/soundEffects";

export const useMissions = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, refreshProfile } = useProfile();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load missions
  useEffect(() => {
    const loadMissions = async () => {
      if (user) {
        try {
          setLoading(true);
          
          // Get a mix of mission types, prioritizing hot and new ones
          const allMissions = await fetchMissions();
          const hotAndNewMissions = allMissions.filter(m => m.is_hot || m.is_new);
          const otherMissions = allMissions.filter(m => !m.is_hot && !m.is_new);
          
          // Combine with priority to hot and new, and limit to 7 total
          let combinedMissions = [...hotAndNewMissions];
          if (combinedMissions.length < 7) {
            combinedMissions = [...combinedMissions, ...otherMissions.slice(0, 7 - combinedMissions.length)];
          } else {
            combinedMissions = combinedMissions.slice(0, 7);
          }
          
          setMissions(combinedMissions);
          
          // Get completed missions
          const { data } = await supabase
            .from('completed_missions')
            .select('mission_id')
            .eq('user_id', user.id);
          
          if (data) {
            setCompletedMissionIds(data.map((cm: any) => cm.mission_id));
          }
        } catch (error) {
          console.error("Error loading missions:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadMissions();
  }, [user]);
  
  const handleQuestComplete = useCallback(async (mission: Mission) => {
    if (!user || !profile) return;
    
    try {
      const success = await completeMission(mission.id, user.id);
      
      if (success) {
        // Update local state
        setCompletedMissionIds(prev => [...prev, mission.id]);
        
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
          description: "This quest may have been completed already.",
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
  }, [user, profile, toast, refreshProfile]);

  return {
    missions,
    completedMissionIds,
    loading,
    handleQuestComplete
  };
};
