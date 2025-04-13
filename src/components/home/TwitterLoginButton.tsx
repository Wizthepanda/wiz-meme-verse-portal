
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
  const [debugMode, setDebugMode] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const handleTwitterAuth = async () => {
    try {
      // Play sound effect
      playSoundEffect('squish');
      
      setAuthLoading(true);
      setLastError(null);
      console.log("🐦 Twitter auth - Starting authentication flow");
      
      // Get the current URL's origin for the redirect
      const origin = window.location.origin;
      const redirectTo = debugMode ? `${origin}/auth-debug` : `${origin}/dashboard`;
      console.log("🐦 Twitter auth - Redirect URL:", redirectTo);
      
      // Log important information for debugging
      console.log("🐦 Twitter auth - Supabase URL:", (supabase as any).supabaseUrl);
      console.log("🐦 Twitter auth - Supabase Key (first 10):", (supabase as any).supabaseKey?.substring(0, 10) + '...');
      console.log("🐦 Twitter auth - Current URL:", window.location.href);
      console.log("🐦 Twitter auth - Current origin:", origin);
      
      // Check if there's an existing session before starting new auth
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("🐦 Session check error:", sessionError);
      }
      if (session) {
        console.log("🐦 Existing session found, redirecting to dashboard");
        navigate('/dashboard');
        setAuthLoading(false);
        return;
      }
      
      console.log("🐦 Twitter auth - Calling supabase.auth.signInWithOAuth");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectTo,
          scopes: 'tweet.read users.read',
        }
      });
      
      if (error) {
        console.error("🐦 Twitter auth error during signInWithOAuth:", error);
        setLastError(error.message);
        throw error;
      }
      
      console.log("🐦 Twitter auth response:", data);
      console.log("🐦 Twitter auth - Provider URL:", data.url);
      console.log("🐦 Twitter auth - Should redirect now via Supabase Auth");
      
      // If we get here, we should be redirecting to Twitter
      // But let's add a timeout just in case something goes wrong
      setTimeout(() => {
        // If we're still here after 5 seconds, something went wrong
        if (data.url) {
          console.log("🐦 Manual redirect to provider URL after timeout");
          window.location.href = data.url;
        }
      }, 5000);
      
    } catch (error: any) {
      console.error("🐦 Twitter auth error:", error);
      console.error("🐦 Twitter auth error stack:", error.stack);
      setLastError(error.message);
      toast({
        title: "Twitter Authentication Failed",
        description: error.message || "Could not connect to Twitter. Please try again.",
        variant: "destructive",
      });
      setAuthLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <CloudButton 
        onClick={handleTwitterAuth} 
        className="mb-2" 
        id="twitter-login-button"
      >
        {authLoading ? "CONNECTING..." : "CONNECT TWITTER & LET'S GOOO!"}
      </CloudButton>
      
      <button 
        onClick={() => setDebugMode(!debugMode)} 
        className="text-xs text-wiz-purple/70 hover:text-wiz-purple underline"
      >
        {debugMode ? "Disable Debug Mode" : "Enable Debug Mode"}
      </button>
      
      {debugMode && (
        <div className="text-xs text-gray-500 mt-1">
          Debug mode enabled. Will redirect to /auth-debug
        </div>
      )}
      
      {lastError && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-600">
          <strong>Last error:</strong> {lastError}
        </div>
      )}
    </div>
  );
};

export default TwitterLoginButton;
