
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, debugHashParams, processAuthHashParams } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isLoading, session } = useAuth();

  // Check for auth errors in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    
    if (error) {
      console.error("Auth redirect error:", error, errorDescription);
      toast({
        title: "Authentication Error",
        description: errorDescription || "There was a problem during authentication.",
        variant: "destructive",
      });
      
      // Navigate to auth status page for debugging
      navigate('/auth-status');
    }
  }, [location.search, toast, navigate]);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      console.log("📱 User is logged in, redirecting to dashboard", user.id);
      navigate('/dashboard');
    }
  }, [user, navigate, isLoading]);

  // Process auth hash parameters aggressively
  useEffect(() => {
    const processHashParams = async () => {
      console.log("📱 Index - Processing hash parameters");
      console.log("📱 Current URL:", window.location.href);
      
      // Check if URL contains an access token hash parameter
      if (window.location.hash && window.location.hash.includes('access_token')) {
        console.log("🎯 ACCESS TOKEN DETECTED IN URL HASH");
        
        try {
          // Use our improved hash processing function
          const result = await processAuthHashParams();
          
          console.log("🎯 Hash processing result:", result);
          
          if (result.success && result.session) {
            console.log("🎯 Successfully established session, redirecting to dashboard");
            
            // Clear hash from URL to prevent re-processing
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, document.title, window.location.pathname);
            }
            
            // Give a moment for state to update before redirect
            setTimeout(() => {
              navigate('/dashboard');
            }, 300);
            return;
          }
          
          // If processing failed, go to auth status page
          console.log("🎯 Failed to establish session from hash, going to auth status");
          navigate('/auth-status');
        } catch (err) {
          console.error("🎯 Exception during auth hash processing:", err);
          toast({
            title: "Authentication Error",
            description: "There was a problem processing your login. Please try again.",
            variant: "destructive",
          });
          
          navigate('/auth-status');
        }
      }
    };
    
    // Process hash params with a slight delay to ensure everything is loaded
    setTimeout(processHashParams, 200);
  }, [toast, navigate]);

  // Enhanced session check on component mount
  useEffect(() => {
    const checkSessionAndLog = async () => {
      console.log("📱 Index - Checking session status on mount");
      const { data, error } = await supabase.auth.getSession();
      console.log("📱 Index - Initial session check result:", {
        hasSession: !!data.session,
        userId: data.session?.user?.id,
        error: error?.message
      });
      
      if (data.session) {
        console.log("📱 Index - Session found on mount, user ID:", data.session.user.id);
        navigate('/dashboard');
      } else {
        console.log("📱 Index - No session found on mount");
        
        // If we have hash parameters but no session, try to process them
        if (window.location.hash && window.location.hash.includes('access_token')) {
          debugHashParams();
          processAuthHashParams();
        }
      }
    };
    
    checkSessionAndLog();
  }, [navigate]);
};
