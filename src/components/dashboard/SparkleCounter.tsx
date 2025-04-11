
import React from "react";

interface SparkleCounterProps {
  count: number;
}

const SparkleCounter: React.FC<SparkleCounterProps> = ({ count }) => {
  return (
    <div className="flex items-center space-x-2 bg-wiz-banana/20 px-4 py-2 rounded-full hover:bg-wiz-banana/30 transition-all cursor-pointer">
      <span className="text-xl animate-pulse">✨</span>
      <span className="font-bubblegum text-xl text-wiz-purple">{count || 0}</span>
    </div>
  );
};

export default SparkleCounter;
