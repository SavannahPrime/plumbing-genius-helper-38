
import { useState } from "react";
import { Message } from "@/types/chat";
import { useAgentSpecialtyResolver } from "@/hooks/useAgentSpecialtyResolver";
import { useConversationContext } from "@/hooks/useConversationContext";
import { useResponseGenerator } from "@/hooks/useResponseGenerator";

export const useChatMessages = (apiKey: string, isUsingChatGPT: boolean) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Use the specialty resolver hook
  const currentAgentSpecialty = useAgentSpecialtyResolver();
  
  // Use the conversation context hook
  const { 
    context, 
    updateContextDetails, 
    updateContextWithAnswer, 
    setNewTopic 
  } = useConversationContext();
  
  // Use the response generator hook
  const { 
    generateResponse,
    isLoading,
    setIsLoading
  } = useResponseGenerator(
    apiKey, 
    isUsingChatGPT, 
    currentAgentSpecialty, 
    context,
    updateContextDetails,
    updateContextWithAnswer,
    setNewTopic
  );

  return {
    message,
    setMessage,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    generatePlumberResponse: generateResponse,
    context,
    currentAgentSpecialty
  };
};
