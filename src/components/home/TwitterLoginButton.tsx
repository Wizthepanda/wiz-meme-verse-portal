
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import CloudButton from "@/components/CloudButton";
import { playSoundEffect } from "@/utils/soundEffects";
import { supabase } from "@/integrations/supabase/client";

interface TwitterLoginButtonProps {
  onLoginStart?: () => void;
}

const TwitterLoginButton = ({ onLoginStart }: TwitterLoginButtonProps) => {
  const { toast } = useToast();
  const [authLoading, setAuthLoading] = useState(false);

  const handleTwitterAuth = async () => {
    try {
      // Play sound effect
      playSoundEffect('squish');
      
      setAuthLoading(true);
      // Let parent know we're starting auth
      if (onLoginStart) onLoginStart();
      
      // Get the current URL's origin for the redirect
      const origin = window.location.origin;
      const redirectTo = `${origin}/dashboard`; 
      
      // Sign in with Twitter using minimal scopes
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectTo,
          scopes: 'profile', // Minimal scope for basic profile info
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Redirect to provider URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Authentication failed - no provider URL returned");
      }
      
    } catch (error: any) {
      console.error("Twitter auth error:", error);
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
