
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, debugHashParams } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();

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
    }
  }, [location.search, toast]);

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
          
          // Process the hash - this should update the session
          // First try the standard approach
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
          
          // If we get here, we couldn't process the hash properly
          // Let's try a direct approach to fetch and navigate to auth status page
          console.log("🎯 Standard approach failed, trying auth status page...");
          navigate('/auth-status');
        } catch (err: any) {
          console.error("🎯 Error processing auth hash:", err);
          toast({
            title: "Authentication Error",
            description: "There was a problem processing your login. Please try again or check auth status.",
            variant: "destructive",
          });
          
          // Navigate to auth status page for detailed diagnostics
          navigate('/auth-status');
        }
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
