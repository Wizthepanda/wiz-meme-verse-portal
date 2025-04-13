
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "@/components/dashboard/TopBar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import LoadingScreen from "@/components/dashboard/LoadingScreen";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { supabase, checkCurrentSession, debugHashParams } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, isLoading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [hashDetected, setHashDetected] = useState(false);
  
  // Debug function to manually check session with more details
  const checkSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      console.log("🔍 Dashboard manual session check:", { 
        hasSession: !!data.session, 
        userId: data.session?.user?.id,
        provider: data.session?.user?.app_metadata?.provider,
        error 
      });
      
      // Add access token details if available
      if (data.session) {
        console.log("🔍 Access token (first 20 chars):", 
          data.session.access_token.substring(0, 20) + "...");
      }
      
      if (error) {
        setError(`Session check error: ${error.message}`);
      }
      
      return data;
    } catch (e: any) {
      console.error("🔍 Dashboard manual session check error:", e);
      setError(`Session check exception: ${e.message}`);
      return null;
    }
  };
  
  // Process hash parameters if present, with enhanced logging
  useEffect(() => {
    if (location.hash && location.hash.includes('access_token')) {
      setHashDetected(true);
      console.log("🏠 Dashboard - Auth hash detected:", location.hash);
      
      // Use our debug function
      debugHashParams();
      
      // Try to process hash directly
      (async () => {
        try {
          console.log("🏠 Dashboard - Processing auth hash directly");
          console.log("🏠 Dashboard - Auth configuration:", {
            persistSession: true, // Default value
            detectSessionInUrl: true // Default value
          });
          
          const { data, error } = await supabase.auth.getSession();
          console.log("🏠 Dashboard - Hash processing result:", { 
            hasSession: !!data.session, 
            error 
          });
          
          if (data.session) {
            console.log("🏠 Dashboard - Hash processing user:", data.session.user?.id);
            console.log("🏠 Dashboard - Hash processing provider:", data.session.user?.app_metadata?.provider);
          }
          
          // If no session but hash exists, try manual extraction
          if (!data.session && location.hash.includes('access_token')) {
            console.log("🏠 Dashboard - No session after automatic processing, trying manual approach");
            try {
              const hashParams = new URLSearchParams(location.hash.substring(1));
              const accessToken = hashParams.get('access_token');
              
              if (accessToken) {
                console.log("🏠 Dashboard - Manually extracted access token (first 10):", 
                  accessToken.substring(0, 10) + "...");
                
                // Try a different approach to set the session manually
                const { data: manualData, error: manualError } = await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: ''
                });
                
                console.log("🏠 Dashboard - Manual setSession result:", { 
                  success: !!manualData.session,
                  error: manualError,
                  userId: manualData.session?.user?.id
                });
              }
            } catch (manualError) {
              console.error("🏠 Dashboard - Error during manual token exchange:", manualError);
            }
          }
        } catch (e) {
          console.error("🏠 Dashboard - Error processing hash:", e);
        }
      })();
    }
  }, [location.hash]);
  
  useEffect(() => {
    // Run on mount
    checkSession();
    
    // Also use the exported helper function
    checkCurrentSession().then(result => {
      console.log("🏠 Dashboard - checkCurrentSession result:", result);
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    // Log current auth state with more details
    console.log("🏠 Dashboard - Component mounted");
    console.log("🏠 Dashboard - Auth state:", { 
      user: user?.id, 
      isLoading,
      hasSession: !!session,
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    });
    
    // Log more session details if available
    if (session) {
      console.log("🏠 Dashboard - Session access token (first 20):", 
        session.access_token.substring(0, 20) + '...');
      console.log("🏠 Dashboard - Session user provider:", 
        session.user?.app_metadata?.provider);
      console.log("🏠 Dashboard - Session user metadata:", 
        JSON.stringify(session.user?.user_metadata));
    } else {
      console.log("🏠 Dashboard - No session available");
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
            <p className="mb-2">Hash Detected: {hashDetected.toString()}</p>
            
            <h3 className="font-bold">Supabase Config:</h3>
            <p className="mb-2">URL: {(supabase as any).supabaseUrl}</p>
            <p className="mb-2">Key (first 10): {(supabase as any).supabaseKey?.substring(0, 10) + "..."}</p>
            
            <button
              className="mt-2 px-3 py-1 bg-wiz-purple text-white rounded text-xs"
              onClick={checkSession}
            >
              Refresh Session Status
            </button>
            
            <button
              className="mt-2 ml-2 px-3 py-1 bg-wiz-purple text-white rounded text-xs"
              onClick={() => {
                debugHashParams();
                toast({
                  title: "URL Hash Checked",
                  description: location.hash ? "Hash parameters found in URL" : "No hash parameters in URL",
                });
              }}
            >
              Check URL Hash
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
      
      {/* Debug panel */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4">
          <button
            className="bg-wiz-purple text-white px-4 py-2 rounded-md text-sm"
            onClick={() => setShowDebug(!showDebug)}
          >
            {showDebug ? "Hide Debug" : "Show Debug"}
          </button>
          
          {showDebug && (
            <div className="fixed bottom-16 right-4 p-4 bg-white rounded-md shadow-lg max-w-sm max-h-80 overflow-auto">
              <h3 className="font-semibold mb-2">Debug Information</h3>
              <p>User ID: {user?.id || "None"}</p>
              <p>Session: {session ? "Active" : "None"}</p>
              <p>Hash detected: {hashDetected ? "Yes" : "No"}</p>
              
              <div className="mt-2">
                <button
                  className="text-xs bg-wiz-purple text-white px-2 py-1 rounded mr-2"
                  onClick={checkSession}
                >
                  Check Session
                </button>
                
                <button
                  className="text-xs bg-wiz-purple text-white px-2 py-1 rounded"
                  onClick={() => {
                    debugHashParams();
                    toast({
                      title: "URL Hash Debug",
                      description: "Check console for hash details",
                    });
                  }}
                >
                  Check URL Hash
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
