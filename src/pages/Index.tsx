
import React, { useState, useEffect } from "react";
import ParallaxClouds from "@/components/ParallaxClouds";
import FloatingElements from "@/components/FloatingElements";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

// Import the components
import HeaderSection from "@/components/home/HeaderSection";
import TwitterLoginButton from "@/components/home/TwitterLoginButton";
import Footer from "@/components/home/Footer";

const Index = () => {
  const { isLoading, user } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  
  // Use custom hooks for auth redirects
  useAuthRedirect();
  
  // Ensure we only show loading screen briefly during initial load
  useEffect(() => {
    // Set initial check complete after a short delay
    const timer = setTimeout(() => {
      setInitialCheckComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handler for Twitter login to track loading state
  const handleLoginStart = () => {
    setAuthLoading(true);
  };

  // Show loading screen only during initial load or explicit auth loading
  if ((isLoading && !initialCheckComplete) || authLoading) {
    return <LoadingScreen />;
  }
  
  // Render the main UI
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <ParallaxClouds />
      <FloatingElements />
      
      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center py-16">
        {/* Header Section with Logo, AnimatedWiz, and Headline */}
        <HeaderSection />
        
        {/* Twitter Auth Button */}
        <TwitterLoginButton onLoginStart={handleLoginStart} />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
