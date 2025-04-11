
import React from "react";
import { Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import WizGallery from "@/components/dashboard/WizGallery";

const DashboardGallery: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-wiz-lavender/30 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bubblegum text-wiz-purple flex items-center gap-2">
          <Sparkles className="text-wiz-banana" size={isMobile ? 16 : 20} />
          Gallery
        </h2>
        <div className="text-xs md:text-sm bg-wiz-purple/10 px-3 py-1 rounded-full text-wiz-purple">
          <span className="font-bold">42</span> trending memes
        </div>
      </div>
      
      <WizGallery />
    </div>
  );
};

export default DashboardGallery;
