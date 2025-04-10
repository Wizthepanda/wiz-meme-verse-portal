
import React, { useEffect, useRef } from "react";
import Cloud from "./Cloud";

const ParallaxClouds: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const layers = containerRef.current.querySelectorAll(".parallax-layer");
      const container = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the container
      const relX = (e.clientX - container.left) / container.width;
      const relY = (e.clientY - container.top) / container.height;
      
      // Move each layer with different intensity
      layers.forEach((layer, index) => {
        const htmlLayer = layer as HTMLElement;
        const depth = parseInt(htmlLayer.getAttribute("data-depth") || "5");
        const moveX = (relX - 0.5) * depth * 20;
        const moveY = (relY - 0.5) * depth * 20;
        
        htmlLayer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background color gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-wiz-lavender via-wiz-coral to-wiz-banana opacity-30"></div>
      
      {/* Layer 1 - Far clouds */}
      <div className="parallax-layer absolute inset-0" data-depth="1">
        <Cloud className="absolute top-[10%] left-[10%] opacity-30" width={180} height={100} color="#DCC6FF" />
        <Cloud className="absolute top-[30%] left-[80%] opacity-30" width={220} height={130} color="#FFD966" />
        <Cloud className="absolute top-[60%] left-[25%] opacity-30" width={200} height={100} color="#FF9F9F" />
        <Cloud className="absolute top-[80%] left-[70%] opacity-30" width={150} height={80} color="#DCC6FF" />
      </div>
      
      {/* Layer 2 - Mid clouds */}
      <div className="parallax-layer absolute inset-0" data-depth="3">
        <Cloud className="absolute top-[5%] left-[30%] opacity-50" width={250} height={150} color="#FFD966" />
        <Cloud className="absolute top-[40%] left-[60%] opacity-50" width={200} height={120} color="#FF9F9F" />
        <Cloud className="absolute top-[70%] left-[15%] opacity-50" width={220} height={130} color="#DCC6FF" />
      </div>
      
      {/* Layer 3 - Close clouds */}
      <div className="parallax-layer absolute inset-0" data-depth="5">
        <Cloud className="absolute top-[15%] left-[50%] opacity-70" width={300} height={180} color="#F9FAFB" />
        <Cloud className="absolute top-[50%] left-[20%] opacity-70" width={250} height={150} color="#F9FAFB" />
        <Cloud className="absolute top-[75%] left-[60%] opacity-70" width={280} height={170} color="#F9FAFB" />
      </div>
    </div>
  );
};

export default ParallaxClouds;
