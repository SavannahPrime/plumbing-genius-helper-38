
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
  subTopic: string;
  stage: number;
  lastQuestion: string;
  previousAnswers: string[];
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
    subTopic: "",
    stage: 0,
    lastQuestion: "",
    previousAnswers: []
  });

  const generateNextResponse = (topic: string, subTopic: string, stage: number, previousAnswers: string[]) => {
    // Leak troubleshooting flow
    if (topic === "leak") {
      if (stage === 0) {
        return "Where exactly are you seeing the water? Is it under a sink, from a pipe, ceiling, or somewhere else?";
      }
      
      const location = previousAnswers[0].toLowerCase();
      
      if (stage === 1) {
        if (location.includes("sink")) {
          return "Is the leak constant or does it only happen when using the sink? Also, can you see if it's coming from the drain pipe (bottom) or supply lines (the tubes going to the faucet)?";
        }
        if (location.includes("ceiling")) {
          return "This is potentially serious. Is there a bathroom or water pipes directly above this spot? And how large is the water stain - can you describe its size?";
        }
        if (location.includes("pipe")) {
          return "Is this a visible pipe in your basement/under sink, or inside a wall? And is the leak constant or only when using water?";
        }
      }

      if (stage === 2) {
        if (location.includes("sink")) {
          return previousAnswers[1].includes("constant") 
            ? "Constant leaks usually indicate a supply line issue. Can you see any corrosion or mineral buildup around the connections? This will help determine if we need to replace the entire line or just tighten/reseal connections."
            : "Since it only leaks during use, it's likely a drain pipe issue. Do you see any water spots or corrosion around the drain pipe joints?";
        }
        if (location.includes("ceiling")) {
          return "Based on the location and timing, this could be related to your " + 
            (previousAnswers[1].includes("bathroom") ? "bathroom plumbing. Do you notice the leak getting worse during or after showers?" : "water supply lines. Has there been any recent plumbing work in that area?");
        }
      }
    }

    // Clog troubleshooting flow
    if (topic === "clog") {
      if (stage === 0) {
        return "Which drain is affected - sink, toilet, shower, or something else? And is it completely stopped up or just draining slowly?";
      }

      const drainType = previousAnswers[0].toLowerCase();
      
      if (stage === 1) {
        if (drainType.includes("sink")) {
          return "When did you first notice the clog, and have you tried any drain cleaners? If so, which ones? (This is important because mixing different cleaners can be dangerous)";
        }
        if (drainType.includes("toilet")) {
          return "What's the water level in the bowl - normal or higher than usual? And does it change level or make gurgling sounds on its own?";
        }
        if (drainType.includes("shower")) {
          return "Does the water back up immediately or take time to accumulate? Also, can you see any hair or debris near the drain cover?";
        }
      }

      if (stage === 2) {
        if (drainType.includes("sink")) {
          return previousAnswers[1].includes("cleaner") 
            ? "Since you've used chemicals, we need to be careful. Don't use any other products for at least 24 hours. Do you have a plunger specifically for sinks? If not, I can suggest some safe alternatives."
            : "That's good that no chemicals were used yet. Do you have a sink plunger or a zip-it tool? These are our best first options for clearing the clog safely.";
        }
        if (drainType.includes("toilet")) {
          return previousAnswers[1].includes("high") 
            ? "Don't flush again! This could overflow. Do you have a toilet plunger? If so, make sure there's enough water to cover the plunger head for proper suction."
            : "Since the water level is normal, it's safe to try flushing. But first, do you have a toilet plunger ready in case it starts to back up?";
        }
      }
    }

    // Water heater troubleshooting flow
    if (topic === "water_heater") {
      if (stage === 0) {
        return "What's the main issue you're experiencing with your water heater - no hot water, not hot enough, strange noises, or leaking?";
      }

      const issue = previousAnswers[0].toLowerCase();
      
      if (stage === 1) {
        if (issue.includes("no hot") || issue.includes("not hot")) {
          return "Is your water heater gas or electric? Also, did this happen suddenly or gradually?";
        }
        if (issue.includes("leak")) {
          return "Where exactly is the water coming from - top, bottom, or connections? And what color is the water - clear or rusty?";
        }
        if (issue.includes("noise")) {
          return "What kind of noise - popping, crackling, or rumbling? And how long has this been happening?";
        }
      }

      if (stage === 2) {
        if (issue.includes("no hot")) {
          return previousAnswers[1].includes("gas") 
            ? "For gas water heaters, we need to check the pilot light. Can you see if it's lit? If you're not comfortable checking this, don't attempt it - safety first."
            : "For electric water heaters, first check your circuit breaker. Has it tripped? Also, do you know where the reset button is on your water heater?";
        }
        if (issue.includes("leak")) {
          if (previousAnswers[1].includes("bottom")) {
            return "A leak from the bottom usually means the tank itself has failed. How old is your water heater? This will help determine if repair or replacement is more cost-effective.";
          }
          if (previousAnswers[1].includes("top")) {
            return "Top leaks are often from the inlet/outlet pipes or the pressure relief valve. Do you see any corrosion around these connections?";
          }
        }
      }
    }

    return "Based on what you've told me, we should take a closer look at this issue. Could you provide more specific details about what you're observing?";
  };

  const generatePlumberResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Emergency situations requiring immediate action
    if (lowerMessage.includes("overflow") || 
        (lowerMessage.includes("water") && lowerMessage.includes("everywhere")) ||
        (lowerMessage.includes("ceiling") && lowerMessage.includes("drip"))) {
      setContext({
        currentTopic: "emergency",
        subTopic: "water_damage",
        stage: 0,
        lastQuestion: "Did you manage to shut off the water?",
        previousAnswers: []
      });
      return "EMERGENCY ACTION NEEDED: 1. Locate and shut off your main water valve immediately! It's usually near your water meter. 2. If it's a toilet overflow, also close the valve behind the toilet. 3. Move valuable items away from the water. Did you manage to shut off the water?";
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

      return generateNextResponse(context.currentTopic, context.subTopic, nextStage, newAnswers);
    }

    // Start new conversation based on issue
    if (lowerMessage.includes("leak")) {
      setContext({
        currentTopic: "leak",
        subTopic: "",
        stage: 0,
        lastQuestion: "",
        previousAnswers: []
      });
      return generateNextResponse("leak", "", 0, []);
    }

    if (lowerMessage.includes("clog") || lowerMessage.includes("drain")) {
      setContext({
        currentTopic: "clog",
        subTopic: "",
        stage: 0,
        lastQuestion: "",
        previousAnswers: []
      });
      return generateNextResponse("clog", "", 0, []);
    }

    if (lowerMessage.includes("water heater")) {
      setContext({
        currentTopic: "water_heater",
        subTopic: "",
        stage: 0,
        lastQuestion: "",
        previousAnswers: []
      });
      return generateNextResponse("water_heater", "", 0, []);
    }

    // General response for unclear issues
    return "I can help with that. Could you tell me more specifically what kind of plumbing issue you're experiencing? For example, is it a leak, clog, water heater problem, or something else?";
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
