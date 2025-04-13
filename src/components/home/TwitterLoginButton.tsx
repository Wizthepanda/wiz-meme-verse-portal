
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CloudButton from "@/components/CloudButton";
import { playSoundEffect } from "@/utils/soundEffects";
import { supabase } from "@/integrations/supabase/client";

interface TwitterLoginButtonProps {
  onLoginStart?: () => void;
}

const TwitterLoginButton = ({ onLoginStart }: TwitterLoginButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authLoading, setAuthLoading] = useState(false);

  const handleTwitterAuth = async () => {
    try {
      // Play sound effect
      playSoundEffect('squish');
      
      setAuthLoading(true);
      // Let parent know we're starting auth
      if (onLoginStart) onLoginStart();
      
      console.log("🐦 Twitter auth - Starting authentication flow");
      
      // Get the current URL's origin for the redirect
      const origin = window.location.origin;
      const redirectTo = `${origin}/dashboard`; 
      console.log("🐦 Twitter auth - Redirect URL:", redirectTo);
      
      // Clear any hash fragments or auth params from the current URL
      if (window.history && window.history.replaceState && 
         (window.location.hash || window.location.search.includes('error'))) {
        console.log("🐦 Twitter auth - Clearing URL hash/params before new auth attempt");
        window.history.replaceState(null, document.title, window.location.pathname);
      }
      
      // Sign in with Twitter using minimal scopes
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectTo,
          scopes: 'profile', // Minimal scope for basic profile info
          skipBrowserRedirect: false,
        }
      });
      
      if (error) {
        console.error("🐦 Twitter auth error during signInWithOAuth:", error);
        throw error;
      }
      
      console.log("🐦 Twitter auth response:", data);
      
      // Redirect to provider URL
      if (data.url) {
        console.log("🐦 Redirecting to Twitter auth URL:", data.url);
        window.location.href = data.url;
      } else {
        console.error("🐦 No provider URL returned from Supabase");
        throw new Error("Authentication failed - no provider URL returned");
      }
      
    } catch (error: any) {
      console.error("🐦 Twitter auth error:", error);
      toast({
        title: "Twitter Authentication Failed",
        description: error.message || "Could not connect to Twitter. Please try again.",
        variant: "destructive",
      });
      setAuthLoading(false);
      
      // Reset parent loading state if needed
      if (onLoginStart) {
        setTimeout(() => {
          // Reset parent component's loading state after a delay
          onLoginStart();
        }, 1000);
      }
    }
  };

  return (
    <CloudButton 
      onClick={handleTwitterAuth} 
      className="mb-2" 
      id="twitter-login-button"
    >
      {authLoading ? "CONNECTING..." : "CONNECT TWITTER & LET'S GOOO!"}
    </CloudButton>
  );
};

export default TwitterLoginButton;
