
import React, { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Mic, Image, Loader2, Paperclip, Smile } from "lucide-react";

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
    <div className="border-t bg-background/80 backdrop-blur-sm p-3 rounded-t-xl shadow-lg">
      <div className="container mx-auto flex items-center gap-2">
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleUploadClick}
            disabled={isLoading || isUploading}
            className="rounded-full transition-all"
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Paperclip className="h-5 w-5" />
            )}
          </Button>
          
          {handleMicClick && (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={handleMicClick}
              disabled={isLoading}
              className="rounded-full transition-all"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="relative flex-1">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="rounded-full bg-muted/50 border-muted pl-4 pr-12 py-6 focus-visible:ring-amber-400"
          />
          
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-amber-500 hover:bg-amber-600"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
