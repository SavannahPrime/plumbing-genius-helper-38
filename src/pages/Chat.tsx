import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import ChatSettings from "@/components/chat/ChatSettings";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Message } from "@/types/chat";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";
import { analyzeImageForSpecialty } from "@/services/specializedAgentService";
import { toast } from "sonner";

const Chat = () => {
  // Load the API key from localStorage with the correct key name
  const [apiKey, setApiKey] = useLocalStorage<string>("openai_api_key", "");
  const [isUsingChatGPT, setIsUsingChatGPT] = useLocalStorage<boolean>("using-chatgpt", true);
  
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
  
  const { handleMicClick } = useElevenLabsAgent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
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

  const handleSendMessage = async () => {
    if (message.trim() === "" || isLoading) return;

    const userMessage: Message = {
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
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          isAi: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Handle error case
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm sorry, I couldn't generate a response. Please try again or check your API key settings.",
          isAi: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: Message = {
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast("Please upload an image file");
      return;
    }

    setIsUploading(true);

    try {
      // Create a message to show the image is being uploaded
      const uploadMessage: Message = {
        id: Date.now().toString(),
        text: "I'm uploading an image for analysis...",
        isAi: false,
        timestamp: new Date(),
        imageUrl: URL.createObjectURL(file)
      };

      setMessages(prev => [...prev, uploadMessage]);

      // Read the file as data URL
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (!e.target?.result) return;
        
        const imageDataUrl = e.target.result as string;
        
        try {
          // Add a loading message
          const loadingMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Analyzing your image...",
            isAi: true,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, loadingMessage]);
          
          // Analyze the image
          const analysis = await analyzeImageForSpecialty(
            imageDataUrl,
            currentAgentSpecialty,
            apiKey
          );
          
          // Replace the loading message with the analysis
          setMessages(prev => prev.map(msg => 
            msg.id === loadingMessage.id 
              ? { ...msg, text: analysis } 
              : msg
          ));
        } catch (error) {
          console.error("Error analyzing image:", error);
          
          // Add an error message
          const errorMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "I'm sorry, I couldn't analyze your image. Please try again or upload a clearer image.",
            isAi: true,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, errorMessage]);
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
      toast("Error processing image. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Add a welcome message when the chat starts
  useEffect(() => {
    if (messages.length === 0) {
      const agent = specializedAgents[currentAgentSpecialty];
      const welcomeMessage: Message = {
        id: "welcome",
        text: apiKey 
          ? agent.greeting 
          : `${agent.greeting} To get the most personalized responses, please set your OpenAI API key in the settings menu (click the gear icon).`,
        isAi: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [currentAgentSpecialty, apiKey]);

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
      
      <div className="flex-1 overflow-hidden relative">
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
          context={context}
          specialty={currentAgentSpecialty}
        />
      </div>
      
      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        handleMicClick={handleMicClick}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        isUploading={isUploading}
      />
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default Chat;
