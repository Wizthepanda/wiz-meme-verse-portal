
import React from "react";
import { cn } from "@/lib/utils";
import { Trophy, TrendingUp, ArrowUpRight, Zap } from "lucide-react";

interface MemeStatsProps {
  className?: string;
}

const MemeStats: React.FC<MemeStatsProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-wiz-lavender/30",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bubblegum text-wiz-purple flex items-center gap-2">
          <TrendingUp className="text-wiz-mint" size={20} />
          Your Meme Journey
        </h2>
        
        {/* Leaderboard rank */}
        <div className="flex items-center">
          <div className="relative group">
            <div className="flex items-center gap-1 bg-gradient-to-r from-wiz-purple/70 to-wiz-coral/70 text-white p-2 rounded-lg animate-pulse hover:animate-none hover:from-wiz-purple hover:to-wiz-coral transition-all shadow-md">
              <Trophy size={16} className="text-wiz-banana" />
              <span className="font-bold">42</span>
            </div>
            <div className="absolute -bottom-10 right-0 bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              Your global rank
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Dynamic Rank */}
        <div className="bg-gradient-to-br from-white to-wiz-lavender/10 p-4 rounded-lg border border-wiz-lavender/20 shadow-sm">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-wiz-purple/20 rounded-full flex items-center justify-center mr-4 shadow-inner">
              <span className="text-2xl">🐼</span>
            </div>
            <div>
              <p className="text-lg font-bold text-wiz-dark">Cloud Lurker</p>
              <p className="text-sm text-gray-600">Level 3 Memer</p>
              <div className="mt-1 flex items-center text-xs text-wiz-purple">
                <ArrowUpRight size={12} className="mr-1" />
                <span>Rising fast</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* $WIZ Estimator */}
        <div className="bg-gradient-to-br from-white to-wiz-mint/10 p-4 rounded-lg border border-wiz-mint/20 shadow-sm relative overflow-hidden">
          <span className="absolute -right-2 -top-2 text-2xl animate-pulse">⚡</span>
          <h3 className="text-lg font-bold text-wiz-purple mb-1 flex items-center gap-1">
            <Zap size={16} className="text-wiz-banana" />
            $WIZ Estimator
          </h3>
          <p className="text-2xl font-bold">~42.69 $WIZ</p>
          <p className="text-sm text-gray-600">Based on your current activity</p>
        </div>
      </div>
      
      {/* XP Bar */}
      <div className="mb-6 bg-white/70 p-4 rounded-lg border border-wiz-lavender/20 shadow-sm">
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
        <div className="mt-1 text-xs text-gray-500 flex justify-end">
          <span>253 XP to Level 4</span>
        </div>
      </div>
      
      {/* Sparkle History */}
      <div>
        <h3 className="text-lg font-bold text-wiz-purple mb-2 flex items-center gap-1">
          <span className="text-xl">✨</span>
          Recent Sparkles
        </h3>
        <div className="space-y-2">
          <div className="flex items-center p-3 bg-gradient-to-r from-wiz-banana/10 to-wiz-banana/20 rounded-lg border border-wiz-banana/20 transform transition-all hover:scale-102 hover:shadow-sm">
            <span className="text-xl mr-2">✨</span>
            <div>
              <p className="text-sm font-bold">+10 Sparkles</p>
              <p className="text-xs text-gray-600">Posted "When $WIZ pumps" meme</p>
            </div>
            <span className="ml-auto text-xs text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center p-3 bg-gradient-to-r from-wiz-coral/10 to-wiz-coral/20 rounded-lg border border-wiz-coral/20 transform transition-all hover:scale-102 hover:shadow-sm">
            <span className="text-xl mr-2">✨</span>
            <div>
              <p className="text-sm font-bold">+5 Sparkles</p>
              <p className="text-xs text-gray-600">Daily login bonus</p>
            </div>
            <span className="ml-auto text-xs text-gray-500">6h ago</span>
          </div>
          <div className="flex items-center p-3 bg-gradient-to-r from-wiz-mint/10 to-wiz-mint/20 rounded-lg border border-wiz-mint/20 transform transition-all hover:scale-102 hover:shadow-sm">
            <span className="text-xl mr-2">✨</span>
            <div>
              <p className="text-sm font-bold">+25 Sparkles</p>
              <p className="text-xs text-gray-600">Completed "Retweet Rampage" quest</p>
            </div>
            <span className="ml-auto text-xs text-gray-500">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeStats;
