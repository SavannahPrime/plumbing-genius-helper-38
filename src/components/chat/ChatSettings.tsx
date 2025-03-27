
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, Mic, RefreshCw } from "lucide-react";
import { useElevenLabsWidget } from "@/hooks/useElevenLabsWidget";

export interface ChatSettingsProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  isUsingChatGPT: boolean;
  setIsUsingChatGPT: (value: boolean) => void;
}

const ChatSettings = ({ apiKey, setApiKey, isUsingChatGPT, setIsUsingChatGPT }: ChatSettingsProps) => {
  const { agentId, isInitialized, resetWidget } = useElevenLabsWidget();

  const onOpenApiKeyDialog = () => {
    // Implementation would go here
    console.log("Open API key dialog");
  };

  const onToggleChatGPT = () => {
    setIsUsingChatGPT(!isUsingChatGPT);
  };
  
  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onToggleChatGPT}>
            {isUsingChatGPT ? "Use Built-in Assistant" : "Enable ChatGPT"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenApiKeyDialog}>
            Update API Key
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-xs text-muted-foreground flex items-center gap-1"
            disabled={!isInitialized}
            onClick={resetWidget}
          >
            <Mic className="h-3 w-3" /> Agent ID: {agentId}
            {isInitialized && (
              <RefreshCw className="h-3 w-3 ml-auto" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatSettings;
