
import React from "react";
import { cn } from "@/lib/utils";

interface MemeQuestProps {
  title: string;
  description: string;
  reward: number;
  isNew?: boolean;
  isHot?: boolean;
  completed?: boolean;
}

const MemeQuest: React.FC<MemeQuestProps> = ({
  title,
  description,
  reward,
  isNew = false,
  isHot = false,
  completed = false,
}) => {
  return (
    <div className={cn(
      "relative bg-white/90 rounded-lg p-4 border-2 border-wiz-lavender/30 mb-3 transform transition-all duration-300",
      "hover:shadow-md hover:-translate-y-1",
      completed ? "opacity-60" : ""
    )}>
      {/* Status badges */}
      <div className="absolute -top-2 left-2 flex space-x-2">
        {isNew && (
          <span className="bg-wiz-purple text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            NEW!
          </span>
        )}
        {isHot && (
          <span className="bg-wiz-coral text-white text-xs font-bold px-2 py-1 rounded-full">
            HOT 🔥
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-wiz-dark mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        </div>
        <div className="flex items-center space-x-1 bg-wiz-banana/30 px-2 py-1 rounded-lg">
          <span className="text-sm">✨</span>
          <span className="text-sm font-bold">{reward}</span>
        </div>
      </div>
      
      {/* Completion checkbox */}
      <div className="mt-2">
        <button 
          className={cn(
            "w-full py-2 rounded-lg text-sm font-bold transition-all",
            completed
              ? "bg-green-100 text-green-700"
              : "bg-wiz-mint/20 text-wiz-purple hover:bg-wiz-mint/40"
          )}
        >
          {completed ? "Completed! 🎉" : "Start Quest"}
        </button>
      </div>
    </div>
  );
};

interface MemeQuestsProps {
  className?: string;
}

const MemeQuests: React.FC<MemeQuestsProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-wiz-lavender/30",
      "scrollbar-thin scrollbar-thumb-wiz-purple/20 scrollbar-track-transparent",
      className
    )}>
      <h2 className="text-2xl font-bubblegum text-wiz-purple mb-4">Magic Missions</h2>
      
      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
        <MemeQuest
          title="First Meme Magic"
          description="Share your first meme to the Memeverse"
          reward={10}
          isNew
        />
        <MemeQuest
          title="Retweet Rampage"
          description="Retweet 5 $WIZ memes in one day"
          reward={25}
          isHot
        />
        <MemeQuest
          title="Daily Login"
          description="Login to the Memeverse portal today"
          reward={5}
          completed
        />
        <MemeQuest
          title="Meme Comment Master"
          description="Leave 10 comments on Memeverse posts"
          reward={15}
        />
        <MemeQuest
          title="Sparkle Collector"
          description="Earn your first 100 Meme Sparkles"
          reward={50}
          isHot
        />
        <MemeQuest
          title="Wizard's Apprentice"
          description="Complete all daily quests for 3 days in a row"
          reward={75}
        />
      </div>
    </div>
  );
};

export default MemeQuests;
