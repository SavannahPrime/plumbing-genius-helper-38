
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Paperclip, Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  isLoading?: boolean;
  onMicClick?: () => void;
}

const ChatInput = ({ 
  message, 
  setMessage, 
  handleSendMessage, 
  isLoading = false,
  onMicClick 
}: ChatInputProps) => {
  
  const handleMicButtonClick = (e: React.MouseEvent) => {
    console.log("Microphone button clicked in ChatInput");
    e.preventDefault();
    e.stopPropagation();
    if (onMicClick) {
      onMicClick();
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim() && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3">
      <div className="container mx-auto max-w-3xl">
        {/* Voice button now placed above the input field */}
        <div className="flex justify-center mb-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-12 w-12 bg-blue-50 hover:bg-blue-100 shadow-md"
            onClick={handleMicButtonClick}
            title="Speak with voice assistant"
            type="button"
            tabIndex={0}
            aria-label="Activate voice assistant"
          >
            <Mic className="w-5 h-5 text-blue-600" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="flex-shrink-0 rounded-full h-9 w-9"
            type="button"
          >
            <Paperclip className="w-4 h-4 text-gray-600" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your plumbing issue..."
            className="flex-grow text-sm rounded-full"
            disabled={isLoading}
            onKeyPress={handleKeyPress}
          />
          <Button 
            className="flex-shrink-0 bg-[#0A2540] rounded-full h-9 w-9 p-0"
            disabled={!message.trim() || isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            type="button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
