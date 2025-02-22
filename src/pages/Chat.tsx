
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mic, Paperclip, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

interface Message {
  text: string;
  isAi: boolean;
}

interface ConversationContext {
  currentTopic: string;
  awaitingResponse: boolean;
  lastQuestion: string;
}

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
    awaitingResponse: false,
    lastQuestion: ""
  });

  const generateFollowUpQuestion = (topic: string, userResponse: string) => {
    if (topic === "leak_location") {
      if (userResponse.includes("sink") || userResponse.includes("under")) {
        return "Is the leak constant or does it only happen when using the sink? This will help us determine if it's a drain or supply line issue.";
      }
      if (userResponse.includes("ceiling") || userResponse.includes("wall")) {
        return "This could be serious. Do you notice the leak happening more during showers/bathroom use, or is it constant? Also, is the water stain growing?";
      }
      if (userResponse.includes("toilet")) {
        return "Is the water pooling around the base of the toilet, or do you see it coming from the tank or supply line? Also, does it leak constantly or only when flushing?";
      }
    }

    if (topic === "clog_initial") {
      if (userResponse.includes("toilet")) {
        return "Before we proceed - what's the water level in the bowl right now? Is it higher than normal or normal? This is important to prevent overflow.";
      }
      if (userResponse.includes("sink")) {
        return "When did you first notice the clog, and have you tried any drain cleaners? If so, which ones? (This is important because some cleaners can damage pipes if mixed)";
      }
      if (userResponse.includes("shower")) {
        return "Does the water back up immediately when you start the shower, or does it drain slowly? Also, have you noticed any hair or soap scum buildup?";
      }
    }

    if (topic === "water_heater") {
      if (userResponse.includes("no hot") || userResponse.includes("cold")) {
        return "First, is your water heater gas or electric? This will determine our next troubleshooting steps.";
      }
      if (userResponse.includes("leak")) {
        return "Where exactly is the water coming from - the top, bottom, or connections? Also, what color is the water - clear or rusty?";
      }
      if (userResponse.includes("noise")) {
        return "What kind of noise are you hearing - popping, crackling, or rumbling? This will help identify if it's sediment buildup or a more serious issue.";
      }
    }

    return "Could you provide more details about what you're experiencing? This will help me give you the most accurate solution.";
  };

  const generatePlumberResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Emergency situations requiring immediate action
    if (lowerMessage.includes("overflow") || 
        (lowerMessage.includes("water") && lowerMessage.includes("everywhere")) ||
        (lowerMessage.includes("ceiling") && lowerMessage.includes("drip"))) {
      setContext({
        currentTopic: "emergency",
        awaitingResponse: true,
        lastQuestion: "Did you manage to shut off the water?"
      });
      return "EMERGENCY ACTION NEEDED: 1. Locate and shut off your main water valve immediately! It's usually near your water meter. 2. If it's a toilet overflow, also close the valve behind the toilet. 3. Move valuable items away from the water. Did you manage to shut off the water?";
    }

    // If we're awaiting a response to a previous question
    if (context.awaitingResponse) {
      const nextQuestion = generateFollowUpQuestion(context.currentTopic, lowerMessage);
      setContext(prev => ({
        ...prev,
        lastQuestion: nextQuestion
      }));
      return nextQuestion;
    }

    // Initial problem identification
    if (lowerMessage.includes("leak")) {
      setContext({
        currentTopic: "leak_location",
        awaitingResponse: true,
        lastQuestion: "Where exactly are you seeing the water?"
      });
      return "I'll help you fix that leak. First, where exactly are you seeing the water? Is it under a sink, from a pipe, ceiling, or somewhere else?";
    }

    if (lowerMessage.includes("clog") || lowerMessage.includes("won't drain")) {
      setContext({
        currentTopic: "clog_initial",
        awaitingResponse: true,
        lastQuestion: "Which drain is affected?"
      });
      return "I understand you're dealing with a clog. Which drain is affected - sink, toilet, or shower? This will help me guide you to the right solution.";
    }

    if (lowerMessage.includes("water heater")) {
      setContext({
        currentTopic: "water_heater",
        awaitingResponse: true,
        lastQuestion: "What issues are you experiencing with your water heater?"
      });
      return "What issues are you experiencing with your water heater - no hot water, strange noises, or is it leaking? Let me know the main problem and I'll help you fix it.";
    }

    // General response for unclear issues
    setContext({
      currentTopic: "general",
      awaitingResponse: true,
      lastQuestion: "Could you provide more details?"
    });
    return "I can help with that. Could you tell me: 1. When did this start? 2. Is it constant or intermittent? 3. Have you tried any fixes already?";
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: message, isAi: false }]);
    
    // Clear input
    setMessage("");
    
    // Generate plumber response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: generatePlumberResponse(message),
        isAi: true
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#0A2540]" />
          </Link>
          <div className="ml-4">
            <h1 className="font-inter font-bold text-[22px] text-[#0A2540]">
              AI Chat Assistant
            </h1>
            <p className="font-roboto text-[16px] text-gray-600">
              Expert plumbing advice at your fingertips
            </p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {/* Messages Container */}
          <div className="min-h-[400px] mb-20">
            {messages.map((msg, index) => (
              <motion.div 
                key={index}
                className={`mb-4 flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card 
                  className={`p-4 max-w-[80%] ${
                    msg.isAi 
                      ? 'bg-gray-100' 
                      : 'bg-[#0A2540] text-white'
                  }`}
                >
                  <p className={msg.isAi ? 'text-gray-800' : 'text-white'}>
                    {msg.text}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="container mx-auto max-w-3xl">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="flex-shrink-0"
                >
                  <Mic className="w-5 h-5 text-gray-600" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="flex-shrink-0"
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your plumbing issue..."
                  className="flex-grow"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="flex-shrink-0 bg-[#0A2540]"
                  disabled={!message.trim()}
                  onClick={handleSendMessage}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
