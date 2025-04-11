
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bubblegum text-wiz-purple mb-1">{title}</h1>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      
      {/* Dashboard status indicator */}
      <div className="mt-2 sm:mt-0 flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm text-wiz-purple font-medium">Live Dashboard</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
