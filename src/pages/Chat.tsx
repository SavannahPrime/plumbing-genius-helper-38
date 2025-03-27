import { useState, useEffect, useRef } from "react";
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
const ELEVEN_LABS_AGENT_ID = "lX8syHY754gA8SdjQU6n";

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
  const elevenLabsAgent = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Load the ElevenLabs script only once
    if (!window.elevenlabsAgentLoaded) {
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.onload = () => {
        window.elevenlabsAgentLoaded = true;
        console.log("ElevenLabs script loaded");
        
        // Create the agent element after script loads
        createAgentElement();
      };
      document.body.appendChild(script);
    } else {
      // If script is already loaded, create the agent element
      createAgentElement();
    }

    return () => {
      // Cleanup function
      if (elevenLabsAgent.current) {
        document.body.removeChild(elevenLabsAgent.current);
      }
    };
  }, []);

  const createAgentElement = () => {
    // Check if element already exists
    let existingAgent = document.querySelector(`elevenlabs-convai[agent-id="${ELEVEN_LABS_AGENT_ID}"]`);
    
    if (!existingAgent) {
      // Create the element
      const agentElement = document.createElement('elevenlabs-convai');
      agentElement.setAttribute('agent-id', ELEVEN_LABS_AGENT_ID);
      
      // Add styles to hide the element but keep it functional
      const style = document.createElement('style');
      style.textContent = `
        elevenlabs-convai {
          position: fixed;
          top: -1000px;
          left: -1000px;
          opacity: 0;
          pointer-events: auto;
          z-index: -1;
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(agentElement);
      elevenLabsAgent.current = agentElement;
      
      console.log("ElevenLabs agent element created");
    } else {
      elevenLabsAgent.current = existingAgent as HTMLElement;
    }
  };

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
    console.log("Mic button clicked");
    
    // Make sure agent element exists
    if (!elevenLabsAgent.current) {
      createAgentElement();
    }
    
    // Access the shadow DOM and click the button
    setTimeout(() => {
      if (elevenLabsAgent.current) {
        const shadowRoot = elevenLabsAgent.current.shadowRoot;
        console.log("Shadow root:", shadowRoot);
        
        if (shadowRoot) {
          const button = shadowRoot.querySelector('button');
          console.log("Button found:", button);
          
          if (button) {
            button.click();
            toast({
              title: "Voice Assistant",
              description: "Voice assistant activated. You can speak now.",
            });
          } else {
            // If button not found initially, try again after a short delay
            setTimeout(() => {
              const retryButton = elevenLabsAgent.current?.shadowRoot?.querySelector('button');
              console.log("Retry button:", retryButton);
              
              if (retryButton) {
                retryButton.click();
                toast({
                  title: "Voice Assistant",
                  description: "Voice assistant activated. You can speak now.",
                });
              } else {
                toast({
                  title: "Voice Assistant Issue",
                  description: "Could not activate voice assistant. Please refresh the page and try again.",
                  variant: "destructive"
                });
              }
            }, 1000);
          }
        }
      }
    }, 300); // Increased timeout to ensure the shadow DOM is fully loaded
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
