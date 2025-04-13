
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  authError: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        console.log("Initializing auth state...");
        
        // IMPORTANT: Set up auth state change listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, newSession) => {
            console.log("AUTH STATE CHANGED - EVENT:", event);
            console.log("AUTH STATE CHANGED - SESSION:", newSession?.user?.id || "NO SESSION");
            console.log("AUTH STATE CHANGED - URL:", window.location.href);
            
            if (mounted) {
              // Update state with new session information
              setSession(newSession);
              setUser(newSession?.user ?? null);
              setAuthError(null); // Clear any previous errors on successful auth change
              
              // Show welcome toast on sign in
              if (event === 'SIGNED_IN') {
                console.log("SIGNED_IN event detected with user:", newSession?.user?.id);
                toast({
                  title: "Successfully Connected!",
                  description: "Welcome to the Wizverse, meme lord!",
                });
                
                // Force loading to false on sign in
                setIsLoading(false);
              }
              
              // Show logout toast on sign out
              if (event === 'SIGNED_OUT') {
                toast({
                  title: "Logged Out",
                  description: "Come back soon for more meme magic!",
                });
                
                // Force loading to false on sign out
                setIsLoading(false);
              }
            }
          }
        );
        
        console.log("Auth state change listener registered");
        
        // THEN check for existing session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        console.log("Current session check:", currentSession?.user?.id || "No session");
        
        if (sessionError) {
          console.error("Session retrieval error:", sessionError);
          setAuthError(`Session retrieval failed: ${sessionError.message}`);
        }
        
        if (currentSession && mounted) {
          console.log("Existing session found, updating state");
          setSession(currentSession);
          setUser(currentSession.user);
          setIsLoading(false);
        } else {
          console.log("No existing session found");
          
          // Check for auth hash params
          if (window.location.hash && window.location.hash.includes('access_token')) {
            console.log("Auth hash params detected, processing...");
            // Don't set loading to false yet, let the hash processing complete
          } else {
            // No hash params, nothing to wait for
            if (mounted) {
              setIsLoading(false);
            }
          }
        }
        
        // Always set loading to false after a timeout, just in case
        setTimeout(() => {
          if (mounted) {
            setIsLoading(false);
          }
        }, 1000);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error: any) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          setIsLoading(false);
          setAuthError(`Authentication initialization error: ${error.message}`);
          toast({
            title: "Authentication Error",
            description: "There was a problem initializing your session. Please try refreshing the page.",
            variant: "destructive",
          });
        }
      }
    };
    
    initializeAuth();
    
    return () => {
      mounted = false;
    };
  }, [toast]);

  // Sign out function
  const signOut = async () => {
    try {
      console.log("Signing out...");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
      setAuthError(null);
      console.log("Sign out successful");
    } catch (error: any) {
      console.error("Sign out error:", error);
      setAuthError(`Sign out error: ${error.message}`);
      toast({
        title: "Sign Out Error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      isLoading,
      authError,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
