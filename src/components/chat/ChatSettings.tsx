
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const currentSpecialty = useAgentSpecialtyResolver();

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
    toast(isUsingChatGPT ? "Using Built-in Assistant" : "Using ChatGPT", {
      description: isUsingChatGPT 
        ? "Switched to built-in assistant" 
        : "Connected to ChatGPT for enhanced responses"
    });
  };

  const onSaveApiKey = (key: string) => {
    setApiKey(key);
    setOpenDialog(false);
    toast("API Key Updated", {
      description: "Your OpenAI API key has been updated successfully."
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
