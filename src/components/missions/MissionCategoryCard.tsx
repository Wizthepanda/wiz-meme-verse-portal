
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Mission } from "@/services/sparkleService";
import MemeQuest from "@/components/dashboard/MemeQuest";

interface MissionCategoryCardProps {
  title: string;
  icon?: React.ReactNode;
  missions: Mission[];
  completedMissionIds: string[];
  onQuestComplete: (mission: Mission) => void;
  emptyMessage?: string;
}

const MissionCategoryCard: React.FC<MissionCategoryCardProps> = ({
  title,
  icon = <Sparkles className="text-wiz-purple" size={20} />,
  missions,
  completedMissionIds,
  onQuestComplete,
  emptyMessage = "No missions available right now. Check back soon!"
}) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-wiz-lavender/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl font-bubblegum text-wiz-purple">{title}</span>
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
          {missions.length > 0 ? (
            missions.map(mission => (
              <MemeQuest
                key={mission.id}
                mission={mission}
                completed={completedMissionIds.includes(mission.id)}
                onQuestComplete={() => onQuestComplete(mission)}
              />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              {emptyMessage}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissionCategoryCard;
