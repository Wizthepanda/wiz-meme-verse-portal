
import React, { useState } from "react";
import ParallaxClouds from "@/components/ParallaxClouds";
import FloatingElements from "@/components/FloatingElements";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useDebugInfo } from "@/hooks/useDebugInfo";

// Import the new components
import HeaderSection from "@/components/home/HeaderSection";
import TwitterLoginButton from "@/components/home/TwitterLoginButton";
import DebugPanel from "@/components/home/DebugPanel";
import Footer from "@/components/home/Footer";

const Index = () => {
  const { isLoading } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);
  
  // Use custom hooks for auth redirects and debug info
  useAuthRedirect();
  const debugInfo = useDebugInfo();
  
  if (isLoading || authLoading) {
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
        <TwitterLoginButton />
        
        {/* Debug Panel */}
        <DebugPanel debugInfo={debugInfo} />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
