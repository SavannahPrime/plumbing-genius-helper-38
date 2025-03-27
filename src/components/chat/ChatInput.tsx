
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
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="flex-shrink-0 rounded-full h-9 w-9"
            onClick={onMicClick}
            title="Speak with voice assistant"
          >
            <Mic className="w-4 h-4 text-gray-600" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="flex-shrink-0 rounded-full h-9 w-9"
          >
            <Paperclip className="w-4 h-4 text-gray-600" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your plumbing issue..."
            className="flex-grow text-sm rounded-full"
            disabled={isLoading}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && message.trim() && !isLoading) {
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="flex-shrink-0 bg-[#0A2540] rounded-full h-9 w-9 p-0"
            disabled={!message.trim() || isLoading}
            onClick={handleSendMessage}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
