
import React, { useRef, useEffect } from "react";
import { Message, ConversationContext } from "@/types/chat";
import { Loader2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";
import { format } from "date-fns";

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

  // Customize the loading message based on agent specialty
  const getLoadingMessage = () => {
    switch (specialty) {
      case 'chef':
        return "Chef is cooking up a response...";
      case 'tax':
        return "Tax Attorney is analyzing your situation...";
      case 'psychiatrist':
        return "Dr. Patricia is formulating a thoughtful response...";
      case 'financial':
        return "Financial Advisor is calculating options...";
      case 'wellness':
        return "Wellness Coach is preparing guidance...";
      case 'legal':
        return "Legal Consultant is researching your question...";
      case 'career':
        return "Career Coach is developing a strategy...";
      case 'relationship':
        return "Relationship Coach is crafting advice...";
      case 'nutrition':
        return "Nutrition Coach is preparing recommendations...";
      default:
        return `${agent.name} is thinking...`;
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = message.timestamp ? new Date(message.timestamp) : new Date();
    const dateStr = format(date, 'MMMM d, yyyy');
    
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    
    groups[dateStr].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="flex flex-col space-y-6">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-muted/30 text-muted-foreground text-xs px-3 py-1 rounded-full">
                {date}
              </div>
            </div>
            
            {dateMessages.map((message, index) => {
              // Check if we should show the avatar (first message in a sequence from the same sender)
              const showAvatar = index === 0 || 
                dateMessages[index - 1]?.isAi !== message.isAi;
              
              // Check if this is the last message in a sequence from the same sender
              const isLastInSequence = index === dateMessages.length - 1 || 
                dateMessages[index + 1]?.isAi !== message.isAi;
                
              return (
                <div 
                  key={message.id || index} 
                  className={`flex ${message.isAi ? "justify-start" : "justify-end"}`}
                >
                  <div 
                    className={`flex max-w-[85%] md:max-w-[70%] ${
                      message.isAi ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {message.isAi && showAvatar && (
                      <div className="mr-2 mt-1 flex-shrink-0">
                        {useCartoonChef ? (
                          <Avatar className="h-8 w-8 overflow-hidden border-2 border-amber-200">
                            <img src={chefCartoonImage} alt={agent.name} className="w-full h-full object-cover" />
                          </Avatar>
                        ) : agent.avatarImage ? (
                          <Avatar className="h-8 w-8 overflow-hidden border-2 border-amber-200">
                            <img src={agent.avatarImage} alt={agent.name} className="w-full h-full object-cover" />
                          </Avatar>
                        ) : (
                          <Avatar className={`h-8 w-8 ${getAvatarBgColor(specialty)}`}>
                            <span className="text-white text-xs">{agent.emoji}</span>
                          </Avatar>
                        )}
                      </div>
                    )}
                    
                    {message.isAi && !showAvatar && (
                      <div className="mr-2 mt-1 w-8 flex-shrink-0"></div>
                    )}
                    
                    <div 
                      className={`rounded-2xl p-3 ${
                        message.isAi 
                          ? `${isLastInSequence ? 'rounded-bl-none' : ''} bg-gradient-to-br from-amber-50 to-amber-100 backdrop-blur-md text-amber-900 border border-amber-200/50 shadow-sm` 
                          : `${isLastInSequence ? 'rounded-br-none' : ''} bg-gradient-to-br from-amber-500 to-amber-600 backdrop-blur-md text-white border border-amber-400/50 shadow-sm`
                      }`}
                    >
                      {message.imageUrl ? (
                        <div className="flex flex-col gap-2">
                          <img 
                            src={message.imageUrl} 
                            alt="User uploaded" 
                            className="rounded-lg max-h-48 object-contain"
                          />
                          <p className="text-sm md:text-base">{message.text}</p>
                        </div>
                      ) : (
                        <p className="text-sm md:text-base">{message.text}</p>
                      )}
                      
                      {/* Message timestamp */}
                      <div className={`text-[10px] mt-1 ${message.isAi ? 'text-amber-700/70' : 'text-amber-100/70'} text-right`}>
                        {message.timestamp && format(new Date(message.timestamp), 'h:mm a')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center">
              <div className="mr-2 mt-1">
                {useCartoonChef ? (
                  <Avatar className="h-8 w-8 overflow-hidden border-2 border-amber-200 animate-pulse">
                    <img src={chefCartoonImage} alt={agent.name} className="w-full h-full object-cover" />
                  </Avatar>
                ) : agent.avatarImage ? (
                  <Avatar className="h-8 w-8 overflow-hidden border-2 border-amber-200 animate-pulse">
                    <img src={agent.avatarImage} alt={agent.name} className="w-full h-full object-cover" />
                  </Avatar>
                ) : (
                  <Avatar className={`h-8 w-8 animate-pulse ${getAvatarBgColor(specialty)}`}>
                    <span className="text-white text-xs">{agent.emoji}</span>
                  </Avatar>
                )}
              </div>
              <div className="rounded-2xl rounded-bl-none bg-gradient-to-br from-amber-50 to-amber-100 backdrop-blur-md p-3 flex items-center space-x-2 border border-amber-200/50 shadow-sm max-w-[85%] md:max-w-[70%]">
                <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
                <span className="text-amber-900 text-sm">{getLoadingMessage()}</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

// Helper function to get avatar background color based on specialty
const getAvatarBgColor = (specialty: AgentSpecialty): string => {
  switch (specialty) {
    case 'plumber':
      return 'bg-accent/80';
    case 'electrician':
      return 'bg-yellow-500';
    case 'gadget':
      return 'bg-purple-600';
    case 'chef':
      return 'bg-amber-600';
    case 'stylist':
      return 'bg-pink-500';
    case 'handyman':
      return 'bg-orange-500';
    case 'mechanic':
      return 'bg-blue-600';
    case 'landscaper':
      return 'bg-green-600';
    case 'cleaning':
      return 'bg-cyan-500';
    case 'tax':
      return 'bg-indigo-600';
    case 'psychiatrist':
      return 'bg-teal-600';
    case 'financial':
      return 'bg-emerald-600';
    case 'wellness':
      return 'bg-rose-600';
    case 'legal':
      return 'bg-stone-600';
    case 'career':
      return 'bg-cyan-600';
    case 'relationship':
      return 'bg-pink-500';
    case 'nutrition':
      return 'bg-green-500';
    default:
      return 'bg-blue-500';
  }
};

export default ChatMessages;
