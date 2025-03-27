
import { useCallback, useEffect, useRef, useState } from "react";
import { createAgentElement, loadElevenLabsScript, isElevenLabsReady } from "@/utils/elevenlabsAgent";
import { ElevenLabsAgentState, HTMLElevenLabsConvaiElement } from "@/types/elevenlabs";
import { toast } from "@/hooks/use-toast";

export const useAgentInitialization = (getAgentId: () => string) => {
  const [state, setState] = useState<ElevenLabsAgentState>({
    isInitialized: false,
    isActive: false,
    isListening: false,
    isSpeaking: false,
    error: null
  });
  
  const elevenLabsAgent = useRef<HTMLElevenLabsConvaiElement | null>(null);
  const retryCount = useRef<number>(0);
  const MAX_RETRIES = 3;
  
  const initializeAgent = useCallback(async () => {
    if (state.isInitialized || elevenLabsAgent.current) return;
    
    try {
      // Load ElevenLabs script if not already loaded
      if (!isElevenLabsReady()) {
        await loadElevenLabsScript();
      }
      
      const agentId = getAgentId();
      console.log("Initializing ElevenLabs agent with ID:", agentId);
      
      // Create agent element
      const agentElement = createAgentElement(agentId);
      if (agentElement) {
        elevenLabsAgent.current = agentElement;
        
        // Give time for initialization to complete
        setTimeout(() => {
          setState(prev => ({ ...prev, isInitialized: true }));
          console.log("ElevenLabs agent initialized successfully");
        }, 2000);
      } else {
        throw new Error("Failed to create agent element");
      }
    } catch (error) {
      console.error("Error initializing ElevenLabs agent:", error);
      
      if (retryCount.current < MAX_RETRIES) {
        retryCount.current += 1;
        console.log(`Retrying agent initialization (${retryCount.current}/${MAX_RETRIES})...`);
        
        setTimeout(() => {
          initializeAgent();
        }, 2000);
      } else {
        setState(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error : new Error(String(error)) 
        }));
        
        toast({
          title: "Voice Assistant Initialization Failed",
          description: "Unable to initialize voice assistant. Please try again later.",
          variant: "destructive"
        });
      }
    }
  }, [state.isInitialized, getAgentId]);
  
  return { 
    state, 
    setState, 
    elevenLabsAgent, 
    retryCount, 
    MAX_RETRIES,
    initializeAgent 
  };
};
