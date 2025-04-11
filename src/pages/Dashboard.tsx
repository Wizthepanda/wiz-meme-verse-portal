
import React, { useEffect, useState } from "react";
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
  const [initializing, setInitializing] = useState(true);
  
  // Check if we just completed an authentication flow
  useEffect(() => {
    // Look for authentication params in URL
    const params = new URLSearchParams(location.search);
    const hash = location.hash;
    
    // Consider different auth indicators
    const hasHashToken = hash.includes('access_token');
    const hasRefreshToken = hash.includes('refresh_token');
    const hasTimestamp = params.has('t');
    const hasRandomId = params.has('r');
    
    const justAuthenticated = hasHashToken || hasRefreshToken || hasTimestamp || hasRandomId;
    
    if (justAuthenticated && user) {
      console.log("User successfully authenticated and redirected to dashboard");
      
      toast({
        title: "Login successful!",
        description: "Welcome to the Meme Wizard dashboard!",
      });
      
      // Clean up the URL - remove both query params and hash
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
    
    // Set initializing to false after a short delay to allow auth to complete
    const timer = setTimeout(() => {
      setInitializing(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [location.search, location.hash, user, toast]);
  
  // Redirect to auth if not logged in
  useEffect(() => {
    console.log("Dashboard - Auth state:", { user, isLoading, initializing });
    if (!isLoading && !initializing && !user) {
      console.log("Redirecting to auth from Dashboard");
      navigate('/auth');
    }
  }, [user, isLoading, initializing, navigate]);

  // Show loading state while initializing or auth loading
  if (isLoading || initializing) {
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
