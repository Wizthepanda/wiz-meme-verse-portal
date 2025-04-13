
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, debugHashParams } from "@/integrations/supabase/client";
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

  // Add more aggressive hash parameter checking
  useEffect(() => {
    const checkHashParamsAggressively = async () => {
      console.log("📱 Index - Aggressively checking for hash parameters...");
      console.log("📱 Current location:", window.location.href);
      console.log("📱 Current hash:", window.location.hash);
      
      // Custom debug function to parse hash directly
      debugHashParams();
      
      // Check if URL contains an access token hash parameter (#access_token=...)
      if (window.location.hash && window.location.hash.includes('access_token')) {
        console.log("🎯 ACCESS TOKEN DETECTED IN URL HASH:", window.location.hash);
        
        try {
          console.log("🎯 Beginning Supabase processing of auth hash");
          console.log("🎯 Auth configuration:", {
            persistSession: true, 
            detectSessionInUrl: true,
            flowType: 'pkce'
          });
          
          // Process the hash - this should update the session
          const { data, error } = await supabase.auth.getSession();
          
          console.log("🎯 Get session after hash detection - Success:", !!data.session);
          console.log("🎯 Get session after hash detection - Error:", error);
          console.log("🎯 Get session after hash detection - User ID:", data.session?.user?.id);
          
          if (error) {
            console.error("🎯 Error processing auth hash:", error);
            toast({
              title: "Authentication Error",
              description: error.message || "There was a problem processing your login.",
              variant: "destructive",
            });
            navigate('/auth-status');
            return;
          }
          
          // If session is established, redirect to dashboard
          if (data.session && data.session.user) {
            console.log("🎯 Session established with user ID:", data.session.user.id);
            console.log("🎯 Redirecting to dashboard...");
            
            // Clear hash from URL to prevent re-processing
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
            }
            
            navigate('/dashboard');
            return;
          }
          
          // If session not established but hash exists, try explicit exchange
          console.log("🎯 No session after automatic processing, trying manual approach");
          
          // Try to manually extract the token and exchange it
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          
          if (accessToken) {
            console.log("🎯 Manually extracted access token, attempting to set session");
            
            // Attempt to manually set the session with the token
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: hashParams.get('refresh_token') || ''
            });
            
            console.log("🎯 Manual setSession result:", { 
              success: !!sessionData.session,
              error: sessionError,
              userId: sessionData.session?.user?.id
            });
            
            if (sessionData.session) {
              console.log("🎯 Manual session established, redirecting to dashboard");
              navigate('/dashboard');
              return;
            }
            
            if (sessionError) {
              console.error("🎯 Error manually setting session:", sessionError);
              toast({
                title: "Session Error",
                description: sessionError.message || "Could not establish your session.",
                variant: "destructive",
              });
            }
          }
          
          // If all attempts fail, go to auth status page
          console.log("🎯 All session establishment attempts failed, redirecting to auth status");
          navigate('/auth-status');
          
        } catch (err: any) {
          console.error("🎯 Exception during auth hash processing:", err);
          toast({
            title: "Authentication Error",
            description: "There was a problem processing your login. Please try again.",
            variant: "destructive",
          });
          
          // Navigate to auth status page for detailed diagnostics
          navigate('/auth-status');
        }
      }
    };
    
    checkHashParamsAggressively();
  }, [toast, navigate]);

  // Check session on component mount with enhanced logging
  useEffect(() => {
    const checkSessionAndLog = async () => {
      console.log("📱 Index - Checking session status on mount");
      const result = await supabase.auth.getSession();
      console.log("📱 Index - Initial session check result:", result);
      
      if (result.data.session) {
        console.log("📱 Index - Session found on mount, user ID:", result.data.session.user.id);
      } else {
        console.log("📱 Index - No session found on mount");
      }
    };
    
    checkSessionAndLog();
  }, []);
};
