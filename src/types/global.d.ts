
interface Window {
  elevenlabsAgentLoaded?: boolean;
}

// Define the custom elevenlabs-convai element
interface HTMLElementTagNameMap {
  'elevenlabs-convai': HTMLElement & {
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | null;
    activate?: () => void;
    deactivate?: () => void;
    apiKey?: string;
  };
}
