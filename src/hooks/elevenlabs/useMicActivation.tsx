
import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { 
  activateAgent, 
  recoverAgent, 
  createAgentElement, 
  isElevenLabsReady,
  ElevenLabsError
} from "@/utils/elevenlabsAgent";
import { ElevenLabsAgentState } from "@/types/elevenlabs";

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
    console.log("Mic button clicked");
    
    // Check if the environment is ready
    if (!isElevenLabsReady()) {
      toast({
        title: "Voice Assistant",
        description: "Voice assistant is not ready. Please wait a moment and try again.",
      });
      
      // Try to initialize again
      if (retryCount.current < MAX_RETRIES) {
        retryCount.current += 1;
        elevenLabsAgent.current = recoverAgent(getAgentId());
        if (elevenLabsAgent.current) {
          setTimeout(() => {
            setState(prev => ({ ...prev, isInitialized: true }));
          }, 2000);
        }
      }
      return;
    }
    
    // Check if agent is initialized
    if (!state.isInitialized) {
      console.log("Agent not initialized, creating element");
      
      try {
        const agentElement = createAgentElement(getAgentId());
        if (agentElement) {
          elevenLabsAgent.current = agentElement;
          
          setTimeout(() => {
            setState(prev => ({ ...prev, isInitialized: true }));
            handleMicClick(); // Try again after initialization
          }, 2000);
        }
      } catch (error) {
        console.error("Error creating agent during mic click:", error);
        toast({
          title: "Voice Assistant Error",
          description: "Failed to initialize voice assistant. Please try resetting.",
          variant: "destructive"
        });
        return;
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
          isListening: true,
          error: null // Clear any previous errors
        }));
        
        toast({
          title: "Voice Assistant",
          description: "Voice assistant activated. You can speak now.",
        });
      } else {
        console.log("Agent element not found, recreating");
        try {
          const agentElement = createAgentElement(getAgentId());
          if (agentElement) {
            elevenLabsAgent.current = agentElement;
            setTimeout(handleMicClick, 2000);
          }
        } catch (error) {
          console.error("Error recreating agent:", error);
          toast({
            title: "Voice Assistant Error",
            description: "Failed to create voice assistant. Please try resetting.",
            variant: "destructive"
          });
        }
      }
    } catch (e) {
      console.error("Error handling mic click:", e);
      
      const error = e instanceof Error ? e : new Error(String(e));
      setState(prev => ({ ...prev, error }));
      
      // Try to recover if this is an activation error
      if (e instanceof ElevenLabsError && e.code === "ACTIVATION_ERROR") {
        // Try to recover automatically
        elevenLabsAgent.current = recoverAgent(getAgentId());
        
        if (elevenLabsAgent.current) {
          setTimeout(() => {
            setState(prev => ({ ...prev, isInitialized: true }));
            toast({
              title: "Voice Assistant",
              description: "Voice assistant recovered. Please try again.",
            });
          }, 2000);
        } else {
          // If recovery failed, suggest manual reset
          toast({
            title: "Voice Assistant Error",
            description: "Voice assistant failed to activate. Please try resetting manually.",
            variant: "destructive"
          });
        }
      } else {
        // For other errors, reset the agent
        resetAgent();
        
        toast({
          title: "Voice Assistant Reset",
          description: "Voice assistant has been reset due to an error. Please try again in a moment.",
        });
      }
    }
  }, [state.isInitialized, setState, elevenLabsAgent, retryCount, MAX_RETRIES, resetAgent, getAgentId]);

  return { handleMicClick };
};
