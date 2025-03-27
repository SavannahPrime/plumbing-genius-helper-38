
import { toast } from "@/hooks/use-toast";
import { ELEVEN_LABS_AGENT_ID, SCRIPT_URL } from "@/constants/elevenlabs";

/**
 * Loads the ElevenLabs script if it's not already loaded
 * @returns A promise that resolves when the script is loaded
 */
export const loadElevenLabsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.elevenlabsAgentLoaded) {
      resolve();
      return;
    }
    
    // Load the script if not already loaded
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    
    script.onload = () => {
      window.elevenlabsAgentLoaded = true;
      console.log("ElevenLabs script loaded");
      resolve();
    };
    
    script.onerror = (error) => {
      console.error("Failed to load ElevenLabs script:", error);
      toast({
        title: "Voice Assistant Error",
        description: "Failed to load ElevenLabs voice assistant. Please refresh the page.",
        variant: "destructive"
      });
      reject(error);
    };
    
    document.body.appendChild(script);
  });
};

/**
 * Creates the ElevenLabs agent element and adds it to the DOM
 * @returns The created agent element or existing element
 */
export const createAgentElement = (): HTMLElevenLabsConvaiElement | null => {
  try {
    // Check if element already exists
    let existingAgent = document.querySelector(`elevenlabs-convai[agent-id="${ELEVEN_LABS_AGENT_ID}"]`) as HTMLElevenLabsConvaiElement | null;
    
    if (existingAgent) {
      console.log("Using existing ElevenLabs agent element");
      return existingAgent;
    }
    
    // Create the element
    const agentElement = document.createElement('elevenlabs-convai') as HTMLElevenLabsConvaiElement;
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
    
    console.log("ElevenLabs agent element created with ID:", ELEVEN_LABS_AGENT_ID);
    return agentElement;
  } catch (error) {
    console.error("Error creating agent element:", error);
    toast({
      title: "Voice Assistant Error",
      description: "Failed to initialize voice assistant. Please refresh the page.",
      variant: "destructive"
    });
    return null;
  }
};

/**
 * Attempts to activate the ElevenLabs agent through various methods
 * @param agentElement The agent element to activate
 */
export const activateAgent = (agentElement: HTMLElevenLabsConvaiElement): void => {
  try {
    console.log("Attempting to activate ElevenLabs agent");
    
    // Method 1: Try using a custom event
    const activateEvent = new CustomEvent('activate');
    agentElement.dispatchEvent(activateEvent);
    
    // Method 2: Try clicking on the element itself
    setTimeout(() => {
      console.log("Clicking on agent element");
      agentElement.click();
    }, 100);
    
    // Method 3: Find and click the microphone button in the shadow DOM
    setTimeout(() => {
      try {
        if (agentElement.shadowRoot) {
          const shadowRoot = agentElement.shadowRoot;
          
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
            return;
          } else {
            console.log("No button found in shadow DOM, attempting direct interaction");
            
            // Try clicking the component directly
            agentElement.click();
            
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
    
  } catch (e) {
    console.error("Error activating ElevenLabs agent:", e);
    throw e;
  }
};

/**
 * Removes the agent element from the DOM
 * @param agentElement The agent element to remove
 */
export const removeAgentElement = (agentElement: HTMLElevenLabsConvaiElement): void => {
  try {
    document.body.removeChild(agentElement);
  } catch (err) {
    console.log("Error removing agent or already removed:", err);
  }
};

