
import React from "react";
import AnimatedLogo from "@/components/AnimatedLogo";
import AnimatedWiz from "@/components/AnimatedWiz";

const HeaderSection = () => {
  return (
    <>
      {/* Logo */}
      <AnimatedLogo className="mb-16" />
      
      {/* Animated Wizard */}
      <AnimatedWiz className="mb-12" />
      
      {/* Headline */}
      <h2 className="text-3xl md:text-5xl font-bubblegum text-wiz-dark mb-6 text-center animate-slide-in">
        HALT, MORTAL! Can you even meme?
      </h2>
      
      {/* Subtext */}
      <p className="max-w-2xl text-xl md:text-2xl text-wiz-dark mb-12 text-center animate-slide-in">
        Link yer Twitter, unleash chaos, rack up 
        <span className="inline-block mx-1 sparkle-element text-wiz-purple">✨Sparkles✨</span> 
        &amp; grab that $WIZ. No bots. No normies. Just meme lords.
      </p>
    </>
  );
};

export default HeaderSection;
