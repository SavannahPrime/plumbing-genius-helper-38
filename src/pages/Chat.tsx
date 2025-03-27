
import React from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSettings from "@/components/chat/ChatSettings";
import ChatContent from "@/components/chat/ChatContent";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useApiKeyNotification } from "@/hooks/useApiKeyNotification";
import { useApiKeyManagement } from "@/hooks/useApiKeyManagement";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";

const Chat = () => {
  // Get API key management from the hook instead of directly from localStorage
  const { 
    apiKey, 
    setApiKey, 
    isUsingChatGPT, 
    setIsUsingChatGPT,
    saveApiKey,
    toggleChatGPT
  } = useApiKeyManagement();
  
  // Show notification if API key is missing (the hook will handle chef special case)
  useApiKeyNotification(apiKey);
  
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

  // Determine background color based on specialty
  const getBgColorClass = () => {
    switch (currentAgentSpecialty) {
      case "plumber": return "bg-gradient-to-b from-blue-50 to-blue-100";
      case "chef": return "bg-gradient-to-b from-orange-50 to-orange-100";
      case "cleaning": return "bg-gradient-to-b from-cyan-50 to-cyan-100";
      case "electrician": return "bg-gradient-to-b from-yellow-50 to-yellow-100";
      case "handyman": return "bg-gradient-to-b from-amber-50 to-amber-100";
      case "landscaper": return "bg-gradient-to-b from-green-50 to-green-100";
      case "mechanic": return "bg-gradient-to-b from-gray-100 to-gray-200";
      case "gadget": return "bg-gradient-to-b from-indigo-50 to-indigo-100";
      case "stylist": return "bg-gradient-to-b from-pink-50 to-pink-100";
      default: return "bg-gradient-to-b from-blue-50 to-blue-100";
    }
  };

  return (
    <div className={`flex flex-col h-screen ${getBgColorClass()}`}>
      <ChatHeader specialty={currentAgentSpecialty}>
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
        context={context}
        currentAgentSpecialty={currentAgentSpecialty}
        apiKey={apiKey}
      />
    </div>
  );
};

export default Chat;
