
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { deactivateAgent, removeAgentElement } from "@/utils/elevenlabsAgent";
import { ElevenLabsAgentHook } from "@/types/elevenlabs";
import { useAgentIdResolver } from "./elevenlabs/useAgentIdResolver";
import { useAgentInitialization } from "./elevenlabs/useAgentInitialization";
import { useAgentReset } from "./elevenlabs/useAgentReset";
import { useMicActivation } from "./elevenlabs/useMicActivation";

export const useElevenLabsAgent = (): ElevenLabsAgentHook => {
  // Get the agent ID based on the current route
  const { getAgentId } = useAgentIdResolver();
  
  // Initialize the agent
  const { 
    state, 
    setState, 
    elevenLabsAgent, 
    retryCount, 
    MAX_RETRIES,
    initializeAgent 
  } = useAgentInitialization(getAgentId);
  
  // Set up agent reset functionality
  const { resetAgent } = useAgentReset(
    elevenLabsAgent, 
    setState, 
    retryCount, 
    getAgentId
  );
  
  // Set up microphone activation
  const { handleMicClick } = useMicActivation(
    state,
    setState,
    elevenLabsAgent,
    retryCount,
    MAX_RETRIES,
    resetAgent,
    getAgentId
  );

  // Initialize the agent when the component mounts
  useEffect(() => {
    initializeAgent();

    // Cleanup on unmount
    return () => {
      if (elevenLabsAgent.current) {
        deactivateAgent(elevenLabsAgent.current);
        removeAgentElement(elevenLabsAgent.current);
        elevenLabsAgent.current = null;
      }
    };
  }, [initializeAgent]);

  // When active, disable scrolling and append "talkingWithAI" class to body
  useEffect(() => {
    if (state.isActive) {
      document.body.classList.add("talkingWithAI");
    } else {
      document.body.classList.remove("talkingWithAI");
    }
    
    return () => {
      document.body.classList.remove("talkingWithAI");
    };
  }, [state.isActive]);

  return { 
    handleMicClick, 
    agentId: getAgentId(),
    isInitialized: state.isInitialized,
    isActive: state.isActive,
    isListening: state.isListening,
    isSpeaking: state.isSpeaking,
    error: state.error,
    resetAgent
  };
};
