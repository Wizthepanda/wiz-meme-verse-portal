
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Gift, Sparkles, ArrowRight } from "lucide-react";

interface MemeQuestProps {
  title: string;
  description: string;
  reward: number;
  isNew?: boolean;
  isHot?: boolean;
  completed?: boolean;
  darkMode?: boolean;
  onComplete?: () => void;
}

const MemeQuest: React.FC<MemeQuestProps> = ({
  title,
  description,
  reward,
  isNew = false,
  isHot = false,
  completed = false,
  darkMode = false,
  onComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleComplete = () => {
    if (!isCompleted) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsCompleted(true);
        setIsAnimating(false);
        if (onComplete) onComplete();
        toast({
          title: "WIZ shouts:",
          description: "BAMBOO BOOM! You're leveling up fast!",
          variant: "default",
        });
      }, 800);
    }
  };

  return (
    <div className={cn(
      "relative bg-white/90 rounded-lg p-4 border-2 border-wiz-lavender/30 mb-3 transform transition-all duration-300",
      "hover:shadow-md hover:-translate-y-1",
      darkMode ? "bg-indigo-900/40 border-purple-500/30" : "",
      isCompleted ? "opacity-60" : "",
      isAnimating ? "animate-pulse border-wiz-purple" : ""
    )}>
      {/* Status badges */}
      <div className="absolute -top-2 left-2 flex space-x-2">
        {isNew && (
          <span className={`bg-wiz-purple text-white text-xs font-bold px-2 py-1 rounded-full ${isNew ? "animate-pulse" : ""}`}>
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
          <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-wiz-dark"} mb-1`}>{title}</h3>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>{description}</p>
        </div>
        <div className={`flex items-center space-x-1 ${darkMode ? "bg-yellow-500/20" : "bg-wiz-banana/30"} px-2 py-1 rounded-lg`}>
          <span className="text-sm">✨</span>
          <span className={`text-sm font-bold ${darkMode ? "text-yellow-300" : ""}`}>{reward}</span>
        </div>
      </div>
      
      {/* Completion button */}
      <div className="mt-2">
        <button 
          className={cn(
            "w-full py-2 rounded-lg text-sm font-bold transition-all group flex items-center justify-center gap-2",
            isCompleted
              ? "bg-green-100 text-green-700"
              : darkMode 
                ? "bg-wiz-purple/50 text-white hover:bg-wiz-purple/70"
                : "bg-wiz-mint/20 text-wiz-purple hover:bg-wiz-mint/40"
          )}
          onClick={handleComplete}
          disabled={isCompleted || isAnimating}
        >
          {isCompleted ? (
            <>
              Completed! 🎉
            </>
          ) : (
            <>
              Start Quest
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
      
      {/* Animation overlay */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl animate-spin">✨</div>
        </div>
      )}
    </div>
  );
};

interface MemeQuestsProps {
  className?: string;
  darkMode?: boolean;
}

const MemeQuests: React.FC<MemeQuestsProps> = ({ className, darkMode = false }) => {
  const [hasNewQuests, setHasNewQuests] = useState(true);
  const [showPrompt, setShowPrompt] = useState(true);
  const [completedCount, setCompletedCount] = useState(1);
  
  const handleQuestComplete = () => {
    setCompletedCount(prev => prev + 1);
    if (completedCount + 1 >= 2) {
      setShowPrompt(false);
    }
  };
  
  useEffect(() => {
    // Toggle the prompt visibility every 5 seconds for attention
    const interval = setInterval(() => {
      if (hasNewQuests) {
        setShowPrompt(prev => !prev);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [hasNewQuests]);

  return (
    <div className={cn(
      "relative w-full h-full p-6",
      "scrollbar-thin scrollbar-thumb-wiz-purple/20 scrollbar-track-transparent",
      className
    )}>
      <h2 className={`text-2xl font-bubblegum ${darkMode ? "text-wiz-banana" : "text-wiz-purple"} mb-4 flex items-center`}>
        Magic Missions
        <span className="relative ml-2">
          <Sparkles size={18} className="text-yellow-400 animate-pulse" />
        </span>
      </h2>
      
      {/* Claim magic alert */}
      {showPrompt && (
        <div className={`${darkMode ? "bg-yellow-500/20 border-yellow-400/30" : "bg-wiz-banana/30 border-wiz-banana/50"} border rounded-lg p-3 mb-4 flex items-center gap-2 animate-pulse`}>
          <Gift size={18} className={darkMode ? "text-yellow-300" : "text-wiz-purple"} />
          <div>
            <p className={`text-sm font-bold ${darkMode ? "text-white" : "text-wiz-dark"}`}>Claim your magic!</p>
            <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Complete 2 more quests today</p>
          </div>
          <ArrowRight size={16} className="ml-auto animate-bounce" />
        </div>
      )}
      
      <div className="space-y-1 pr-2">
        <MemeQuest
          title="First Meme Magic"
          description="Share your first meme to the Memeverse"
          reward={10}
          isNew
          darkMode={darkMode}
          onComplete={handleQuestComplete}
        />
        <MemeQuest
          title="Retweet Rampage"
          description="Retweet 5 $WIZ memes in one day"
          reward={25}
          isHot
          darkMode={darkMode}
          onComplete={handleQuestComplete}
        />
        <MemeQuest
          title="Daily Login"
          description="Login to the Memeverse portal today"
          reward={5}
          completed
          darkMode={darkMode}
        />
        <MemeQuest
          title="Meme Comment Master"
          description="Leave 10 comments on Memeverse posts"
          reward={15}
          darkMode={darkMode}
          onComplete={handleQuestComplete}
        />
        <MemeQuest
          title="Sparkle Collector"
          description="Earn your first 100 Meme Sparkles"
          reward={50}
          isHot
          darkMode={darkMode}
          onComplete={handleQuestComplete}
        />
        <MemeQuest
          title="Wizard's Apprentice"
          description="Complete all daily quests for 3 days in a row"
          reward={75}
          darkMode={darkMode}
          onComplete={handleQuestComplete}
        />
        <MemeQuest
          title="Community Champion"
          description="Get 50 likes on your memes in one week"
          reward={35}
          darkMode={darkMode}
          onComplete={handleQuestComplete}
        />
        <MemeQuest
          title="Meme Streak Master"
          description="Post a meme every day for 7 days"
          reward={45}
          darkMode={darkMode}
          onComplete={handleQuestComplete}
        />
      </div>
      
      {/* Bamboo pole decoration */}
      <div className="absolute -right-2 top-0 bottom-0 w-4 flex flex-col items-center">
        <div className="h-full w-2 bg-gradient-to-b from-green-300 to-green-500 rounded-full"></div>
        <div className="absolute top-1/4 -left-2 text-sm">🎋</div>
        <div className="absolute top-2/4 -left-2 text-sm">🎋</div>
        <div className="absolute top-3/4 -left-2 text-sm">🎋</div>
      </div>
    </div>
  );
};

export default MemeQuests;
