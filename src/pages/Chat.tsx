
import { useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { Message, ConversationContext } from "@/types/chat";
import { generateNextResponse, identifyProblemType, handleEmergency } from "@/services/chatService";
import { generateChatGPTResponse, createPlumberPrompt } from "@/services/openaiService";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your experienced plumbing assistant with over 30 years of hands-on experience. Whether you're dealing with a leaky faucet, clogged drain, or water pressure issues, I'm here to help. What plumbing problem can I assist you with today?",
      isAi: true
    }
  ]);
  const [context, setContext] = useState<ConversationContext>({
    currentTopic: "",
    subTopic: "",
    stage: 0,
    lastQuestion: "",
    previousAnswers: [],
    solutionProgress: 0,
    problemDetails: {}
  });
  const [isUsingChatGPT, setIsUsingChatGPT] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    const savedKey = localStorage.getItem("openai_api_key");
    return savedKey || "";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("openai_api_key", key);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved successfully."
    });
    setOpenDialog(false);
  };

  const updateContextDetails = (newDetails: any) => {
    setContext(prev => ({
      ...prev,
      problemDetails: { ...prev.problemDetails, ...newDetails },
      solutionProgress: Math.min((prev.stage / 40) * 100, 100)
    }));
  };

  const generatePlumberResponse = async (userMessage: string) => {
    // If using ChatGPT and API key is available, use OpenAI
    if (isUsingChatGPT && apiKey) {
      setIsLoading(true);
      try {
        // Create a string representation of conversation history
        const conversationHistory = messages
          .map(msg => `${msg.isAi ? "Plumber" : "User"}: ${msg.text}`)
          .join("\n");
        
        // Get response from ChatGPT
        const prompt = createPlumberPrompt(userMessage, conversationHistory);
        const response = await generateChatGPTResponse(prompt, apiKey);
        setIsLoading(false);
        return response;
      } catch (error) {
        console.error("Error with ChatGPT:", error);
        setIsLoading(false);
        setIsUsingChatGPT(false); // Fall back to built-in logic
        toast({
          title: "ChatGPT Connection Error",
          description: "Falling back to built-in plumber assistant.",
          variant: "destructive"
        });
        // Continue with built-in logic below
      }
    }

    // Built-in logic (existing code)
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for emergency situations
    if (lowerMessage.includes("overflow") || 
        (lowerMessage.includes("water") && lowerMessage.includes("everywhere")) ||
        (lowerMessage.includes("ceiling") && lowerMessage.includes("drip"))) {
      return handleEmergency(setContext);
    }

    // Continue existing conversation
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

    // Start new conversation
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
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, isAi: false }]);
    const userMessage = message;
    setMessage("");
    
    // Show loading indicator
    setIsLoading(true);
    
    try {
      const aiResponse = await generatePlumberResponse(userMessage);
      
      setMessages(prev => [...prev, {
        text: aiResponse,
        isAi: true
      }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, I'm having trouble processing your request. Please try again.",
        isAi: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChatGPT = () => {
    if (!isUsingChatGPT && !apiKey) {
      setOpenDialog(true);
      return;
    }
    setIsUsingChatGPT(!isUsingChatGPT);
    toast({
      title: isUsingChatGPT ? "Using Built-in Assistant" : "Using ChatGPT",
      description: isUsingChatGPT 
        ? "Switched to built-in plumber assistant" 
        : "Connected to ChatGPT for enhanced responses"
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <ChatHeader>
        <div className="flex items-center ml-auto">
          <div className="flex items-center mr-4">
            <span className={`mr-2 text-sm ${isUsingChatGPT ? "text-green-600 font-bold" : "text-gray-500"}`}>
              {isUsingChatGPT ? "ChatGPT Active" : "Built-in Assistant"}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleChatGPT}
              className={isUsingChatGPT ? "bg-green-100 hover:bg-green-200" : ""}
            >
              {isUsingChatGPT ? "Disable ChatGPT" : "Enable ChatGPT"}
            </Button>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ChatGPT Settings</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <label className="block text-sm font-medium mb-2">
                  OpenAI API Key
                </label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="mb-4"
                />
                <Button onClick={() => saveApiKey(apiKey)}>Save Key</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </ChatHeader>
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput 
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default Chat;
