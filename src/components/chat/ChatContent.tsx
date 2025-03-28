
import React, { useEffect } from "react";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { Message, ConversationContext } from "@/types/chat";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";

interface ChatContentProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isUploading: boolean;
  handleMicClick?: () => void;
  context: ConversationContext;
  currentAgentSpecialty: AgentSpecialty;
  apiKey: string;
}

const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  setMessages,
  message,
  setMessage,
  handleSendMessage,
  isLoading,
  fileInputRef,
  handleImageUpload,
  isUploading,
  handleMicClick,
  context,
  currentAgentSpecialty,
}) => {
  useEffect(() => {
    if (messages.length === 0) {
      const agent = specializedAgents[currentAgentSpecialty];
      let greeting = agent.greeting;
      
      if (currentAgentSpecialty === 'chef') {
        greeting = "Bonjour! I'm Chef Charlie at your service! What delicious dish are you looking to create today? I can help with recipes, cooking techniques, ingredient substitutions, or any kitchen dilemmas you're facing!";
      }
      
      const welcomeMessage: Message = {
        id: "welcome",
        text: greeting,
        isAi: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [currentAgentSpecialty, messages.length, setMessages]);

  return (
    <div className="flex flex-col h-full relative">
      {/* ElevenLabs Convai Widget - With custom styling to hide text */}
      {currentAgentSpecialty === 'plumber' && (
        <div 
          id="elevenlabs-widget-container" 
          className="fixed top-4 right-4 z-50"
          dangerouslySetInnerHTML={{
            __html: `
              <style>
                elevenlabs-convai::part(cta) {
                  display: none !important;
                }
              </style>
              <elevenlabs-convai agent-id="lX8syHY754gA8SdjQU6n"></elevenlabs-convai>
            `
          }}
        />
      )}
      
      <div className="flex-1 overflow-hidden">
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
          context={context}
          specialty={currentAgentSpecialty}
        />
      </div>
      
      <div className="sticky bottom-0 w-full z-10">
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
      </div>
      
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

export default ChatContent;
