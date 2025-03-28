import { ElevenLabsAgentHook } from "@/types/elevenlabs";

// This is a placeholder hook that keeps the interface consistent
// but has all voice assistant functionality removed
export const useElevenLabsAgent = (): ElevenLabsAgentHook => {
  const handleMicClick = () => {
    console.log("Voice assistant capabilities have been removed");
  };

  return {
    handleMicClick,
    agentId: "",
    isInitialized: false,
    isActive: false,
    isListening: false,
    isSpeaking: false,
    error: null,
    resetAgent: () => {}
  };
};
