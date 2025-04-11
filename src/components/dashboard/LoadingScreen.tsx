
import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30">
      <div className="animate-spin text-6xl">✨</div>
    </div>
  );
};

export default LoadingScreen;
