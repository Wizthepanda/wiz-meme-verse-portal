
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, Laugh, Sparkles, Trophy, LogOut, ChevronDown } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface TopBarProps {
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ className }) => {
  const [sparkleCount, setSparkleCount] = useState(247);
  const navigate = useNavigate();
  
  const handleSparkleClick = () => {
    setSparkleCount(prev => prev + 1);
    toast({
      title: "✨ Sparkle earned!",
      description: "You found a hidden sparkle! Keep exploring!",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logging out...",
      description: "See you soon in the Memeverse!",
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-md py-3 px-6 flex items-center justify-between",
      "border-b border-wiz-lavender/30 shadow-sm",
      "transition-all duration-300",
      className
    )}>
      {/* Left side - User profile */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-wiz-purple/20 flex items-center justify-center border-2 border-wiz-lavender overflow-hidden group-hover:scale-110 transition-transform">
              {/* Twitter PFP */}
              <span className="text-xl group-hover:animate-spin">🐦</span>
            </div>
            <div>
              <p className="font-medium text-wiz-dark group-hover:text-wiz-purple transition-colors">@wizuser</p>
              <div className="flex items-center">
                <span className="text-xs bg-wiz-mint/30 text-wiz-purple px-2 py-0.5 rounded-full group-hover:bg-wiz-mint/50 transition-colors">
                  Cloud Lurker <ChevronDown size={12} className="inline ml-1" />
                </span>
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-4 bg-white/95 backdrop-blur-md border-2 border-wiz-lavender/30 rounded-xl">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-wiz-purple">WIZ Profile</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Memes Posted:</span>
              <span className="font-bold">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Sparkles:</span>
              <span className="font-bold">{sparkleCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rank:</span>
              <span className="font-bold">Cloud Lurker (Level 3)</span>
            </div>
            <div className="mt-2">
              <button className="w-full py-2 text-sm font-medium bg-wiz-purple/10 text-wiz-purple rounded-lg hover:bg-wiz-purple/20 transition-colors">
                View Full Profile
              </button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      
      {/* Center - Sparkles counter */}
      <div 
        className="flex items-center space-x-2 bg-wiz-banana/20 px-4 py-2 rounded-full cursor-pointer hover:bg-wiz-banana/40 transition-colors group"
        onClick={handleSparkleClick}
      >
        <span className="text-xl animate-pulse relative group-hover:rotate-12 transition-transform">
          ✨
          <span className="absolute -top-1 -right-1 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+1</span>
        </span>
        <span className="font-bubblegum text-xl text-wiz-purple group-hover:scale-110 transition-transform">{sparkleCount}</span>
      </div>
      
      {/* Right - Navigation */}
      <div className="flex items-center space-x-4">
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all hover:rotate-12">
              <Home size={20} />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 text-xs bg-white/95 text-wiz-purple">Dashboard</HoverCardContent>
        </HoverCard>
        
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all hover:scale-110">
              <Laugh size={20} />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 text-xs bg-white/95 text-wiz-purple">Meme-nagerie</HoverCardContent>
        </HoverCard>
        
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all hover:-translate-y-1">
              <Sparkles size={20} />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 text-xs bg-white/95 text-wiz-purple">Quests</HoverCardContent>
        </HoverCard>
        
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all hover:rotate-[360deg] duration-500">
              <Trophy size={20} />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 text-xs bg-white/95 text-wiz-purple">Leaderboard</HoverCardContent>
        </HoverCard>
        
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <button 
              className="p-2 rounded-full bg-wiz-coral/10 text-wiz-coral hover:bg-wiz-coral/20 transition-all hover:scale-110"
              onClick={handleLogout}
            >
              <LogOut size={20} />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 text-xs bg-white/95 text-wiz-coral">Log Out</HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default TopBar;
