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
  solutionProgress: number; // 0-100%
  problemDetails: {
    location?: string;
    severity?: string;
    duration?: string;
    attempted?: string[];
    tools?: string[];
  };
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
    previousAnswers: [],
    solutionProgress: 0,
    problemDetails: {}
  });

  const identifyProblemType = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Emergency keywords
    if (lowerMessage.includes("overflow") || 
        lowerMessage.includes("flood") ||
        (lowerMessage.includes("water") && lowerMessage.includes("everywhere")) ||
        (lowerMessage.includes("ceiling") && lowerMessage.includes("drip"))) {
      return "emergency";
    }
    
    // Leak keywords
    if (lowerMessage.includes("leak") || 
        lowerMessage.includes("drip") || 
        lowerMessage.includes("water damage") ||
        lowerMessage.includes("wet")) {
      return "leak";
    }
    
    // Clog keywords
    if (lowerMessage.includes("clog") || 
        lowerMessage.includes("blocked") || 
        lowerMessage.includes("won't drain") ||
        lowerMessage.includes("slow drain") ||
        lowerMessage.includes("backing up")) {
      return "clog";
    }
    
    // Water heater keywords
    if (lowerMessage.includes("water heater") || 
        lowerMessage.includes("hot water") ||
        lowerMessage.includes("no hot")) {
      return "water_heater";
    }
    
    // Toilet keywords
    if (lowerMessage.includes("toilet") ||
        lowerMessage.includes("flush")) {
      return "toilet";
    }
    
    return "unknown";
  };

  const generateNextResponse = (topic: string, subTopic: string, stage: number, previousAnswers: string[], problemDetails: any) => {
    const progress = Math.min((stage / 40) * 100, 100);
    
    const updateContext = (newDetails: any) => {
      setContext(prev => ({
        ...prev,
        problemDetails: { ...prev.problemDetails, ...newDetails },
        solutionProgress: progress
      }));
    };

    // Leak troubleshooting flow with extended stages
    if (topic === "leak") {
      if (stage === 0) {
        return "Where exactly are you seeing the water? Is it under a sink, from a pipe, ceiling, or somewhere else?";
      }

      const location = previousAnswers[0].toLowerCase();
      updateContext({ location });

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
        const leakType = previousAnswers[1].toLowerCase();
        updateContext({ severity: leakType.includes("constant") ? "high" : "medium" });
        
        if (location.includes("sink")) {
          return leakType.includes("constant") 
            ? "Constant leaks usually indicate a supply line issue. Can you see any corrosion or mineral buildup around the connections?"
            : "Since it only leaks during use, it's likely a drain pipe issue. Do you see any water spots or corrosion around the drain pipe joints?";
        }
      }

      if (stage === 3) {
        const hasCorrosion = previousAnswers[2].toLowerCase().includes("yes");
        updateContext({ condition: hasCorrosion ? "corroded" : "good" });
        
        return hasCorrosion
          ? "The corrosion indicates a potential weak point. Have you noticed any changes in water pressure or color recently?"
          : "Good that there's no visible corrosion. When you hear water running in other parts of the house, does the leak get worse?";
      }

      if (stage === 4) {
        return "Do you have access to any basic plumbing tools like an adjustable wrench or pipe wrench? This will help me guide you through some potential fixes.";
      }

      if (stage === 5) {
        const hasTools = previousAnswers[4].toLowerCase().includes("yes");
        updateContext({ tools: hasTools ? ["wrench"] : [] });
        
        return hasTools
          ? "Great! Before we proceed with any repairs, can you locate the water shutoff valve nearest to this leak? It's important to know where this is."
          : "No problem. For safety, we should locate your main water shutoff valve first. It's usually near your water meter or where the main line enters your house. Can you locate it?";
      }

      if (stage === 6) {
        const foundValve = previousAnswers[5].toLowerCase().includes("yes");
        updateContext({ hasShutoff: foundValve });
        
        return foundValve
          ? "Excellent. Now, before we shut off the water, do you have any water-dependent appliances running (washing machine, dishwasher) that we need to wait for?"
          : "Let me help you find it. Is your water meter located inside (like in a basement) or outside your home?";
      }

      if (stage === 7) {
        return "When was the last time any plumbing work was done in this area? This might help identify if this is related to recent changes.";
      }

      if (stage === 8) {
        const recentWork = previousAnswers[7].toLowerCase();
        updateContext({ recentWork: recentWork.includes("recent") ? "yes" : "no" });
        
        return "Based on everything you've told me, I can guide you through some steps. Would you like to try fixing this yourself with my guidance, or would you prefer recommendations for professional plumbers in your area?";
      }

      // Continue with detailed fix instructions or professional recommendations based on all gathered information
      if (stage > 8) {
        const wantsDIY = previousAnswers[8].toLowerCase().includes("myself") || previousAnswers[8].toLowerCase().includes("guide");
        
        if (wantsDIY) {
          // Sequence of specific repair steps based on all gathered information
          const repairSteps = [
            "First, let's shut off the water supply to prevent any water damage while we work.",
            "Now, let's place some towels or a bucket under the work area to catch any water.",
            "Using your adjustable wrench, try tightening the connection - turn clockwise about 1/8 turn. Don't force it.",
            "Check if you see any cracks or damage in the visible parts of the pipe.",
            "If you have plumber's tape, we can try rewrapping the threaded connections.",
            "Once everything is secure, we'll turn the water back on slowly to test.",
            "Watch for any continued leaking and monitor the repair over the next few hours."
          ];
          
          return repairSteps[Math.min(stage - 9, repairSteps.length - 1)] || 
                 "How did that last step go? Any changes in the leak?";
        } else {
          // Professional plumber recommendation steps
          const proSteps = [
            "I'll help you document the issue for the plumber. Can you take photos of the leak and surrounding area?",
            "When calling a plumber, mention these specific symptoms we've identified.",
            "Ask about their experience with similar issues and their warranty policy.",
            "Request an estimate range before they visit.",
            "Make sure they're licensed and insured.",
            "While waiting for the plumber, monitor the leak and use towels/buckets as needed."
          ];
          
          return proSteps[Math.min(stage - 9, proSteps.length - 1)] || 
                 "Is there anything specific you'd like to know about working with a professional plumber?";
        }
      }
    }

    // Clog troubleshooting flow with extended stages
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

    // Water heater troubleshooting flow with extended stages
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

    return "Based on what you've told me, let's try a different approach. Could you describe any changes you've noticed recently?";
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
        lastQuestion: "",
        previousAnswers: [],
        solutionProgress: 0,
        problemDetails: { severity: "emergency" }
      });
      return "EMERGENCY ACTION NEEDED: 1. Locate and shut off your main water valve immediately! It's usually near your water meter. 2. If it's a toilet overflow, also close the valve behind the toilet. 3. Move valuable items away from the water. Did you manage to shut off the water?";
    }

    // If we're in the middle of a conversation, analyze the response and continue
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
        context.problemDetails
      );
    }

    // If this is a new conversation, identify the problem type
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

    return generateNextResponse(problemType, "", 0, [], {});
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: message, isAi: false }]);
    
    // Clear input
    setMessage("");
    
    // Generate plumber response with a small delay for natural feeling
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: generatePlumberResponse(message),
        isAi: true
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
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

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
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
