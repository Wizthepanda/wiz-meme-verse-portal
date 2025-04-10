
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

interface MemeStatsProps {
  className?: string;
  darkMode?: boolean;
}

const MemeStats: React.FC<MemeStatsProps> = ({ className, darkMode = false }) => {
  const [xpProgress, setXpProgress] = useState(0);
  const [showPlusSparkles, setShowPlusSparkles] = useState(false);
  const [sparkleCount, setSparkleCount] = useState(247);
  
  // Animate XP bar on load
  useEffect(() => {
    setXpProgress(49);
  }, []);
  
  // Demo function to show sparkle animation
  const addSparkles = () => {
    setShowPlusSparkles(true);
    setTimeout(() => {
      setSparkleCount(prev => prev + 10);
      setTimeout(() => {
        setShowPlusSparkles(false);
      }, 1500);
    }, 300);
  };

  return (
    <div className={cn(
      "p-6 h-full w-full relative",
      className
    )}>
      <h2 className={`text-2xl font-bubblegum ${darkMode ? "text-wiz-banana" : "text-wiz-purple"} mb-4`}>
        Your Meme Journey
      </h2>
      
      {/* Dynamic Rank */}
      <div className="flex items-center mb-6">
        <div className={`w-16 h-16 ${darkMode ? "bg-purple-900/50" : "bg-wiz-purple/20"} rounded-full flex items-center justify-center mr-4 border-2 ${darkMode ? "border-indigo-400/30" : "border-wiz-lavender/50"}`}>
          <span className="text-2xl hover:animate-spin transition-all cursor-pointer">🐼</span>
        </div>
        <div>
          <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-wiz-dark"}`}>Cloud Lurker</p>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Level 3 Memer</p>
        </div>
      </div>
      
      {/* Bamboo XP Bar */}
      <div className="mb-6 relative">
        <div className="flex justify-between mb-1">
          <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Meme XP</span>
          <span className={`text-sm font-bold ${darkMode ? "text-wiz-banana" : "text-wiz-purple"}`}>247/500</span>
        </div>
        <div className="relative h-8 w-full">
          <div className="absolute inset-0 bg-gray-200 rounded-full overflow-hidden">
            <Progress value={xpProgress} className="h-full bg-gradient-to-r from-wiz-mint to-wiz-purple" />
          </div>
          
          {/* Bamboo shoots */}
          {[10, 30, 50, 70, 90].map((position) => (
            position <= xpProgress && (
              <div 
                key={position} 
                className="absolute -top-3 transform transition-all duration-500"
                style={{ left: `${position}%` }}
              >
                <span className="text-lg">🎋</span>
              </div>
            )
          ))}
        </div>
      </div>
      
      {/* $WIZ Estimator - Crystal Ball */}
      <div 
        className={`${darkMode ? "bg-indigo-900/30" : "bg-wiz-lavender/20"} rounded-lg p-4 mb-6 relative overflow-hidden cursor-pointer group`}
        onClick={addSparkles}
      >
        <div className="absolute right-4 top-4 animate-pulse">
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-md animate-ping"></div>
            <span className="text-xl">🔮</span>
          </div>
        </div>
        
        <h3 className={`text-lg font-bold ${darkMode ? "text-wiz-banana" : "text-wiz-purple"} mb-2`}>$WIZ Estimator</h3>
        <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-wiz-dark"} group-hover:scale-110 transition-transform`}>~42.69 $WIZ</p>
        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Based on your current activity</p>
        
        {/* Sparkle animation popup */}
        {showPlusSparkles && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-wiz-purple text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
            +10 ✨
          </div>
        )}
      </div>
      
      {/* Sparkle History */}
      <div>
        <h3 className={`text-lg font-bold ${darkMode ? "text-wiz-banana" : "text-wiz-purple"} mb-2`}>Recent Sparkles</h3>
        <div className="space-y-2">
          <div className={`flex items-center p-2 ${darkMode ? "bg-yellow-500/10" : "bg-wiz-banana/20"} rounded-lg hover:scale-105 transition-transform cursor-pointer`}>
            <span className="text-xl mr-2 animate-pulse">✨</span>
            <div>
              <p className={`text-sm font-bold ${darkMode ? "text-white" : "text-wiz-dark"}`}>+10 Sparkles</p>
              <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Posted "When $WIZ pumps" meme</p>
            </div>
          </div>
          <div className={`flex items-center p-2 ${darkMode ? "bg-coral-500/10" : "bg-wiz-coral/20"} rounded-lg hover:scale-105 transition-transform cursor-pointer`}>
            <span className="text-xl mr-2">✨</span>
            <div>
              <p className={`text-sm font-bold ${darkMode ? "text-white" : "text-wiz-dark"}`}>+5 Sparkles</p>
              <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Daily login bonus</p>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-wiz-purple font-medium cursor-pointer hover:underline">
              View all sparkle history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeStats;
