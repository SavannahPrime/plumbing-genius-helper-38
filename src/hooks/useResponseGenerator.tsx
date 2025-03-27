
import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { AgentSpecialty, generateSpecializedAgentResponse, specializedAgents } from "@/services/specializedAgentService";
import { identifyProblemType, generateNextResponse, handleEmergency } from "@/services/chatService";
import { isPictureRequest } from "@/services/openaiService";
import { toast } from "sonner";
import { ConversationContext } from "@/types/chat";

export const useResponseGenerator = (
  apiKey: string, 
  isUsingChatGPT: boolean,
  currentSpecialty: AgentSpecialty,
  context: ConversationContext,
  updateContextDetails: (newDetails: any) => void,
  updateContextWithAnswer: (userMessage: string) => number,
  setNewTopic: (topicName: string) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const checkForGuideRequest = (userMessage: string) => {
    if (userMessage.toLowerCase().includes("step by step") || 
        userMessage.toLowerCase().includes("guide") ||
        userMessage.toLowerCase().includes("how to fix") ||
        userMessage.toLowerCase().includes("fix it myself") ||
        userMessage.toLowerCase().includes("diy")) {
      
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
  };

  const handlePlumberSpecificLogic = async (userMessage: string) => {
    // Special case for plumbing domain
    if (userMessage.toLowerCase().includes("overflow") || 
        (userMessage.toLowerCase().includes("water") && userMessage.toLowerCase().includes("everywhere")) ||
        (userMessage.toLowerCase().includes("ceiling") && userMessage.toLowerCase().includes("drip"))) {
      return handleEmergency(updateContextDetails);
    }

    if (context.currentTopic) {
      const nextStage = updateContextWithAnswer(userMessage);
      
      return generateNextResponse(
        context.currentTopic, 
        context.subTopic, 
        nextStage, 
        context.previousAnswers,
        context.problemDetails,
        updateContextDetails
      );
    }

    const problemType = identifyProblemType(userMessage);
    setNewTopic(problemType);

    return generateNextResponse(
      problemType, 
      "", 
      0, 
      [], 
      {},
      updateContextDetails
    );
  };
  
  const checkProfessionQuestion = (userMessage: string, agent: any) => {
    if (userMessage.toLowerCase().includes("are you a") || 
        userMessage.toLowerCase().includes("are you an") ||
        userMessage.toLowerCase().includes("you are a")) {
      
      // Be very clear about who we are
      return `I'm ${agent.name}, a ${agent.specialty} expert. I specialize in ${agent.expertise.join(", ")}. How can I help you with your ${agent.specialty}-related questions today?`;
    }
    return null;
  };

  const generateResponse = async (userMessage: string) => {
    // First, check if this is a guide request
    checkForGuideRequest(userMessage);
    
    // Then check if this is a picture request
    if (isPictureRequest(userMessage)) {
      return "Yes, please! Sharing pictures would be extremely helpful for me to better diagnose your issue. You can upload images directly through this chat interface. Clear photos of the problem area will help me give you more accurate advice.";
    }

    console.log("Current agent specialty for response:", currentSpecialty);

    // For API key based response
    if (isUsingChatGPT && apiKey) {
      setIsLoading(true);
      try {
        // Define here to avoid circular dependencies
        const conversationHistory = [] // This will be passed from the parent component
          .map(msg => `${msg.isAi ? (specializedAgents[currentSpecialty].name) : "User"}: ${msg.text}`)
          .join("\n");
        
        console.log(`Using ${specializedAgents[currentSpecialty].name} (${currentSpecialty}) for response`);
        
        const response = await generateSpecializedAgentResponse(
          location.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""),
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

    // Special case for plumbing domain
    if (currentSpecialty === "plumber") {
      return handlePlumberSpecificLogic(userMessage);
    }
    
    // For all other specialties, use a simpler approach
    const agent = specializedAgents[currentSpecialty];
    console.log(`Using ${agent.name}, a ${agent.specialty} expert for response`);
    
    // Check if someone is asking if we're a different profession
    const professionResponse = checkProfessionQuestion(userMessage, agent);
    if (professionResponse) return professionResponse;
    
    return `${agent.greeting} I'm here to help with all your ${agent.specialty}-related questions. For more detailed assistance, consider adding your OpenAI API key in settings, or check our step-by-step guides by clicking the question mark icon above.`;
  };

  return {
    generateResponse,
    isLoading,
    setIsLoading
  };
};
