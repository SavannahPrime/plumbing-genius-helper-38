
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

export const useElevenLabsAgent = () => {
  const elevenLabsAgent = useRef<HTMLElevenLabsConvaiElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initAttempted, setInitAttempted] = useState(false);

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
            setIsInitialized(true);
            setInitAttempted(true);
            console.log("ElevenLabs agent initialized");
          }, 2000);
        } else {
          setInitAttempted(true);
        }
      } catch (error) {
        console.error("Error initializing agent:", error);
        setInitAttempted(true);
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

  // Handle microphone button click
  const handleMicClick = () => {
    console.log("Mic button clicked");
    
    // Check if agent is initialized
    if (!isInitialized) {
      if (!initAttempted) {
        console.log("Agent not initialized, creating element");
        const agentElement = createAgentElement();
        if (agentElement) {
          elevenLabsAgent.current = agentElement;
          
          setTimeout(() => {
            setIsInitialized(true);
            setInitAttempted(true);
          }, 2000);
        }
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
      
      // Reset the agent if activation fails
      if (elevenLabsAgent.current) {
        removeAgentElement(elevenLabsAgent.current);
      }
      
      elevenLabsAgent.current = null;
      setIsInitialized(false);
      
      const agentElement = createAgentElement();
      if (agentElement) {
        elevenLabsAgent.current = agentElement;
      }
      
      toast({
        title: "Voice Assistant Reset",
        description: "Voice assistant has been reset. Please try again in a moment.",
      });
      
      // Try again after reset
      setTimeout(handleMicClick, 2000);
    }
  };

  return { handleMicClick, agentId: ELEVEN_LABS_AGENT_ID };
};
