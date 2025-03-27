
import { useRef, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { 
  ELEVEN_LABS_AGENT_ID,
  SCRIPT_URL 
} from "@/constants/elevenlabs";
import { 
  loadElevenLabsScript, 
  createAgentElement, 
  activateAgent,
  removeAgentElement
} from "@/utils/elevenlabsAgent";
import {
  HTMLElevenLabsConvaiElement,
  ElevenLabsAgentHook,
  ElevenLabsAgentState
} from "@/types/elevenlabs";

export const useElevenLabsAgent = (): ElevenLabsAgentHook => {
  const elevenLabsAgent = useRef<HTMLElevenLabsConvaiElement | null>(null);
  const [state, setState] = useState<ElevenLabsAgentState>({
    isInitialized: false,
    isActive: false,
    isListening: false,
    isSpeaking: false,
    error: null,
    lastResponse: null
  });

  // Initialize the agent when the component mounts
  useEffect(() => {
    const initializeAgent = async () => {
      try {
        // Load the ElevenLabs script
        await loadElevenLabsScript();
        
        // Create the agent element
        const agentElement = createAgentElement();
        if (agentElement) {
          elevenLabsAgent.current = agentElement;
          
          // Give the element time to initialize
          setTimeout(() => {
            setState(prev => ({ 
              ...prev, 
              isInitialized: true 
            }));
            console.log("ElevenLabs agent initialized");
          }, 2000);
        }
      } catch (error) {
        console.error("Error initializing agent:", error);
        setState(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error : new Error(String(error)) 
        }));
      }
    };

    initializeAgent();

    // Cleanup on unmount
    return () => {
      if (elevenLabsAgent.current) {
        removeAgentElement(elevenLabsAgent.current);
        elevenLabsAgent.current = null;
      }
    };
  }, []);

  // Reset agent - useful for recovering from errors
  const resetAgent = () => {
    if (elevenLabsAgent.current) {
      removeAgentElement(elevenLabsAgent.current);
      elevenLabsAgent.current = null;
    }
    
    setState({
      isInitialized: false,
      isActive: false,
      isListening: false,
      isSpeaking: false,
      error: null,
      lastResponse: null
    });
    
    const agentElement = createAgentElement();
    if (agentElement) {
      elevenLabsAgent.current = agentElement;
      
      setTimeout(() => {
        setState(prev => ({ ...prev, isInitialized: true }));
      }, 2000);
    }
  };

  // Handle microphone button click
  const handleMicClick = () => {
    console.log("Mic button clicked");
    
    // Check if agent is initialized
    if (!state.isInitialized) {
      console.log("Agent not initialized, creating element");
      const agentElement = createAgentElement();
      if (agentElement) {
        elevenLabsAgent.current = agentElement;
        
        setTimeout(() => {
          setState(prev => ({ ...prev, isInitialized: true }));
          handleMicClick(); // Try again after initialization
        }, 2000);
      }
      
      toast({
        title: "Voice Assistant",
        description: "Initializing voice assistant. Please try again in a moment.",
      });
      return;
    }
    
    try {
      if (elevenLabsAgent.current) {
        // Attempt to activate the agent
        activateAgent(elevenLabsAgent.current);
        
        setState(prev => ({ 
          ...prev, 
          isActive: true,
          isListening: true 
        }));
        
        toast({
          title: "Voice Assistant",
          description: "Voice assistant activated. You can speak now.",
        });
      } else {
        console.log("Agent element not found, recreating");
        const agentElement = createAgentElement();
        if (agentElement) {
          elevenLabsAgent.current = agentElement;
          setTimeout(handleMicClick, 2000);
        }
      }
    } catch (e) {
      console.error("Error handling mic click:", e);
      
      const error = e instanceof Error ? e : new Error(String(e));
      setState(prev => ({ ...prev, error }));
      
      // Reset the agent if activation fails
      resetAgent();
      
      toast({
        title: "Voice Assistant Reset",
        description: "Voice assistant has been reset. Please try again in a moment.",
      });
    }
  };

  return { 
    handleMicClick, 
    agentId: ELEVEN_LABS_AGENT_ID,
    isInitialized: state.isInitialized,
    isActive: state.isActive,
    isListening: state.isListening,
    isSpeaking: state.isSpeaking,
    error: state.error,
    resetAgent
  };
};
