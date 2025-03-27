
import { useState } from "react";
import { ConversationContext } from "@/types/chat";

export const useConversationContext = () => {
  const [context, setContext] = useState<ConversationContext>({
    currentTopic: "",
    subTopic: "",
    stage: 0,
    lastQuestion: "",
    previousAnswers: [],
    solutionProgress: 0,
    problemDetails: {}
  });
  
  const updateContextDetails = (newDetails: any) => {
    setContext(prev => ({
      ...prev,
      problemDetails: { ...prev.problemDetails, ...newDetails },
      solutionProgress: Math.min((prev.stage / 40) * 100, 100)
    }));
  };
  
  const updateContextWithAnswer = (userMessage: string) => {
    if (context.currentTopic) {
      const newAnswers = [...context.previousAnswers, userMessage];
      const nextStage = context.stage + 1;
      
      setContext(prev => ({
        ...prev,
        stage: nextStage,
        previousAnswers: newAnswers
      }));
      
      return nextStage;
    }
    return 0;
  };
  
  const setNewTopic = (topicName: string) => {
    setContext({
      currentTopic: topicName,
      subTopic: "",
      stage: 0,
      lastQuestion: "",
      previousAnswers: [],
      solutionProgress: 0,
      problemDetails: {}
    });
  };
  
  return {
    context,
    setContext,
    updateContextDetails,
    updateContextWithAnswer,
    setNewTopic
  };
};
