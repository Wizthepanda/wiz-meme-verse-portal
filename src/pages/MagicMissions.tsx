
import React, { useCallback, useEffect, useState } from "react";
import TopBar from "@/components/dashboard/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { completeMission, fetchMissions, Mission } from "@/services/sparkleService";
import { playSoundEffect } from "@/utils/soundEffects";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import MemeQuest from "@/components/dashboard/MemeQuest";

const MagicMissions = () => {
  const { toast } = useToast();
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [dailyMissions, setDailyMissions] = useState<Mission[]>([]);
  const [weeklyMissions, setWeeklyMissions] = useState<Mission[]>([]);
  const [specialMissions, setSpecialMissions] = useState<Mission[]>([]);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);
  
  // Fetch missions
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
          
          setDailyMissions(daily);
          setWeeklyMissions(weekly);
          setSpecialMissions(special);
          
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
          toast({
            title: "Failed to load missions",
            description: "Please try again later",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadMissions();
  }, [user, toast]);
  
  const handleQuestClick = useCallback(async (mission: Mission) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
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
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-wiz-purple animate-pulse font-bold flex items-center">
              <Sparkles className="mr-2" />
              Loading Magic Missions...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Quests */}
            <Card className="bg-white/80 backdrop-blur-sm border-wiz-lavender/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl font-bubblegum text-wiz-purple">Daily Missions</span>
                  <Sparkles className="text-wiz-purple" size={20} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
                  {dailyMissions.length > 0 ? (
                    dailyMissions.map(mission => (
                      <MemeQuest
                        key={mission.id}
                        mission={mission}
                        completed={completedMissionIds.includes(mission.id)}
                        onQuestComplete={() => handleQuestClick(mission)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No daily missions available right now. Check back soon!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Weekly Quests */}
            <Card className="bg-white/80 backdrop-blur-sm border-wiz-lavender/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl font-bubblegum text-wiz-purple">Weekly Missions</span>
                  <Sparkles className="text-wiz-purple" size={20} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
                  {weeklyMissions.length > 0 ? (
                    weeklyMissions.map(mission => (
                      <MemeQuest
                        key={mission.id}
                        mission={mission}
                        completed={completedMissionIds.includes(mission.id)}
                        onQuestComplete={() => handleQuestClick(mission)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No weekly missions available right now. Check back soon!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Special Quests */}
        {!loading && (
          <Card className="bg-white/80 backdrop-blur-sm border-wiz-lavender/30 mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl font-bubblegum text-wiz-purple">Special Missions</span>
                <span className="text-xl">🌟</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
                {specialMissions.length > 0 ? (
                  specialMissions.map(mission => (
                    <MemeQuest
                      key={mission.id}
                      mission={mission}
                      completed={completedMissionIds.includes(mission.id)}
                      onQuestComplete={() => handleQuestClick(mission)}
                    />
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No special missions available right now. Special missions appear randomly!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MagicMissions;
