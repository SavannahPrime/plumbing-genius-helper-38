
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
        return "Ah, under the sink - that's a common trouble spot. Could be the P-trap connection or the supply lines. Are you seeing water pooling at the base of the cabinet? Also, does the leak happen when you're using the sink, or is it constant?";
      } else if (lowerMessage.includes("faucet")) {
        return "Based on my experience, faucet leaks usually come from worn-out O-rings or cartridges. Is the leak coming from the base of the spout or around the handles? This will tell us exactly which parts need replacing.";
      } else if (lowerMessage.includes("pipe")) {
        return "A pipe leak can be serious. Is this on a visible pipe or behind a wall? If you're seeing water stains on walls/ceiling or hearing dripping inside walls, we need to act quickly to prevent structural damage.";
      }
    }

    // Response for timing-related follow-ups
    if (wasAskingAboutTiming) {
      if (lowerMessage.includes("day") || lowerMessage.includes("today")) {
        return "Since it's a recent issue, let's act quickly before any serious damage occurs. Have you tried shutting off the local water valve to see if that stops the problem?";
      } else if (lowerMessage.includes("week") || lowerMessage.includes("month")) {
        return "I see it's been ongoing. In my experience, issues that persist this long often indicate a deeper problem. Have you noticed any changes in your water bill during this time?";
      }
    }
    
    // Initial problem identification
    if (lowerMessage.includes("leak")) {
      return "I hear you're dealing with a leak. First, let's locate where it's coming from exactly. Is it from a pipe, faucet, or maybe under the sink? This will help me give you the most accurate solution. Also, have you noticed any water damage or mold around the area?";
    } else if (lowerMessage.includes("clog") || lowerMessage.includes("drain")) {
      if (lowerMessage.includes("shower")) {
        return "Shower drains often clog due to hair and soap buildup. Have you noticed standing water during showers? Before we try any chemicals, let's try removing the drain cover and checking for visible blockage - you'd be surprised what I've found in 30 years of doing this!";
      } else if (lowerMessage.includes("toilet")) {
        return "Toilet clogs can be tricky. Is it backing up completely or just draining slowly? Also, did you notice anything unusual that might have been flushed? Let's figure out if a plunger might work or if we need something more heavy-duty.";
      } else if (lowerMessage.includes("sink")) {
        return "Kitchen sink clogs are often from grease or food particles. Does the clog seem to be in the disposal side or the other basin? And have you tried running hot water to see if it helps dissolve any grease buildup?";
      } else {
        return "Dealing with a clog, eh? Let me help you diagnose this. Is the water draining slowly or completely stopped? Also, which drain is affected - sink, shower, or toilet? This will help me recommend the right approach.";
      }
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
