
import React from "react";
import DashboardHeader from "./DashboardHeader";
import MemeQuests from "./MemeQuests";
import MemeStats from "./MemeStats";
import DashboardGallery from "./DashboardGallery";
import { playSoundEffect } from "@/utils/soundEffects";

const DashboardContent: React.FC = () => {
  // Function to handle level up sound effect
  const handleXpClick = () => {
    playSoundEffect('levelUp');
  };
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <DashboardHeader 
        title="WIZ Control Deck" 
        subtitle="Welcome back to the Memeverse, meme lord!" 
      />
      
      {/* Dashboard grid - 60/40 split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Magic Missions (Left - 60%) */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <MemeQuests className="h-full" />
        </div>
        
        {/* Meme Stats (Right - 40%) */}
        <div className="lg:col-span-5 order-1 lg:order-2" onClick={handleXpClick}>
          <MemeStats className="h-full" />
        </div>
        
        {/* Gallery Card - Full width below */}
        <div className="lg:col-span-12 order-3">
          <DashboardGallery />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
