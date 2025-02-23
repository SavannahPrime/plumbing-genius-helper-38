import { ConversationContext } from "@/types/chat";

export const identifyProblemType = (message: string) => {
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

export const generateNextResponse = (
  topic: string, 
  subTopic: string, 
  stage: number, 
  previousAnswers: string[], 
  problemDetails: any,
  updateContext: (newDetails: any) => void
) => {
  const progress = Math.min((stage / 40) * 100, 100);
  
  // Leak troubleshooting flow
  if (topic === "leak") {
    if (stage === 0) {
      return "Where exactly are you seeing the water? Is it under a sink, from a pipe, ceiling, or somewhere else?";
    }

    const location = previousAnswers[0]?.toLowerCase() || "";
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
      const leakType = previousAnswers[1]?.toLowerCase() || "";
      updateContext({ severity: leakType.includes("constant") ? "high" : "medium" });
      
      if (location.includes("sink")) {
        return leakType.includes("constant") 
          ? "Constant leaks usually indicate a supply line issue. Can you see any corrosion or mineral buildup around the connections?"
          : "Since it only leaks during use, it's likely a drain pipe issue. Do you see any water spots or corrosion around the drain pipe joints?";
      }
    }

    if (stage === 3) {
      const hasCorrosion = previousAnswers[2]?.toLowerCase().includes("yes");
      updateContext({ condition: hasCorrosion ? "corroded" : "good" });
      
      return hasCorrosion
        ? "The corrosion indicates a potential weak point. Have you noticed any changes in water pressure or color recently?"
        : "Good that there's no visible corrosion. When you hear water running in other parts of the house, does the leak get worse?";
    }

    if (stage === 4) {
      return "Do you have access to any basic plumbing tools like an adjustable wrench or pipe wrench? This will help me guide you through some potential fixes.";
    }

    if (stage === 5) {
      const hasTools = previousAnswers[4]?.toLowerCase().includes("yes");
      updateContext({ tools: hasTools ? ["wrench"] : [] });
      
      return hasTools
        ? "Great! Before we proceed with any repairs, can you locate the water shutoff valve nearest to this leak? It's important to know where this is."
        : "No problem. For safety, we should locate your main water shutoff valve first. It's usually near your water meter or where the main line enters your house. Can you locate it?";
    }

    if (stage === 6) {
      const foundValve = previousAnswers[5]?.toLowerCase().includes("yes");
      updateContext({ hasShutoff: foundValve });
      
      return foundValve
        ? "Excellent. Now, before we shut off the water, do you have any water-dependent appliances running (washing machine, dishwasher) that we need to wait for?"
        : "Let me help you find it. Is your water meter located inside (like in a basement) or outside your home?";
    }

    if (stage === 7) {
      return "When was the last time any plumbing work was done in this area? This might help identify if this is related to recent changes.";
    }

    if (stage === 8) {
      const recentWork = previousAnswers[7]?.toLowerCase();
      updateContext({ recentWork: recentWork.includes("recent") ? "yes" : "no" });
      
      return "Based on everything you've told me, I can guide you through some steps. Would you like to try fixing this yourself with my guidance, or would you prefer recommendations for professional plumbers in your area?";
    }

    // Continue with detailed fix instructions or professional recommendations based on all gathered information
    if (stage > 8) {
      const wantsDIY = previousAnswers[8]?.toLowerCase().includes("myself") || previousAnswers[8]?.toLowerCase().includes("guide");
      
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

    const drainType = previousAnswers[0]?.toLowerCase() || "";
    updateContext({ location: drainType });
    
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
      return "Could you describe when you first noticed the clog and what symptoms you're seeing?";
    }

    if (stage === 2) {
      const description = previousAnswers[1]?.toLowerCase() || "";
      updateContext({ symptoms: description });
      
      if (drainType.includes("sink")) {
        if (description.includes("cleaner")) {
          updateContext({ attempted: ["chemical cleaner"] });
          return "Since you've used chemicals, we need to be careful. Don't use any other products for at least 24 hours. Do you have a plunger specifically for sinks? If not, I can suggest some safe alternatives.";
        }
        return "That's good that no chemicals were used yet. Do you have a sink plunger or a zip-it tool? These are our best first options for clearing the clog safely.";
      }
      if (drainType.includes("toilet")) {
        if (description.includes("high")) {
          updateContext({ severity: "high" });
          return "Don't flush again! This could overflow. Do you have a toilet plunger? If so, make sure there's enough water to cover the plunger head for proper suction.";
        }
        return "Since the water level is normal, it's safe to try flushing. But first, do you have a toilet plunger ready in case it starts to back up?";
      }
      if (drainType.includes("shower")) {
        if (description.includes("hair") || description.includes("debris")) {
          updateContext({ cause: "debris" });
          return "Do you have a drain snake or zip-it tool? These are perfect for removing hair clogs. If not, would you like me to suggest some alternatives?";
        }
        return "For shower clogs without visible debris, we should check the drain trap. Do you know where your drain trap access panel is located?";
      }
    }

    if (stage === 3) {
      const hasTools = previousAnswers[2]?.toLowerCase().includes("yes");
      updateContext({ tools: hasTools ? ["plunger"] : [] });
      
      if (hasTools) {
        return "Great! Before we start plunging, let's make sure we're doing it correctly. For sinks/showers, remove any drain covers. For toilets, ensure enough water covers the plunger head. Ready to proceed?";
      } else {
        return "No problem. We have a few options: 1) Use a natural solution of baking soda and vinegar, 2) Try a manual drain auger, or 3) Call a professional. Which would you prefer to try first?";
      }
    }

    if (stage === 4) {
      const response = previousAnswers[3]?.toLowerCase() || "";
      if (response.includes("yes") || response.includes("ready")) {
        return "Perfect! Place the plunger over the drain, ensuring a good seal. Push down firmly and pull up quickly 5-6 times. Let me know if you notice any change in drainage.";
      }
      if (response.includes("baking") || response.includes("vinegar")) {
        updateContext({ attempted: ["natural solution"] });
        return "Pour 1/2 cup baking soda down the drain, followed by 1/2 cup vinegar. Cover the drain and wait 15 minutes. Then flush with hot water. Let me know what happens.";
      }
      if (response.includes("auger") || response.includes("snake")) {
        return "A drain auger can be purchased at most hardware stores. Would you like me to explain how to use one, or would you prefer to try something else first?";
      }
      if (response.includes("professional")) {
        return "I'll help you find a reliable plumber. What's your location? Also, would you like some tips on preventing future clogs while we wait for professional help?";
      }
    }

    // Continue with more stages based on previous responses...
    if (stage > 4) {
      const lastResponse = previousAnswers[stage - 1]?.toLowerCase() || "";
      
      if (lastResponse.includes("better") || lastResponse.includes("working")) {
        return "Excellent! To prevent future clogs, I recommend: 1) Using drain strainers, 2) Regular cleaning with enzyme cleaners, and 3) Avoiding putting problematic items down the drain. Would you like specific details about any of these?";
      }
      
      if (lastResponse.includes("same") || lastResponse.includes("still")) {
        return "Since the first attempt didn't work, we should try a different approach. Would you like to try another method, or should we discuss professional options?";
      }
      
      if (lastResponse.includes("worse")) {
        updateContext({ severity: "high" });
        return "Stop any further attempts - we don't want to risk damage. Given the situation, I recommend calling a professional plumber. Would you like help finding one in your area?";
      }
      
      return "How did that last step work out? Did you notice any improvement in the drainage?";
    }
  }

  // Water heater troubleshooting flow with extended stages
  if (topic === "water_heater") {
    if (stage === 0) {
      return "What's the main issue you're experiencing with your water heater - no hot water, not hot enough, strange noises, or leaking?";
    }

    const issue = previousAnswers[0]?.toLowerCase() || "";
    
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
        return previousAnswers[1]?.includes("gas") 
          ? "For gas water heaters, we need to check the pilot light. Can you see if it's lit? If you're not comfortable checking this, don't attempt it - safety first."
          : "For electric water heaters, first check your circuit breaker. Has it tripped? Also, do you know where the reset button is on your water heater?";
      }
      if (issue.includes("leak")) {
        if (previousAnswers[1]?.includes("bottom")) {
          return "A leak from the bottom usually means the tank itself has failed. How old is your water heater? This will help determine if repair or replacement is more cost-effective.";
        }
        if (previousAnswers[1]?.includes("top")) {
          return "Top leaks are often from the inlet/outlet pipes or the pressure relief valve. Do you see any corrosion around these connections?";
        }
      }
    }
  }

  // If we reach here, we don't have a specific response for this stage
  // Return a contextual fallback based on the topic
  const fallbacks = {
    leak: "How is the leak situation now? Has there been any change since our last step?",
    clog: "How is the drainage now? Have you noticed any improvement or changes?",
    water_heater: "How is the water heater performing now? Have you noticed any changes since our last step?",
    toilet: "Has there been any change in the toilet's behavior since our last step?",
    unknown: "Could you provide more details about what you're experiencing? This will help me give you better guidance."
  };

  return fallbacks[topic as keyof typeof fallbacks] || "Could you describe any recent changes you've noticed?";
};

export const handleEmergency = (setContext: (context: ConversationContext) => void) => {
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
};
