
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "@/components/dashboard/TopBar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
