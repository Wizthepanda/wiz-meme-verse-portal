
import React, { useState, useEffect } from "react";
import Cloud from "./Cloud";
import { cn } from "@/lib/utils";

interface AnimatedWizProps {
  className?: string;
}

const WIZARD_QUOTES = [
  "ZOOOOM!",
  "TO THE MOON!",
  "Huh?",
  "Ya sure about that?",
  "Meme detected!",
  "Such wow!",
  "Much meme!",
];

const AnimatedWiz: React.FC<AnimatedWizProps> = ({ className }) => {
  const [quote, setQuote] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  
  // Function to show a random quote
  const showRandomQuote = () => {
    const randomQuote = WIZARD_QUOTES[Math.floor(Math.random() * WIZARD_QUOTES.length)];
    setQuote(randomQuote);
    setShowQuote(true);
    
    // Hide the quote after 2 seconds
    setTimeout(() => {
      setShowQuote(false);
    }, 2000);
  };
  
  return (
    <div className={cn("relative", className)}>
      <Cloud width={300} height={180} className="animate-bounce">
        <div className="relative">
          {/* The Wizard (Panda) character */}
          <div className="text-8xl animate-bounce">🐼</div>
          
          {/* Staff/Joystick */}
          <div className="absolute -right-2 bottom-2 text-2xl transform rotate-45">🪄</div>
          
          {/* Speech bubble */}
          {showQuote && (
            <div className="absolute -top-16 -right-4 bg-white px-4 py-2 rounded-2xl border-2 border-wiz-purple animate-puff-in">
              <div className="text-xl font-bubblegum text-wiz-purple">{quote}</div>
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r-2 border-b-2 border-wiz-purple transform rotate-45"></div>
            </div>
          )}
        </div>
      </Cloud>
      
      {/* Clickable area */}
      <button
        className="absolute inset-0 w-full h-full cursor-pointer"
        onClick={showRandomQuote}
        aria-label="Interact with Wiz"
      />
    </div>
  );
};

export default AnimatedWiz;
