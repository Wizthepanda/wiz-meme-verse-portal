
import React from "react";
import TopBar from "@/components/dashboard/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface MemeQuestProps {
  title: string;
  description: string;
  reward: number;
  isNew?: boolean;
  isHot?: boolean;
  completed?: boolean;
  onClick?: () => void;
}

const MemeQuest: React.FC<MemeQuestProps> = ({
  title,
  description,
  reward,
  isNew = false,
  isHot = false,
  completed = false,
  onClick,
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
          onClick={onClick}
        >
          {completed ? "Completed! 🎉" : "Start Quest"}
        </button>
      </div>
    </div>
  );
};

const MagicMissions = () => {
  const { toast } = useToast();
  
  const handleQuestClick = (title: string) => {
    toast({
      title: "Quest Started! ✨",
      description: `You've started "${title}"! Complete it to earn Sparkles!`,
      variant: "default",
    });
  };

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
                <MemeQuest
                  title="First Meme Magic"
                  description="Share your first meme to the Memeverse"
                  reward={10}
                  isNew
                  onClick={() => handleQuestClick("First Meme Magic")}
                />
                <MemeQuest
                  title="Daily Login"
                  description="Login to the Memeverse portal today"
                  reward={5}
                  completed
                  onClick={() => handleQuestClick("Daily Login")}
                />
                <MemeQuest
                  title="Engage with 3 Memes"
                  description="Like or comment on 3 memes today"
                  reward={15}
                  onClick={() => handleQuestClick("Engage with 3 Memes")}
                />
                <MemeQuest
                  title="Share the WIZ"
                  description="Share a $WIZ meme on Twitter"
                  reward={20}
                  onClick={() => handleQuestClick("Share the WIZ")}
                />
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
                <MemeQuest
                  title="Retweet Rampage"
                  description="Retweet 5 $WIZ memes in one day"
                  reward={25}
                  isHot
                  onClick={() => handleQuestClick("Retweet Rampage")}
                />
                <MemeQuest
                  title="Meme Comment Master"
                  description="Leave 10 comments on Memeverse posts"
                  reward={15}
                  onClick={() => handleQuestClick("Meme Comment Master")}
                />
                <MemeQuest
                  title="Sparkle Collector"
                  description="Earn your first 100 Meme Sparkles"
                  reward={50}
                  isHot
                  onClick={() => handleQuestClick("Sparkle Collector")}
                />
                <MemeQuest
                  title="Wizard's Apprentice"
                  description="Complete all daily quests for 3 days in a row"
                  reward={75}
                  onClick={() => handleQuestClick("Wizard's Apprentice")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Special Quests */}
        <Card className="bg-white/80 backdrop-blur-sm border-wiz-lavender/30 mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl font-bubblegum text-wiz-purple">Special Missions</span>
              <span className="text-xl">🌟</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
              <MemeQuest
                title="Meme Legend"
                description="Create a meme that gets 100+ likes"
                reward={200}
                isHot
                onClick={() => handleQuestClick("Meme Legend")}
              />
              <MemeQuest
                title="WIZ Ambassador"
                description="Refer 5 friends to join the Memeverse"
                reward={150}
                onClick={() => handleQuestClick("WIZ Ambassador")}
              />
              <MemeQuest
                title="Viral Sensation"
                description="Have a meme featured in WIZ Picks"
                reward={300}
                isHot
                onClick={() => handleQuestClick("Viral Sensation")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MagicMissions;
