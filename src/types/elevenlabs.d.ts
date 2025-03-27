
declare global {
  interface Window {
    elevenlabsAgentLoaded?: boolean;
    elevenLabsConvai?: {
      init: (options: {
        agentId: string;
        autoOpen?: boolean;
        [key: string]: any;
      }) => void;
      start: () => void;
    };
  }

  // Custom elements
  interface HTMLElementTagNameMap {
    'elevenlabs-convai': HTMLElevenLabsConvaiElement;
  }
  
  // Custom element interface
  interface HTMLElevenLabsConvaiElement extends HTMLElement {
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | null;
    shadowRoot: ShadowRoot | null;
  }
}

export {};
