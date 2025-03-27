
import React, { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Mic, Image, Loader2 } from "lucide-react";

interface ChatInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  isUploading: boolean;
  handleMicClick?: () => void;
}

const ChatInput = ({
  message,
  setMessage,
  handleSendMessage,
  isLoading,
  fileInputRef,
  handleImageUpload,
  isUploading,
  handleMicClick
}: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="container mx-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={handleUploadClick}
          disabled={isLoading || isUploading}
        >
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Image className="h-5 w-5" />
          )}
        </Button>
        
        {handleMicClick && (
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={handleMicClick}
            disabled={isLoading}
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
        
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-1"
        />
        
        <Button
          onClick={handleSendMessage}
          disabled={!message.trim() || isLoading}
          size="icon"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
