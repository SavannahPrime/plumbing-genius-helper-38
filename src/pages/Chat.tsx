import { useState, useEffect } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { Message, ConversationContext, OpenAIMessage } from "@/types/chat";
import { generateNextResponse, identifyProblemType, handleEmergency } from "@/services/chatService";
import { generateChatGPTResponse, createPlumberPrompt, isPictureRequest } from "@/services/openaiService";
import { Button } from "@/components/ui/button";
import { Settings, X, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ELEVEN_LABS_AGENT_URL = "https://elevenlabs.io/app/talk-to?agent_id=lX8syHY754gA8SdjQU6n";

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
    if (isPictureRequest(userMessage)) {
      return "Yes, please! Sharing pictures would be extremely helpful for me to better diagnose your plumbing issue. You can upload images directly through this chat interface. Clear photos of the problem area will help me give you more accurate advice.";
    }

    if (isUsingChatGPT && apiKey) {
      setIsLoading(true);
      try {
        const conversationHistory = messages
          .map(msg => `${msg.isAi ? "Plumber" : "User"}: ${msg.text}`)
          .join("\n");
        
        const prompt = createPlumberPrompt(userMessage, conversationHistory);
        const response = await generateChatGPTResponse(prompt, apiKey);
        setIsLoading(false);
        return response;
      } catch (error) {
        console.error("Error with ChatGPT:", error);
        setIsLoading(false);
        setIsUsingChatGPT(false);
        toast({
          title: "ChatGPT Connection Error",
          description: "Falling back to built-in plumber assistant.",
          variant: "destructive"
        });
      }
    }

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
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, isAi: false }]);
    const userMessage = message;
    setMessage("");
    
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

  const handleMicClick = () => {
    window.open(ELEVEN_LABS_AGENT_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative">
      <ChatHeader>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleChatGPT}>
                {isUsingChatGPT ? "Use Built-in Assistant" : "Enable ChatGPT"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                Configure API Key
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ChatHeader>
      
      <main className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput 
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            onMicClick={handleMicClick}
          />
        </div>
      </main>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
  );
};

export default Chat;
