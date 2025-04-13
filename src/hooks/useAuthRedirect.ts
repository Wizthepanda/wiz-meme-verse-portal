
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, debugHashParams } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();

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
      
      // Custom debug function to parse hash directly
      debugHashParams();
      
      // Check if URL contains an access token hash parameter (#access_token=...)
      if (window.location.hash && window.location.hash.includes('access_token')) {
        console.log("🎯 ACCESS TOKEN DETECTED IN URL HASH:", window.location.hash);
        
        try {
          console.log("🎯 Beginning Supabase processing of auth hash");
          console.log("🎯 Auth configuration:", {
            persistSession: true, 
            detectSessionInUrl: true 
          });
          
          // The Supabase client will automatically parse the hash
          const { data, error } = await supabase.auth.getSession();
          
          console.log("🎯 Get session after hash detection - Success:", !!data.session);
          console.log("🎯 Get session after hash detection - Error:", error);
          console.log("🎯 Get session after hash detection - User ID:", data.session?.user?.id);
          
          if (error) {
            console.error("🎯 Error processing auth hash:", error);
            throw error;
          }
          
          // If session is established, redirect to dashboard
          if (data.session && data.session.user) {
            console.log("🎯 Session established with user ID:", data.session.user.id);
            console.log("🎯 Redirecting to dashboard...");
            navigate('/dashboard');
            return;
          }
          
          // Check if we have a user but no session - could indicate a processing issue
          if (!data.session && data.session?.user) {
            console.warn("🎯 Warning: User exists but no session after hash processing");
          }
          
          // Manually try to exchange the token
          if (!data.session && window.location.hash.includes('access_token')) {
            console.log("🎯 No session after automatic processing, trying manual approach");
            try {
              const hashParams = new URLSearchParams(window.location.hash.substring(1));
              const accessToken = hashParams.get('access_token');
              
              if (accessToken) {
                console.log("🎯 Manually extracted access token (first 10):", accessToken.substring(0, 10) + "...");
                
                // Try a different approach to set the session manually
                const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: ''
                });
                
                console.log("🎯 Manual setSession result:", { 
                  success: !!sessionData.session,
                  error: sessionError,
                  userId: sessionData.session?.user?.id
                });
                
                if (sessionData.session && sessionData.session.user) {
                  console.log("🎯 Manual session established with user ID:", sessionData.session.user.id);
                  console.log("🎯 Redirecting to dashboard after manual session setup...");
                  navigate('/dashboard');
                }
              }
            } catch (manualError) {
              console.error("🎯 Error during manual token exchange:", manualError);
            }
          }
        } catch (err) {
          console.error("🎯 Error processing auth hash:", err);
          toast({
            title: "Authentication Error",
            description: "There was a problem processing your login. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        console.log("📱 No auth hash detected in URL");
      }
    };
    
    checkHashParamsAggressively();
  }, [toast, navigate]);

  // Run this once on component mount with enhanced logging
  useEffect(() => {
    const checkSessionAndLog = async () => {
      const result = await supabase.auth.getSession();
      console.log("📱 Index - Initial session check result:", result);
    };
    
    checkSessionAndLog();
  }, []);
};
