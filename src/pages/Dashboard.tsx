
import React from "react";
import TopBar from "@/components/dashboard/TopBar";
import MemeStats from "@/components/dashboard/MemeStats";
import MemeQuests from "@/components/dashboard/MemeQuests";
import WizGallery from "@/components/dashboard/WizGallery";

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
            <WizGallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
