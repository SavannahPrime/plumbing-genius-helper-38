
import { useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { Message, ConversationContext } from "@/types/chat";
import { generateNextResponse, identifyProblemType, handleEmergency } from "@/services/chatService";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your experienced plumbing assistant with over 30 years of hands-on experience. Whether you're dealing with a leaky faucet, clogged drain, or water pressure issues, I'm here to help. What plumbing problem can I assist you with today?",
      isAi: true
    }
  ]);
  const [context, setContext] = useState<ConversationContext>({
    currentTopic: "",
    subTopic: "",
    stage: 0,
    lastQuestion: "",
    previousAnswers: [],
    solutionProgress: 0,
    problemDetails: {}
  });

  const updateContextDetails = (newDetails: any) => {
    setContext(prev => ({
      ...prev,
      problemDetails: { ...prev.problemDetails, ...newDetails },
      solutionProgress: Math.min((prev.stage / 40) * 100, 100)
    }));
  };

  const generatePlumberResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for emergency situations
    if (lowerMessage.includes("overflow") || 
        (lowerMessage.includes("water") && lowerMessage.includes("everywhere")) ||
        (lowerMessage.includes("ceiling") && lowerMessage.includes("drip"))) {
      return handleEmergency(setContext);
    }

    // Continue existing conversation
    if (context.currentTopic) {
      const newAnswers = [...context.previousAnswers, userMessage];
      const nextStage = context.stage + 1;
      
      setContext(prev => ({
        ...prev,
        stage: nextStage,
        previousAnswers: newAnswers
      }));

      return generateNextResponse(
        context.currentTopic, 
        context.subTopic, 
        nextStage, 
        newAnswers,
        context.problemDetails,
        updateContextDetails
      );
    }

    // Start new conversation
    const problemType = identifyProblemType(userMessage);
    
    setContext({
      currentTopic: problemType,
      subTopic: "",
      stage: 0,
      lastQuestion: "",
      previousAnswers: [],
      solutionProgress: 0,
      problemDetails: {}
    });

    return generateNextResponse(
      problemType, 
      "", 
      0, 
      [], 
      {},
      updateContextDetails
    );
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, isAi: false }]);
    setMessage("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: generatePlumberResponse(message),
        isAi: true
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <ChatHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <ChatMessages messages={messages} />
          <ChatInput 
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default Chat;
