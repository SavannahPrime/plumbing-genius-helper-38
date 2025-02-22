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

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your experienced plumbing assistant with over 30 years of hands-on experience. Whether you're dealing with a leaky faucet, clogged drain, or water pressure issues, I'm here to help. What plumbing problem can I assist you with today?",
      isAi: true
    }
  ]);

  const generatePlumberResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    const messageHistory = messages.map(msg => msg.text.toLowerCase());
    
    // Emergency situations that need immediate action
    if (lowerMessage.includes("overflow") || 
        (lowerMessage.includes("toilet") && (lowerMessage.includes("flood") || lowerMessage.includes("water") || lowerMessage.includes("everywhere")))) {
      return "IMMEDIATE ACTION NEEDED: 1. Remove the tank lid 2. Lift the float to stop water flow 3. If that doesn't work, turn off the water valve behind the toilet (turn clockwise) immediately! Once you've done this, let me know and I'll help you resolve the underlying issue. Is the water stopped now?";
    }

    // Check for context in previous messages
    const lastAiMessage = messages.filter(msg => msg.isAi).pop()?.text.toLowerCase() || "";
    const wasAskingAboutLocation = lastAiMessage.includes("where") || lastAiMessage.includes("which");
    const wasAskingAboutTiming = lastAiMessage.includes("when") || lastAiMessage.includes("how long");
    
    // If responding to a question about leak location
    if (wasAskingAboutLocation && lastAiMessage.includes("leak")) {
      if (lowerMessage.includes("sink")) {
        return "If you're seeing water under the sink, first check if the leak happens when using the sink or is constant. This will tell us if it's the drain (when in use) or supply lines (constant). Can you check and let me know?";
      } else if (lowerMessage.includes("faucet")) {
        return "For a leaky faucet, first tell me - is it dripping from the spout when off, or leaking around the base when you turn the handle? This will help us identify exactly which parts need replacing.";
      } else if (lowerMessage.includes("pipe")) {
        return "If it's a pipe leak, first shut off the main water valve! Then let me know - is this a visible pipe under a sink/in basement, or are you seeing water stains on walls/ceiling? This is crucial for next steps.";
      }
    }

    // Response for timing-related follow-ups
    if (wasAskingAboutTiming) {
      return "Thanks for that info. Have you noticed any changes in your water bill? Also, can you shut off the water supply to that area for now while we figure this out?";
    }
    
    // Initial problem identification
    if (lowerMessage.includes("leak")) {
      return "Got it - you've got a leak. First thing: where exactly are you seeing the water? Is it from a pipe, faucet, or under a fixture? We need to stop the water loss first, then we can fix the cause.";
    } else if (lowerMessage.includes("clog") || lowerMessage.includes("drain")) {
      if (lowerMessage.includes("toilet")) {
        return "For a clogged toilet, first make sure it won't overflow. Is the water level normal, or rising when flushed? If it's safe, try a plunger. If that doesn't work, I'll guide you through the next steps.";
      } else if (lowerMessage.includes("sink")) {
        return "For a clogged sink - is this in the kitchen or bathroom? And is the water completely stopped or just draining slowly? This will help me recommend the right fix.";
      } else {
        return "I understand you're dealing with a clog. Which drain is affected - sink, shower, or toilet? And is it completely stopped or just slow? Let me know so I can help you fix it.";
      }
    } else if (lowerMessage.includes("pressure")) {
      return "Low pressure can be serious or simple. Is this affecting all faucets or just one? If it's just one, it might be a quick aerator cleaning. If it's everywhere, we need to check your main line.";
    } else {
      return "Could you describe what's happening? Are you seeing, hearing, or smelling something unusual? The more specific you can be, the better I can help fix it.";
    }
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
