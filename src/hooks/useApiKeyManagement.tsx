
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAgentSpecialtyResolver } from "@/hooks/useAgentSpecialtyResolver";

// Predefined API keys
const DEFAULT_API_KEY = "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";
const CHEF_API_KEY = "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";

export const useApiKeyManagement = () => {
  const currentSpecialty = useAgentSpecialtyResolver();
  
  // Initialize with the appropriate key based on specialty
  const [apiKey, setApiKey] = useState(() => {
    // Always use the chef-specific key for the chef specialty
    if (currentSpecialty === "chef") {
      return CHEF_API_KEY;
    }
    
    // For other specialties, use the saved key or default
    const savedKey = localStorage.getItem("openai_api_key");
    return savedKey || DEFAULT_API_KEY;
  });
  
  // Default to using ChatGPT since we have a key
  const [isUsingChatGPT, setIsUsingChatGPT] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  // Save API key to storage
  const saveApiKey = (key: string) => {
    // Don't overwrite the chef key if we're in chef specialty
    if (currentSpecialty === "chef") {
      toast("Chef API Key Protected", {
        description: "The Chef's Assistant uses a dedicated API key that cannot be changed."
      });
      return;
    }
    
    setApiKey(key);
    localStorage.setItem("openai_api_key", key);
    toast("API Key Saved", {
      description: "Your OpenAI API key has been saved successfully."
    });
    setOpenDialog(false);
  };

  // Toggle between built-in assistant and ChatGPT
  const toggleChatGPT = () => {
    // If it's chef specialty, always force using ChatGPT
    if (currentSpecialty === "chef") {
      if (!isUsingChatGPT) {
        setIsUsingChatGPT(true);
        toast("Using ChatGPT", {
          description: "Chef's Assistant works best with ChatGPT enabled"
        });
      }
      return;
    }
    
    setIsUsingChatGPT(!isUsingChatGPT);
    toast(isUsingChatGPT ? "Using Built-in Assistant" : "Using ChatGPT", {
      description: isUsingChatGPT 
        ? "Switched to built-in assistant" 
        : "Connected to ChatGPT for enhanced responses"
    });
  };

  // Set up the key on first load
  useEffect(() => {
    if (!localStorage.getItem("openai_api_key")) {
      localStorage.setItem("openai_api_key", DEFAULT_API_KEY);
    }
    
    // Always ensure we're using the correct key for chef
    if (currentSpecialty === "chef") {
      setApiKey(CHEF_API_KEY);
      setIsUsingChatGPT(true);
    }
  }, [currentSpecialty]);

  return {
    apiKey,
    setApiKey,
    isUsingChatGPT,
    openDialog,
    setOpenDialog,
    saveApiKey,
    toggleChatGPT
  };
};
