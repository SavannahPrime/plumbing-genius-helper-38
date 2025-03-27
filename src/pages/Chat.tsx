
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import ApiKeyDialog from "@/components/chat/ApiKeyDialog";
import ChatSettings from "@/components/chat/ChatSettings";
import { toast } from "@/hooks/use-toast";
import { useApiKeyManagement } from "@/hooks/useApiKeyManagement";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";

const Chat = () => {
  // API key management
  const {
    apiKey,
    setApiKey,
    isUsingChatGPT,
    openDialog,
    setOpenDialog,
    saveApiKey,
    toggleChatGPT
  } = useApiKeyManagement();

  // Chat functionality
  const {
    message,
    setMessage,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    generatePlumberResponse
  } = useChatMessages(apiKey, isUsingChatGPT);

  // ElevenLabs agent
  const { handleMicClick } = useElevenLabsAgent();
  
  // Get problem query from URL if present
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const problemQuery = queryParams.get('problem');

  // Handle initial problem query if present
  useEffect(() => {
    if (problemQuery && messages.length === 1) {
      handleSendMessage(problemQuery);
    }
  }, [problemQuery]);

  const handleSendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || message;
    if (!messageToSend.trim()) return;
    
    setMessages(prev => [...prev, { text: messageToSend, isAi: false }]);
    const userMessage = messageToSend;
    setMessage("");
    
    setIsLoading(true);
    
    try {
      const aiResponse = await generatePlumberResponse(userMessage);
      
      if (aiResponse === null && isUsingChatGPT) {
        // Handle ChatGPT error
        setIsLoading(false);
        toast({
          title: "ChatGPT Connection Error",
          description: "Falling back to built-in plumber assistant.",
          variant: "destructive"
        });
        
        // Try again with built-in assistant
        const fallbackResponse = await generatePlumberResponse(userMessage);
        setMessages(prev => [...prev, {
          text: fallbackResponse,
          isAi: true
        }]);
      } else {
        setMessages(prev => [...prev, {
          text: aiResponse,
          isAi: true
        }]);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, I'm having trouble processing your request. Please try again.",
        isAi: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative">
      <ChatHeader>
        <ChatSettings 
          onOpenApiKeyDialog={() => setOpenDialog(true)}
          onToggleChatGPT={toggleChatGPT}
          isUsingChatGPT={isUsingChatGPT}
        />
      </ChatHeader>
      
      <main className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput 
            message={message}
            setMessage={setMessage}
            handleSendMessage={() => handleSendMessage()}
            isLoading={isLoading}
            onMicClick={handleMicClick}
          />
        </div>
      </main>
      
      <ApiKeyDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        onSave={saveApiKey}
      />
    </div>
  );
};

export default Chat;
