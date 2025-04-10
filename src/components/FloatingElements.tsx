
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  emoji: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
  speed?: "slow" | "medium" | "fast";
  className?: string;
  animationType?: "float" | "orbit" | "bounce";
  onClick?: () => void;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  emoji,
  delay = 0,
  size = "md",
  speed = "medium",
  className = "",
  animationType = "float",
  onClick,
}) => {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
  
  // Random starting positions
  useEffect(() => {
    setPosition({
      x: Math.random() * 80 + 10, // Between 10-90% of the container width
      y: Math.random() * 80 + 10, // Between 10-90% of the container height
    });
  }, []);

  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const speedClasses = {
    slow: animationType === "float" ? "animate-float-slow" : animationType === "orbit" ? "[animation-duration:20s]" : "animate-bounce [animation-duration:3s]",
    medium: animationType === "float" ? "animate-float" : animationType === "orbit" ? "[animation-duration:15s]" : "animate-bounce",
    fast: animationType === "float" ? "animate-float [animation-duration:4s]" : animationType === "orbit" ? "[animation-duration:10s]" : "animate-bounce [animation-duration:1s]",
  };

  const animationClasses = {
    float: "animate-float",
    orbit: "animate-orbit",
    bounce: "animate-bounce",
  };

  return (
    <div
      className={cn(
        "absolute cursor-pointer transform transition-opacity z-10",
        sizeClasses[size],
        speedClasses[speed],
        animationClasses[animationType],
        className
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}s`,
      }}
      onClick={onClick}
    >
      {emoji}
    </div>
  );
};

export const FloatingElements: React.FC = () => {
  const playSound = (sound: string) => {
    const audio = new Audio(sound);
    audio.volume = 0.2;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const handleClick = (emoji: string) => {
    // We would add actual sound files in a production app
    console.log(`${emoji} clicked! Boing!`);
    playSound("/boing.mp3");
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        <FloatingElement 
          emoji="🍕" 
          size="md" 
          speed="slow" 
          delay={0} 
          animationType="float"
          className="pointer-events-auto"
          onClick={() => handleClick("🍕")} 
        />
        <FloatingElement 
          emoji="🐶" 
          size="lg" 
          speed="medium" 
          delay={1.5} 
          animationType="float"
          className="pointer-events-auto"
          onClick={() => handleClick("🐶")} 
        />
        <FloatingElement 
          emoji="🎍" 
          size="md" 
          speed="fast" 
          delay={0.8} 
          animationType="float"
          className="pointer-events-auto"
          onClick={() => handleClick("🎍")} 
        />
        <FloatingElement 
          emoji="✨" 
          size="sm" 
          speed="fast" 
          delay={0.3} 
          animationType="bounce"
          className="pointer-events-auto"
          onClick={() => handleClick("✨")} 
        />
        <FloatingElement 
          emoji="🐸" 
          size="md" 
          speed="medium" 
          delay={2.2} 
          animationType="float"
          className="pointer-events-auto"
          onClick={() => handleClick("🐸")} 
        />
        <FloatingElement 
          emoji="🐻" 
          size="lg" 
          speed="slow" 
          delay={1.1} 
          animationType="float"
          className="pointer-events-auto"
          onClick={() => handleClick("🐻")} 
        />
        <FloatingElement 
          emoji="🐧" 
          size="md" 
          speed="medium" 
          delay={0.5} 
          animationType="orbit"
          className="pointer-events-auto"
          onClick={() => handleClick("🐧")} 
        />
      </div>
    </div>
  );
};

export default FloatingElements;
