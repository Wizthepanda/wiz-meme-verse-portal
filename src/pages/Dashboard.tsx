
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
    console.log("Dashboard - Current URL:", window.location.href);
    
    // Look for authentication indicators
    const hasToken = location.hash.includes('access_token');
    const hasError = location.hash.includes('error');
    
    if (hasToken && user) {
      console.log("User successfully authenticated and redirected to dashboard");
      
      toast({
        title: "Login successful!",
        description: "Welcome to the Meme Wizard dashboard!",
      });
      
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    } else if (hasError) {
      console.error("Authentication error in URL:", location.hash);
      toast({
        title: "Login failed",
        description: "There was an error connecting to Twitter. Please try again.",
        variant: "destructive",
      });
      
      // Clean URL and redirect to home
      window.history.replaceState({}, document.title, "/");
      navigate("/");
    }
    
    // Set initializing to false after a short delay to allow auth to complete
    const timer = setTimeout(() => {
      setInitializing(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [location.hash, user, toast, navigate]);
  
  // Redirect to home if not logged in
  useEffect(() => {
    console.log("Dashboard - Auth state:", { user, isLoading, initializing });
    if (!isLoading && !initializing && !user) {
      console.log("Redirecting to home from Dashboard");
      navigate('/');
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
