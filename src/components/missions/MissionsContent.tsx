
import React from "react";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Mission } from "@/services/sparkleService";
import MissionCategoryCard from "./MissionCategoryCard";

interface MissionsContentProps {
  loading: boolean;
  dailyMissions: Mission[];
  weeklyMissions: Mission[];
  specialMissions: Mission[];
  completedMissionIds: string[];
  onQuestComplete: (mission: Mission) => void;
}

const MissionsContent: React.FC<MissionsContentProps> = ({
  loading,
  dailyMissions,
  weeklyMissions,
  specialMissions,
  completedMissionIds,
  onQuestComplete
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-wiz-purple animate-pulse font-bold flex items-center">
          <Sparkles className="mr-2" />
          Loading Magic Missions...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Missions */}
        <MissionCategoryCard
          title="Daily Missions"
          missions={dailyMissions}
          completedMissionIds={completedMissionIds}
          onQuestComplete={onQuestComplete}
        />
        
        {/* Weekly Missions */}
        <MissionCategoryCard
          title="Weekly Missions"
          missions={weeklyMissions}
          completedMissionIds={completedMissionIds}
          onQuestComplete={onQuestComplete}
        />
      </div>
      
      {/* Special Missions */}
      <Card className="bg-white/80 backdrop-blur-sm border-wiz-lavender/30 mt-6">
        <MissionCategoryCard
          title="Special Missions"
          icon={<span className="text-xl">🌟</span>}
          missions={specialMissions}
          completedMissionIds={completedMissionIds}
          onQuestComplete={onQuestComplete}
          emptyMessage="No special missions available right now. Special missions appear randomly!"
        />
      </Card>
    </>
  );
};

export default MissionsContent;
