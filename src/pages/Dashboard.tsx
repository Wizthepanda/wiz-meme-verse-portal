
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import TopBar from "@/components/dashboard/TopBar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import LoadingScreen from "@/components/dashboard/LoadingScreen";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to auth if not logged in
  useEffect(() => {
    console.log("Dashboard - Auth state:", { user, isLoading });
    if (!isLoading && !user) {
      console.log("Redirecting to auth from Dashboard");
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
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
