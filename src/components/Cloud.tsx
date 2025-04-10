
import React from "react";
import { cn } from "@/lib/utils";

interface CloudProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  color?: string;
}

export const Cloud: React.FC<CloudProps> = ({
  className,
  style,
  children,
  width = 200,
  height = 120,
  color = "#F9FAFB",
}) => {
  return (
    <div
      className={cn(
        "relative inline-block animate-float",
        className
      )}
      style={{
        ...style,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg
        viewBox="0 0 200 120"
        width={width}
        height={height}
        className="absolute top-0 left-0"
      >
        <path
          d="M45,100 Q0,100 0,70 Q0,40 25,40 Q25,10 55,10 Q85,10 85,40 Q115,40 115,60 Q145,60 145,80 Q175,80 175,100 Q175,100 45,100 Z"
          fill={color}
          stroke="#DCC6FF"
          strokeWidth="2"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {children}
      </div>
    </div>
  );
};

export default Cloud;
