
// Define global interfaces and types
declare interface Window {
  elevenlabsAgentLoaded?: boolean;
}

// Define the custom elevenlabs-convai element
declare interface HTMLElementTagNameMap {
  'elevenlabs-convai': HTMLElement & {
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | null;
    activate?: () => void;
    deactivate?: () => void;
    apiKey?: string;
  };
}

// Define specialty type that can be used across the application
export type SpecialtyType = 
  | 'plumber'
  | 'handyman'
  | 'electrician'
  | 'chef'
  | 'mechanic'
  | 'stylist'
  | 'landscaper'
  | 'cleaning'
  | 'gadget';
