import React from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSettings from "@/components/chat/ChatSettings";
import ChatContent from "@/components/chat/ChatContent";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useApiKeyNotification } from "@/hooks/useApiKeyNotification";
import { AgentSpecialty } from "@/services/specializedAgentService";

const Chat = () => {
  // Load the API key from localStorage with the correct key name
  const [apiKey, setApiKey] = useLocalStorage<string>("openai_api_key", "");
  const [isUsingChatGPT, setIsUsingChatGPT] = useLocalStorage<boolean>("using-chatgpt", true);
  
  // Show notification if API key is missing
  useApiKeyNotification(apiKey);
  
  const { handleMicClick } = useElevenLabsAgent();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Determine agent specialty from URL params or route
  const getAgentSpecialty = (): AgentSpecialty => {
    // First check URL params
    const specialtyParam = searchParams.get('specialty') as AgentSpecialty;
    if (specialtyParam && Object.keys(specializedAgents).includes(specialtyParam)) {
      return specialtyParam;
    }
    
    // Otherwise determine from path
    const path = location.pathname;
    
    if (path.includes("electrician")) return "electrician";
    if (path.includes("handyman")) return "handyman";
    if (path.includes("mechanic")) return "mechanic";
    if (path.includes("landscaper")) return "landscaper";
    if (path.includes("chef")) return "chef";
    if (path.includes("stylist")) return "stylist";
    if (path.includes("cleaning")) return "cleaning";
    if (path.includes("gadget")) return "gadget";
    
    // Default to plumber
    return "plumber";
  };
  
  const currentSpecialty = getAgentSpecialty();
  console.log("Chat page using specialty:", currentSpecialty);

  const {
    message,
    setMessage,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    generatePlumberResponse,
    context,
    currentAgentSpecialty
  } = useChatMessages(apiKey, isUsingChatGPT);

  // Use the image upload hook
  const { fileInputRef, isUploading, handleImageUpload } = useImageUpload(
    apiKey,
    setMessages,
    currentAgentSpecialty
  );

  const handleSendMessage = async () => {
    if (message.trim() === "" || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isAi: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await generatePlumberResponse(message);

      if (response) {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: response,
          isAi: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Handle error case
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          text: "I'm sorry, I couldn't generate a response. Please try again or check your API key settings.",
          isAi: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I encountered an error. Please try again or check your connection.",
        isAi: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader specialty={currentSpecialty}>
        <ChatSettings 
          apiKey={apiKey} 
          setApiKey={setApiKey} 
          isUsingChatGPT={isUsingChatGPT}
          setIsUsingChatGPT={setIsUsingChatGPT}
        />
      </ChatHeader>
      
      <ChatContent
        messages={messages}
        setMessages={setMessages}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        isUploading={isUploading}
        handleMicClick={handleMicClick}
        context={context}
        currentAgentSpecialty={currentAgentSpecialty}
        apiKey={apiKey}
      />
    </div>
  );
};

export default Chat;
