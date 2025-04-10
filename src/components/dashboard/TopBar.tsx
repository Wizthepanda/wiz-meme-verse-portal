
import React from "react";
import { cn } from "@/lib/utils";
import { Home, Laugh, Sparkles, Trophy, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface TopBarProps {
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ className }) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you soon, meme lord!",
      variant: "default",
    });
  };

  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-md py-3 px-6 flex items-center justify-between sticky top-0 z-10",
      "border-b border-wiz-lavender/30 shadow-sm",
      className
    )}>
      {/* Left side - User profile */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-wiz-purple/20 flex items-center justify-center border-2 border-wiz-lavender hover:scale-110 transition-transform">
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
      <div className="flex items-center space-x-2 bg-wiz-banana/20 px-4 py-2 rounded-full hover:bg-wiz-banana/30 transition-all cursor-pointer">
        <span className="text-xl animate-pulse">✨</span>
        <span className="font-bubblegum text-xl text-wiz-purple">247</span>
      </div>
      
      {/* Right - Navigation */}
      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
          <Home size={20} />
        </Link>
        <Link to="/meme-feed" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
          <Laugh size={20} />
        </Link>
        <Link to="/magic-missions" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
          <Sparkles size={20} />
        </Link>
        <Link to="/leaderboard" className="p-2 rounded-full bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20 transition-all">
          <Trophy size={20} />
        </Link>
        <button 
          onClick={handleLogout}
          className="p-2 rounded-full bg-wiz-coral/10 text-wiz-coral hover:bg-wiz-coral/20 transition-all"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
