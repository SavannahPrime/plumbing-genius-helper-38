
import { useEffect } from "react";
import { toast } from "sonner";
import { specializedAgents } from "@/services/specializedAgentService";
import { useAgentSpecialtyResolver } from "@/hooks/useAgentSpecialtyResolver";

export const useApiKeyNotification = (apiKey: string) => {
  const currentSpecialty = useAgentSpecialtyResolver();
  
  useEffect(() => {
    // Log API key status for debugging
    console.log("API Key Status:", apiKey ? "Key is set" : "No key available");
    
    // NEVER show the notification for the chef specialty since it has a dedicated key
    if (currentSpecialty === "chef") {
      return;
    }
    
    // Only show the notification if no API key is available
    if (!apiKey) {
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
