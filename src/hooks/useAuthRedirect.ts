
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate, isLoading]);

  // Handle auth callback
  useEffect(() => {
    // If we're already on the dashboard, don't process further
    if (location.pathname === '/dashboard') {
      return;
    }
    
    // Process access token in hash if present
    if (window.location.hash && window.location.hash.includes('access_token')) {
      // Clear hash from URL to prevent re-processing
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
      
      // Show a success toast
      toast({
        title: "Successfully Connected!",
        description: "Welcome to the Wizverse, meme lord!",
      });
      
      // Navigate to dashboard after a small delay to ensure state is updated
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
    }
  }, [location, toast, navigate]);
};
