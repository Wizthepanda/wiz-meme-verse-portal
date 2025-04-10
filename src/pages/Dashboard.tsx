
import React, { useState } from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Moon, Sun } from "lucide-react";
import TopBar from "@/components/dashboard/TopBar";
import MemeStats from "@/components/dashboard/MemeStats";
import MemeQuests from "@/components/dashboard/MemeQuests";
import MemeFeed from "@/components/dashboard/MemeFeed";
import FloatingElements from "@/components/FloatingElements";
import Cloud from "@/components/Cloud";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-purple-900/50 via-indigo-800/30 to-blue-900/40" 
        : "bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30"
    }`}>
      {/* Ambient sparkles background */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingElements />
      </div>
      
      {/* Top navigation */}
      <TopBar />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bubblegum text-wiz-purple">WIZ Control Deck</h1>
            <p className={`text-gray-600 ${darkMode ? "text-gray-300" : ""}`}>
              Welcome back to the Memeverse, meme lord!
            </p>
          </div>
          
          {/* Dark mode toggle */}
          <button 
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-all ${
              darkMode 
                ? "bg-purple-800/50 text-yellow-200 hover:bg-purple-700/50" 
                : "bg-wiz-purple/10 text-wiz-purple hover:bg-wiz-purple/20"
            }`}
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
        
        {/* Meme Machine floating button */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <button 
              className="fixed bottom-6 right-6 z-30 bg-wiz-purple text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-200 animate-bounce"
              aria-label="Meme Machine"
            >
              <div className="relative">
                <span className="text-2xl">🎮</span>
                <span className="absolute -top-1 -right-1 text-xs animate-pulse">✨</span>
              </div>
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-4 bg-wiz-banana/20 backdrop-blur-md border-2 border-wiz-purple/30 rounded-xl">
            <h3 className="font-bubblegum text-lg text-wiz-purple mb-2">Meme Machine</h3>
            <p className="text-sm text-gray-700">Create and share your memes with the Memeverse!</p>
          </HoverCardContent>
        </HoverCard>
        
        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column */}
          <div>
            <Cloud width={320} height={220} className="mb-6">
              <MemeStats className="bg-transparent border-0 shadow-none" darkMode={darkMode} />
            </Cloud>
            
            {/* Activity heatmap */}
            <Cloud width={320} height={170}>
              <div className="p-4 flex flex-col items-start w-full h-full">
                <h3 className="text-lg font-bubblegum text-wiz-purple mb-3">Meme Streaks</h3>
                <div className="w-full grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const intensity = Math.floor(Math.random() * 4);
                    return (
                      <div 
                        key={i}
                        className={`w-full aspect-square rounded-sm ${
                          intensity === 0 ? "bg-gray-200" :
                          intensity === 1 ? "bg-wiz-mint/30" :
                          intensity === 2 ? "bg-wiz-mint/60" :
                          "bg-wiz-purple/60"
                        }`}
                        title={`${intensity * 2} memes`}
                      />
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2">Your 5-week meme history</p>
              </div>
            </Cloud>
          </div>
          
          {/* Middle column */}
          <div>
            <Cloud width={320} height={450}>
              <MemeFeed className="bg-transparent border-0 shadow-none" darkMode={darkMode} />
            </Cloud>
          </div>
          
          {/* Right column */}
          <div>
            <Cloud width={320} height={450} color={darkMode ? "#2D1F6B" : "#F9FAFB"}>
              <ScrollArea className="h-[430px] w-full">
                <MemeQuests className="bg-transparent border-0 shadow-none" darkMode={darkMode} />
              </ScrollArea>
            </Cloud>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
