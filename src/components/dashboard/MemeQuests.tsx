
import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Trophy, ExternalLink, Clock } from "lucide-react";
import { playSoundEffect } from "@/utils/soundEffects";

interface MemeQuestProps {
  title: string;
  description: string;
  reward: number;
  isNew?: boolean;
  isHot?: boolean;
  completed?: boolean;
  claimsLeft?: number;
  onQuestStart?: () => void;
}

const MemeQuest: React.FC<MemeQuestProps> = ({
  title,
  description,
  reward,
  isNew = false,
  isHot = false,
  completed = false,
  claimsLeft,
  onQuestStart,
}) => {
  // Play sound when starting or completing a quest
  const handleQuestAction = () => {
    if (!completed) {
      playSoundEffect('complete');
      if (onQuestStart) onQuestStart();
    } else {
      playSoundEffect('reward');
    }
  };

  return (
    <div className={cn(
      "relative bg-white/90 rounded-lg p-4 border-2 shadow-sm transition-all duration-300",
      "hover:shadow-md hover:-translate-y-0.5",
      completed ? "border-green-300/50 bg-green-50/50" : isHot ? "border-wiz-coral/30 bg-gradient-to-br from-white to-wiz-coral/10" : "border-wiz-lavender/30",
      "mb-3 last:mb-0"
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
        {claimsLeft !== undefined && claimsLeft < 200 && (
          <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <Clock size={12} className="mr-1" />
            {claimsLeft} left!
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-start mt-1">
        <div>
          <h3 className="text-lg font-bold text-wiz-dark mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        </div>
        <div className="flex items-center space-x-1 bg-wiz-banana/30 px-2 py-1 rounded-lg">
          <Sparkles size={14} className="text-wiz-purple" />
          <span className="text-sm font-bold">{reward}</span>
        </div>
      </div>
      
      {/* Completion checkbox */}
      <div className="mt-2">
        <button 
          className={cn(
            "w-full py-2 rounded-lg text-sm font-bold transition-all",
            completed
              ? "bg-green-100 text-green-700 flex items-center justify-center"
              : claimsLeft === 0 
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-wiz-purple/60 to-wiz-coral/60 text-white hover:from-wiz-purple hover:to-wiz-coral"
          )}
          onClick={handleQuestAction}
          disabled={claimsLeft === 0}
        >
          {completed 
            ? "Completed! 🎉" 
            : claimsLeft === 0 
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
  
  const handleQuestStart = useCallback((questTitle: string) => {
    toast({
      title: "Quest Started! ✨",
      description: `You've started "${questTitle}"! Complete it to earn Sparkles!`,
      variant: "default",
    });
  }, [toast]);
  
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
        <button className="flex items-center text-xs gap-1 bg-wiz-purple/10 px-2 py-1 rounded-full text-wiz-purple hover:bg-wiz-purple/20 transition-colors">
          <span>View All</span>
          <ExternalLink size={12} />
        </button>
      </div>
      
      <div className="space-y-1 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-wiz-purple/20 scrollbar-track-transparent">
        <MemeQuest
          title="First Meme Magic"
          description="Share your first meme to the Memeverse"
          reward={10}
          isNew
          claimsLeft={453}
          onQuestStart={() => handleQuestStart("First Meme Magic")}
        />
        <MemeQuest
          title="Retweet Rampage"
          description="Retweet 5 $WIZ memes in one day"
          reward={25}
          isHot
          claimsLeft={121}
          onQuestStart={() => handleQuestStart("Retweet Rampage")}
        />
        <MemeQuest
          title="Daily Login"
          description="Login to the Memeverse portal today"
          reward={5}
          completed
          claimsLeft={0}
        />
        <MemeQuest
          title="Meme Comment Master"
          description="Leave 10 comments on Memeverse posts"
          reward={15}
          claimsLeft={788}
          onQuestStart={() => handleQuestStart("Meme Comment Master")}
        />
        <MemeQuest
          title="Sparkle Collector"
          description="Earn your first 100 Meme Sparkles"
          reward={50}
          isHot
          claimsLeft={652}
          onQuestStart={() => handleQuestStart("Sparkle Collector")}
        />
        <MemeQuest
          title="Wizard's Apprentice"
          description="Complete all daily quests for 3 days in a row"
          reward={75}
          claimsLeft={912}
          onQuestStart={() => handleQuestStart("Wizard's Apprentice")}
        />
        <MemeQuest
          title="Meme Lord Rising"
          description="Create 5 original memes that get >50 likes each"
          reward={100}
          isNew
          isHot
          claimsLeft={300}
          onQuestStart={() => handleQuestStart("Meme Lord Rising")}
        />
      </div>
    </div>
  );
};

export default MemeQuests;
