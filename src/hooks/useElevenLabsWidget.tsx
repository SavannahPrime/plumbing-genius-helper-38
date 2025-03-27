
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ELEVEN_LABS_AGENT_IDS, ELEVEN_LABS_AGENT_ID, SCRIPT_URL } from "@/constants/elevenlabs";
import { toast } from "@/hooks/use-toast";
import { AgentSpecialty } from "@/services/specializedAgentService";

interface ElevenLabsWidgetHook {
  isInitialized: boolean;
  agentId: string;
  handleActivate: () => void;
  resetWidget: () => void;
}

export const useElevenLabsWidget = (): ElevenLabsWidgetHook => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchParams] = useSearchParams();
  const specialtyParam = searchParams.get('specialty') as AgentSpecialty | null;
  
  // Get the appropriate agent ID based on specialty
  const getAgentId = useCallback(() => {
    if (specialtyParam && specialtyParam in ELEVEN_LABS_AGENT_IDS) {
      return ELEVEN_LABS_AGENT_IDS[specialtyParam as keyof typeof ELEVEN_LABS_AGENT_IDS];
    }
    return ELEVEN_LABS_AGENT_ID;
  }, [specialtyParam]);
  
  // Load the ElevenLabs script
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    if (existingScript) {
      setIsInitialized(true);
      return;
    }
    
    // Create and load the script
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.type = "text/javascript";
    
    script.onload = () => {
      console.log("ElevenLabs script loaded successfully");
      setIsInitialized(true);
    };
    
    script.onerror = (error) => {
      console.error("Error loading ElevenLabs script:", error);
      toast({
        title: "Voice Assistant Error",
        description: "Failed to load voice assistant. Please try again later.",
        variant: "destructive"
      });
    };
    
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      // We don't remove the script on unmount to prevent reloading
    };
  }, []);
  
  // Create or update the widget element
  const ensureWidgetExists = useCallback(() => {
    const agentId = getAgentId();
    let widgetElement = document.querySelector("elevenlabs-convai") as HTMLElement;
    
    // If widget doesn't exist, create it
    if (!widgetElement) {
      widgetElement = document.createElement("elevenlabs-convai");
      widgetElement.setAttribute("agent-id", agentId);
      document.body.appendChild(widgetElement);
      console.log("Created ElevenLabs widget with agent ID:", agentId);
      return true;
    } 
    
    // If widget exists, update its agent ID if needed
    if (widgetElement.getAttribute("agent-id") !== agentId) {
      widgetElement.setAttribute("agent-id", agentId);
      console.log("Updated ElevenLabs widget with agent ID:", agentId);
    }
    
    return true;
  }, [getAgentId]);
  
  // Handle activation (microphone button click)
  const handleActivate = useCallback(() => {
    if (!isInitialized) {
      toast({
        title: "Voice Assistant",
        description: "Voice assistant is initializing. Please try again in a moment.",
      });
      return;
    }
    
    // Ensure widget exists with correct agent ID
    const success = ensureWidgetExists();
    if (!success) {
      toast({
        title: "Voice Assistant Error",
        description: "Could not initialize voice assistant. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    // The widget handles the microphone activation on its own
    toast({
      title: "Voice Assistant",
      description: "Voice assistant activated. You can speak now.",
    });
  }, [isInitialized, ensureWidgetExists]);
  
  // Reset the widget (recreate it)
  const resetWidget = useCallback(() => {
    // Remove existing widget
    const existingWidget = document.querySelector("elevenlabs-convai");
    if (existingWidget) {
      existingWidget.remove();
    }
    
    // Create new widget
    ensureWidgetExists();
    
    toast({
      title: "Voice Assistant",
      description: "Voice assistant has been reset.",
    });
  }, [ensureWidgetExists]);
  
  return {
    isInitialized,
    agentId: getAgentId(),
    handleActivate,
    resetWidget
  };
};
