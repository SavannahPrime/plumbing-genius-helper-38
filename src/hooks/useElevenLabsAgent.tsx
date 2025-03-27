
import { useRef, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const ELEVEN_LABS_AGENT_ID = "lX8syHY754gA8SdjQU6n";

export const useElevenLabsAgent = () => {
  const elevenLabsAgent = useRef<HTMLElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initAttempted, setInitAttempted] = useState(false);

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
        agentElement.setAttribute('auto-open', 'false'); // Don't auto-open
        
        // Add styles to make element visible but not obtrusive
        const style = document.createElement('style');
        style.textContent = `
          elevenlabs-convai {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            opacity: 1; /* Make it fully visible */
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
          setInitAttempted(true);
          console.log("ElevenLabs agent initialized");
        }, 2000);
      } else {
        elevenLabsAgent.current = existingAgent as HTMLElement;
        console.log("Using existing ElevenLabs agent element");
        setIsInitialized(true);
        setInitAttempted(true);
      }
    } catch (error) {
      console.error("Error creating agent element:", error);
      setInitAttempted(true);
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
      if (!initAttempted) {
        console.log("Agent not initialized, creating element");
        createAgentElement();
      }
      
      toast({
        title: "Voice Assistant",
        description: "Initializing voice assistant. Please try again in a moment.",
      });
      return;
    }
    
    try {
      if (elevenLabsAgent.current) {
        console.log("Attempting to activate ElevenLabs agent");
        
        // Method 1: Try using a custom event
        const activateEvent = new CustomEvent('activate');
        elevenLabsAgent.current.dispatchEvent(activateEvent);
        
        // Method 2: Try clicking on the element itself
        setTimeout(() => {
          if (elevenLabsAgent.current) {
            console.log("Clicking on agent element");
            (elevenLabsAgent.current as HTMLElement).click();
          }
        }, 100);
        
        // Method 3: Find and click the microphone button in the shadow DOM
        setTimeout(() => {
          try {
            if (elevenLabsAgent.current && elevenLabsAgent.current.shadowRoot) {
              const shadowRoot = elevenLabsAgent.current.shadowRoot;
              
              // Try multiple selector approaches
              const possibleButtons = [
                shadowRoot.querySelector('.microphone-button'),
                shadowRoot.querySelector('button[aria-label*="microphone"]'),
                shadowRoot.querySelector('.convai-microphone-button'),
                shadowRoot.querySelector('button'),
                // Try generic selectors
                shadowRoot.querySelector('svg[name="microphone"]'),
                shadowRoot.querySelector('[data-testid="microphone-button"]'),
                // Or just try to get any clickable element
                ...Array.from(shadowRoot.querySelectorAll('button')),
              ];
              
              // Find the first non-null element
              const button = possibleButtons.find(el => el !== null);
              
              if (button) {
                console.log("Found button in shadow DOM:", button);
                (button as HTMLButtonElement).click();
                
                toast({
                  title: "Voice Assistant",
                  description: "Voice assistant activated. You can speak now.",
                });
                return;
              } else {
                console.log("No button found in shadow DOM, attempting direct interaction");
                
                // Try clicking the component directly
                elevenLabsAgent.current.click();
                
                // Try programmatic initialization if available
                if (window.elevenLabsConvai && window.elevenLabsConvai.init) {
                  console.log("Initializing via window.elevenLabsConvai.init");
                  window.elevenLabsConvai.init({
                    agentId: ELEVEN_LABS_AGENT_ID,
                    autoOpen: true
                  });
                  
                  if (window.elevenLabsConvai.start) {
                    console.log("Starting via window.elevenLabsConvai.start");
                    window.elevenLabsConvai.start();
                  }
                }
              }
            }
          } catch (e) {
            console.error("Error accessing shadow DOM:", e);
          }
        }, 300);
        
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
      setIsInitialized(false);
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
