
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CloudButton from "@/components/CloudButton";
import { playSoundEffect } from "@/utils/soundEffects";
import { supabase } from "@/integrations/supabase/client";

const TwitterLoginButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authLoading, setAuthLoading] = useState(false);

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

  return (
    <CloudButton 
      onClick={handleTwitterAuth} 
      className="mb-4" 
      id="twitter-login-button"
    >
      CONNECT TWITTER & LET'S GOOO!
    </CloudButton>
  );
};

export default TwitterLoginButton;
