
import React, { useEffect } from "react";
import TopBar from "@/components/dashboard/TopBar";
import MemeStats from "@/components/dashboard/MemeStats";
import MemeQuests from "@/components/dashboard/MemeQuests";
import WizGallery from "@/components/dashboard/WizGallery";
import MemeFeed from "@/components/dashboard/MemeFeed";
import { Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const isMobile = useIsMobile();

  // Add beautiful entry animations
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('opacity-100', 'translate-y-0');
      }, 100 * index);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30">
      {/* Top navigation */}
      <TopBar />
      
      {/* Main content */}
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="fade-in-element opacity-0 translate-y-3 transition-all duration-500 ease-out">
            <h1 className="text-2xl sm:text-3xl font-bubblegum text-wiz-purple">WIZ Control Deck</h1>
            <p className="text-gray-600 text-sm sm:text-base">Welcome back to the Memeverse, meme lord!</p>
          </div>
          
          {/* Dashboard status indicator */}
          <div className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-wiz-lavender/20 fade-in-element opacity-0 translate-y-3 transition-all duration-500 ease-out delay-200">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-wiz-purple font-medium">Live Dashboard</span>
          </div>
        </div>
        
        {/* Dashboard grid - enhanced with better responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left column - Meme Stats */}
          <div className="lg:col-span-5 xl:col-span-4 fade-in-element opacity-0 translate-y-3 transition-all duration-500 ease-out delay-100">
            <MemeStats className="mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300" />
          </div>
          
          {/* Right column - Magic Missions */}
          <div className="lg:col-span-7 xl:col-span-8 fade-in-element opacity-0 translate-y-3 transition-all duration-500 ease-out delay-200">
            <MemeFeed className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300" />
          </div>
          
          {/* Full width gallery */}
          <div className="lg:col-span-12 fade-in-element opacity-0 translate-y-3 transition-all duration-500 ease-out delay-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-wiz-lavender/30">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bubblegum text-wiz-purple flex items-center gap-2">
                  <Sparkles className="text-wiz-banana" size={isMobile ? 18 : 20} />
                  Gallery
                </h2>
                <div className="text-xs sm:text-sm bg-wiz-purple/10 px-2 sm:px-3 py-1 rounded-full text-wiz-purple border border-wiz-purple/20">
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
