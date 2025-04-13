
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
            
            if (mounted) {
              // Update state with new session information
              setSession(newSession);
              setUser(newSession?.user ?? null);
              
              // Show welcome toast on sign in
              if (event === 'SIGNED_IN') {
                toast({
                  title: "Successfully Connected!",
                  description: "Welcome to the Wizverse, meme lord!",
                });
              }
              
              // Show logout toast on sign out
              if (event === 'SIGNED_OUT') {
                toast({
                  title: "Logged Out",
                  description: "Come back soon for more meme magic!",
                });
              }
            }
          }
        );
        
        console.log("Auth state change listener registered");
        
        // THEN check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Current session check:", currentSession?.user?.id || "No session");
        
        if (currentSession && mounted) {
          console.log("Existing session found, updating state");
          setSession(currentSession);
          setUser(currentSession.user);
        } else {
          console.log("No existing session found");
        }
        
        // Always set loading to false after initialization
        if (mounted) {
          setIsLoading(false);
        }
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          setIsLoading(false);
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
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error("Sign out error:", error);
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
