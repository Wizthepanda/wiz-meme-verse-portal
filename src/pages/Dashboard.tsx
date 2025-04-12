
import React, { useState } from "react";
import TopBar from "@/components/dashboard/TopBar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import LoadingScreen from "@/components/dashboard/LoadingScreen";

const Dashboard = () => {
  const [initializing, setInitializing] = useState(true);
  
  // Simulate a short loading state for visual effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitializing(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show loading state while initializing
  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <DashboardLayout>
      {/* Top navigation */}
      <TopBar />
      
      {/* Main content */}
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
