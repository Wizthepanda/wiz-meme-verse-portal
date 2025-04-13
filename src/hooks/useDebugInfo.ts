
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Simplified debug info hook that only logs basic information
export const useDebugInfo = () => {
  const { user } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  // Minimal logging for essential auth information
  useEffect(() => {
    if (user) {
      console.log("User authenticated:", user.id);
      setDebugInfo({ userId: user.id });
    } else {
      console.log("No user authenticated");
      setDebugInfo(null);
    }
  }, [user]);

  return debugInfo;
};
