
import { useState, useEffect } from "react";
import { fetchMissions, Mission } from "@/services/sparkleService";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface MissionCategories {
  daily: Mission[];
  weekly: Mission[];
  special: Mission[];
}

export const useMissionCategories = () => {
  const { user } = useAuth();
  const [missionCategories, setMissionCategories] = useState<MissionCategories>({
    daily: [],
    weekly: [],
    special: []
  });
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch mission data
  useEffect(() => {
    const loadMissions = async () => {
      if (user) {
        try {
          setLoading(true);
          
          // Fetch missions by type
          const [daily, weekly, special] = await Promise.all([
            fetchMissions('daily'),
            fetchMissions('weekly'),
            fetchMissions('special')
          ]);
          
          setMissionCategories({
            daily,
            weekly,
            special
          });
          
          // Fetch completed missions
          const { data } = await supabase
            .from('completed_missions')
            .select('mission_id')
            .eq('user_id', user.id);
          
          if (data) {
            setCompletedMissionIds(data.map(cm => cm.mission_id));
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

  return {
    missionCategories,
    completedMissionIds,
    loading
  };
};
