
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

  // Add ElevenLabs widget for the plumber
  useEffect(() => {
    if (currentAgentSpecialty === 'plumber') {
      // Check if widget already exists
      if (!document.querySelector('elevenlabs-convai')) {
        const widget = document.createElement('elevenlabs-convai');
        widget.setAttribute('agent-id', 'lX8syHY754gA8SdjQU6n');
        
        // Add the widget to our custom container instead of body
        const widgetContainer = document.getElementById('elevenlabs-widget-container');
        if (widgetContainer) {
          widgetContainer.appendChild(widget);
          console.log("ElevenLabs Convai widget added to custom container for plumber");
        } else {
          // Fallback to body if container not found
          document.body.appendChild(widget);
          console.log("ElevenLabs Convai widget added to body for plumber (container not found)");
        }
      }
    } else {
      // Remove widget if not on plumber specialty
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        widget.remove();
        console.log("ElevenLabs Convai widget removed");
      }
    }
    
    return () => {
      // Cleanup widget on component unmount
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        widget.remove();
        console.log("ElevenLabs Convai widget removed on cleanup");
      }
    };
  }, [currentAgentSpecialty]);

  return (
    <>
      {/* Widget container positioned at the very top of the screen */}
      {currentAgentSpecialty === 'plumber' && (
        <div 
          id="elevenlabs-widget-container" 
          className="fixed top-[-100px] right-4 z-50"
        ></div>
      )}
      
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
    </>
  );
};

export default ChatContent;
