
import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30">
      {children}
    </div>
  );
};

export default DashboardLayout;
