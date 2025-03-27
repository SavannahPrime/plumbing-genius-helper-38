
import { useEffect } from "react";
import { toast } from "sonner";
import { specializedAgents } from "@/services/specializedAgentService";
import { useAgentSpecialtyResolver } from "@/hooks/useAgentSpecialtyResolver";

export const useApiKeyNotification = (apiKey: string) => {
  const currentSpecialty = useAgentSpecialtyResolver();
  
  useEffect(() => {
    // Log API key status for debugging
    console.log("API Key Status:", apiKey ? "Key is set" : "No key available");
    
    // Only show the notification if no API key is available AND not using the chef specialty
    if (!apiKey && currentSpecialty !== "chef") {
      toast("API Key Needed", {
        description: "Please set your OpenAI API key in settings to enable all features",
        action: {
          label: "Settings",
          onClick: () => {
            const settingsButton = document.querySelector('.settings-button');
            if (settingsButton instanceof HTMLElement) {
              settingsButton.click();
            }
          }
        }
      });
    }
  }, [apiKey, currentSpecialty]);
};
