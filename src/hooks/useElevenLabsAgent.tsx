import { useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const ELEVEN_LABS_AGENT_ID = "lX8syHY754gA8SdjQU6n";

export const useElevenLabsAgent = () => {
  const elevenLabsAgent = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Load the ElevenLabs script only once
    if (!window.elevenlabsAgentLoaded) {
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.onload = () => {
        window.elevenlabsAgentLoaded = true;
        console.log("ElevenLabs script loaded");
        
        // Create the agent element after script loads
        createAgentElement();
      };
      document.body.appendChild(script);
    } else {
      // If script is already loaded, create the agent element
      createAgentElement();
    }

    return () => {
      // Cleanup function
      if (elevenLabsAgent.current) {
        document.body.removeChild(elevenLabsAgent.current);
      }
    };
  }, []);

  const createAgentElement = () => {
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
          top: -1000px;
          left: -1000px;
          opacity: 0;
          pointer-events: auto;
          z-index: -1;
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(agentElement);
      elevenLabsAgent.current = agentElement;
      
      console.log("ElevenLabs agent element created");
    } else {
      elevenLabsAgent.current = existingAgent as HTMLElement;
    }
  };

  const handleMicClick = () => {
    console.log("Mic button clicked");
    
    // Make sure agent element exists
    if (!elevenLabsAgent.current) {
      createAgentElement();
    }
    
    // Access the shadow DOM and click the button
    setTimeout(() => {
      if (elevenLabsAgent.current) {
        const shadowRoot = elevenLabsAgent.current.shadowRoot;
        console.log("Shadow root:", shadowRoot);
        
        if (shadowRoot) {
          const button = shadowRoot.querySelector('button');
          console.log("Button found:", button);
          
          if (button) {
            button.click();
            toast({
              title: "Voice Assistant",
              description: "Voice assistant activated. You can speak now.",
            });
          } else {
            // If button not found initially, try again after a short delay
            setTimeout(() => {
              const retryButton = elevenLabsAgent.current?.shadowRoot?.querySelector('button');
              console.log("Retry button:", retryButton);
              
              if (retryButton) {
                retryButton.click();
                toast({
                  title: "Voice Assistant",
                  description: "Voice assistant activated. You can speak now.",
                });
              } else {
                toast({
                  title: "Voice Assistant Issue",
                  description: "Could not activate voice assistant. Please refresh the page and try again.",
                  variant: "destructive"
                });
              }
            }, 1000);
          }
        }
      }
    }, 300); // Increased timeout to ensure the shadow DOM is fully loaded
  };

  return { handleMicClick };
};
