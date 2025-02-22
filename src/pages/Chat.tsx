
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
    
    // Emergency situations requiring immediate action
    if (lowerMessage.includes("overflow") || lowerMessage.includes("flood") || 
        (lowerMessage.includes("water") && lowerMessage.includes("everywhere")) ||
        (lowerMessage.includes("ceiling") && lowerMessage.includes("drip"))) {
      return "EMERGENCY ACTION NEEDED: 1. Locate and shut off your main water valve immediately! It's usually near your water meter. 2. If it's a toilet overflow, also close the valve behind the toilet. 3. Move valuable items away from the water. Let me know once you've done this, and I'll help fix the underlying issue.";
    }

    // Hidden leaks and water damage
    if ((lowerMessage.includes("leak") && lowerMessage.includes("hidden")) || 
        (lowerMessage.includes("find") && lowerMessage.includes("leak"))) {
      return "To find a hidden leak: 1. Check your water meter, mark its position, and don't use water for 2 hours. If it moves, you have a leak. 2. Look for warm spots on floors (could be hot water leak). 3. Check for musty smells or mold. 4. Watch for unexplained wet spots or water stains. Which signs have you noticed?";
    }

    // Water bill concerns
    if (lowerMessage.includes("water bill") || 
        (lowerMessage.includes("bill") && lowerMessage.includes("high"))) {
      return "A sudden high water bill usually means a hidden leak. First, check all visible fixtures and pipes. Then, locate your water meter and do this simple test: 1. Don't use any water for 2 hours 2. Write down the meter reading before and after. If it changed, you have a leak. Shall we try this test?";
    }

    // Water heater issues
    if (lowerMessage.includes("water heater")) {
      if (lowerMessage.includes("leak")) {
        return "A leaking water heater needs immediate attention! First, what color is the water - clear or rusty? And where exactly is it leaking from - top, bottom, or connections? This tells us if it's repairable or needs replacement.";
      }
      if (lowerMessage.includes("no hot water") || lowerMessage.includes("not hot")) {
        return "For no hot water: 1. Check if it's gas or electric 2. For gas - is the pilot light on? For electric - check your breaker. Which type do you have? Also, has there been any recent power outages?";
      }
    }

    // Toilet problems
    if (lowerMessage.includes("toilet")) {
      if (lowerMessage.includes("clog") || lowerMessage.includes("won't flush")) {
        return "For a clogged toilet: 1. If water level is high, DON'T flush again! 2. Use a plunger with enough water to cover the head 3. Push down slowly first to release air, then plunge vigorously. Have you tried plunging yet?";
      }
      if (lowerMessage.includes("run") || lowerMessage.includes("running")) {
        return "A running toilet usually means the flapper isn't sealing. Try this: Open the tank and check if the chain is: 1. Too tight (holding flapper up) 2. Too loose (not lifting flapper) 3. Look if the flapper is worn out. Which issue do you see?";
      }
    }

    // Drain issues
    if (lowerMessage.includes("drain")) {
      if (lowerMessage.includes("slow") || lowerMessage.includes("clog")) {
        return "For a slow drain: First, which drain is it (kitchen, bathroom sink, shower)? Don't use chemicals yet - they can damage pipes. Let's start with a plunger or a zip-it tool to remove hair and debris. Which drain is affected?";
      }
      if (lowerMessage.includes("smell") || lowerMessage.includes("stink")) {
        return "Drain smells usually mean either a dry P-trap or sewer gas backup. Quick fix: Pour 2 cups of water down EVERY drain in the house. If smells persist after 30 minutes, let me know - might be a bigger issue.";
      }
    }

    // Pipe problems
    if (lowerMessage.includes("pipe")) {
      if (lowerMessage.includes("frozen") || lowerMessage.includes("freeze")) {
        return "If you suspect frozen pipes: 1. Open nearby faucets 2. Turn up the heat 3. Never use open flame! 4. Apply heat with hairdryer or heating pad. Most importantly - have you noticed any bulging or cracking in the pipes?";
      }
      if (lowerMessage.includes("burst")) {
        return "EMERGENCY! 1. Shut off main water valve NOW! 2. Open faucets to drain remaining water 3. Turn off water heater 4. Once water's stopped, take photos for insurance. Is the main valve shut off yet?";
      }
    }

    // General response for unclear issues
    return "I can help with that. To give you the most accurate solution, could you tell me: 1. When did this start? 2. Is it constant or intermittent? 3. Have you tried any fixes already? This will help me guide you to the right solution.";
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
