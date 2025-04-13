
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const useDebugInfo = () => {
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  // Debug auth state and URL params with enhanced logging
  useEffect(() => {
    console.log("📱 Index - Component mounted");
    console.log("📱 Index - Current URL:", window.location.href);
    console.log("📱 Index - Auth state:", { user: user?.id, isLoading });
    console.log("📱 Index - URL query params:", location.search);
    console.log("📱 Index - URL hash:", location.hash);
    
    // Log Supabase configuration
    console.log("📱 Index - Supabase URL:", (supabase as any).supabaseUrl);
    console.log("📱 Index - Supabase key (first 10):", (supabase as any).supabaseKey?.substring(0, 10) + "...");
    
    // Collect debug info
    const info = {
      url: window.location.href,
      user: user?.id,
      isLoading,
      hash: location.hash,
      supabaseUrl: (supabase as any).supabaseUrl,
      supabaseKeyStart: (supabase as any).supabaseKey?.substring(0, 10) + "..."
    };
    setDebugInfo(info);
    
  }, [user, isLoading, location]);

  return debugInfo;
};
