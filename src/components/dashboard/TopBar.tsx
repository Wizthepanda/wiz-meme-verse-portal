
import React from "react";
import { cn } from "@/lib/utils";
import { Home, Laugh, Magic, Trophy, LogOut } from "lucide-react";

interface TopBarProps {
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-md py-3 px-6 flex items-center justify-between",
      "border-b border-wiz-lavender/30 shadow-sm",
      className
    )}>
      {/* Left side - User profile */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-wiz-purple/20 flex items-center justify-center border-2 border-wiz-lavender">
          {/* Placeholder for Twitter PFP */}
          <span className="text-xl">🐦</span>
        </div>
        <div>
          <p className="font-medium text-wiz-dark">@wizuser</p>
          <div className="flex items-center">
            <span className="text-xs bg-wiz-mint/30 text-wiz-purple px-2 py-0.5 rounded-full">
              Cloud Lurker
            </span>
          </div>
        </div>
      </div>
      
      {/* Center - Sparkles counter */}
      <div className="flex items-center space-x-2 bg-wiz-banana/20 px-4 py-2 rounded-full">
        <span className="text-xl animate-pulse">✨</span>
        <span className="font-bubblegum text-xl text-wiz-purple">247</span>
      </div>
      
      {/* Right - Navigation */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
          <Home size={20} />
        </button>
        <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
          <Laugh size={20} />
        </button>
        <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
          <Magic size={20} />
        </button>
        <button className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
          <Trophy size={20} />
        </button>
        <button className="p-2 rounded-full bg-wiz-coral/10 text-wiz-coral hover:bg-wiz-coral/20 transition-all">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
