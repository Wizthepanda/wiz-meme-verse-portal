
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";
import { checkCurrentSession, debugHashParams } from "@/integrations/supabase/client";

interface DebugPanelProps {
  debugInfo: any;
}

const DebugPanel = ({ debugInfo }: DebugPanelProps) => {
  const { toast } = useToast();
  const location = useLocation();

  const checkSessionStatus = async () => {
    try {
      console.log("🔍 Manual session check - Starting");
      const { data, error } = await checkCurrentSession();
      
      // Show debug toast with session info
      toast({
        title: "Session Status",
        description: `Session exists: ${!!data.session}, User ID: ${data.session?.user?.id || 'None'}`,
      });
      
    } catch (e) {
      console.error("🔍 Manual session check - Error:", e);
      toast({
        title: "Session Check Error",
        description: `Error: ${e instanceof Error ? e.message : String(e)}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 space-y-2">
      <button 
        onClick={checkSessionStatus}
        className="text-sm text-wiz-purple underline"
      >
        Debug: Check Session
      </button>
      
      <button 
        onClick={() => {
          debugHashParams();
          toast({
            title: "URL Hash Check",
            description: location.hash ? "Hash parameters found" : "No hash parameters",
          });
        }}
        className="text-sm text-wiz-purple underline"
      >
        Debug: Check URL Hash
      </button>
      
      {debugInfo && (
        <button
          onClick={() => {
            toast({
              title: "Debug Info",
              description: "Check console for detailed debug information",
            });
            console.log("📊 DEBUG INFO:", debugInfo);
          }}
          className="text-sm text-wiz-purple underline"
        >
          Show Debug Info
        </button>
      )}
    </div>
  );
};

export default DebugPanel;
