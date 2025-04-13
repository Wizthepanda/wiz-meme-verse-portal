
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Twitter } from "lucide-react";
import AnimatedWiz from "@/components/AnimatedWiz";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Check URL for error parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const error = queryParams.get('error');
    const errorDescription = queryParams.get('error_description');
    
    if (error) {
      console.error("Auth error:", error, errorDescription);
      setAuthError(errorDescription || "Authentication failed. Please try again.");
      toast({
        title: "Authentication Error",
        description: errorDescription || "There was a problem with Twitter authentication.",
        variant: "destructive",
      });
    }
  }, [location, toast]);
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      console.log("Auth - User already logged in, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  // Listen for hash params if user comes to this page
  useEffect(() => {
    if (window.location.hash && window.location.hash.includes('access_token')) {
      console.log("Auth - Access token detected in URL hash, processing...");
      
      (async () => {
        try {
          const { data, error } = await supabase.auth.getSession();
          
          console.log("Auth - Session check result:", {
            hasSession: !!data.session,
            error,
            userId: data.session?.user?.id
          });
          
          if (data.session && data.session.user) {
            console.log("Auth - Session established, redirecting to dashboard");
            navigate('/dashboard');
          } else if (error) {
            console.error("Auth - Error processing access token:", error);
            setAuthError(error.message || "Failed to process authentication. Please try again.");
          }
        } catch (e) {
          console.error("Auth - Exception during session processing:", e);
          setAuthError("An unexpected error occurred. Please try again.");
        }
      })();
    }
  }, [navigate, location.hash]);
  
  const handleTwitterSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Generate absolute redirect URL using window.location.origin
      const redirectUrl = `${window.location.origin}/dashboard`;
      console.log("Auth - Twitter sign in - Redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectUrl,
          scopes: 'tweet.read users.read',
        }
      });
      
      if (error) throw error;
      
      console.log("Auth - Twitter sign in response:", data);
      // Page will be redirected by Supabase Auth
    } catch (error: any) {
      console.error("Auth - Sign in error:", error);
      setAuthError(error.message || "Could not connect to Twitter. Please try again.");
      toast({
        title: "Sign in failed",
        description: error.message || "Could not connect to Twitter. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wiz-lavender/30 via-wiz-coral/20 to-wiz-banana/30 p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl border border-wiz-lavender/30">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-20 h-20 mb-2">
            <AnimatedWiz />
          </div>
          <CardTitle className="text-2xl font-bubblegum text-wiz-purple flex items-center gap-2">
            Join The Memeverse <Sparkles className="text-wiz-banana" size={20} />
          </CardTitle>
          <CardDescription>
            Connect with Twitter to enter the magical world of memes!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {authError && (
            <Alert variant="destructive" className="mb-4 w-full">
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={handleTwitterSignIn} 
            className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1a94df] text-white w-full justify-center py-6"
            disabled={isLoading}
          >
            <Twitter size={20} />
            {isLoading ? "Connecting..." : "Sign in with Twitter"}
          </Button>
          
          <p className="mt-6 text-sm text-center text-gray-500">
            By connecting your Twitter account, you'll be able to participate in meme quests 
            and earn sparkles that can be converted to $WIZ tokens.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
