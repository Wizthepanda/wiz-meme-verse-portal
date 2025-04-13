
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase, SUPABASE_CONFIG } from "@/integrations/supabase/client";

const AuthStatus = () => {
  const { user, session, isLoading, authError } = useAuth();
  const navigate = useNavigate();
  const [detailedSession, setDetailedSession] = useState<any>(null);
  const [urlInfo, setUrlInfo] = useState<{hash: string, search: string}>({ 
    hash: window.location.hash, 
    search: window.location.search 
  });
  const [showDevInfo, setShowDevInfo] = useState(true);
  const [processingHash, setProcessingHash] = useState(false);

  useEffect(() => {
    console.log("AuthStatus - Component mounted, current URL:", window.location.href);
    
    // Get detailed session info
    const getSessionDetails = async () => {
      console.log("AuthStatus - Getting session details");
      const { data, error } = await supabase.auth.getSession();
      setDetailedSession({
        hasSession: !!data.session,
        provider: data.session?.user?.app_metadata?.provider,
        userMetadata: data.session?.user?.user_metadata,
        appMetadata: data.session?.user?.app_metadata,
        error: error?.message
      });
    };
    
    getSessionDetails();
    
    // Process hash params if present
    if (window.location.hash && window.location.hash.includes('access_token')) {
      setProcessingHash(true);
      console.log("AuthStatus - Access token found in hash, processing");
      
      // Let auth redirect hook handle the processing
      // We will get redirected to dashboard if successful
    }
  }, [user, session]);

  const handleCheckAuth = async () => {
    try {
      console.log("AuthStatus - Manually checking auth status");
      const { data, error } = await supabase.auth.getSession();
      setDetailedSession({
        hasSession: !!data.session,
        provider: data.session?.user?.app_metadata?.provider,
        userMetadata: data.session?.user?.user_metadata,
        appMetadata: data.session?.user?.app_metadata,
        error: error?.message
      });
      
      setUrlInfo({ 
        hash: window.location.hash, 
        search: window.location.search 
      });
      
      if (data.session) {
        console.log("Session found during manual check:", data.session.user.id);
      } else {
        console.log("No session found during manual check");
      }
    } catch (e: any) {
      console.error("Error checking auth:", e);
      setDetailedSession({ error: e.message });
    }
  };

  // Try again button handler
  const handleTryAgain = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl flex justify-between items-center">
            Authentication Status
            {user ? (
              <Badge className="bg-green-500">Authenticated</Badge>
            ) : (
              <Badge variant="destructive">Not Authenticated</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading || processingHash ? (
            <div className="text-center p-4">
              <div className="animate-spin h-6 w-6 border-2 border-wiz-purple border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2">
                {processingHash ? "Processing authentication token..." : "Checking authentication status..."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-semibold">Authentication State:</div>
                <div>{user ? "Authenticated" : "Not Authenticated"}</div>
                
                <div className="font-semibold">User ID:</div>
                <div className="break-all">{user?.id || "N/A"}</div>
                
                <div className="font-semibold">Provider:</div>
                <div>{detailedSession?.provider || "N/A"}</div>
                
                <div className="font-semibold">Has Session:</div>
                <div>{session ? "Yes" : "No"}</div>
                
                <div className="font-semibold">URL Hash:</div>
                <div className="break-all">{urlInfo.hash || "None"}</div>
                
                <div className="font-semibold">URL Search:</div>
                <div className="break-all">{urlInfo.search || "None"}</div>
                
                <div className="font-semibold">Session Token:</div>
                <div className="break-all">
                  {session?.access_token ? 
                    `${session.access_token.substring(0, 15)}...` : 
                    "None"}
                </div>
              </div>
              
              {authError && (
                <Alert variant="destructive">
                  <AlertTitle>Authentication Error</AlertTitle>
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}
              
              {detailedSession?.error && (
                <Alert variant="destructive">
                  <AlertTitle>Session Error</AlertTitle>
                  <AlertDescription>{detailedSession.error}</AlertDescription>
                </Alert>
              )}
              
              <div className="pt-4 space-y-2">
                <Button 
                  onClick={handleCheckAuth} 
                  variant="outline" 
                  className="w-full"
                >
                  Refresh Auth Status
                </Button>
                
                <Button 
                  onClick={handleTryAgain} 
                  className="w-full bg-wiz-purple hover:bg-wiz-purple/90"
                >
                  Try Again
                </Button>
                
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  className="w-full bg-wiz-purple hover:bg-wiz-purple/90"
                >
                  Try Dashboard
                </Button>
                
                <Button 
                  onClick={() => navigate('/')} 
                  variant="outline" 
                  className="w-full"
                >
                  Return to Home
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Button 
        variant="link" 
        onClick={() => setShowDevInfo(!showDevInfo)}
        className="mt-4"
      >
        {showDevInfo ? "Hide Developer Info" : "Show Developer Info"}
      </Button>
      
      {showDevInfo && (
        <>
          <Card className="w-full max-w-xl mt-4 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Supabase Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">
                <strong>Supabase URL:</strong> {SUPABASE_CONFIG.url}
              </p>
              <p className="text-sm mb-2">
                <strong>Supabase Key:</strong> {SUPABASE_CONFIG.key}
              </p>
              <Alert className="mt-4">
                <AlertTitle>Important: Redirect URLs Check</AlertTitle>
                <AlertDescription>
                  Ensure these URLs are added to your Supabase redirect URLs:
                  <ul className="list-disc pl-5 mt-2 text-xs">
                    <li>{window.location.origin}</li>
                    <li>{window.location.origin}/</li>
                    <li>{window.location.origin}/dashboard</li>
                    <li>{window.location.origin}/auth-status</li>
                    <li>{window.location.origin}/auth-debug</li>
                  </ul>
                  <div className="mt-2 text-sm font-semibold">
                    The most common issue is missing redirect URLs in your Supabase configuration.
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          {detailedSession?.userMetadata && (
            <Card className="w-full max-w-xl mt-4 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">User Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(detailedSession.userMetadata, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AuthStatus;
