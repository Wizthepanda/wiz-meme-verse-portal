
import React from "react";
import { cn } from "@/lib/utils";
import { Trophy, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import MissionCategoryCard from "@/components/missions/MissionCategoryCard";
import { useMissions } from "@/hooks/useMissions";
import { useIsMobile } from "@/hooks/use-mobile";

interface MemeQuestsProps {
  className?: string;
}

const MemeQuests: React.FC<MemeQuestsProps> = ({ className }) => {
  const { missions, completedMissionIds, loading, handleQuestComplete } = useMissions();
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-wiz-lavender/30 hover:shadow-xl transition-all duration-300",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bubblegum text-wiz-purple flex items-center gap-2">
          <Trophy className="text-wiz-banana" size={isMobile ? 16 : 20} />
          Magic Missions
        </h2>
        <Link to="/magic-missions" className="flex items-center text-xs gap-1 bg-wiz-purple/10 px-2 py-1 rounded-full text-wiz-purple hover:bg-wiz-purple/20 transition-colors">
          <span>View All</span>
          <ExternalLink size={12} />
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center py-4 text-gray-500">
          <Sparkles className="inline mr-2 animate-pulse" size={16} />
          Loading missions...
        </div>
      ) : (
        <MissionCategoryCard
          title=""
          hideTitle={true}
          missions={missions}
          completedMissionIds={completedMissionIds}
          onQuestComplete={handleQuestComplete}
          maxHeight={isMobile ? "300px" : "450px"}
          emptyMessage="No missions available right now. Check back soon!"
        />
      )}
    </div>
  );
};

export default MemeQuests;
