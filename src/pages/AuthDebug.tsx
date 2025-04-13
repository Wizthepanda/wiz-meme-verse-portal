
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Detailed auth debugger page
const AuthDebug = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [authLogs, setAuthLogs] = useState<string[]>([]);
  const [responseDetails, setResponseDetails] = useState<any>(null);
  const [networkLogs, setNetworkLogs] = useState<any[]>([]);

  // Log function that displays in UI and console
  const log = (message: string) => {
    console.log(`🔍 AUTH DEBUG: ${message}`);
    setAuthLogs(prev => [...prev, `${new Date().toISOString()} - ${message}`]);
  };

  // Capture network requests with detailed logging
  useEffect(() => {
    log("Setting up network request interceptor");
    const originalFetch = window.fetch;
    
    window.fetch = async function(input, init) {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      
      if (url.includes('supabase') && (url.includes('token') || url.includes('callback') || url.includes('auth'))) {
        const requestDetails = {
          url,
          method: init?.method || 'GET',
          headers: init?.headers ? JSON.stringify(init.headers) : 'None',
          body: init?.body ? JSON.stringify(init.body) : 'None',
          timestamp: new Date().toISOString()
        };
        
        log(`Network Request: ${requestDetails.method} ${url}`);
        
        try {
          const response = await originalFetch(input, init);
          const responseClone = response.clone();
          
          try {
            const text = await responseClone.text();
            let data;
            try {
              data = JSON.parse(text);
            } catch (e) {
              data = text;
            }
            
            const responseDetails = {
              status: response.status,
              ok: response.ok,
              data,
              timestamp: new Date().toISOString()
            };
            
            log(`Response: ${response.status} ${response.ok ? 'OK' : 'Failed'}`);
            setNetworkLogs(prev => [...prev, { request: requestDetails, response: responseDetails }]);
            setResponseDetails(responseDetails);
          } catch (e) {
            log(`Error parsing response: ${e}`);
          }
          
          return response;
        } catch (error) {
          log(`Fetch error: ${error}`);
          throw error;
        }
      }
      
      return originalFetch(input, init);
    };
    
    return () => {
      window.fetch = originalFetch;
      log("Network interceptor removed");
    };
  }, []);

  // Handle auth state changes with detailed logging
  useEffect(() => {
    log("Mounting AuthDebug component");
    log(`Current URL: ${window.location.href}`);
    log(`Hash: ${location.hash}`);
    log(`Search params: ${location.search}`);
    
    // Parse hash and search params
    if (location.hash) {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      log(`Hash params detected: ${Array.from(hashParams.entries()).map(([k, v]) => `${k}=${v.substring(0, 10)}...`).join(', ')}`);
      
      if (hashParams.has('access_token')) {
        log(`Hash contains access_token (first 10 chars): ${hashParams.get('access_token')?.substring(0, 10)}...`);
      }
    }
    
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      log(`Search params detected: ${Array.from(searchParams.entries()).map(([k, v]) => `${k}=${v}`).join(', ')}`);
      
      if (searchParams.has('error')) {
        log(`ERROR DETECTED in search params: ${searchParams.get('error')}`);
        log(`Error description: ${searchParams.get('error_description')}`);
      }
    }
    
    // Log Supabase config
    log(`Supabase URL: ${(supabase as any).supabaseUrl}`);
    log(`Supabase Key (first 10): ${(supabase as any).supabaseKey?.substring(0, 10)}...`);
    log(`Auth config: ${JSON.stringify((supabase.auth as any)._config || {})}`);
    
    // Check initial session
    supabase.auth.getSession().then(({ data, error }) => {
      log(`Initial session check result: ${data.session ? 'HAS SESSION' : 'NO SESSION'}`);
      if (data.session) {
        log(`User ID: ${data.session.user.id}`);
        log(`Auth Provider: ${data.session.user.app_metadata?.provider || 'None'}`);
        log(`Access Token (first 10): ${data.session.access_token.substring(0, 10)}...`);
        setSession(data.session);
      }
      if (error) {
        log(`Session check error: ${error.message}`);
      }
    });
    
    // Setup auth state change listener with explicit logging
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      log(`AUTH STATE CHANGE EVENT: ${event}`);
      log(`Session after event: ${session ? 'EXISTS' : 'NONE'}`);
      
      if (session) {
        log(`User ID: ${session.user.id}`);
        log(`Auth Provider: ${session.user.app_metadata?.provider || 'None'}`);
        log(`Access Token (first 10): ${session.access_token.substring(0, 10)}...`);
        setSession(session);
        
        toast({
          title: "Authentication Success",
          description: `You are now logged in as ${session.user.email || session.user.id}`,
        });
      } else {
        log("No session available after auth state change");
        setSession(null);
      }
    });
    
    return () => {
      subscription.unsubscribe();
      log("Auth state listener unsubscribed");
    };
  }, [location, toast]);

  // Handle Twitter login with capture
  const handleTwitterLogin = async () => {
    try {
      log("Starting Twitter login flow");
      
      // Define redirect URL clearly
      const origin = window.location.origin;
      const redirectTo = `${origin}/auth-debug`;
      log(`Redirect URL: ${redirectTo}`);
      
      // Clear existing logs
      setAuthLogs([]);
      setNetworkLogs([]);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo,
          scopes: 'tweet.read users.read',
        }
      });
      
      if (error) {
        log(`Twitter auth error: ${error.message}`);
        throw error;
      }
      
      log(`Auth response received: ${data.url ? 'Has URL' : 'No URL'}`);
      log(`Provider URL: ${data.url}`);
      log("Redirecting to provider...");
      
    } catch (error: any) {
      log(`Twitter auth error: ${error.message}`);
      toast({
        title: "Authentication Failed",
        description: error.message || "Could not connect to Twitter",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Twitter Auth Debugging</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm mb-2">
              <strong>Current URL:</strong> {window.location.href}
            </p>
            <p className="text-sm mb-2">
              <strong>Supabase URL:</strong> {(supabase as any).supabaseUrl}
            </p>
            <p className="text-sm mb-4">
              <strong>Supabase Key (first 10):</strong> {(supabase as any).supabaseKey?.substring(0, 10)}...
            </p>
            
            <Button 
              onClick={handleTwitterLogin} 
              className="w-full bg-[#1DA1F2] hover:bg-[#1a94df]"
            >
              Sign in with Twitter (Debug Mode)
            </Button>
          </div>
          
          {session && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-4">
              <h3 className="font-bold text-green-800">Authenticated!</h3>
              <p className="text-sm">User ID: {session.user.id}</p>
              <p className="text-sm">Provider: {session.user.app_metadata?.provider || 'None'}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={async () => {
                  log("Signing out...");
                  await supabase.auth.signOut();
                  log("Signed out");
                  setSession(null);
                }}
              >
                Sign Out
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <h3 className="font-bold mb-2">Auth Event Logs</h3>
              <div className="bg-gray-100 rounded p-2 h-60 overflow-y-auto text-xs font-mono">
                {authLogs.length > 0 ? (
                  authLogs.map((log, i) => (
                    <div key={i} className="mb-1">{log}</div>
                  ))
                ) : (
                  <p className="text-gray-500">No auth events logged yet</p>
                )}
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-bold mb-2">Network Logs</h3>
              <div className="bg-gray-100 rounded p-2 h-60 overflow-y-auto text-xs font-mono">
                {networkLogs.length > 0 ? (
                  networkLogs.map((log, i) => (
                    <div key={i} className="mb-2">
                      <div><strong>Request:</strong> {log.request.method} {log.request.url}</div>
                      <div><strong>Response:</strong> {log.response.status} {log.response.ok ? 'OK' : 'Failed'}</div>
                      <Separator className="my-1" />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No network requests logged yet</p>
                )}
              </div>
            </div>
          </div>
          
          {responseDetails && (
            <div className="mt-4 border rounded-md p-4">
              <h3 className="font-bold mb-2">Last Response Details</h3>
              <div className="bg-gray-100 rounded p-2 overflow-x-auto">
                <pre className="text-xs">{JSON.stringify(responseDetails, null, 2)}</pre>
              </div>
            </div>
          )}
          
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                log("Manually checking session...");
                supabase.auth.getSession().then(({ data, error }) => {
                  log(`Manual session check: ${data.session ? 'HAS SESSION' : 'NO SESSION'}`);
                  if (data.session) {
                    log(`User ID: ${data.session.user.id}`);
                    setSession(data.session);
                  }
                  if (error) {
                    log(`Session check error: ${error.message}`);
                  }
                });
              }}
            >
              Check Session
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigate('/');
              }}
            >
              Go to Home
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setAuthLogs([]);
                setNetworkLogs([]);
                setResponseDetails(null);
                log("Logs cleared");
              }}
            >
              Clear Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthDebug;
