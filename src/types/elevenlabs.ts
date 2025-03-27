
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
  error: Error | null;
}
