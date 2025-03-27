import { useRef, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const ELEVEN_LABS_AGENT_ID = "lX8syHY754gA8SdjQU6n";

export const useElevenLabsAgent = () => {
  const elevenLabsAgent = useRef<HTMLElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let scriptLoaded = false;
    
    const loadScriptAndCreateAgent = () => {
      // Check if script is already loaded
      if (window.elevenlabsAgentLoaded) {
        scriptLoaded = true;
        createAgentElement();
        return;
      }
      
      // Load the script if not already loaded
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      
      script.onload = () => {
        window.elevenlabsAgentLoaded = true;
        scriptLoaded = true;
        console.log("ElevenLabs script loaded");
        createAgentElement();
      };
      
      script.onerror = (error) => {
        console.error("Failed to load ElevenLabs script:", error);
        toast({
          title: "Voice Assistant Error",
          description: "Failed to load ElevenLabs voice assistant. Please refresh the page.",
          variant: "destructive"
        });
      };
      
      document.body.appendChild(script);
    };

    loadScriptAndCreateAgent();

    return () => {
      if (elevenLabsAgent.current) {
        try {
          document.body.removeChild(elevenLabsAgent.current);
        } catch (e) {
          console.log("Agent element already removed");
        }
      }
    };
  }, []);

  const createAgentElement = () => {
    try {
      // Check if element already exists
      let existingAgent = document.querySelector(`elevenlabs-convai[agent-id="${ELEVEN_LABS_AGENT_ID}"]`);
      
      if (!existingAgent) {
        // Create the element
        const agentElement = document.createElement('elevenlabs-convai');
        agentElement.setAttribute('agent-id', ELEVEN_LABS_AGENT_ID);
        
        // Add styles to hide the element but keep it functional
        const style = document.createElement('style');
        style.textContent = `
          elevenlabs-convai {
            position: fixed;
            top: -1px;
            left: -1px;
            opacity: 0;
            pointer-events: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(agentElement);
        elevenLabsAgent.current = agentElement;
        
        console.log("ElevenLabs agent element created");
        
        // Give the element time to initialize
        setTimeout(() => {
          setIsInitialized(true);
        }, 1000);
      } else {
        elevenLabsAgent.current = existingAgent as HTMLElement;
        console.log("Using existing ElevenLabs agent element");
        setIsInitialized(true);
      }
    } catch (error) {
      console.error("Error creating agent element:", error);
      toast({
        title: "Voice Assistant Error",
        description: "Failed to initialize voice assistant. Please refresh the page.",
        variant: "destructive"
      });
    }
  };

  const handleMicClick = () => {
    console.log("Mic button clicked");
    
    if (!isInitialized) {
      // If not initialized, try to create the agent again
      createAgentElement();
      toast({
        title: "Voice Assistant",
        description: "Initializing voice assistant. Please try again in a moment.",
      });
      return;
    }
    
    // Access the shadow DOM and click the button
    try {
      if (elevenLabsAgent.current) {
        const shadowRoot = elevenLabsAgent.current.shadowRoot;
        
        if (shadowRoot) {
          // Look for the microphone button in the shadow DOM
          const button = shadowRoot.querySelector('.microphone-button') || 
                          shadowRoot.querySelector('button') ||
                          shadowRoot.querySelector('[aria-label*="microphone"]');
          
          console.log("Button found:", button);
          
          if (button) {
            // Ensure we're on the correct route before activating
            if (window.location.pathname.includes('/chat')) {
              button.click();
              toast({
                title: "Voice Assistant",
                description: "Voice assistant activated. You can speak now.",
              });
            } else {
              toast({
                title: "Voice Assistant",
                description: "Please navigate to the chat page to use voice assistant.",
              });
            }
          } else {
            // Try a different approach - dispatch a custom event
            const customEvent = new CustomEvent('activateMicrophone', { bubbles: true });
            elevenLabsAgent.current.dispatchEvent(customEvent);
            
            toast({
              title: "Voice Assistant",
              description: "Voice assistant activated. You can speak now.",
            });
          }
        } else {
          // If shadow root is not available, recreate the element
          document.body.removeChild(elevenLabsAgent.current);
          elevenLabsAgent.current = null;
          createAgentElement();
          
          setTimeout(() => {
            handleMicClick(); // Try again after recreation
          }, 1500);
        }
      } else {
        // Agent not found, create it
        createAgentElement();
        setTimeout(() => {
          handleMicClick(); // Try again after creation
        }, 1500);
      }
    } catch (e) {
      console.error("Error accessing ElevenLabs agent:", e);
      
      // Last resort - reload the agent completely
      if (elevenLabsAgent.current) {
        try {
          document.body.removeChild(elevenLabsAgent.current);
        } catch (err) {
          console.log("Error removing agent:", err);
        }
      }
      
      elevenLabsAgent.current = null;
      createAgentElement();
      
      toast({
        title: "Voice Assistant Reset",
        description: "Voice assistant has been reset. Please try again in a moment.",
      });
    }
  };

  return { handleMicClick, agentId: ELEVEN_LABS_AGENT_ID };
};
