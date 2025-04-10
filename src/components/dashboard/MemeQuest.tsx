
import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Clock } from "lucide-react";
import { playSoundEffect } from "@/utils/soundEffects";
import { Mission } from "@/services/sparkleService";

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

export default MemeQuest;
