
import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { removeAgentElement, createAgentElement } from "@/utils/elevenlabsAgent";
import { ElevenLabsAgentState } from "@/types/elevenlabs";

export const useAgentReset = (
  elevenLabsAgent: React.MutableRefObject<HTMLElevenLabsConvaiElement | null>,
  setState: React.Dispatch<React.SetStateAction<ElevenLabsAgentState>>,
  retryCount: React.MutableRefObject<number>,
  getAgentId: () => string
) => {
  const resetAgent = useCallback(() => {
    if (elevenLabsAgent.current) {
      removeAgentElement(elevenLabsAgent.current);
      elevenLabsAgent.current = null;
    }
    
    retryCount.current = 0;
    
    setState({
      isInitialized: false,
      isActive: false,
      isListening: false,
      isSpeaking: false,
      error: null,
      lastResponse: null
    });
    
    try {
      // Try to create a new agent with current specialty
      const agentElement = createAgentElement(getAgentId());
      if (agentElement) {
        elevenLabsAgent.current = agentElement;
        
        setTimeout(() => {
          setState(prev => ({ ...prev, isInitialized: true }));
          toast({
            title: "Voice Assistant",
            description: "Voice assistant has been reset successfully.",
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error during agent reset:", error);
      
      toast({
        title: "Voice Assistant Reset Failed",
        description: "Unable to reset the voice assistant. Please refresh the page and try again.",
        variant: "destructive"
      });
      
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error : new Error(String(error))
      }));
    }
  }, [elevenLabsAgent, setState, retryCount, getAgentId]);

  return { resetAgent };
};
