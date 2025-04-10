
import React from "react";
import { cn } from "@/lib/utils";
import { Trophy, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Mission } from "@/services/sparkleService";
import MemeQuest from "./MemeQuest";
import { useMissions } from "@/hooks/useMissions";

interface MemeQuestsProps {
  className?: string;
}

const MemeQuests: React.FC<MemeQuestsProps> = ({ className }) => {
  const { missions, completedMissionIds, loading, handleQuestComplete } = useMissions();
  
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
          missions.map((mission: Mission) => (
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
