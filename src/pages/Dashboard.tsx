
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import TopBar from "@/components/dashboard/TopBar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [initializing, setInitializing] = useState(true);
  
  // Check for access token in URL hash on initial load
  useEffect(() => {
    const checkUrlForAuth = async () => {
      console.log("Dashboard - Current URL:", window.location.href);
      
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const errorCode = hashParams.get('error');
      
      if (accessToken) {
        console.log("Access token found in URL, setting session...");
        // Clear the URL hash for security
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // The Supabase client should detect this token because we set detectSessionInUrl to true
        // We'll just toast a success message
        toast({
          title: "Login successful!",
          description: "Welcome to the Meme Wizard dashboard!",
        });
      } else if (errorCode) {
        console.error("Authentication error in URL:", errorCode);
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
      setTimeout(() => {
        setInitializing(false);
      }, 1500);
    };
    
    checkUrlForAuth();
  }, [toast, navigate]);
  
  // Redirect to home if not logged in after initialization
  useEffect(() => {
    console.log("Dashboard - Auth state:", { user, isLoading, initializing });
    
    if (!isLoading && !initializing && !user) {
      console.log("Redirecting to home from Dashboard - user not authenticated");
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
