
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className={cn(
        "relative animate-puff-in",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h1 className={cn(
        "text-5xl md:text-6xl font-bubblegum tracking-wide",
        "bg-clip-text text-transparent bg-gradient-to-r from-wiz-purple via-wiz-coral to-wiz-banana",
        "stroke-2 stroke-wiz-dark",
        isHovering ? "animate-jiggle" : ""
      )}>
        WIZ the Panda
      </h1>
      
      {/* Sparkle effect on hover or initial load */}
      <span className="absolute -top-6 -left-6 text-3xl animate-sparkle text-yellow-400">✨</span>
      <span className="absolute -bottom-4 -right-4 text-3xl animate-sparkle text-yellow-400" style={{ animationDelay: "0.5s" }}>✨</span>
    </div>
  );
};

export default AnimatedLogo;
