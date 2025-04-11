
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import TopBar from "@/components/dashboard/TopBar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Check if we just completed an authentication flow
  useEffect(() => {
    // Look for authentication params in URL
    const justAuthenticated = location.search.includes('t=') || location.hash.includes('access_token');
    
    if (justAuthenticated && user) {
      console.log("User successfully authenticated and redirected to dashboard");
      
      toast({
        title: "Login successful!",
        description: "Welcome to the Meme Wizard dashboard!",
      });
      
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location.search, location.hash, user, toast]);
  
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
