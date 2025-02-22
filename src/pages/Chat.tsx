
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
    
    // Basic context understanding for common plumbing issues
    if (lowerMessage.includes("leak")) {
      return "I hear you're dealing with a leak. First, let's locate where it's coming from exactly. Is it from a pipe, faucet, or maybe under the sink? This will help me give you the most accurate solution. Also, have you noticed any water damage or mold around the area?";
    } else if (lowerMessage.includes("clog") || lowerMessage.includes("drain")) {
      return "Dealing with a clog, eh? Let me help you diagnose this. Is the water draining slowly or completely stopped? Also, which drain is affected - sink, shower, or toilet? This will help me recommend the right approach, whether it's using a plunger, plumber's snake, or if we need to look at the main line.";
    } else if (lowerMessage.includes("pressure") || lowerMessage.includes("low water")) {
      return "Low water pressure can be tricky. Is this happening at all faucets or just one? If it's at one faucet, it might just be a clogged aerator - an easy fix! If it's throughout the house, we should check your pressure regulator and main water line. When did you first notice this issue?";
    } else {
      return "Could you tell me more about what you're experiencing? As a plumber, I find it helpful to know a few things: When did the problem start? Is it constant or intermittent? And have you noticed any unusual sounds or smells? These details will help me give you the most accurate solution.";
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
