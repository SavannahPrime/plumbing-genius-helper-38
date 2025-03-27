
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface ChatSettingsProps {
  onOpenApiKeyDialog: () => void;
  onToggleChatGPT: () => void;
  isUsingChatGPT: boolean;
}

const ChatSettings = ({ onOpenApiKeyDialog, onToggleChatGPT, isUsingChatGPT }: ChatSettingsProps) => {
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
            Configure API Key
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatSettings;
