
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
  const { user, isLoading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [initializing, setInitializing] = useState(true);
  
  // On mount, check if we're being redirected from Twitter OAuth
  useEffect(() => {
    const checkForRedirect = async () => {
      console.log("Dashboard - Current URL:", window.location.href);
      console.log("Dashboard - Location state:", location);
      
      // Check if we have a hash fragment from OAuth redirect
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const errorCode = hashParams.get('error');
      
      if (accessToken) {
        console.log("Access token detected in URL");
        // Clear the hash for security
        window.history.replaceState({}, document.title, window.location.pathname);
        
        toast({
          title: "Login successful!",
          description: "Welcome to the Meme Wizard dashboard!",
        });
      } else if (errorCode) {
        console.error("Auth error:", errorCode);
        toast({
          title: "Login failed",
          description: "There was an error connecting to Twitter. Please try again.",
          variant: "destructive",
        });
        
        // Navigate back to home on error
        navigate("/");
      }
      
      // Set initializing to false after a short delay
      setTimeout(() => {
        setInitializing(false);
      }, 1000);
    };
    
    checkForRedirect();
  }, [toast, navigate, location]);
  
  // Debug output for auth state
  useEffect(() => {
    console.log("Dashboard - Auth state:", { 
      user: user ? { id: user.id } : null,
      session: session ? { token: "exists" } : null,
      isLoading, 
      initializing
    });
  }, [user, session, isLoading, initializing]);
  
  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !initializing && !user) {
      console.log("Not authenticated, redirecting to home");
      navigate('/');
    }
  }, [user, isLoading, initializing, navigate]);

  // Show loading state while initializing or authenticating
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
