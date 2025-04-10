
import React from "react";
import TopBar from "@/components/dashboard/TopBar";
import MemeStats from "@/components/dashboard/MemeStats";
import MemeQuests from "@/components/dashboard/MemeQuests";
import WizGallery from "@/components/dashboard/WizGallery";
import { Sparkles } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30">
      {/* Top navigation */}
      <TopBar />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bubblegum text-wiz-purple">WIZ Control Deck</h1>
            <p className="text-gray-600">Welcome back to the Memeverse, meme lord!</p>
          </div>
          
          {/* Dashboard status indicator */}
          <div className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-wiz-purple font-medium">Live Dashboard</span>
          </div>
        </div>
        
        {/* Dashboard grid - updated layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Meme Stats */}
          <div className="lg:col-span-7">
            <MemeStats className="mb-6" />
          </div>
          
          {/* Right column - Magic Missions */}
          <div className="lg:col-span-5">
            <MemeQuests className="h-full" />
          </div>
          
          {/* Full width gallery */}
          <div className="lg:col-span-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-wiz-lavender/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bubblegum text-wiz-purple flex items-center gap-2">
                  <Sparkles className="text-wiz-banana" size={20} />
                  Gallery
                </h2>
                <div className="text-sm bg-wiz-purple/10 px-3 py-1 rounded-full text-wiz-purple">
                  <span className="font-bold">42</span> trending memes
                </div>
              </div>
              
              <WizGallery />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
