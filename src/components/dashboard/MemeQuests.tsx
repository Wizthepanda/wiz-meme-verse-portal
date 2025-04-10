
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Trophy, ExternalLink, Clock } from "lucide-react";
import { playSoundEffect } from "@/utils/soundEffects";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { completeMission, fetchMissions, Mission } from "@/services/sparkleService";

interface MemeQuestProps {
  mission: Mission;
  completed?: boolean;
  onQuestComplete?: () => void;
}

const MemeQuest: React.FC<MemeQuestProps> = ({
  mission,
  completed = false,
  onQuestComplete,
}) => {
  // Play sound when starting or completing a quest
  const handleQuestAction = () => {
    if (!completed) {
      playSoundEffect('complete');
      if (onQuestComplete) onQuestComplete();
    } else {
      playSoundEffect('reward');
    }
  };

  return (
    <div className={cn(
      "relative bg-white/90 rounded-lg p-4 border-2 shadow-sm transition-all duration-300",
      "hover:shadow-md hover:-translate-y-0.5",
      completed ? "border-green-300/50 bg-green-50/50" : mission.is_hot ? "border-wiz-coral/30 bg-gradient-to-br from-white to-wiz-coral/10" : "border-wiz-lavender/30",
      "mb-3 last:mb-0"
    )}>
      {/* Status badges */}
      <div className="absolute -top-2 left-2 flex space-x-2">
        {mission.is_new && (
          <span className="bg-wiz-purple text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            NEW!
          </span>
        )}
        {mission.is_hot && (
          <span className="bg-wiz-coral text-white text-xs font-bold px-2 py-1 rounded-full">
            HOT 🔥
          </span>
        )}
        {mission.claims_left !== null && mission.claims_left < 200 && (
          <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <Clock size={12} className="mr-1" />
            {mission.claims_left} left!
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-start mt-1">
        <div>
          <h3 className="text-lg font-bold text-wiz-dark mb-1">{mission.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{mission.description}</p>
        </div>
        <div className="flex items-center space-x-1 bg-wiz-banana/30 px-2 py-1 rounded-lg">
          <Sparkles size={14} className="text-wiz-purple" />
          <span className="text-sm font-bold">{mission.reward}</span>
        </div>
      </div>
      
      {/* Completion button */}
      <div className="mt-2">
        <button 
          className={cn(
            "w-full py-2 rounded-lg text-sm font-bold transition-all",
            completed
              ? "bg-green-100 text-green-700 flex items-center justify-center"
              : mission.claims_left === 0 
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-wiz-purple/60 to-wiz-coral/60 text-white hover:from-wiz-purple hover:to-wiz-coral"
          )}
          onClick={handleQuestAction}
          disabled={mission.claims_left === 0 || completed}
        >
          {completed 
            ? "Completed! 🎉" 
            : mission.claims_left === 0 
              ? "All claimed!" 
              : "Start Quest"}
        </button>
      </div>
    </div>
  );
};

interface MemeQuestsProps {
  className?: string;
}

const MemeQuests: React.FC<MemeQuestsProps> = ({ className }) => {
  const { toast } = useToast();
  const { user, profile, refreshProfile } = useAuth();
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

  // Import supabase
  const { supabase } = require("@/integrations/supabase/client");
  
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-wiz-lavender/30 hover:shadow-xl transition-all duration-300",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bubblegum text-wiz-purple flex items-center gap-2">
          <Trophy className="text-wiz-banana" size={20} />
          Magic Missions
        </h2>
        <Link to="/magic-missions" className="flex items-center text-xs gap-1 bg-wiz-purple/10 px-2 py-1 rounded-full text-wiz-purple hover:bg-wiz-purple/20 transition-colors">
          <span>View All</span>
          <ExternalLink size={12} />
        </Link>
      </div>
      
      <div className="space-y-1 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-wiz-purple/20 scrollbar-track-transparent">
        {loading ? (
          <div className="text-center py-4 text-gray-500">
            <Sparkles className="inline mr-2 animate-pulse" size={16} />
            Loading missions...
          </div>
        ) : missions.length > 0 ? (
          missions.map(mission => (
            <MemeQuest
              key={mission.id}
              mission={mission}
              completed={completedMissionIds.includes(mission.id)}
              onQuestComplete={() => handleQuestComplete(mission)}
            />
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No missions available right now. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeQuests;
