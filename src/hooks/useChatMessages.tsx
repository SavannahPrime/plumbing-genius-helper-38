import { useState } from "react";
import { Message, ConversationContext } from "@/types/chat";
import { generateNextResponse, identifyProblemType, handleEmergency } from "@/services/chatService";
import { generateChatGPTResponse, createAgentPrompt, isPictureRequest } from "@/services/openaiService";
import { AgentSpecialty, generateSpecializedAgentResponse, specializedAgents } from "@/services/specializedAgentService";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const useChatMessages = (apiKey: string, isUsingChatGPT: boolean) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [context, setContext] = useState<ConversationContext>({
    currentTopic: "",
    subTopic: "",
    stage: 0,
    lastQuestion: "",
    previousAnswers: [],
    solutionProgress: 0,
    problemDetails: {}
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Check for the specialty in the URL first, then fall back to determining from path
  const getCurrentAgentSpecialty = (): AgentSpecialty => {
    // First check if specialty was explicitly passed in URL
    const specialtyParam = searchParams.get('specialty') as AgentSpecialty;
    if (specialtyParam && Object.keys(specializedAgents).includes(specialtyParam)) {
      return specialtyParam;
    }
    
    // Otherwise determine from path
    const path = location.pathname;
    
    if (path.includes("electrician")) return "electrician";
    if (path.includes("handyman")) return "handyman";
    if (path.includes("mechanic")) return "mechanic";
    if (path.includes("landscaper")) return "landscaper";
    if (path.includes("chef")) return "chef";
    if (path.includes("stylist")) return "stylist";
    if (path.includes("cleaning")) return "cleaning";
    if (path.includes("gadget")) return "gadget";
    
    // Default to plumber
    return "plumber";
  };

  const updateContextDetails = (newDetails: any) => {
    setContext(prev => ({
      ...prev,
      problemDetails: { ...prev.problemDetails, ...newDetails },
      solutionProgress: Math.min((prev.stage / 40) * 100, 100)
    }));
  };

  const generateResponse = async (userMessage: string) => {
    // Check if this is a request to see step-by-step guides
    if (userMessage.toLowerCase().includes("step by step") || 
        userMessage.toLowerCase().includes("guide") ||
        userMessage.toLowerCase().includes("how to fix") ||
        userMessage.toLowerCase().includes("fix it myself") ||
        userMessage.toLowerCase().includes("diy")) {
      
      // Send a message suggesting to check the step-by-step guide
      setTimeout(() => {
        toast("Tip: Visit our Step-by-Step guides for detailed DIY instructions", {
          description: "Click the question mark icon in the header",
          action: {
            label: "View Guides",
            onClick: () => navigate("/step-by-step")
          }
        });
      }, 1000);
    }
    
    // First, check if this is a picture request
    if (isPictureRequest(userMessage)) {
      return "Yes, please! Sharing pictures would be extremely helpful for me to better diagnose your issue. You can upload images directly through this chat interface. Clear photos of the problem area will help me give you more accurate advice.";
    }

    const currentSpecialty = getCurrentAgentSpecialty();

    // If using ChatGPT and we have an API key, generate a response
    if (isUsingChatGPT && apiKey) {
      setIsLoading(true);
      try {
        const conversationHistory = messages
          .map(msg => `${msg.isAi ? (specializedAgents[currentSpecialty].name) : "User"}: ${msg.text}`)
          .join("\n");
        
        // Use the specialized agent response generator
        const response = await generateSpecializedAgentResponse(
          location.pathname,
          userMessage,
          conversationHistory,
          apiKey
        );
        
        setIsLoading(false);
        return response;
      } catch (error) {
        console.error("Error with ChatGPT:", error);
        setIsLoading(false);
        return null; // We'll handle this in the handleSendMessage function
      }
    }

    // For plumber route, maintain backward compatibility with existing chat logic
    if (currentSpecialty === "plumber") {
      if (userMessage.toLowerCase().includes("overflow") || 
          (userMessage.toLowerCase().includes("water") && userMessage.toLowerCase().includes("everywhere")) ||
          (userMessage.toLowerCase().includes("ceiling") && userMessage.toLowerCase().includes("drip"))) {
        return handleEmergency(setContext);
      }

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
          context.problemDetails,
          updateContextDetails
        );
      }

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

      return generateNextResponse(
        problemType, 
        "", 
        0, 
        [], 
        {},
        updateContextDetails
      );
    }
    
    // For other specialties, provide fallback responses
    const agent = specializedAgents[currentSpecialty];
    return `${agent.greeting} I'm here to help with all your ${agent.specialty}-related questions. For more detailed assistance, consider adding your OpenAI API key in settings, or check our step-by-step guides by clicking the question mark icon above.`;
  };

  return {
    message,
    setMessage,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    generatePlumberResponse: generateResponse,
    context,
    currentAgentSpecialty: getCurrentAgentSpecialty()
  };
};
