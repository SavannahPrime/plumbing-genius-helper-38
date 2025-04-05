
import { ElevenLabsAgentHook } from "@/types/elevenlabs";
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { SCRIPT_URL } from "@/constants/elevenlabs";

export const useElevenLabsAgent = (): ElevenLabsAgentHook => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [agentId, setAgentId] = useState("");

  // Initialize the ElevenLabs agent
  useEffect(() => {
    // Check if the script is already loaded
    if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      console.log("ElevenLabs script already loaded");
      setIsInitialized(true);
      return;
    }

    console.log("Loading ElevenLabs script");
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      console.log("ElevenLabs script loaded successfully");
      setIsInitialized(true);
    };

    script.onerror = (error) => {
      console.error("Error loading ElevenLabs script:", error);
      setError(new Error("Failed to load ElevenLabs script"));
      toast({
        title: "Voice Assistant Error",
        description: "Could not initialize voice assistant. Please refresh and try again.",
        variant: "destructive"
      });
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // We don't remove the script on unmount as it might be used by other components
    };
  }, []);

  const handleMicClick = useCallback(() => {
    if (!isInitialized) {
      toast({
        title: "Voice Assistant",
        description: "Voice assistant is initializing. Please try again in a moment.",
      });
      return;
    }

    try {
      // Find existing widget or create a new one
      let widget = document.querySelector("elevenlabs-convai");
      
      if (!widget) {
        console.log("Creating ElevenLabs widget");
        
        // Create the widget element if it doesn't exist
        const newWidget = document.createElement("elevenlabs-convai");
        newWidget.setAttribute("agent-id", "lX8syHY754gA8SdjQU6n"); // Default Home Fix Wizard agent
        
        // Apply styling to position it correctly
        newWidget.style.position = "fixed";
        newWidget.style.top = "10px";
        newWidget.style.right = "10px";
        newWidget.style.zIndex = "9999";
        
        document.body.appendChild(newWidget);
        
        // The widget will handle the rest (activating microphone, etc.)
        setIsActive(true);
        
        toast({
          title: "Voice Assistant",
          description: "Voice assistant activated. You can speak now.",
        });
      } else {
        console.log("ElevenLabs widget already exists");
        // The widget already exists, just make sure it's shown/active
        setIsActive(true);
        
        toast({
          title: "Voice Assistant",
          description: "Voice assistant is ready. You can speak now.",
        });
      }
    } catch (error) {
      console.error("Error activating voice assistant:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
      
      toast({
        title: "Voice Assistant Error",
        description: "Failed to activate voice assistant. Please try again.",
        variant: "destructive"
      });
    }
  }, [isInitialized]);

  const resetAgent = useCallback(() => {
    // Remove any existing widget
    const widget = document.querySelector("elevenlabs-convai");
    if (widget) {
      widget.remove();
    }
    
    setIsActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    
    toast({
      title: "Voice Assistant",
      description: "Voice assistant has been reset.",
    });
  }, []);

  return {
    handleMicClick,
    agentId,
    isInitialized,
    isActive,
    isListening,
    isSpeaking,
    error,
    resetAgent
  };
};
