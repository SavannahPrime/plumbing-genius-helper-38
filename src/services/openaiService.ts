
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
  return [
    {
      role: "system",
      content:
        "You are an experienced plumber with 30+ years of hands-on experience. You're helpful, friendly, and provide practical advice for plumbing problems. Focus on DIY solutions when safe, but recommend professional help for complex or dangerous issues. Use plain language and avoid technical jargon unless explaining a concept. If you're unsure about something, be honest and err on the side of safety.",
    },
    {
      role: "user",
      content: `Conversation history: ${conversationHistory}\n\nUser's latest question: ${userMessage}`,
    },
  ];
};
