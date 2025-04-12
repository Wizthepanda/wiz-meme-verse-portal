
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "@/components/dashboard/TopBar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, isLoading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  
  // Debug function to manually check session
  const checkSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      console.log("🔍 Dashboard manual session check:", { 
        hasSession: !!data.session, 
        userId: data.session?.user?.id,
        error 
      });
      
      if (error) {
        setError(`Session check error: ${error.message}`);
      }
    } catch (e: any) {
      console.error("🔍 Dashboard manual session check error:", e);
      setError(`Session check exception: ${e.message}`);
    }
  };
  
  useEffect(() => {
    // Run on mount
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    // Log current auth state
    console.log("🏠 Dashboard - Component mounted");
    console.log("🏠 Dashboard - Auth state:", { 
      user: user?.id, 
      isLoading,
      hasSession: !!session,
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    });
    
    if (session) {
      console.log("🏠 Dashboard - Session access token (first 10):", session.access_token.substring(0, 10) + '...');
    } else {
      console.log("🏠 Dashboard - No session available");
    }
    
    // If hash contains auth info, log it
    if (location.hash && location.hash.includes('access_token')) {
      console.log("🏠 Dashboard - Auth hash detected:", location.hash);
      
      // Try to process hash directly if we landed here with a hash
      (async () => {
        try {
          console.log("🏠 Dashboard - Processing auth hash directly");
          const { data, error } = await supabase.auth.getSession();
          console.log("🏠 Dashboard - Hash processing result:", { 
            hasSession: !!data.session, 
            error 
          });
        } catch (e) {
          console.error("🏠 Dashboard - Error processing hash:", e);
        }
      })();
    }
    
    // If not logged in and not loading, redirect to home
    if (!isLoading && !user) {
      console.log("🏠 Dashboard - Not logged in, redirecting to home");
      navigate('/');
    }
  }, [user, isLoading, session, navigate, location]);
  
  // Check for auth provider callback errors in URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get('error');
    const errorDescription = queryParams.get('error_description');
    
    if (error) {
      console.error("🏠 Auth error from URL:", error, errorDescription);
      setError(`${error}: ${errorDescription}`);
      
      toast({
        title: "Authentication Error",
        description: errorDescription || "There was a problem with Twitter authentication.",
        variant: "destructive",
      });
      
      // Clear error params from URL to prevent showing the error multiple times
      if (window.history && window.history.replaceState) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, [toast]);

  // Show loading screen while authenticating
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingScreen />
        <button 
          className="mt-8 text-sm text-wiz-purple underline"
          onClick={() => setShowDebug(!showDebug)}
        >
          {showDebug ? "Hide Debug Info" : "Show Debug Info"}
        </button>
        
        {showDebug && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md max-w-md mx-auto text-xs overflow-auto">
            <h3 className="font-bold">Current URL:</h3>
            <p className="mb-2">{window.location.href}</p>
            
            <h3 className="font-bold">Auth State:</h3>
            <p className="mb-2">Is Loading: {isLoading.toString()}</p>
            <p className="mb-2">Has User: {(!!user).toString()}</p>
            <p className="mb-2">Has Session: {(!!session).toString()}</p>
            
            <button
              className="mt-2 px-3 py-1 bg-wiz-purple text-white rounded text-xs"
              onClick={checkSession}
            >
              Refresh Session Status
            </button>
          </div>
        )}
      </div>
    );
  }

  // Error UI for troubleshooting
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md w-full mb-4">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        
        <button
          className="px-4 py-2 bg-wiz-purple text-white rounded mb-4"
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
        
        <button
          className="text-sm text-wiz-purple underline"
          onClick={checkSession}
        >
          Retry Session Check
        </button>
        
        <button
          className="text-sm text-wiz-purple underline mt-2"
          onClick={() => setError(null)}
        >
          Dismiss Error
        </button>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Top navigation */}
      <TopBar />
      
      {/* Main content */}
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
