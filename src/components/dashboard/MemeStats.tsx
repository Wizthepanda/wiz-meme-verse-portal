
import React from "react";
import { cn } from "@/lib/utils";

interface MemeStatsProps {
  className?: string;
}

const MemeStats: React.FC<MemeStatsProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-wiz-lavender/30",
      className
    )}>
      <h2 className="text-2xl font-bubblegum text-wiz-purple mb-4">Your Meme Journey</h2>
      
      {/* Dynamic Rank */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-wiz-purple/20 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">🐼</span>
        </div>
        <div>
          <p className="text-lg font-bold text-wiz-dark">Cloud Lurker</p>
          <p className="text-sm text-gray-600">Level 3 Memer</p>
        </div>
      </div>
      
      {/* XP Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">Meme XP</span>
          <span className="text-sm font-bold text-wiz-purple">247/500</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-wiz-mint to-wiz-purple rounded-full"
            style={{ width: "49%" }}
          ></div>
        </div>
      </div>
      
      {/* $WIZ Estimator */}
      <div className="bg-wiz-lavender/20 rounded-lg p-4 mb-6 relative overflow-hidden">
        <span className="absolute -right-2 -top-2 text-2xl animate-sparkle">⚡</span>
        <h3 className="text-lg font-bold text-wiz-purple mb-2">$WIZ Estimator</h3>
        <p className="text-2xl font-bold">~42.69 $WIZ</p>
        <p className="text-sm text-gray-600">Based on your current activity</p>
      </div>
      
      {/* Sparkle History */}
      <div>
        <h3 className="text-lg font-bold text-wiz-purple mb-2">Recent Sparkles</h3>
        <div className="space-y-2">
          <div className="flex items-center p-2 bg-wiz-banana/20 rounded-lg">
            <span className="text-xl mr-2">✨</span>
            <div>
              <p className="text-sm font-bold">+10 Sparkles</p>
              <p className="text-xs text-gray-600">Posted "When $WIZ pumps" meme</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-wiz-coral/20 rounded-lg">
            <span className="text-xl mr-2">✨</span>
            <div>
              <p className="text-sm font-bold">+5 Sparkles</p>
              <p className="text-xs text-gray-600">Daily login bonus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeStats;
