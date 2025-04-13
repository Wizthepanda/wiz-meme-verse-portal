

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ParallaxClouds from "@/components/ParallaxClouds";
import FloatingElements from "@/components/FloatingElements";
import AnimatedWiz from "@/components/AnimatedWiz";
import CloudButton from "@/components/CloudButton";
import AnimatedLogo from "@/components/AnimatedLogo";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { playSoundEffect } from "@/utils/soundEffects";
import { supabase, checkCurrentSession, debugHashParams } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  // Debug auth state and URL params with enhanced logging
  useEffect(() => {
    console.log("📱 Index - Component mounted");
    console.log("📱 Index - Current URL:", window.location.href);
    console.log("📱 Index - Auth state:", { user: user?.id, isLoading });
    console.log("📱 Index - URL query params:", location.search);
    console.log("📱 Index - URL hash:", location.hash);
    
    // Log Supabase configuration
    console.log("📱 Index - Supabase URL:", (supabase as any).supabaseUrl);
    console.log("📱 Index - Supabase key (first 10):", (supabase as any).supabaseKey?.substring(0, 10) + "...");
    
    // Collect debug info
    const info = {
      url: window.location.href,
      user: user?.id,
      isLoading,
      hash: location.hash,
      supabaseUrl: (supabase as any).supabaseUrl,
      supabaseKeyStart: (supabase as any).supabaseKey?.substring(0, 10) + "..."
    };
    setDebugInfo(info);
    
  }, [user, isLoading, location]);
  
  // Add more aggressive hash parameter checking
  useEffect(() => {
    const checkHashParamsAggressively = async () => {
      console.log("📱 Index - Aggressively checking for hash parameters...");
      
      // Custom debug function to parse hash directly
      debugHashParams();
      
      // Check if URL contains an access token hash parameter (#access_token=...)
      if (window.location.hash && window.location.hash.includes('access_token')) {
        console.log("🎯 ACCESS TOKEN DETECTED IN URL HASH:", window.location.hash);
        
        try {
          console.log("🎯 Beginning Supabase processing of auth hash");
          console.log("🎯 Auth configuration:", supabase.auth.getAutoRefreshToken(), supabase.auth.detectSessionInUrl);
          
          // The Supabase client will automatically parse the hash
          const { data, error } = await supabase.auth.getSession();
          
          console.log("🎯 Get session after hash detection - Success:", !!data.session);
          console.log("🎯 Get session after hash detection - Error:", error);
          console.log("🎯 Get session after hash detection - User ID:", data.session?.user?.id);
          
          if (error) {
            console.error("🎯 Error processing auth hash:", error);
            throw error;
          }
          
          // Check if we have a user but no session - could indicate a processing issue
          if (!data.session && data.session?.user) {
            console.warn("🎯 Warning: User exists but no session after hash processing");
          }
          
          // Manually try to exchange the token
          if (!data.session && window.location.hash.includes('access_token')) {
            console.log("🎯 No session after automatic processing, trying manual approach");
            try {
              const hashParams = new URLSearchParams(window.location.hash.substring(1));
              const accessToken = hashParams.get('access_token');
              
              if (accessToken) {
                console.log("🎯 Manually extracted access token (first 10):", accessToken.substring(0, 10) + "...");
                
                // Try a different approach to set the session manually
                const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: ''
                });
                
                console.log("🎯 Manual setSession result:", { 
                  success: !!sessionData.session,
                  error: sessionError,
                  userId: sessionData.session?.user?.id
                });
              }
            } catch (manualError) {
              console.error("🎯 Error during manual token exchange:", manualError);
            }
          }
        } catch (err) {
          console.error("🎯 Error processing auth hash:", err);
          toast({
            title: "Authentication Error",
            description: "There was a problem processing your login. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        console.log("📱 No auth hash detected in URL");
      }
    };
    
    checkHashParamsAggressively();
  }, [toast, location.hash]);
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      console.log("📱 User is logged in, redirecting to dashboard", user.id);
      navigate('/dashboard');
    }
  }, [user, navigate, isLoading]);
  
  const handleTwitterAuth = async () => {
    try {
      // Play sound effect
      playSoundEffect('squish');
      
      setAuthLoading(true);
      console.log("🐦 Twitter auth - Starting authentication flow");
      
      // Get the current URL's origin for the redirect
      const redirectUrl = `${window.location.origin}/dashboard`;
      console.log("🐦 Twitter auth - Redirect URL:", redirectUrl);
      
      console.log("🐦 Twitter auth - Calling supabase.auth.signInWithOAuth");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectUrl,
          scopes: 'tweet.read users.read',
        }
      });
      
      if (error) {
        console.error("🐦 Twitter auth error during signInWithOAuth:", error);
        throw error;
      }
      
      console.log("🐦 Twitter auth response:", data);
      console.log("🐦 Twitter auth - Provider URL:", data.url);
      console.log("🐦 Twitter auth - Should redirect now via Supabase Auth");
      
    } catch (error: any) {
      console.error("🐦 Twitter auth error:", error);
      console.error("🐦 Twitter auth error stack:", error.stack);
      toast({
        title: "Twitter Authentication Failed",
        description: error.message || "Could not connect to Twitter. Please try again.",
        variant: "destructive",
      });
      setAuthLoading(false);
    }
  };
  
  // Additional helper to manually check session status with more details
  const checkSessionStatus = async () => {
    try {
      console.log("🔍 Manual session check - Starting");
      const { data, error } = await supabase.auth.getSession();
      console.log("🔍 Manual session check - Result:", { 
        session: !!data.session, 
        error,
        provider: data.session?.user?.app_metadata?.provider
      });
      if (data.session) {
        console.log("🔍 Manual session check - User ID:", data.session.user?.id);
        console.log("🔍 Manual session check - Access token (first 10):", 
          data.session.access_token.substring(0, 10) + "...");
      }
      
      // Show debug toast with session info
      toast({
        title: "Session Status",
        description: `Session exists: ${!!data.session}, User ID: ${data.session?.user?.id || 'None'}`,
      });
      
    } catch (e) {
      console.error("🔍 Manual session check - Error:", e);
      toast({
        title: "Session Check Error",
        description: `Error: ${e instanceof Error ? e.message : String(e)}`,
        variant: "destructive",
      });
    }
  };
  
  // Run this once on component mount with enhanced logging
  useEffect(() => {
    const checkSessionAndLog = async () => {
      const result = await checkCurrentSession();
      console.log("📱 Index - Initial session check result:", result);
    };
    
    checkSessionAndLog();
  }, []);
  
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
        
        {/* Debug buttons - enhanced for troubleshooting */}
        <div className="flex flex-col items-center mt-4 space-y-2">
          <button 
            onClick={checkSessionStatus}
            className="text-sm text-wiz-purple underline"
          >
            Debug: Check Session
          </button>
          
          <button 
            onClick={() => {
              const hashInfo = debugHashParams();
              toast({
                title: "URL Hash Check",
                description: location.hash ? "Hash parameters found" : "No hash parameters",
              });
            }}
            className="text-sm text-wiz-purple underline"
          >
            Debug: Check URL Hash
          </button>
          
          {debugInfo && (
            <button
              onClick={() => {
                toast({
                  title: "Debug Info",
                  description: "Check console for detailed debug information",
                });
                console.log("📊 DEBUG INFO:", debugInfo);
              }}
              className="text-sm text-wiz-purple underline"
            >
              Show Debug Info
            </button>
          )}
        </div>
        
        {/* Fine print */}
        <p className="mt-6 text-sm text-wiz-dark flex items-center">
          Meme responsibly. <span className="ml-2 text-lg">😉</span>
        </p>
      </div>
    </div>
  );
};

export default Index;
