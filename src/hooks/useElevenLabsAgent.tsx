import { useRef, useEffect, useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { ELEVEN_LABS_AGENT_ID, ELEVEN_LABS_AGENT_IDS } from "@/constants/elevenlabs";
import { useLocation, useSearchParams } from "react-router-dom";
import { 
  loadElevenLabsScript, 
  createAgentElement, 
  activateAgent,
  deactivateAgent,
  removeAgentElement,
  recoverAgent,
  ElevenLabsError,
  isElevenLabsReady
} from "@/utils/elevenlabsAgent";
import {
  HTMLElevenLabsConvaiElement,
  ElevenLabsAgentHook,
  ElevenLabsAgentState
} from "@/types/elevenlabs";
import { AgentSpecialty } from "@/services/specializedAgentService";

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

  // Get the current agent specialty from URL
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const specialtyParam = searchParams.get('specialty') as AgentSpecialty | null;

  // Determine which agent ID to use based on specialty
  const getAgentId = useCallback(() => {
    // First try to get from URL specialty parameter
    if (specialtyParam && specialtyParam in ELEVEN_LABS_AGENT_IDS) {
      const agentId = ELEVEN_LABS_AGENT_IDS[specialtyParam as keyof typeof ELEVEN_LABS_AGENT_IDS];
      console.log(`Using agent ID from URL specialty param (${specialtyParam}):`, agentId);
      return agentId;
    }
    
    // Otherwise determine from path
    const path = location.pathname;
    
    if (path.includes("electrician")) {
      console.log("Using electrician agent ID");
      return ELEVEN_LABS_AGENT_IDS.electrician;
    }
    if (path.includes("handyman")) {
      console.log("Using handyman agent ID");
      return ELEVEN_LABS_AGENT_IDS.handyman;
    }
    if (path.includes("mechanic")) {
      console.log("Using mechanic agent ID");
      return ELEVEN_LABS_AGENT_IDS.mechanic;
    }
    if (path.includes("landscaper")) {
      console.log("Using landscaper agent ID");
      return ELEVEN_LABS_AGENT_IDS.landscaper;
    }
    if (path.includes("chef")) {
      console.log("Using chef agent ID");
      return ELEVEN_LABS_AGENT_IDS.chef;
    }
    if (path.includes("stylist")) {
      console.log("Using stylist agent ID");
      return ELEVEN_LABS_AGENT_IDS.stylist;
    }
    if (path.includes("cleaning")) {
      console.log("Using cleaning agent ID");
      return ELEVEN_LABS_AGENT_IDS.cleaning;
    }
    if (path.includes("gadget")) {
      console.log("Using gadget agent ID");
      return ELEVEN_LABS_AGENT_IDS.gadget;
    }
    
    // Default to plumber
    console.log("Using default plumber agent ID");
    return ELEVEN_LABS_AGENT_IDS.plumber;
  }, [location.pathname, specialtyParam]);

  // Retry counter for initialization
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;

  // Initialize the agent when the component mounts
  useEffect(() => {
    const initializeAgent = async () => {
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
    };

    initializeAgent();

    // Cleanup on unmount
    return () => {
      if (elevenLabsAgent.current) {
        deactivateAgent(elevenLabsAgent.current);
        removeAgentElement(elevenLabsAgent.current);
        elevenLabsAgent.current = null;
      }
    };
  }, [getAgentId]);

  // Reset agent - useful for recovering from errors
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
  }, [getAgentId]);

  // Handle microphone button click
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
  }, [state.isInitialized, resetAgent, getAgentId]);

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
