
import React from "react";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Repeat, Share2, TrendingUp, Clock, Star } from "lucide-react";
import { playSound } from "@/utils/soundEffects";

interface MemePostProps {
  username: string;
  content: string;
  emoji: string;
  likes: number;
  comments: number;
  reposts: number;
  timeAgo: string;
}

const MemePost: React.FC<MemePostProps> = ({
  username,
  content,
  emoji,
  likes,
  comments,
  reposts,
  timeAgo,
}) => {
  return (
    <div className="bg-white/90 rounded-lg p-4 mb-4 border border-wiz-lavender/30 hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-wiz-purple/20 flex items-center justify-center mr-2">
          {/* Placeholder avatar */}
          <span>{emoji}</span>
        </div>
        <div>
          <p className="font-bold text-sm text-wiz-dark">{username}</p>
          <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>
      </div>
      
      {/* Content */}
      <p className="text-sm mb-4">{content}</p>
      
      {/* Meme content placeholder */}
      <div className="bg-gray-100 rounded-lg h-48 mb-3 flex items-center justify-center">
        <p className="text-gray-400 text-sm font-medium">Meme content would be here</p>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between text-sm text-gray-500">
        <button className="flex items-center space-x-1 hover:text-wiz-coral transition-colors">
          <Heart size={16} />
          <span>{likes}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-wiz-purple transition-colors">
          <MessageCircle size={16} />
          <span>{comments}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-wiz-mint transition-colors">
          <Repeat size={16} />
          <span>{reposts}</span>
        </button>
        <button 
          className="flex items-center space-x-1 hover:text-wiz-banana transition-colors"
          onClick={() => playSound('memePost', 0.3)}
        >
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
};

interface MemeFeedProps {
  className?: string;
}

const MemeFeed: React.FC<MemeFeedProps> = ({ className }) => {
  // Handle tab click with sound effect
  const handleTabClick = () => {
    playSound('tabClick', 0.3);
  };

  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-wiz-lavender/30",
      className
    )}>
      <h2 className="text-xl sm:text-2xl font-bubblegum text-wiz-purple mb-4">Magic Mission</h2>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        <button 
          onClick={handleTabClick}
          className="px-3 sm:px-4 py-2 border-b-2 border-wiz-purple text-wiz-purple font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
        >
          🔥 Trending
        </button>
        <button 
          onClick={handleTabClick}
          className="px-3 sm:px-4 py-2 text-gray-500 font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0 hover:text-gray-700 transition-colors"
        >
          ✨ Latest
        </button>
        <button 
          onClick={handleTabClick}
          className="px-3 sm:px-4 py-2 text-gray-500 font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0 hover:text-gray-700 transition-colors"
        >
          🐼 WIZ Picks
        </button>
      </div>
      
      {/* Meme Feed */}
      <div className="max-h-[500px] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-wiz-purple/20 scrollbar-track-transparent">
        <MemePost
          username="@doge_lover"
          content="When the market dips but you're still HODLing $WIZ"
          emoji="🐶"
          likes={42}
          comments={7}
          reposts={12}
          timeAgo="5m ago"
        />
        <MemePost
          username="@memeking"
          content="How it started vs how it's going #WIZgang"
          emoji="👑"
          likes={128}
          comments={24}
          reposts={35}
          timeAgo="27m ago"
        />
        <MemePost
          username="@crypto_pepe"
          content="POV: You just found out about $WIZ"
          emoji="🐸"
          likes={69}
          comments={13}
          reposts={21}
          timeAgo="1h ago"
        />
        <MemePost
          username="@wizzy_bear"
          content="My face when someone says memes aren't valuable"
          emoji="🐻"
          likes={87}
          comments={19}
          reposts={14}
          timeAgo="3h ago"
        />
      </div>
    </div>
  );
};

export default MemeFeed;
