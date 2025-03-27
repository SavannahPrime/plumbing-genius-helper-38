
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { loadElevenLabsScript, createAgentElement } from "@/utils/elevenlabsAgent";
import { ElevenLabsError } from "@/utils/elevenlabsAgent";
import { ElevenLabsAgentState } from "@/types/elevenlabs";

export const useAgentInitialization = (getAgentId: () => string) => {
  const [state, setState] = useState<ElevenLabsAgentState>({
    isInitialized: false,
    isActive: false,
    isListening: false,
    isSpeaking: false,
    error: null,
    lastResponse: null
  });
  
  const elevenLabsAgent = useRef<HTMLElevenLabsConvaiElement | null>(null);
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;

  const initializeAgent = useCallback(async () => {
    try {
      // Load the ElevenLabs script
      await loadElevenLabsScript();
      
      // Create the agent element with the current specialty
      const currentAgentId = getAgentId();
      console.log("Creating agent with ID:", currentAgentId);
      const agentElement = createAgentElement(currentAgentId);
      
      if (agentElement) {
        elevenLabsAgent.current = agentElement;
        
        // Give the element time to initialize
        setTimeout(() => {
          setState(prev => ({ 
            ...prev, 
            isInitialized: true,
            error: null // Clear any previous errors
          }));
          console.log("ElevenLabs agent initialized with ID:", currentAgentId);
        }, 2000);
      }
    } catch (error) {
      console.error("Error initializing agent:", error);
      
      const errorMessage = error instanceof ElevenLabsError 
        ? `[${error.code}] ${error.message}`
        : String(error);
        
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error : new Error(errorMessage)
      }));
      
      // Try to recover automatically if we haven't exceeded retries
      if (retryCount.current < MAX_RETRIES) {
        retryCount.current += 1;
        console.log(`Retrying initialization (${retryCount.current}/${MAX_RETRIES})...`);
        
        // Wait a bit before retrying
        setTimeout(initializeAgent, 2000);
      } else {
        toast({
          title: "Voice Assistant Error",
          description: "Failed to initialize voice assistant after multiple attempts. Please try again later.",
          variant: "destructive"
        });
      }
    }
  }, [getAgentId]);

  return {
    state,
    setState,
    elevenLabsAgent,
    retryCount,
    MAX_RETRIES,
    initializeAgent
  };
};
