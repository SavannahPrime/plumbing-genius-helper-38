
import React, { useEffect } from "react";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { Message, ConversationContext } from "@/types/chat";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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
  // Add a welcome message when the chat starts
  useEffect(() => {
    if (messages.length === 0) {
      const agent = specializedAgents[currentAgentSpecialty];
      let greeting = agent.greeting;
      
      // Custom greeting for the chef with cartoon image
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
    <>
      <div className="flex-1 overflow-hidden relative">
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
          context={context}
          specialty={currentAgentSpecialty}
        />
      </div>
      
      {/* ElevenLabs Talk Widget for Plumber */}
      {currentAgentSpecialty === 'plumber' && (
        <div className="border-t border-amber-200 bg-amber-50/60 p-2">
          <div className="container mx-auto flex justify-center">
            <a 
              href="https://elevenlabs.io/app/talk-to?agent_id=lX8syHY754gA8SdjQU6n" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-700 hover:text-amber-900 text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              Talk to Plumber using ElevenLabs Voice Assistant
            </a>
          </div>
        </div>
      )}
      
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
    </>
  );
};

export default ChatContent;
