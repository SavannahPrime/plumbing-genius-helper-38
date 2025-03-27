
export interface Message {
  text: string;
  isAi: boolean;
}

export interface ConversationContext {
  currentTopic: string;
  subTopic: string;
  stage: number;
  lastQuestion: string;
  previousAnswers: string[];
  solutionProgress: number;
  problemDetails: {
    location?: string;
    severity?: string;
    duration?: string;
    attempted?: string[];
    tools?: string[];
    cause?: string;
    condition?: string;
    hasShutoff?: boolean;
    recentWork?: string;
  };
}

export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
