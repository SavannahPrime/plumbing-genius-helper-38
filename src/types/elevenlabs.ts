
/**
 * ElevenLabs HTML element type
 */
export interface HTMLElevenLabsConvaiElement extends HTMLElement {
  setAttribute(name: string, value: string): void;
  getAttribute(name: string): string | null;
}

/**
 * Configuration options for the ElevenLabs agent
 */
export interface ElevenLabsAgentConfig {
  agentId: string;
  autoActivate?: boolean;
}

/**
 * State of the ElevenLabs agent
 */
export interface ElevenLabsAgentState {
  isInitialized: boolean;
  isActive: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  error: Error | null;
  lastResponse?: string | null;
}

/**
 * Hook returned by useElevenLabsAgent
 */
export interface ElevenLabsAgentHook {
  handleMicClick: () => void;
  agentId: string;
  isInitialized: boolean;
  isActive: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  error: Error | null;
  resetAgent: () => void;
}
