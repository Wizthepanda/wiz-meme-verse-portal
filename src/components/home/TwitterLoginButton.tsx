
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CloudButton from "@/components/CloudButton";
import { playSoundEffect } from "@/utils/soundEffects";
import { supabase, debugHashParams } from "@/integrations/supabase/client";

const TwitterLoginButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authLoading, setAuthLoading] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  // Check URL for error parameters on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('error')) {
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      
      console.error("🐦 Twitter auth error from URL:", error, errorDescription);
      setLastError(`${error}: ${errorDescription}`);
      
      toast({
        title: "Authentication Error",
        description: errorDescription || "Twitter authentication failed",
        variant: "destructive",
      });
      
      // Clear error params from URL
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [toast]);

  const handleTwitterAuth = async () => {
    try {
      // Play sound effect
      playSoundEffect('squish');
      
      setAuthLoading(true);
      setLastError(null);
      console.log("🐦 Twitter auth - Starting authentication flow");
      
      // Get the current URL's origin for the redirect
      const origin = window.location.origin;
      const redirectTo = `${origin}/auth-status`; // Always redirect to auth status for reliability
      console.log("🐦 Twitter auth - Redirect URL:", redirectTo);
      
      // Clear any hash fragments or auth params from the current URL
      if (window.history && window.history.replaceState && 
         (window.location.hash || window.location.search.includes('error'))) {
        console.log("🐦 Twitter auth - Clearing URL hash/params before new auth attempt");
        window.history.replaceState(null, document.title, window.location.pathname);
      }
      
      // Sign in with Twitter
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectTo,
          scopes: 'tweet.read users.read',
          skipBrowserRedirect: false, // Force browser to handle redirect
        }
      });
      
      if (error) {
        console.error("🐦 Twitter auth error during signInWithOAuth:", error);
        setLastError(error.message);
        throw error;
      }
      
      console.log("🐦 Twitter auth response:", data);
      console.log("🐦 Twitter auth - Provider URL:", data.url);
      
      // Manually redirect to provider URL for reliability
      if (data.url) {
        console.log("🐦 Redirecting to Twitter auth URL:", data.url);
        window.location.href = data.url;
      } else {
        console.error("🐦 No provider URL returned from Supabase");
        throw new Error("Authentication failed - no provider URL returned");
      }
      
    } catch (error: any) {
      console.error("🐦 Twitter auth error:", error);
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
        onClick={() => {
          setDebugMode(!debugMode);
          toast({
            title: debugMode ? "Debug Mode Disabled" : "Debug Mode Enabled",
            description: debugMode ? 
              "Regular authentication flow will be used" : 
              "Click the Twitter button again to use debug mode",
          });
        }} 
        className="text-xs text-wiz-purple/70 hover:text-wiz-purple underline"
      >
        {debugMode ? "Disable Debug Mode" : "Enable Debug Mode"}
      </button>
      
      {debugMode && (
        <div className="text-xs text-gray-500 mt-1">
          Debug mode enabled. Will redirect to /auth-status for debugging.
        </div>
      )}
      
      {lastError && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-600">
          <strong>Last error:</strong> {lastError}
          <button 
            onClick={() => navigate('/auth-status')}
            className="ml-2 underline"
          >
            Check Auth Status
          </button>
        </div>
      )}
    </div>
  );
};

export default TwitterLoginButton;
