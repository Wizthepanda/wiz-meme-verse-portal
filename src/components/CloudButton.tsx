
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CloudButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const CloudButton: React.FC<CloudButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const handleClick = () => {
    // Play sound (would be implemented with an actual sound file)
    console.log("Squish sound!");
    
    // Trigger the onClick handler
    if (onClick) onClick();
  };
  
  return (
    <button
      className={cn(
        "relative px-8 py-4 text-xl font-bubblegum text-wiz-purple",
        "cloud-button overflow-hidden z-10",
        "transition-all duration-300",
        isHovering ? "animate-jiggle shadow-lg" : "",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovering(true);
        // Play hover sound (would be implemented with an actual sound file)
        console.log("Slide whistle up sound!");
      }}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Sparkle effect on hover */}
      {isHovering && (
        <>
          <span className="absolute top-0 left-1/4 text-xl animate-sparkle text-yellow-400 z-20">✨</span>
          <span className="absolute bottom-0 right-1/4 text-xl animate-sparkle text-yellow-400 z-20" style={{ animationDelay: "0.3s" }}>✨</span>
          <span className="absolute top-1/2 right-0 text-xl animate-sparkle text-yellow-400 z-20" style={{ animationDelay: "0.6s" }}>✨</span>
        </>
      )}
    </button>
  );
};

export default CloudButton;
