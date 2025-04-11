
import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30">
      <div className="flex flex-col items-center">
        <div className="animate-spin text-6xl mb-4">✨</div>
        <p className="text-wiz-dark font-bubblegum text-xl mb-2">Conjuring magic...</p>
        <p className="text-wiz-dark/70 text-sm">Please wait while we authenticate your account</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
