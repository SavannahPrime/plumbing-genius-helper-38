
import { useState, useEffect, useCallback, useRef } from "react";
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
  const scriptLoadAttempts = useRef(0);
  const maxScriptLoadAttempts = 3;
  
  // Get the appropriate agent ID based on specialty
  const getAgentId = useCallback(() => {
    if (specialtyParam && specialtyParam in ELEVEN_LABS_AGENT_IDS) {
      return ELEVEN_LABS_AGENT_IDS[specialtyParam as keyof typeof ELEVEN_LABS_AGENT_IDS];
    }
    return ELEVEN_LABS_AGENT_ID;
  }, [specialtyParam]);
  
  // More robust script loading with retry mechanism
  const loadScript = useCallback(() => {
    // Check if script is already loaded and custom element is registered
    if (document.querySelector(`script[src="${SCRIPT_URL}"]`) && customElements.get("elevenlabs-convai")) {
      console.log("ElevenLabs script already loaded and custom element registered");
      setIsInitialized(true);
      return;
    }
    
    // Remove any existing script to prevent duplicate loading
    const existingScript = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.remove();
      console.log("Removed existing ElevenLabs script for reload");
    }
    
    scriptLoadAttempts.current += 1;
    console.log(`Loading ElevenLabs script (attempt ${scriptLoadAttempts.current}/${maxScriptLoadAttempts})`);
    
    // Create and load the script
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.type = "text/javascript";
    
    script.onload = () => {
      console.log("ElevenLabs script loaded successfully");
      
      // Verify the custom element is registered after script load
      setTimeout(() => {
        if (customElements.get("elevenlabs-convai")) {
          console.log("ElevenLabs custom element verified");
          setIsInitialized(true);
        } else {
          console.error("ElevenLabs custom element not registered after script load");
          if (scriptLoadAttempts.current < maxScriptLoadAttempts) {
            console.log("Retrying script load...");
            loadScript();
          } else {
            toast({
              title: "Voice Assistant Error",
              description: "Failed to initialize voice assistant. Please refresh the page and try again.",
              variant: "destructive"
            });
          }
        }
      }, 1000); // Give time for the custom element to register
    };
    
    script.onerror = (error) => {
      console.error("Error loading ElevenLabs script:", error);
      
      if (scriptLoadAttempts.current < maxScriptLoadAttempts) {
        console.log("Retrying script load after error...");
        setTimeout(loadScript, 1000);
      } else {
        toast({
          title: "Voice Assistant Error",
          description: "Failed to load voice assistant. Please check your internet connection and try again.",
          variant: "destructive"
        });
      }
    };
    
    document.head.appendChild(script);
  }, []);
  
  // Load the ElevenLabs script
  useEffect(() => {
    loadScript();
    
    // Cleanup on unmount - we reset the attempt counter
    return () => {
      scriptLoadAttempts.current = 0;
    };
  }, [loadScript]);
  
  // Create or update the widget element with better error handling
  const ensureWidgetExists = useCallback(() => {
    if (!isInitialized) {
      console.warn("Cannot create widget - ElevenLabs not initialized");
      return false;
    }
    
    try {
      const agentId = getAgentId();
      let widgetElement = document.querySelector("elevenlabs-convai") as HTMLElement;
      
      // If widget doesn't exist, create it
      if (!widgetElement) {
        if (!customElements.get("elevenlabs-convai")) {
          console.error("Cannot create widget - custom element not registered");
          return false;
        }
        
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
    } catch (error) {
      console.error("Error ensuring widget exists:", error);
      return false;
    }
  }, [isInitialized, getAgentId]);
  
  // Handle activation (microphone button click) with more robust error handling
  const handleActivate = useCallback(() => {
    if (!isInitialized) {
      loadScript(); // Try to load the script again if not initialized
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
        description: "Could not initialize voice assistant. Please refresh the page and try again.",
        variant: "destructive"
      });
      return;
    }
    
    // The widget handles the microphone activation on its own
    toast({
      title: "Voice Assistant",
      description: "Voice assistant activated. You can speak now.",
    });
  }, [isInitialized, ensureWidgetExists, loadScript]);
  
  // Reset the widget (recreate it)
  const resetWidget = useCallback(() => {
    if (!isInitialized) {
      loadScript(); // Try to reload the script if not initialized
      return;
    }
    
    // Remove existing widget
    const existingWidget = document.querySelector("elevenlabs-convai");
    if (existingWidget) {
      existingWidget.remove();
    }
    
    // Create new widget
    const success = ensureWidgetExists();
    
    if (success) {
      toast({
        title: "Voice Assistant",
        description: "Voice assistant has been reset.",
      });
    } else {
      toast({
        title: "Voice Assistant",
        description: "Failed to reset voice assistant. Please refresh the page.",
        variant: "destructive"
      });
    }
  }, [isInitialized, ensureWidgetExists, loadScript]);
  
  return {
    isInitialized,
    agentId: getAgentId(),
    handleActivate,
    resetWidget
  };
};
