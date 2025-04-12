
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParallaxClouds from "@/components/ParallaxClouds";
import FloatingElements from "@/components/FloatingElements";
import AnimatedWiz from "@/components/AnimatedWiz";
import CloudButton from "@/components/CloudButton";
import AnimatedLogo from "@/components/AnimatedLogo";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { playSoundEffect } from "@/utils/soundEffects";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Debug auth state
  useEffect(() => {
    console.log("Index - Auth state:", { user, isLoading });
  }, [user, isLoading]);
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      console.log("User is logged in, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [user, navigate, isLoading]);
  
  const handleDashboardNavigation = () => {
    // Play sound effects
    playSoundEffect('squish');
    
    // Start animation transition
    setIsTransitioning(true);
    
    // Play poof sound
    playSoundEffect('poof');
    console.log("POOF sound!");
    
    // Add a short delay for the animation
    setTimeout(() => {
      // Navigate to dashboard directly
      navigate('/dashboard');
    }, 1000);
  };
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <ParallaxClouds />
      <FloatingElements />
      
      {/* Transition overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-white z-50 animate-puff-in flex items-center justify-center">
          <span className="text-8xl">POOF! 💨</span>
        </div>
      )}
      
      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center py-16">
        {/* Logo */}
        <AnimatedLogo className="mb-16" />
        
        {/* Animated Wizard */}
        <AnimatedWiz className="mb-12" />
        
        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bubblegum text-wiz-dark mb-6 text-center animate-slide-in">
          HALT, MORTAL! Can you even meme?
        </h2>
        
        {/* Subtext */}
        <p className="max-w-2xl text-xl md:text-2xl text-wiz-dark mb-12 text-center animate-slide-in">
          Link yer Twitter, unleash chaos, rack up 
          <span className="inline-block mx-1 sparkle-element text-wiz-purple">✨Sparkles✨</span> 
          &amp; grab that $WIZ. No bots. No normies. Just meme lords.
        </p>
        
        {/* CTA Button - Direct navigation to dashboard */}
        <CloudButton 
          onClick={handleDashboardNavigation} 
          className="mb-8" 
          id="twitter-login-button"
        >
          CONNECT TWITTER & LET'S GOOO!
        </CloudButton>
        
        {/* Fine print */}
        <p className="text-sm text-wiz-dark flex items-center">
          Meme responsibly. <span className="ml-2 text-lg">😉</span>
        </p>
      </div>
    </div>
  );
};

export default Index;
