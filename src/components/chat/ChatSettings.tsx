
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, Mic, RefreshCw, AlertTriangle } from "lucide-react";
import { useElevenLabsWidget } from "@/hooks/useElevenLabsWidget";
import { useState, useEffect } from "react";
import ApiKeyDialog from "./ApiKeyDialog";
import { toast } from "sonner";
import { useAgentSpecialtyResolver } from "@/hooks/useAgentSpecialtyResolver";

export interface ChatSettingsProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  isUsingChatGPT: boolean;
  setIsUsingChatGPT: (value: boolean) => void;
}

const ChatSettings = ({ apiKey, setApiKey, isUsingChatGPT, setIsUsingChatGPT }: ChatSettingsProps) => {
  const { agentId, isInitialized, resetWidget } = useElevenLabsWidget();
  const [openDialog, setOpenDialog] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [hasCustomElementRegistered, setHasCustomElementRegistered] = useState(false);
  const currentSpecialty = useAgentSpecialtyResolver();

  useEffect(() => {
    // Check if the custom element is registered
    const customElementRegistered = !!customElements.get("elevenlabs-convai");
    setHasCustomElementRegistered(customElementRegistered);
    
    // Set up a periodic check for the custom element registration
    const checkInterval = setInterval(() => {
      const nowRegistered = !!customElements.get("elevenlabs-convai");
      if (nowRegistered !== hasCustomElementRegistered) {
        setHasCustomElementRegistered(nowRegistered);
      }
    }, 2000);
    
    return () => clearInterval(checkInterval);
  }, [hasCustomElementRegistered]);

  const onOpenApiKeyDialog = () => {
    setTempApiKey(apiKey);
    setOpenDialog(true);
  };

  const onToggleChatGPT = () => {
    // If it's chef specialty, always force using ChatGPT
    if (currentSpecialty === "chef") {
      if (!isUsingChatGPT) {
        setIsUsingChatGPT(true);
        toast("Using ChatGPT", {
          description: "Chef's Assistant works best with ChatGPT enabled"
        });
      }
      return;
    }
    
    setIsUsingChatGPT(!isUsingChatGPT);
  };

  const onSaveApiKey = (key: string) => {
    setApiKey(key);
    setOpenDialog(false);
    toast("API Key Updated", {
      description: "Your OpenAI API key has been updated successfully."
    });
  };
  
  const handleResetVoiceAssistant = () => {
    resetWidget();
    toast("Voice Assistant Reset", {
      description: "Voice assistant has been reset. Please try again."
    });
  };
  
  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="settings-button">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {currentSpecialty !== "chef" && (
            <DropdownMenuItem onClick={onToggleChatGPT}>
              {isUsingChatGPT ? "Use Built-in Assistant" : "Enable ChatGPT"}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={onOpenApiKeyDialog}>
            Update API Key
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-xs text-muted-foreground flex items-center gap-1"
            onClick={handleResetVoiceAssistant}
          >
            <Mic className="h-3 w-3" /> 
            {isInitialized ? (
              <>
                Agent ID: {agentId.substring(0, 8)}...
                <RefreshCw className="h-3 w-3 ml-auto" />
              </>
            ) : (
              <>
                Voice Assistant {hasCustomElementRegistered ? "Initializing" : "Not Available"}
                <AlertTriangle className="h-3 w-3 ml-auto text-amber-500" />
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ApiKeyDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        apiKey={tempApiKey}
        onApiKeyChange={setTempApiKey}
        onSave={onSaveApiKey}
      />
    </div>
  );
};

export default ChatSettings;
