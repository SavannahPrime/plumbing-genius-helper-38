
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Predefined API key
const DEFAULT_API_KEY = "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";

export const useApiKeyManagement = () => {
  // Initialize with the default key or user's saved key
  const [apiKey, setApiKey] = useState(() => {
    const savedKey = localStorage.getItem("openai_api_key");
    return savedKey || DEFAULT_API_KEY;
  });
  
  // Default to using ChatGPT since we have a key
  const [isUsingChatGPT, setIsUsingChatGPT] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  // Save API key to storage
  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("openai_api_key", key);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved successfully."
    });
    setOpenDialog(false);
  };

  // Toggle between built-in assistant and ChatGPT
  const toggleChatGPT = () => {
    setIsUsingChatGPT(!isUsingChatGPT);
    toast({
      title: isUsingChatGPT ? "Using Built-in Assistant" : "Using ChatGPT",
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
  }, []);

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
