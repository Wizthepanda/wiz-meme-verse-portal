
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const AuthStatus = () => {
  const { user, session, isLoading, authError } = useAuth();
  const navigate = useNavigate();
  const [detailedSession, setDetailedSession] = useState<any>(null);
  const [urlInfo, setUrlInfo] = useState<{hash: string, search: string}>({ 
    hash: window.location.hash, 
    search: window.location.search 
  });

  useEffect(() => {
    // Get detailed session info
    const getSessionDetails = async () => {
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
  }, [user, session]);

  const handleCheckAuth = async () => {
    try {
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
    } catch (e: any) {
      console.error("Error checking auth:", e);
      setDetailedSession({ error: e.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Authentication Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="text-center p-4">
              <div className="animate-spin h-6 w-6 border-2 border-wiz-purple border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2">Checking authentication status...</p>
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
    </div>
  );
};

export default AuthStatus;
