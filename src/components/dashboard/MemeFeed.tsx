
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Repeat, Share2, Flame, Award, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MemePostProps {
  username: string;
  content: string;
  emoji: string;
  likes: number;
  comments: number;
  reposts: number;
  timeAgo: string;
  darkMode?: boolean;
}

const MemePost: React.FC<MemePostProps> = ({
  username,
  content,
  emoji,
  likes,
  comments,
  reposts,
  timeAgo,
  darkMode = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  
  const handleLike = () => {
    if (!liked) {
      setLikeCount(prev => prev + 1);
      setLiked(true);
      toast({
        title: "WIZ says:",
        description: "YO THAT'S VIRAL! Great taste in memes!",
        variant: "default",
      });
    } else {
      setLikeCount(prev => prev - 1);
      setLiked(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-indigo-900/40" : "bg-white/90"} rounded-lg p-4 mb-4 border ${darkMode ? "border-purple-500/30" : "border-wiz-lavender/30"} hover:shadow-md transition-all group`}>
      {/* Header */}
      <div className="flex items-center mb-3">
        <div className={`w-8 h-8 rounded-full ${darkMode ? "bg-indigo-600/30" : "bg-wiz-purple/20"} flex items-center justify-center mr-2 group-hover:rotate-12 transition-transform`}>
          {/* Placeholder avatar */}
          <span>{emoji}</span>
        </div>
        <div>
          <p className={`font-bold text-sm ${darkMode ? "text-white" : "text-wiz-dark"}`}>{username}</p>
          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{timeAgo}</p>
        </div>
      </div>
      
      {/* Content */}
      <p className={`text-sm mb-4 ${darkMode ? "text-gray-200" : ""}`}>{content}</p>
      
      {/* Meme content placeholder */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg h-48 mb-3 flex items-center justify-center hover:scale-[1.02] transition-transform cursor-pointer`}>
        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-400"}`}>Meme content would be here</p>
      </div>
      
      {/* Actions */}
      <div className={`flex justify-between text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        <button 
          className={`flex items-center space-x-1 transition-colors ${
            liked 
              ? 'text-wiz-coral' 
              : darkMode ? 'hover:text-pink-400' : 'hover:text-wiz-coral'
          }`}
          onClick={handleLike}
        >
          <Heart size={16} className={liked ? "fill-wiz-coral" : ""} />
          <span>{likeCount}</span>
        </button>
        <button className={`flex items-center space-x-1 ${darkMode ? "hover:text-indigo-400" : "hover:text-wiz-purple"} transition-colors`}>
          <MessageCircle size={16} />
          <span>{comments}</span>
        </button>
        <button className={`flex items-center space-x-1 ${darkMode ? "hover:text-green-400" : "hover:text-wiz-mint"} transition-colors`}>
          <Repeat size={16} />
          <span>{reposts}</span>
        </button>
        <button className={`flex items-center space-x-1 ${darkMode ? "hover:text-yellow-400" : "hover:text-wiz-banana"} transition-colors group`}>
          <Share2 size={16} className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};

interface MemeFeedProps {
  className?: string;
  darkMode?: boolean;
}

const MemeFeed: React.FC<MemeFeedProps> = ({ className, darkMode = false }) => {
  const [activeTab, setActiveTab] = useState("trending");
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    // Show popup with animation on first load
    setTimeout(() => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }, 2000);
  }, []);

  return (
    <div className={cn(
      "h-full w-full p-6 relative",
      className
    )}>
      <h2 className={`text-2xl font-bubblegum ${darkMode ? "text-wiz-banana" : "text-wiz-purple"} mb-4`}>Live Chaos</h2>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          className={`rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1 transition-all ${
            activeTab === "trending" 
              ? (darkMode ? "bg-red-500/30 text-white" : "bg-wiz-coral/20 text-wiz-coral border border-wiz-coral/30") 
              : (darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600")
          }`}
          onClick={() => setActiveTab("trending")}
        >
          <Flame size={14} className={activeTab === "trending" ? "animate-pulse" : ""} />
          Trending
        </button>
        <button 
          className={`rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1 transition-all ${
            activeTab === "latest" 
              ? (darkMode ? "bg-purple-500/30 text-white" : "bg-wiz-purple/20 text-wiz-purple border border-wiz-purple/30") 
              : (darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600")
          }`}
          onClick={() => setActiveTab("latest")}
        >
          <Sparkles size={14} className={activeTab === "latest" ? "animate-pulse" : ""} />
          Sparkled Up
        </button>
        <button 
          className={`rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1 transition-all ${
            activeTab === "picks" 
              ? (darkMode ? "bg-yellow-500/30 text-white" : "bg-wiz-banana/20 text-wiz-dark border border-wiz-banana/50") 
              : (darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600")
          }`}
          onClick={() => setActiveTab("picks")}
        >
          <Award size={14} className={activeTab === "picks" ? "animate-pulse" : ""} />
          WIZ Picks
        </button>
      </div>
      
      {/* WIZ voice popup */}
      {showPopup && (
        <div className="absolute top-16 right-4 bg-wiz-purple text-white py-2 px-4 rounded-xl rounded-tr-none shadow-lg animate-bounce z-10">
          <p className="text-sm font-bold">YO CHECK THE FRESH MEMES!</p>
          <div className="absolute -bottom-2 right-2 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-wiz-purple"></div>
        </div>
      )}
      
      {/* Meme Feed */}
      <div className="max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-wiz-purple/20 scrollbar-track-transparent">
        <MemePost
          username="@doge_lover"
          content="When the market dips but you're still HODLing $WIZ"
          emoji="🐶"
          likes={42}
          comments={7}
          reposts={12}
          timeAgo="5m ago"
          darkMode={darkMode}
        />
        <MemePost
          username="@memeking"
          content="How it started vs how it's going #WIZgang"
          emoji="👑"
          likes={128}
          comments={24}
          reposts={35}
          timeAgo="27m ago"
          darkMode={darkMode}
        />
        <MemePost
          username="@crypto_pepe"
          content="POV: You just found out about $WIZ"
          emoji="🐸"
          likes={69}
          comments={13}
          reposts={21}
          timeAgo="1h ago"
          darkMode={darkMode}
        />
        <MemePost
          username="@wizzy_bear"
          content="My face when someone says memes aren't valuable"
          emoji="🐻"
          likes={87}
          comments={19}
          reposts={14}
          timeAgo="3h ago"
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default MemeFeed;
