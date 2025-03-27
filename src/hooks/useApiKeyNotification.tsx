
import { useEffect } from "react";
import { toast } from "sonner";
import { specializedAgents } from "@/services/specializedAgentService";

export const useApiKeyNotification = (apiKey: string) => {
  useEffect(() => {
    // Log API key status for debugging
    console.log("API Key Status:", apiKey ? "Key is set" : "No key available");
    
    // Check if API key is missing or empty
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
  }, [apiKey]);
};
