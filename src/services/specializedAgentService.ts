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
  | "gadget"
  | "painter"
  | "pool"
  | "declutter"
  | "tax"
  | "psychiatrist"
  | "financial"
  | "wellness"
  | "legal"
  | "career"
  | "relationship"
  | "nutrition";

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
    greeting: "Bonjour! I'm Chef Charlie, ready to help with all your culinary questions. What are we cooking up today?",
    avatarImage: "/lovable-uploads/dbe43f04-5614-4eef-afdc-5014e05988f0.png",
    actionImage: "/lovable-uploads/dbe43f04-5614-4eef-afdc-5014e05988f0.png"
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
  },
  painter: {
    specialty: "painter",
    name: "Pablo",
    emoji: "🎨",
    expertise: ["Interior Painting", "Exterior Painting", "Surface Preparation", "Paint Selection", "Technique Advice"],
    personality: "friendly",
    greeting: "Hi there! I'm Pablo, your painting expert with decades of experience. Whether you're painting a room or the whole house, I'm here to help. What's your painting project?"
  },
  pool: {
    specialty: "pool",
    name: "Penny",
    emoji: "🏊",
    expertise: ["Pool Maintenance", "Water Chemistry", "Equipment Repair", "Cleaning Techniques", "Seasonal Care"],
    personality: "friendly",
    greeting: "Hello! I'm Penny, your pool maintenance specialist. I can help you keep your pool crystal clear and running smoothly. What pool issue can I help with today?"
  },
  declutter: {
    specialty: "declutter",
    name: "Marie",
    emoji: "✨",
    expertise: ["Space Organization", "Minimalist Living", "Storage Solutions", "Decluttering Methods", "Joy-Sparking Decisions"],
    personality: "friendly",
    greeting: "Hello! I'm Marie, your decluttering and organization consultant. I'm here to help you transform your space and bring more joy into your home. What area would you like to organize today?"
  },
  tax: {
    specialty: "tax",
    name: "Thomas",
    emoji: "⚖️",
    expertise: ["Tax Law", "Tax Planning", "IRS Audits", "Business Taxation", "Personal Tax Strategies"],
    personality: "professional",
    greeting: "Hello, I'm Thomas, your AI Tax Law Attorney with expertise in tax legislation and strategy. How can I assist with your tax concerns today?",
    avatarImage: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png"
  },
  psychiatrist: {
    specialty: "psychiatrist",
    name: "Dr. Patricia",
    emoji: "🧠",
    expertise: ["Mental Health", "Emotional Wellbeing", "Stress Management", "Anxiety & Depression", "Cognitive Behavioral Strategies"],
    personality: "professional",
    greeting: "Hello, I'm Dr. Patricia. I'm here to provide a confidential space where we can discuss your mental health concerns and explore strategies to support your emotional wellbeing. What brings you here today?",
    avatarImage: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png"
  },
  financial: {
    specialty: "financial",
    name: "Fiona",
    emoji: "💼",
    expertise: ["Investment Planning", "Retirement Strategy", "Debt Management", "Budgeting", "Financial Goals"],
    personality: "professional",
    greeting: "Hello, I'm Fiona, your AI Financial Advisor. I'm here to help you navigate your financial journey and create a plan tailored to your goals. What aspect of your finances would you like to discuss today?",
    avatarImage: "/lovable-uploads/1d4662ea-cc69-4e4f-9c18-078726ebe91e.png"
  },
  wellness: {
    specialty: "wellness",
    name: "Wendy",
    emoji: "❤️",
    expertise: ["Holistic Health", "Stress Reduction", "Mindfulness", "Work-Life Balance", "Healthy Habits"],
    personality: "friendly",
    greeting: "Hi there! I'm Wendy, your wellness coach. I'm passionate about helping you achieve balance and wellness in all areas of your life. What wellness goals are you working toward?",
    avatarImage: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png"
  },
  legal: {
    specialty: "legal",
    name: "Lawrence",
    emoji: "📄",
    expertise: ["General Legal Advice", "Contract Review", "Legal Rights", "Civil Matters", "Consumer Protection"],
    personality: "professional",
    greeting: "Hello, I'm Lawrence, your AI Legal Consultant. I can provide general guidance on a variety of legal matters. Please note that my advice is informational and not a substitute for a licensed attorney. How can I assist you today?",
    avatarImage: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png"
  },
  career: {
    specialty: "career",
    name: "Catherine",
    emoji: "💼",
    expertise: ["Career Planning", "Resume Building", "Interview Preparation", "Professional Development", "Job Search Strategies"],
    personality: "professional",
    greeting: "Hello, I'm Catherine, your Career Coach. I'm here to help you navigate your professional journey, whether you're starting out, changing paths, or advancing in your field. What career goals would you like to discuss today?",
    avatarImage: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png"
  },
  relationship: {
    specialty: "relationship",
    name: "Rachel",
    emoji: "💕",
    expertise: ["Communication Skills", "Conflict Resolution", "Building Connection", "Boundaries", "Relationship Dynamics"],
    personality: "friendly",
    greeting: "Hi there, I'm Rachel, your Relationship Coach. I'm here to help you navigate interpersonal relationships and build healthier connections. What relationship matter would you like guidance on today?",
    avatarImage: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png"
  },
  nutrition: {
    specialty: "nutrition",
    name: "Nathan",
    emoji: "🥗",
    expertise: ["Balanced Diet", "Meal Planning", "Nutritional Science", "Dietary Restrictions", "Healthy Eating Habits"],
    personality: "friendly",
    greeting: "Hello! I'm Nathan, your Nutrition Coach. I'm here to help you develop a healthier relationship with food and create eating habits that nourish your body. What nutrition goals are you working on?",
    avatarImage: "/lovable-uploads/1d4662ea-cc69-4e4f-9c18-078726ebe91e.png"
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
  if (route.includes("painter")) return "painter";
  if (route.includes("pool")) return "pool";
  if (route.includes("declutter")) return "declutter";
  
  if (route.includes("tax")) return "tax";
  if (route.includes("psychiatrist")) return "psychiatrist";
  if (route.includes("financial")) return "financial";
  if (route.includes("wellness")) return "wellness";
  if (route.includes("legal")) return "legal";
  if (route.includes("career")) return "career";
  if (route.includes("relationship")) return "relationship";
  if (route.includes("nutrition")) return "nutrition";
  
  const urlParams = new URLSearchParams(route.split('?')[1]);
  const specialty = urlParams.get('specialty');
  if (specialty && Object.keys(specializedAgents).includes(specialty)) {
    return specialty as AgentSpecialty;
  }
  
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
    // This should never happen for Chef since we have a dedicated key
    console.warn(`No OpenAI API key available for ${specialty} response`);
    return `${agent.greeting} I'm here to help with all your ${agent.specialty}-related questions. However, I notice there's an issue with the OpenAI API key connection. Please update your API key in the settings menu (click the gear icon) for more personalized assistance.`;
  } catch (error) {
    console.error(`Error generating ${specialty} response:`, error);
    if (specialty === "chef") {
      // Special fallback for chef that doesn't mention API key
      return `Bonjour! I'm Chef Charlie. I'm having trouble accessing my culinary knowledge right now. Please try again in a moment. What would you like to cook today?`;
    }
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
`,
    painter: `
DIAGNOSIS: Interior Painting

POSSIBLE CAUSES:
• Poor preparation of surfaces
• Incompatible paint colors
• Incorrect application techniques
• Insufficient drying time
• Poor ventilation

SEVERITY: Medium
Painting issues can affect the appearance and durability of your home.

REPAIR DIFFICULTY: Moderate
DIY painting can be challenging, but with proper tools and techniques, it can be done.

RECOMMENDED ACTION:
1. Clean and prepare surfaces thoroughly
2. Choose compatible paint colors
3. Apply paint in layers and allow adequate drying time
4. Use proper ventilation to prevent fumes
5. Test paint color on a small area before full application
`,
    pool: `
DIAGNOSIS: Pool Maintenance Issues

POSSIBLE CAUSES:
• Chemical imbalance
• Equipment malfunction
• Poor filtration
• Insufficient cleaning
• Overheating

SEVERITY: High
Pool issues can affect water quality and safety.

REPAIR DIFFICULTY: Moderate
Professional pool maintenance is often necessary to address these issues.

RECOMMENDED ACTION:
1. Test and adjust pool chemicals
2. Inspect and clean pool equipment
3. Check and replace filters
4. Clean pool surfaces
5. Monitor water temperature and adjust accordingly
`,
    declutter: `
DIAGNOSIS: Space Organization Issues

POSSIBLE CAUSES:
• Lack of storage solutions
• Misplaced items
• Cluttered areas
• Inefficient use of space

SEVERITY: Medium
Decluttering can improve living space and reduce stress.

REPAIR DIFFICULTY: Easy
Simple organization techniques can resolve most clutter issues.

RECOMMENDED ACTION:
1. Declutter and sort items
2. Use storage solutions like shelves, bins, and baskets
3. Organize items by category
4. Regularly clean and maintain storage areas
5. Consider hiring a professional organizer if needed
`,
    tax: `
DIAGNOSIS: Tax Law Issues

POSSIBLE CAUSES:
• Taxable income not reported
• Incorrect tax deductions
• Overpayment of taxes
• Tax evasion
• Compliance with tax laws

SEVERITY: Medium to High
Tax issues can impact financial stability and legal consequences.

REPAIR DIFFICULTY: Moderate to Difficult
Addressing tax issues may require professional assistance.

RECOMMENDED ACTION:
1. Review your tax returns and financial statements
2. Consult with a tax professional to review your tax situation
3. Adjust your tax strategy to minimize tax liability
4. Consider professional tax planning to optimize your tax situation
5. Stay informed about tax laws and regulations
`,
    psychiatrist: `
DIAGNOSIS: Mental Health Issues

POSSIBLE CAUSES:
• Anxiety and depression
• Stress management challenges
• Cognitive behavioral strategies
• Emotional well-being concerns

SEVERITY: Medium to High
Mental health issues can impact overall well-being and quality of life.

REPAIR DIFFICULTY: Moderate to Difficult
Addressing mental health issues may require professional assistance.

RECOMMENDED ACTION:
1. Seek therapy or counseling to address your mental health concerns
2. Practice stress management techniques to improve your emotional well-being
3. Consider medication if necessary to manage your symptoms
4. Stay informed about mental health resources and support
5. Develop a plan to address your mental health goals
`,
    financial: `
DIAGNOSIS: Financial Planning Issues

POSSIBLE CAUSES:
• Budgeting challenges
• Debt management issues
• Investment strategy concerns
• Retirement planning concerns
• Financial goals not aligned

SEVERITY: Medium to High
Financial planning issues can impact financial stability and long-term goals.

REPAIR DIFFICULTY: Moderate to Difficult
Addressing financial planning issues may require professional assistance.

RECOMMENDED ACTION:
1. Review your budget and financial statements
2. Consult with a financial advisor to review your financial situation
3. Adjust your financial strategy to optimize your financial situation
4. Consider professional financial planning to optimize your financial situation
5. Stay informed about financial resources and support
6. Develop a plan to address your financial goals
`,
    wellness: `
DIAGNOSIS: Holistic Health Issues

POSSIBLE CAUSES:
• Stress reduction challenges
• Mindfulness practices
• Work-life balance concerns
• Healthy habits not aligned

SEVERITY: Medium to High
Holistic health issues can impact overall well-being and quality of life.

REPAIR DIFFICULTY: Moderate to Difficult
Addressing holistic health issues may require professional assistance.

RECOMMENDED ACTION:
1. Practice stress reduction techniques to improve your emotional well-being
2. Engage in mindfulness practices to improve your mental health
3. Develop a work-life balance plan to improve your overall well-being
4. Consider healthy habits to improve your physical health
5. Stay informed about holistic health resources and support
6. Develop a plan to address your holistic health goals
`,
    legal: `
DIAGNOSIS: Legal Issues

POSSIBLE CAUSES:
• Contract review concerns
• Legal rights issues
• Civil matters concerns
• Consumer protection concerns

SEVERITY: Medium to High
Legal issues can impact legal rights and financial stability.

REPAIR DIFFICULTY: Moderate to Difficult
Addressing legal issues may require professional assistance.

RECOMMENDED ACTION:
1. Review your legal documents and contracts
2. Consult with a lawyer to review your legal situation
3. Adjust your legal strategy to optimize your legal situation
4. Consider professional legal advice to optimize your legal situation
5. Stay informed about legal resources and support
6. Develop a plan to address your legal goals
`,
    career: `
DIAGNOSIS: Career Planning Issues

POSSIBLE CAUSES:
• Career goals not aligned
• Resume building challenges
• Interview preparation concerns
• Professional development concerns
• Job search strategies concerns

SEVERITY: Medium to High
Career planning issues can impact career success and long-term goals.

REPAIR DIFFICULTY: Moderate to Difficult
Addressing career planning issues may require professional assistance.

RECOMMENDED ACTION:
1. Review your career goals and resume
2. Consult with a career coach to review your career situation
3. Adjust your career strategy to optimize your career situation
4. Consider professional career advice to optimize your career situation
5. Stay informed about career resources and support
6. Develop a plan to address your career goals
`,
    relationship: `
DIAGNOSIS: Relationship Issues

POSSIBLE CAUSES:
• Communication skills challenges
• Conflict resolution concerns
• Building connection issues
• Boundaries concerns
• Relationship dynamics concerns

SEVERITY: Medium to High
Relationship issues can impact personal well-being and quality of life.

REPAIR DIFFICULTY: Moderate to Difficult
Addressing relationship issues may require professional assistance.

RECOMMENDED ACTION:
1. Practice effective communication skills to improve your relationships
2. Seek therapy or counseling to address your relationship concerns
3. Develop conflict resolution strategies to improve your relationships
4. Consider building connection strategies to improve your relationships
5. Develop boundary strategies to improve your relationships
6. Stay informed about relationship resources and support
7. Develop a plan to address your relationship goals
`,
    nutrition: `
DIAGNOSIS: Nutrition Issues

POSSIBLE CAUSES:
• Balanced diet concerns
• Meal planning challenges
• Nutritional science concerns
• Dietary restrictions concerns
• Healthy eating habits not aligned

SEVERITY: Medium to High
Nutrition issues can impact overall health and well-being.

REPAIR DIFFICULTY: Moderate to Difficult
Addressing nutrition issues may require professional assistance.

RECOMMENDED ACTION:
1. Review your diet and meal plan
2. Consult with a nutritionist to review your nutritional situation
3. Adjust your diet and meal plan to optimize your nutritional situation
4. Consider professional nutrition advice to optimize your nutritional situation
5. Stay informed about nutrition resources and support
6. Develop a plan to address your nutrition goals
`
  };
  
  return responses[specialty] || `I've analyzed your image related to your ${agent.specialty} issue. For a more detailed analysis, please consider adding your OpenAI API key.`;
};
