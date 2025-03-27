
import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { activateAgent, deactivateAgent, recoverAgent } from "@/utils/elevenlabsAgent";
import { ElevenLabsAgentState, HTMLElevenLabsConvaiElement } from "@/types/elevenlabs";

export const useMicActivation = (
  state: ElevenLabsAgentState,
  setState: React.Dispatch<React.SetStateAction<ElevenLabsAgentState>>,
  elevenLabsAgent: React.MutableRefObject<HTMLElevenLabsConvaiElement | null>,
  retryCount: React.MutableRefObject<number>,
  MAX_RETRIES: number,
  resetAgent: () => void,
  getAgentId: () => string
) => {
  const handleMicClick = useCallback(() => {
    if (!state.isInitialized) {
      toast({
        title: "Voice Assistant",
        description: "Voice assistant is initializing. Please try again in a moment.",
      });
      return;
    }
    
    try {
      // If agent is not active, activate it
      if (!state.isActive) {
        if (!elevenLabsAgent.current) {
          if (retryCount.current < MAX_RETRIES) {
            retryCount.current += 1;
            const recoveredAgent = recoverAgent(getAgentId());
            if (recoveredAgent) {
              elevenLabsAgent.current = recoveredAgent;
              console.log("Agent recovered successfully");
            } else {
              throw new Error("Failed to recover agent");
            }
          } else {
            throw new Error("Maximum retry attempts reached");
          }
        }
        
        activateAgent(elevenLabsAgent.current);
        setState(prev => ({ ...prev, isActive: true, isListening: true }));
        
        toast({
          title: "Voice Assistant",
          description: "Voice assistant activated. You can speak now.",
        });
      } else {
        // If agent is already active, deactivate it
        if (elevenLabsAgent.current) {
          deactivateAgent(elevenLabsAgent.current);
        }
        
        setState(prev => ({ ...prev, isActive: false, isListening: false }));
        
        toast({
          title: "Voice Assistant",
          description: "Voice assistant deactivated.",
        });
      }
    } catch (error) {
      console.error("Error handling mic click:", error);
      
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error : new Error(String(error))
      }));
      
      toast({
        title: "Voice Assistant Error",
        description: "An error occurred with the voice assistant. Attempting to reset...",
        variant: "destructive"
      });
      
      // Try to reset the agent
      resetAgent();
    }
  }, [state.isInitialized, state.isActive, elevenLabsAgent, setState, getAgentId, retryCount, MAX_RETRIES, resetAgent]);
  
  return { handleMicClick };
};
