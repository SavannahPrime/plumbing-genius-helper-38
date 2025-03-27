
import { HTMLElevenLabsConvaiElement } from "@/types/elevenlabs";
import { SCRIPT_URL, ELEVEN_LABS_AGENT_ID } from "@/constants/elevenlabs";

/**
 * Loads the ElevenLabs script asynchronously
 */
export const loadElevenLabsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      console.log("ElevenLabs script already loaded");
      resolve();
      return;
    }
    
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      console.log("ElevenLabs script loaded successfully");
      resolve();
    };
    script.onerror = (error) => {
      console.error("Error loading ElevenLabs script:", error);
      reject(new Error("Failed to load ElevenLabs script"));
    };
    
    document.head.appendChild(script);
  });
};

/**
 * Creates an ElevenLabs agent element and adds it to the DOM
 */
export const createAgentElement = (): HTMLElevenLabsConvaiElement | null => {
  try {
    // Check if the custom element is defined
    if (!customElements.get("elevenlabs-convai")) {
      console.error("ElevenLabs custom element not defined");
      return null;
    }
    
    // Remove any existing agent element
    const existingAgent = document.querySelector("elevenlabs-convai");
    if (existingAgent) {
      existingAgent.remove();
    }
    
    // Create new agent element
    const agentElement = document.createElement("elevenlabs-convai") as HTMLElevenLabsConvaiElement;
    agentElement.agentId = ELEVEN_LABS_AGENT_ID;
    agentElement.style.display = "none";
    document.body.appendChild(agentElement);
    
    console.log("ElevenLabs agent element created with ID:", ELEVEN_LABS_AGENT_ID);
    return agentElement;
  } catch (error) {
    console.error("Error creating agent element:", error);
    return null;
  }
};

/**
 * Activates the ElevenLabs agent (starts listening)
 */
export const activateAgent = (agentElement: HTMLElevenLabsConvaiElement): void => {
  if (!agentElement) {
    throw new Error("Agent element is null or undefined");
  }
  
  if (typeof agentElement.activate !== "function") {
    throw new Error("Agent element does not have an activate method");
  }
  
  try {
    agentElement.activate();
    console.log("ElevenLabs agent activated");
  } catch (error) {
    console.error("Error activating agent:", error);
    throw error;
  }
};

/**
 * Removes the ElevenLabs agent element from the DOM
 */
export const removeAgentElement = (agentElement: HTMLElevenLabsConvaiElement): void => {
  if (agentElement && agentElement.parentNode) {
    agentElement.parentNode.removeChild(agentElement);
    console.log("ElevenLabs agent element removed");
  }
};
