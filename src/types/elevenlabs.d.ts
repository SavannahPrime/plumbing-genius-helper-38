
declare global {
  interface Window {
    elevenlabsAgentLoaded?: boolean;
    elevenLabsConvai?: {
      init: (options: any) => void;
      start: () => void;
    };
  }

  // Define custom element for TypeScript
  interface HTMLElementTagNameMap {
    'elevenlabs-convai': HTMLElement;
  }
}

export {};
