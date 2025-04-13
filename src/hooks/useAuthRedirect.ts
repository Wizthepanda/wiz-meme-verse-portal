
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
      navigate('/auth-status', { replace: true });
    }
  }, [location.search, toast, navigate]);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      console.log("📱 User is logged in, redirecting to dashboard", user.id);
      navigate('/dashboard', { replace: true }); // Use replace to prevent back button issues
    }
  }, [user, navigate, isLoading]);

  // Process auth hash parameters on load
  useEffect(() => {
    console.log("📱 useAuthRedirect - Current location:", location.pathname);
    console.log("📱 Current URL:", window.location.href);
    
    // If we're already on the dashboard or auth pages, don't process hash
    if (location.pathname === '/dashboard' || location.pathname === '/auth-status') {
      console.log("📱 Already on dashboard or auth-status page, skipping hash processing");
      return;
    }
    
    // Check if URL contains an access token hash parameter
    if (window.location.hash && window.location.hash.includes('access_token')) {
      console.log("🎯 ACCESS TOKEN DETECTED IN URL HASH");
      
      (async () => {
        try {
          // Use improved hash processing function
          const result = await processAuthHashParams();
          
          console.log("🎯 Hash processing result:", result);
          
          if (result.success && result.session) {
            console.log("🎯 Successfully established session, redirecting to dashboard");
            
            // Clear hash from URL to prevent re-processing
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, document.title, window.location.pathname);
            }
            
            // Show a success toast
            toast({
              title: "Successfully Connected!",
              description: "Welcome to the Wizverse, meme lord!",
            });
            
            // Navigate to dashboard
            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 500); // Small delay to ensure state is updated
          } else {
            // If processing failed, go to auth status page
            console.log("🎯 Failed to establish session from hash, going to auth status");
            navigate('/auth-status', { replace: true });
          }
        } catch (err) {
          console.error("🎯 Exception during auth hash processing:", err);
          toast({
            title: "Authentication Error",
            description: "There was a problem processing your login. Please try again.",
            variant: "destructive",
          });
          
          navigate('/auth-status', { replace: true });
        }
      })();
    }
  }, [location, toast, navigate]);
};
