
import { OpenAIMessage } from "@/types/chat";
import { isPictureRequest } from "./openaiService";

// Agent specialties
export type AgentSpecialty = 
  | "plumber" 
  | "electrician" 
  | "handyman" 
  | "mechanic" 
  | "landscaper" 
  | "chef"
  | "stylist"
  | "cleaning"
  | "gadget";

// Agent personality types
export type AgentPersonality = "professional" | "friendly" | "technical";

// Interface for specialized agent
export interface SpecializedAgent {
  specialty: AgentSpecialty;
  name: string;
  emoji: string;
  expertise: string[];
  personality: AgentPersonality;
  greeting: string;
  avatarImage?: string;
  actionImage?: string;
}

// Create specialized agents information
export const specializedAgents: Record<AgentSpecialty, SpecializedAgent> = {
  plumber: {
    specialty: "plumber",
    name: "Mike",
    emoji: "🪠",
    expertise: ["Leaks", "Clogs", "Toilet Repairs", "Water Heaters", "Pipe Issues"],
    personality: "friendly",
    greeting: "Hi there! I'm Mike, your plumbing expert with 30+ years of experience. What plumbing issue can I help you with today?"
  },
  electrician: {
    specialty: "electrician",
    name: "Ellie",
    emoji: "⚡",
    expertise: ["Wiring", "Circuit Breakers", "Light Fixtures", "Electrical Safety", "Power Outages"],
    personality: "technical",
    greeting: "Hello! I'm Ellie, your electrical systems expert. I can help diagnose and solve any electrical issues you're facing. What seems to be the problem?"
  },
  handyman: {
    specialty: "handyman",
    name: "Hank",
    emoji: "🔧",
    expertise: ["General Repairs", "Furniture Assembly", "Home Maintenance", "Small Fixes", "DIY Projects"],
    personality: "friendly",
    greeting: "Hey there! I'm Hank, your go-to handyman for all sorts of fixes around the house. What project are you working on?"
  },
  mechanic: {
    specialty: "mechanic",
    name: "Mia",
    emoji: "🔧",
    expertise: ["Engine Diagnostics", "Brakes", "Transmissions", "Electrical Systems", "Maintenance"],
    personality: "technical",
    greeting: "Hi, I'm Mia, your automotive expert. I can help with diagnostics, repairs, and maintenance questions. What's going on with your vehicle?",
    avatarImage: "/lovable-uploads/a0d78b55-8203-4c95-b8e1-1d962c51f2ae.png",
    actionImage: "/lovable-uploads/fbd8ec5e-9ada-4ef8-83c3-da5352cfacc6.png"
  },
  landscaper: {
    specialty: "landscaper",
    name: "Leo",
    emoji: "🌱",
    expertise: ["Garden Design", "Plant Care", "Lawn Maintenance", "Irrigation", "Outdoor Spaces"],
    personality: "friendly",
    greeting: "Hello! I'm Leo, your landscaping and gardening expert. I'm here to help with all your outdoor space questions. What can I assist with today?"
  },
  chef: {
    specialty: "chef",
    name: "Charlie",
    emoji: "👨‍🍳",
    expertise: ["Recipes", "Cooking Techniques", "Ingredient Substitutions", "Kitchen Equipment", "Meal Planning"],
    personality: "friendly",
    greeting: "Bonjour! I'm Chef Charlie, ready to help with all your culinary questions. What are we cooking up today?"
  },
  stylist: {
    specialty: "stylist",
    name: "Sam",
    emoji: "👚",
    expertise: ["Fashion Advice", "Outfit Coordination", "Shopping Tips", "Wardrobe Planning", "Style Trends"],
    personality: "friendly",
    greeting: "Hi! I'm Sam, your personal stylist. I can help you look and feel your best. What style questions do you have today?"
  },
  cleaning: {
    specialty: "cleaning",
    name: "Clara",
    emoji: "✨",
    expertise: ["Deep Cleaning", "Stain Removal", "Organization", "Cleaning Products", "Efficient Routines"],
    personality: "friendly",
    greeting: "Hello there! I'm Clara, your cleaning and organization expert. How can I help make your space sparkle today?"
  },
  gadget: {
    specialty: "gadget",
    name: "Gabe",
    emoji: "📱",
    expertise: ["Phone Troubleshooting", "Computer Problems", "Smart Home Devices", "Electronics Repair", "Tech Setup"],
    personality: "technical",
    greeting: "Hey! I'm Gabe, your tech and gadget specialist. What device are you having trouble with today?"
  }
};

// Create a prompt for a specialized agent
export const createSpecializedAgentPrompt = (
  specialty: AgentSpecialty,
  userMessage: string,
  conversationHistory: string
): OpenAIMessage[] => {
  const agent = specializedAgents[specialty];
  
  // First check if this is a picture sharing request
  if (isPictureRequest(userMessage)) {
    return [
      {
        role: "system",
        content: `You are ${agent.name}, a ${agent.specialty} assistant. The user is asking about sharing pictures.`
      },
      {
        role: "user",
        content: userMessage
      },
      {
        role: "assistant",
        content: "Yes, please! Sharing pictures would be extremely helpful for me to better diagnose your issue. You can upload images directly through this chat interface. Clear photos of the problem area will help me give you more accurate advice."
      }
    ];
  }

  // Create a system prompt based on the agent's specialty
  let systemPrompt = `You are ${agent.name}, an experienced ${agent.specialty} with 20+ years of hands-on experience. You're ${agent.personality === 'friendly' ? 'helpful, friendly, and conversational' : 'knowledgeable, precise, and informative'}, and you provide practical advice for ${agent.specialty}-related problems.`;
  
  // Add expertise information
  systemPrompt += ` Your areas of expertise include: ${agent.expertise.join(", ")}.`;
  
  // Add standard guidelines
  systemPrompt += ` Focus on DIY solutions when safe, but recommend professional help for complex or dangerous issues. Use plain language and avoid technical jargon unless explaining a concept. If you're unsure about something, be honest and err on the side of safety. If the user asks about sharing pictures or photos, enthusiastically encourage them to do so as visual information is extremely helpful for diagnosing issues. Mention that they can use the chat interface to upload and share images.`;

  return [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: `Conversation history: ${conversationHistory}\n\nUser's latest question: ${userMessage}`,
    },
  ];
};

// Function to get the appropriate agent based on the current page/route
export const getAgentByRoute = (route: string): AgentSpecialty => {
  if (route.includes("plumber")) return "plumber";
  if (route.includes("electrician")) return "electrician";
  if (route.includes("handyman")) return "handyman";
  if (route.includes("mechanic")) return "mechanic";
  if (route.includes("landscaper")) return "landscaper";
  if (route.includes("chef")) return "chef";
  if (route.includes("stylist")) return "stylist";
  if (route.includes("cleaning")) return "cleaning";
  if (route.includes("gadget")) return "gadget";
  
  // Check the searchParams in the route
  const urlParams = new URLSearchParams(route.split('?')[1]);
  const specialty = urlParams.get('specialty');
  if (specialty && Object.keys(specializedAgents).includes(specialty)) {
    return specialty as AgentSpecialty;
  }
  
  // Default to plumber if no matching route
  return "plumber";
};

// Function to generate response from the appropriate specialized agent
export const generateSpecializedAgentResponse = async (
  route: string,
  userMessage: string,
  conversationHistory: string,
  apiKey: string
): Promise<string> => {
  const specialty = getAgentByRoute(route);
  const agent = specializedAgents[specialty];
  
  console.log(`Generating response for ${agent.name} (${specialty}) with API key: ${apiKey ? "Key available" : "No key available"}`);
  
  try {
    // Generate prompt
    const prompt = createSpecializedAgentPrompt(specialty, userMessage, conversationHistory);
    
    // If this is a picture request, return the standard response
    if (isPictureRequest(userMessage)) {
      return "Yes, please! Sharing pictures would be extremely helpful for me to better diagnose your issue. You can upload images directly through this chat interface. Clear photos of the problem area will help me give you more accurate advice.";
    }
    
    // If API key is available, use OpenAI
    if (apiKey) {
      // Import the function dynamically to avoid circular dependencies
      const { generateChatGPTResponse } = await import("./openaiService");
      return await generateChatGPTResponse(prompt, apiKey);
    }
    
    // If no API key, return a fallback response and clearly indicate the issue
    console.warn(`No OpenAI API key available for ${specialty} response`);
    return `${agent.greeting} I'm here to help with all your ${agent.specialty}-related questions. However, I notice there's an issue with the OpenAI API key connection. Please update your API key in the settings menu (click the gear icon) for more personalized assistance.`;
  } catch (error) {
    console.error(`Error generating ${specialty} response:`, error);
    return `I apologize, but I'm having trouble connecting to my knowledge base right now. As your ${agent.specialty} assistant, I'll try to help with my built-in expertise instead. If this persists, please check your API key settings.`;
  }
};

// Helper function to analyze images for specialized agents
export const analyzeImageForSpecialty = async (
  imageDataUrl: string, 
  specialty: AgentSpecialty, 
  apiKey: string
): Promise<string> => {
  try {
    const agent = specializedAgents[specialty];
    
    console.log(`Analyzing image for ${specialty} with API key: ${apiKey ? "Key available" : "No key available"}`);
    
    // For demo purposes, if there's no OpenAI API key available, return a mock response
    if (!apiKey) {
      console.log(`No OpenAI API key found, using mock response for ${specialty}`);
      return mockImageAnalysis(specialty);
    }

    // Import the function to process the image
    const { getBase64EncodedImage } = await import("./imageAnalysisService");
    const base64Image = getBase64EncodedImage(imageDataUrl);
    
    const messages = [
      {
        role: "system",
        content: `You are ${agent.name}, an expert ${agent.specialty} with 20+ years of experience. Analyze the provided image and provide a detailed diagnosis related to ${agent.specialty} issues. Include possible causes, severity level (low, medium, high), estimated repair difficulty (easy, moderate, difficult), and whether this requires professional help or can be a DIY fix. Format your response in clear sections.`
      },
      {
        role: "user",
        content: [
          { type: "text", text: `Please analyze this photo related to my ${agent.specialty} issue and tell me what the problem is.` },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
        ]
      }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`API error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error(`Error analyzing image for ${specialty}:`, error);
    throw new Error("Failed to analyze the image. Please try again or check your API key settings.");
  }
};

// Mock image analysis function for when no API key is available
const mockImageAnalysis = (specialty: AgentSpecialty): string => {
  const agent = specializedAgents[specialty];
  
  const responses: Record<AgentSpecialty, string> = {
    plumber: `
DIAGNOSIS: Leaking Sink Faucet

POSSIBLE CAUSES:
• Worn out O-rings or washers inside the faucet
• Corroded valve seat
• Loose parts due to regular use
• Improper installation of faucet components

SEVERITY: Medium
This issue is causing water waste and could lead to higher water bills. If left unaddressed, it may cause water damage to the cabinet underneath or encourage mold growth.

REPAIR DIFFICULTY: Easy to Moderate
Most faucet repairs can be done by homeowners with basic tools.

RECOMMENDED ACTION:
This is a DIY-friendly repair. You'll need to:
1. Turn off the water supply valves under the sink
2. Disassemble the faucet handle
3. Replace worn O-rings, washers, or cartridge
4. Reassemble the faucet
`,
    electrician: `
DIAGNOSIS: Overloaded Circuit/Tripped Breaker

POSSIBLE CAUSES:
• Too many high-wattage devices on one circuit
• Damaged wiring or connections
• Short circuit in an appliance
• Possible wiring age deterioration

SEVERITY: Medium
This is causing power outages to part of your home but isn't an immediate fire hazard if the breaker is functioning properly.

REPAIR DIFFICULTY: Easy to Moderate
The immediate fix (resetting the breaker) is simple, but addressing the root cause may require more expertise.

RECOMMENDED ACTION:
1. Unplug several devices from the affected circuit
2. Locate your breaker panel and find the tripped switch (it will be in the middle position)
3. Push it fully to OFF position first, then firmly to ON
4. If it immediately trips again, DO NOT reset it - call a professional electrician
`,
    handyman: `
DIAGNOSIS: Damaged Drywall with Medium-Sized Hole

POSSIBLE CAUSES:
• Door handle impact
• Furniture movement
• Accidental damage
• Previous wall anchor removal

SEVERITY: Low
This is primarily a cosmetic issue but should be repaired to maintain wall integrity.

REPAIR DIFFICULTY: Easy
This is very DIY-friendly for anyone with basic tools.

RECOMMENDED ACTION:
1. Purchase a drywall patch kit from your local hardware store
2. Clean the hole area and remove loose material
3. Apply the self-adhesive patch over the hole
4. Apply joint compound over the patch in thin layers, allowing drying between coats
5. Sand smooth and paint to match existing wall
`,
    mechanic: `
DIAGNOSIS: Worn Brake Pads/Rotors

POSSIBLE CAUSES:
• Normal wear and tear from regular driving
• Aggressive driving/braking habits
• Poor quality brake components
• Extended time since last brake service

SEVERITY: High
Brake issues directly impact vehicle safety and should be addressed promptly.

REPAIR DIFFICULTY: Moderate
While DIY is possible for those with mechanical experience and proper tools, many prefer professional service for safety-critical systems.

RECOMMENDED ACTION:
Based on the visible wear pattern and rotor scoring, I recommend:
1. Replacement of the brake pads at minimum
2. Brake rotor resurfacing or replacement if thickness is below specifications
3. Inspection of brake calipers and brake fluid
4. Test drive after repair to ensure proper function
`,
    landscaper: `
DIAGNOSIS: Unhealthy Plant/Brown Leaf Edges

POSSIBLE CAUSES:
• Underwatering or inconsistent watering
• Excessive fertilizer (salt buildup)
• Low humidity
• Sunburn from direct intense light
• Root bound condition

SEVERITY: Medium
The plant is stressed but recoverable with proper care adjustments.

REPAIR DIFFICULTY: Easy
Simple care changes should resolve the issue.

RECOMMENDED ACTION:
1. Check soil moisture - if dry below 1 inch, water thoroughly
2. Move plant away from direct hot sunlight or heating vents
3. Increase humidity with a pebble tray or humidifier nearby
4. Flush the soil with water to remove any fertilizer buildup
5. Consider repotting if the plant is root bound
`,
    chef: `
ANALYSIS: Overcooked/Dry Baked Goods

POSSIBLE CAUSES:
• Oven temperature too high
• Extended baking time
• Insufficient fat in recipe
• Incorrect measurement of dry ingredients
• Oven hot spots

SEVERITY: Low
This is purely a taste/texture issue with no health concerns.

DIFFICULTY TO FIX: Easy
Simple adjustments to technique will resolve this.

RECOMMENDED ACTION:
1. Verify your oven temperature with an oven thermometer
2. Reduce baking time by 10-15% in future batches
3. Add a bit more fat (butter, oil) to your recipe
4. Try using parchment paper to prevent bottom burning
5. Rotate your baking sheet halfway through baking
`,
    stylist: `
ANALYSIS: Outfit Coordination Issue

OBSERVATIONS:
• Color palette lacks cohesion (too many competing colors)
• Proportions are slightly off-balance
• The pieces are individually nice but don't complement each other
• Accessories are competing rather than enhancing

SEVERITY: Low
This is purely aesthetic and easily adjustable.

DIFFICULTY TO FIX: Easy
Simple substitutions will create a more polished look.

RECOMMENDATIONS:
1. Limit your color palette to 2-3 complementary colors
2. Balance proportions by pairing the looser top with more fitted bottoms
3. Choose one statement piece and keep other elements more neutral
4. Simplify accessories - choose either the earrings OR the necklace, not both
5. Consider adding a third piece (like a structured jacket) to pull the look together
`,
    cleaning: `
DIAGNOSIS: Hard Water Stains/Mineral Buildup

POSSIBLE CAUSES:
• High mineral content in water supply
• Repeated water exposure without drying
• Lack of regular cleaning
• Absence of water softener in home

SEVERITY: Low to Medium
This is primarily cosmetic but can damage fixtures over time.

CLEANING DIFFICULTY: Easy to Moderate
Requires specific cleaning products but straightforward techniques.

RECOMMENDED ACTION:
1. Create a paste of white vinegar and baking soda
2. Apply to affected areas and let sit for 30 minutes
3. Scrub gently with an old toothbrush or non-abrasive sponge
4. Rinse thoroughly and dry completely
5. For prevention, consider a squeegee after showers/regular use of water spot preventers
`,
    gadget: `
DIAGNOSIS: Smartphone Screen Hardware Damage

POSSIBLE CAUSES:
• Physical impact/dropping the device
• Pressure damage (sitting on phone or heavy objects placed on it)
• Manufacturing defect (less likely based on pattern)
• Temperature extremes causing screen layer separation

SEVERITY: Medium to High
The damage affects usability and could worsen, potentially exposing internal components.

REPAIR DIFFICULTY: Moderate to Difficult
Screen replacement requires specialized tools and careful disassembly.

RECOMMENDED ACTION:
1. Back up all your data immediately
2. Consider professional repair service (approximate cost: $120-200 depending on model)
3. If attempting DIY repair, purchase a screen replacement kit specific to your exact model
4. Use a screen protector after repair to prevent future damage
5. If under warranty, check if it covers screen damage (though most don't cover accidental damage)
`
  };
  
  return responses[specialty] || `I've analyzed your image related to your ${agent.specialty} issue. For a more detailed analysis, please consider adding your OpenAI API key.`;
};
