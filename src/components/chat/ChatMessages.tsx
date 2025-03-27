
import React, { useRef, useEffect } from "react";
import { Message, ConversationContext } from "@/types/chat";
import { Loader2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  specialty: AgentSpecialty;
  context?: ConversationContext;
}

const ChatMessages = ({ messages, isLoading, specialty, context }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const agent = specializedAgents[specialty];
  
  // Use new cartoon chef image for chef specialty
  const useCartoonChef = specialty === 'chef';
  const chefCartoonImage = "/lovable-uploads/80a47f92-8528-46f2-9f22-cdfb4785713c.png";

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="container mx-auto h-full overflow-y-auto py-4 px-4">
      <div className="flex flex-col space-y-4">
        {messages.map((message, index) => (
          <div 
            key={message.id || index} 
            className={`flex ${message.isAi ? "justify-start" : "justify-end"}`}
          >
            <div 
              className={`flex max-w-[80%] md:max-w-[70%] ${
                message.isAi ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {message.isAi && (
                <div className="mr-2 mt-1">
                  {useCartoonChef ? (
                    <Avatar className="h-8 w-8 overflow-hidden">
                      <img src={chefCartoonImage} alt={agent.name} className="w-full h-full object-cover" />
                    </Avatar>
                  ) : agent.avatarImage ? (
                    <Avatar className="h-8 w-8 overflow-hidden">
                      <img src={agent.avatarImage} alt={agent.name} className="w-full h-full object-cover" />
                    </Avatar>
                  ) : (
                    <Avatar className={`h-8 w-8 ${
                      specialty === 'plumber' ? 'bg-accent/80' : 
                      specialty === 'electrician' ? 'bg-yellow-500' :
                      specialty === 'gadget' ? 'bg-purple-600' :
                      specialty === 'chef' ? 'bg-amber-600' :
                      specialty === 'stylist' ? 'bg-pink-500' :
                      specialty === 'handyman' ? 'bg-orange-500' :
                      specialty === 'mechanic' ? 'bg-blue-600' :
                      specialty === 'landscaper' ? 'bg-green-600' :
                      specialty === 'cleaning' ? 'bg-cyan-500' :
                      'bg-blue-500'
                    }`}>
                      <span className="text-white text-xs">{agent.emoji}</span>
                    </Avatar>
                  )}
                </div>
              )}
              
              <div 
                className={`rounded-lg p-3 ${
                  message.isAi 
                    ? "bg-gradient-to-br from-amber-100/90 to-amber-200/90 backdrop-blur-md text-amber-900 border border-amber-200/50" 
                    : "bg-gradient-to-br from-amber-500/90 to-amber-600/90 backdrop-blur-md text-white border border-amber-400/50"
                }`}
              >
                {message.imageUrl ? (
                  <div className="flex flex-col gap-2">
                    <img 
                      src={message.imageUrl} 
                      alt="User uploaded" 
                      className="rounded max-h-48 object-contain"
                    />
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-gradient-to-br from-amber-100/90 to-amber-200/90 backdrop-blur-md p-3 flex items-center space-x-2 border border-amber-200/50">
              <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
              <span className="text-amber-900">Chef is cooking up a response...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
