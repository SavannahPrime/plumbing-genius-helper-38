
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
        agentElement.setAttribute('auto-open', 'true'); // Add auto-open attribute
        
        // Add styles to make element visible and interactive
        const style = document.createElement('style');
        style.textContent = `
          elevenlabs-convai {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            opacity: 0.01; /* Almost invisible but still interactive */
            pointer-events: auto;
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(agentElement);
        elevenLabsAgent.current = agentElement;
        
        console.log("ElevenLabs agent element created with ID:", ELEVEN_LABS_AGENT_ID);
        
        // Give the element time to initialize
        setTimeout(() => {
          setIsInitialized(true);
          console.log("ElevenLabs agent initialized");
        }, 2000); // Increased timeout
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
      console.log("Agent not initialized, creating element");
      // If not initialized, try to create the agent again
      createAgentElement();
      toast({
        title: "Voice Assistant",
        description: "Initializing voice assistant. Please try again in a moment.",
      });
      return;
    }
    
    // Attempt direct activation using custom event first
    try {
      if (elevenLabsAgent.current) {
        console.log("Dispatching custom activation event");
        const customEvent = new CustomEvent('activate', { bubbles: true });
        elevenLabsAgent.current.dispatchEvent(customEvent);
        
        // Also try to find and click the button as a fallback
        setTimeout(() => {
          try {
            if (elevenLabsAgent.current && elevenLabsAgent.current.shadowRoot) {
              const shadowRoot = elevenLabsAgent.current.shadowRoot;
              
              // Try multiple selector approaches
              const button = 
                shadowRoot.querySelector('.microphone-button') as HTMLButtonElement || 
                shadowRoot.querySelector('button[aria-label*="microphone"]') as HTMLButtonElement ||
                shadowRoot.querySelector('.convai-microphone-button') as HTMLButtonElement ||
                shadowRoot.querySelector('button') as HTMLButtonElement;
              
              if (button) {
                console.log("Found button in shadow DOM:", button);
                button.click();
                toast({
                  title: "Voice Assistant",
                  description: "Voice assistant activated. You can speak now.",
                });
              } else {
                console.log("No button found in shadow DOM");
                // Try activating by clicking the element itself
                (elevenLabsAgent.current as HTMLElement).click();
              }
            }
          } catch (e) {
            console.error("Error accessing shadow DOM:", e);
          }
        }, 500);
        
        toast({
          title: "Voice Assistant",
          description: "Voice assistant activated. You can speak now.",
        });
      } else {
        console.log("Agent element not found, recreating");
        createAgentElement();
        setTimeout(handleMicClick, 2000);
      }
    } catch (e) {
      console.error("Error activating ElevenLabs agent:", e);
      
      // Recreate the agent if activation fails
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
      
      // Try again after reset
      setTimeout(handleMicClick, 2000);
    }
  };

  return { handleMicClick, agentId: ELEVEN_LABS_AGENT_ID };
};
