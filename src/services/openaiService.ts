
import { OpenAIMessage } from "@/types/chat";

const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export const generateChatGPTResponse = async (
  messages: OpenAIMessage[],
  apiKey: string
) => {
  try {
    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
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
    console.error("Error calling OpenAI:", error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Let me try to help with my built-in expertise instead.";
  }
};

export const createPlumberPrompt = (userMessage: string, conversationHistory: string): OpenAIMessage[] => {
  // First check if this is a picture sharing request
  if (isPictureRequest(userMessage)) {
    return [
      {
        role: "system",
        content: "You are a plumbing assistant. The user is asking about sharing pictures."
      },
      {
        role: "user",
        content: userMessage
      },
      {
        role: "assistant",
        content: "Yes, please! Sharing pictures would be extremely helpful for me to better diagnose your plumbing issue. You can upload images directly through this chat interface. Clear photos of the problem area will help me give you more accurate advice."
      }
    ];
  }

  return [
    {
      role: "system",
      content:
        "You are an experienced plumber with 30+ years of hands-on experience. You're helpful, friendly, and provide practical advice for plumbing problems. Focus on DIY solutions when safe, but recommend professional help for complex or dangerous issues. Use plain language and avoid technical jargon unless explaining a concept. If you're unsure about something, be honest and err on the side of safety. If the user asks about sharing pictures or photos, enthusiastically encourage them to do so as visual information is extremely helpful for diagnosing plumbing issues. Mention that they can use the chat interface to upload and share images.",
    },
    {
      role: "user",
      content: `Conversation history: ${conversationHistory}\n\nUser's latest question: ${userMessage}`,
    },
  ];
};

// Helper function to detect picture sharing requests
export const isPictureRequest = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  return lowerMessage.includes("picture") || 
         lowerMessage.includes("photo") || 
         lowerMessage.includes("image") || 
         lowerMessage.includes("pic") ||
         lowerMessage.includes("share") ||
         lowerMessage.includes("upload") ||
         lowerMessage.includes("send") && (
           lowerMessage.includes("picture") || 
           lowerMessage.includes("photo") || 
           lowerMessage.includes("image") || 
           lowerMessage.includes("pic")
         );
};
