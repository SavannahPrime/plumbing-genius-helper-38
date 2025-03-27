
declare global {
  interface Window {
    elevenlabsWidgetLoaded?: boolean;
  }

  // Custom elements
  interface HTMLElementTagNameMap {
    'elevenlabs-convai': HTMLElement;
  }
}

export {};
