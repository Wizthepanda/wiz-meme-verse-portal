
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "@/components/dashboard/TopBar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import LoadingScreen from "@/components/dashboard/LoadingScreen";

const Dashboard = () => {
  const { user, isLoading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Log current auth state
    console.log("Dashboard - Auth state:", { 
      user: user?.id, 
      isLoading,
      hasSession: !!session,
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    });
    
    // If hash contains auth info, log it
    if (location.hash && location.hash.includes('access_token')) {
      console.log("Dashboard - Auth hash detected:", location.hash);
    }
    
    // If not logged in and not loading, redirect to home
    if (!isLoading && !user) {
      console.log("Dashboard - Not logged in, redirecting to home");
      navigate('/');
    }
  }, [user, isLoading, session, navigate, location]);
  
  // Check for auth provider callback errors in URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get('error');
    const errorDescription = queryParams.get('error_description');
    
    if (error) {
      console.error("Auth error:", error, errorDescription);
      toast({
        title: "Authentication Error",
        description: errorDescription || "There was a problem with Twitter authentication.",
        variant: "destructive",
      });
      
      // Clear error params from URL to prevent showing the error multiple times
      if (window.history && window.history.replaceState) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, [toast]);

  // Show loading screen while authenticating
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
