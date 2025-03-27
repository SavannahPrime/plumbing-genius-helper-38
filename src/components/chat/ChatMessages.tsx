
import React, { useRef, useEffect } from "react";
import { Message } from "@/types/chat";
import { Loader2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  specialty: AgentSpecialty;
}

const ChatMessages = ({ messages, isLoading, specialty }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const agent = specializedAgents[specialty];

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
            key={index} 
            className={`flex ${message.isAi ? "justify-start" : "justify-end"}`}
          >
            <div 
              className={`flex max-w-[80%] md:max-w-[70%] ${
                message.isAi ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {message.isAi && (
                <div className="mr-2 mt-1">
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
                </div>
              )}
              
              <div 
                className={`rounded-lg p-3 ${
                  message.isAi 
                    ? "bg-secondary text-secondary-foreground" 
                    : "bg-primary text-primary-foreground"
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
            <div className="rounded-lg bg-secondary p-3 flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-secondary-foreground">Thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
