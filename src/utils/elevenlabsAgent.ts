
import { HTMLElevenLabsConvaiElement } from "@/types/elevenlabs";
import { SCRIPT_URL, ELEVEN_LABS_AGENT_ID } from "@/constants/elevenlabs";

/**
 * Custom error class for ElevenLabs-related errors
 */
export class ElevenLabsError extends Error {
  constructor(message: string, public code?: string, public originalError?: unknown) {
    super(message);
    this.name = "ElevenLabsError";
  }
}

/**
 * Loads the ElevenLabs script asynchronously
 */
export const loadElevenLabsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Check if script is already loaded
      if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
        console.log("ElevenLabs script already loaded");
        resolve();
        return;
      }
      
      const script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      
      // Add timeout for script loading
      const timeoutId = setTimeout(() => {
        reject(new ElevenLabsError("Script loading timed out after 10 seconds", "SCRIPT_TIMEOUT"));
      }, 10000);
      
      script.onload = () => {
        console.log("ElevenLabs script loaded successfully");
        clearTimeout(timeoutId);
        
        // Verify the script actually defined what we need
        if (typeof customElements !== 'undefined' && !customElements.get("elevenlabs-convai")) {
          // Wait a bit more in case there's a delay in registering
          setTimeout(() => {
            if (!customElements.get("elevenlabs-convai")) {
              reject(new ElevenLabsError("ElevenLabs script loaded but custom element not registered", "ELEMENT_NOT_REGISTERED"));
              return;
            }
            resolve();
          }, 1000);
        } else {
          resolve();
        }
      };
      
      script.onerror = (error) => {
        clearTimeout(timeoutId);
        console.error("Error loading ElevenLabs script:", error);
        reject(new ElevenLabsError("Failed to load ElevenLabs script", "SCRIPT_LOAD_ERROR", error));
      };
      
      document.head.appendChild(script);
    } catch (error) {
      console.error("Unexpected error setting up script:", error);
      reject(new ElevenLabsError("Unexpected error setting up ElevenLabs script", "SETUP_ERROR", error));
    }
  });
};

/**
 * Checks if the ElevenLabs environment is ready
 */
export const isElevenLabsReady = (): boolean => {
  return Boolean(customElements.get("elevenlabs-convai"));
};

/**
 * Creates an ElevenLabs agent element and adds it to the DOM
 */
export const createAgentElement = (agentId = ELEVEN_LABS_AGENT_ID): HTMLElevenLabsConvaiElement | null => {
  try {
    // Check if the custom element is defined
    if (!customElements.get("elevenlabs-convai")) {
      console.error("ElevenLabs custom element not defined");
      throw new ElevenLabsError("ElevenLabs custom element not defined", "ELEMENT_NOT_REGISTERED");
    }
    
    // Remove any existing agent element
    const existingAgent = document.querySelector("elevenlabs-convai");
    if (existingAgent) {
      existingAgent.remove();
    }
    
    // Create new agent element
    const agentElement = document.createElement("elevenlabs-convai") as HTMLElevenLabsConvaiElement;
    
    // Verify the agent ID is set
    if (!agentId) {
      throw new ElevenLabsError("Agent ID is not configured", "MISSING_AGENT_ID");
    }
    
    // Set the agent ID as an attribute for reliable integration
    agentElement.setAttribute("agent-id", agentId);
    agentElement.style.display = "none";
    document.body.appendChild(agentElement);
    
    // Verify element was created and attached successfully
    if (!document.querySelector("elevenlabs-convai")) {
      throw new ElevenLabsError("Failed to attach agent element to DOM", "DOM_ATTACHMENT_FAILED");
    }
    
    console.log("ElevenLabs agent element created with ID:", agentId);
    return agentElement;
  } catch (error) {
    if (error instanceof ElevenLabsError) {
      console.error(`Error creating agent element: [${error.code}] ${error.message}`);
      throw error;
    }
    console.error("Error creating agent element:", error);
    throw new ElevenLabsError("Failed to create ElevenLabs agent", "CREATION_ERROR", error);
  }
};

/**
 * Activates the ElevenLabs agent (starts listening)
 */
export const activateAgent = (agentElement: HTMLElevenLabsConvaiElement): void => {
  if (!agentElement) {
    throw new ElevenLabsError("Agent element is null or undefined", "NULL_AGENT");
  }
  
  try {
    // Try using the activate method if available
    if (typeof agentElement.activate === "function") {
      agentElement.activate();
    } else {
      // Fallback: dispatch a custom activate event
      const event = new CustomEvent("activate");
      agentElement.dispatchEvent(event);
    }
    console.log("ElevenLabs agent activated");
  } catch (error) {
    console.error("Error activating agent:", error);
    throw new ElevenLabsError("Failed to activate ElevenLabs agent", "ACTIVATION_ERROR", error);
  }
};

/**
 * Deactivates the ElevenLabs agent (stops listening)
 */
export const deactivateAgent = (agentElement: HTMLElevenLabsConvaiElement): void => {
  if (!agentElement) {
    console.warn("Cannot deactivate null agent element");
    return;
  }
  
  try {
    // Try using the deactivate method if available
    if (typeof agentElement.deactivate === "function") {
      agentElement.deactivate();
    } else {
      // Fallback: dispatch a custom deactivate event
      const event = new CustomEvent("deactivate");
      agentElement.dispatchEvent(event);
    }
    console.log("ElevenLabs agent deactivated");
  } catch (error) {
    console.error("Error deactivating agent:", error);
    // Don't throw here, just log as we're likely in cleanup code
  }
};

/**
 * Sets the API key for the ElevenLabs agent
 */
export const setAgentApiKey = (agentElement: HTMLElevenLabsConvaiElement, apiKey: string): void => {
  if (!agentElement) {
    throw new ElevenLabsError("Agent element is null or undefined", "NULL_AGENT");
  }
  
  try {
    // Try to set the apiKey property if available
    if ('apiKey' in agentElement) {
      agentElement.apiKey = apiKey;
    } else {
      // Fallback: set it as an attribute
      agentElement.setAttribute("api-key", apiKey);
    }
    console.log("ElevenLabs agent API key set");
  } catch (error) {
    console.error("Error setting agent API key:", error);
    throw new ElevenLabsError("Failed to set ElevenLabs agent API key", "API_KEY_ERROR", error);
  }
};

/**
 * Removes the ElevenLabs agent element from the DOM
 */
export const removeAgentElement = (agentElement: HTMLElevenLabsConvaiElement): void => {
  if (!agentElement) {
    console.warn("Cannot remove null agent element");
    return;
  }
  
  try {
    // Try to deactivate first to clean up resources
    if (typeof agentElement.deactivate === "function") {
      agentElement.deactivate();
    } else {
      // Fallback: dispatch a custom deactivate event
      const event = new CustomEvent("deactivate");
      agentElement.dispatchEvent(event);
    }
    
    if (agentElement.parentNode) {
      agentElement.parentNode.removeChild(agentElement);
      console.log("ElevenLabs agent element removed");
    } else {
      console.warn("Agent element has no parent node, might already be removed");
    }
  } catch (error) {
    console.error("Error removing agent element:", error);
    // Don't throw here as we're in cleanup code
  }
};

/**
 * Try to recover from a failed agent initialization by cleaning up and creating a new agent
 */
export const recoverAgent = (agentId = ELEVEN_LABS_AGENT_ID): HTMLElevenLabsConvaiElement | null => {
  try {
    // Clean up any existing agent elements
    const existingAgents = document.querySelectorAll("elevenlabs-convai");
    existingAgents.forEach(agent => {
      try {
        agent.parentNode?.removeChild(agent);
      } catch (e) {
        console.error("Error removing existing agent during recovery:", e);
      }
    });
    
    // Try to create a new agent
    return createAgentElement(agentId);
  } catch (error) {
    console.error("Agent recovery failed:", error);
    return null;
  }
};
