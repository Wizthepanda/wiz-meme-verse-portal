
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Twitter } from "lucide-react";
import AnimatedWiz from "@/components/AnimatedWiz";
import { supabase } from "@/integrations/supabase/client";

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
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const handleTwitterSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Get the current origin for the callback
      const redirectUrl = `${window.location.origin}/dashboard`;
      console.log("Redirect URL:", redirectUrl);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectUrl
        }
      });
      
      if (error) throw error;
      
      // Note: We won't show a success toast here as the page will redirect to Twitter
    } catch (error: any) {
      console.error("Sign in error:", error);
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
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 w-full text-sm">
              {authError}
            </div>
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
