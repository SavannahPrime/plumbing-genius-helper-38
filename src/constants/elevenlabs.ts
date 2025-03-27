
/**
 * URL for loading the ElevenLabs Conversational AI script
 */
export const SCRIPT_URL = "https://cdn.convai.eleven-labs.com/convai-component.js";

/**
 * ElevenLabs agent IDs for different specialists
 */
export const ELEVEN_LABS_AGENT_IDS = {
  plumber: "a97eacfe-ba22-4a4d-abd4-44c24886c50f",
  electrician: "QSOMLKzFI4NgVfxUTeDL", // User's electrician agent ID
  gadget: "a97eacfe-ba22-4a4d-abd4-44c24886c50f", // Default ID for now
  chef: "a97eacfe-ba22-4a4d-abd4-44c24886c50f", // Default ID for now
  stylist: "a97eacfe-ba22-4a4d-abd4-44c24886c50f" // Default ID for now
};

/**
 * Default ElevenLabs agent ID (fallback)
 */
export const ELEVEN_LABS_AGENT_ID = "a97eacfe-ba22-4a4d-abd4-44c24886c50f";

/**
 * Available voice options from ElevenLabs
 */
export const VOICE_OPTIONS = {
  ROGER: "CwhRBWXzGAHq8TQ4Fs17",
  SARAH: "EXAVITQu4vr4xnSDxMaL",
  BRIAN: "nPczCjzI2devNBz1zQrb",
  JESSICA: "cgSgspJ2msm6clMCkdW9"
};

/**
 * Available model options from ElevenLabs
 */
export const MODEL_OPTIONS = {
  MULTILINGUAL_V2: "eleven_multilingual_v2",
  TURBO_V2: "eleven_turbo_v2",
  TURBO_V2_5: "eleven_turbo_v2_5"
};
