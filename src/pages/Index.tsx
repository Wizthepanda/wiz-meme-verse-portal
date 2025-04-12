
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
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);
  
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
  
  const handleTwitterAuth = async () => {
    try {
      // Play sound effect
      playSoundEffect('squish');
      
      setAuthLoading(true);
      
      // Get the current URL's origin for the redirect
      const redirectUrl = `${window.location.origin}/dashboard`;
      console.log("Redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectUrl,
        }
      });
      
      if (error) throw error;
      
      console.log("Twitter auth response:", data);
      // Redirect will be handled by Supabase Auth
      
    } catch (error: any) {
      console.error("Twitter auth error:", error);
      toast({
        title: "Twitter Authentication Failed",
        description: error.message || "Could not connect to Twitter. Please try again.",
        variant: "destructive",
      });
      setAuthLoading(false);
    }
  };
  
  if (isLoading || authLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <ParallaxClouds />
      <FloatingElements />
      
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
        
        {/* Twitter Auth Button */}
        <CloudButton 
          onClick={handleTwitterAuth} 
          className="mb-4" 
          id="twitter-login-button"
        >
          CONNECT TWITTER & LET'S GOOO!
        </CloudButton>
        
        {/* Fine print */}
        <p className="mt-6 text-sm text-wiz-dark flex items-center">
          Meme responsibly. <span className="ml-2 text-lg">😉</span>
        </p>
      </div>
    </div>
  );
};

export default Index;
