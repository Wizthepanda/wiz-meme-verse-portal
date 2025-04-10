
import React from "react";
import TopBar from "@/components/dashboard/TopBar";
import MemeStats from "@/components/dashboard/MemeStats";
import MemeQuests from "@/components/dashboard/MemeQuests";
import MemeFeed from "@/components/dashboard/MemeFeed";
import { Link } from "react-router-dom";

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
          <div className="flex gap-2">
            <Link 
              to="/meme-feed" 
              className="px-4 py-2 bg-wiz-purple/10 hover:bg-wiz-purple/20 text-wiz-purple rounded-full transition-colors font-medium text-sm"
            >
              View All Memes
            </Link>
            <Link 
              to="/magic-missions" 
              className="px-4 py-2 bg-wiz-coral/10 hover:bg-wiz-coral/20 text-wiz-coral rounded-full transition-colors font-medium text-sm"
            >
              See All Quests
            </Link>
          </div>
        </div>
        
        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column */}
          <div>
            <MemeStats className="mb-6" />
            <MemeQuests />
          </div>
          
          {/* Right column (spans 2 columns) */}
          <div className="md:col-span-2">
            <MemeFeed />
          </div>
        </div>
        
        {/* Bottom navigation */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-wiz-lavender/30">
          <h2 className="text-2xl font-bubblegum text-wiz-purple mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/dashboard" className="p-4 bg-wiz-lavender/20 rounded-lg text-center hover:bg-wiz-lavender/30 transition-colors">
              <span className="block text-2xl mb-2">🏠</span>
              <span className="font-medium text-wiz-purple">Dashboard</span>
            </Link>
            <Link to="/meme-feed" className="p-4 bg-wiz-mint/20 rounded-lg text-center hover:bg-wiz-mint/30 transition-colors">
              <span className="block text-2xl mb-2">😂</span>
              <span className="font-medium text-wiz-purple">Meme Feed</span>
            </Link>
            <Link to="/magic-missions" className="p-4 bg-wiz-coral/20 rounded-lg text-center hover:bg-wiz-coral/30 transition-colors">
              <span className="block text-2xl mb-2">✨</span>
              <span className="font-medium text-wiz-purple">Magic Missions</span>
            </Link>
            <Link to="/leaderboard" className="p-4 bg-wiz-banana/20 rounded-lg text-center hover:bg-wiz-banana/30 transition-colors">
              <span className="block text-2xl mb-2">🏆</span>
              <span className="font-medium text-wiz-purple">Leaderboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
