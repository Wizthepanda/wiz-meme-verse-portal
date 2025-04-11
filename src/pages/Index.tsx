
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParallaxClouds from "@/components/ParallaxClouds";
import FloatingElements from "@/components/FloatingElements";
import AnimatedWiz from "@/components/AnimatedWiz";
import CloudButton from "@/components/CloudButton";
import AnimatedLogo from "@/components/AnimatedLogo";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleLoginClick = async () => {
    // Play poof sound (would be implemented with actual sound file)
    console.log("POOF sound!");
    
    // Start animation transition
    setIsTransitioning(true);
    
    try {
      // Generate absolute redirect URL using window.location.origin
      const redirectUrl = `${window.location.origin}/dashboard`;
      console.log("Redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: false // Ensure browser redirects immediately
        }
      });
      
      if (error) {
        throw error;
      }
      
      console.log("Auth response:", data);
      // Note: The page will redirect to Twitter, so we don't need further navigation here
    } catch (error: any) {
      console.error("Login error:", error);
      setIsTransitioning(false);
      
      toast({
        title: "Login failed",
        description: error.message || "Could not connect to Twitter. Please try again.",
        variant: "destructive",
      });
    }
  };
  
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
        
        {/* Subtext - Updated as requested */}
        <p className="max-w-2xl text-xl md:text-2xl text-wiz-dark mb-12 text-center animate-slide-in">
          Link yer Twitter, unleash chaos, rack up 
          <span className="inline-block mx-1 sparkle-element text-wiz-purple">✨Sparkles✨</span> 
          &amp; grab that $WIZ. No bots. No normies. Just meme lords.
        </p>
        
        {/* CTA Button - Direct Twitter auth */}
        <CloudButton onClick={handleLoginClick} className="mb-8">
          CONNECT TWITTER &amp; LET'S GOOO!
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
