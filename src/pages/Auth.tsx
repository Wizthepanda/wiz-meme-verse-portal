
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Twitter } from "lucide-react";
import AnimatedWiz from "@/components/AnimatedWiz";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // If user is already logged in, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const handleTwitterSignIn = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) throw error;
      
      // Note: We won't show a success toast here as the page will redirect to Twitter
    } catch (error: any) {
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
