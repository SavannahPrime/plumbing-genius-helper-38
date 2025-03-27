
import { generateChatGPTResponse } from "./openaiService";
import { AgentSpecialty } from "./specializedAgentService";

// This function encodes the image as a base64 string that can be sent to OpenAI
export const getBase64EncodedImage = (dataUrl: string): string => {
  // Extract the base64 part from the data URL
  const base64Data = dataUrl.split(',')[1];
  return base64Data;
};

export const analyzeImage = async (imageDataUrl: string, specialty?: AgentSpecialty): Promise<string> => {
  try {
    // For demo purposes, if there's no OpenAI API key available, return a mock response
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      console.log("No OpenAI API key found, using mock response");
      return mockAnalyzeImage(imageDataUrl);
    }

    // If specialty is provided, use the specialized agent analysis
    if (specialty) {
      const { analyzeImageForSpecialty } = await import("./specializedAgentService");
      return await analyzeImageForSpecialty(imageDataUrl, specialty, apiKey);
    }

    const base64Image = getBase64EncodedImage(imageDataUrl);
    
    const messages = [
      {
        role: "system",
        content: "You are an expert plumber with 30+ years of experience. Analyze the provided image of a plumbing issue and provide a detailed diagnosis. Include possible causes, severity level (low, medium, high), estimated repair difficulty (easy, moderate, difficult), and whether this requires professional help or can be a DIY fix. Format your response in clear sections."
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Please analyze this photo of my plumbing issue and tell me what the problem is." },
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
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze the image. Please try again.");
  }
};

// Mock function for demonstration when no API key is available
const mockAnalyzeImage = (imageDataUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(`
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

PARTS NEEDED:
• Replacement O-rings or washers
• Possibly a new cartridge depending on faucet type
• Plumber's grease

TOOLS NEEDED:
• Adjustable wrench
• Screwdriver (Phillips and flathead)
• Allen wrench (if needed for your faucet type)

ESTIMATED COST: $10-$30 for parts

This is one of the most common household plumbing issues and fixing it yourself can save you $100-$200 in plumber fees.
      `);
    }, 2000);
  });
};
