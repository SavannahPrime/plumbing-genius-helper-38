
/**
 * ElevenLabs HTML element type extending HTMLElement
 */
export interface HTMLElevenLabsConvaiElement extends HTMLElement {
  // Core properties and methods for ElevenLabs agent integration
  agentId?: string;
  apiKey?: string;
  playAudio?: () => void;
  pauseAudio?: () => void;
  activate?: () => void;
  deactivate?: () => void;
}

/**
 * Configuration options for the ElevenLabs agent
 */
export interface ElevenLabsAgentConfig {
  agentId: string;
  apiKey?: string;
  autoActivate?: boolean;
  voiceId?: string;
  model?: string;
  debug?: boolean;
}

/**
 * State of the ElevenLabs agent
 */
export interface ElevenLabsAgentState {
  isInitialized: boolean;
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  error: Error | null;
  lastResponse: string | null;
}

/**
 * Return type for the useElevenLabsAgent hook
 */
export interface ElevenLabsAgentHook {
  handleMicClick: () => void;
  agentId: string;
  isInitialized: boolean;
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  error: Error | null;
  resetAgent: () => void;
}
