
import { useState, useRef } from "react";
import { Message } from "@/types/chat";
import { toast } from "sonner";
import { analyzeImageForSpecialty } from "@/services/specializedAgentService";
import { AgentSpecialty } from "@/services/specializedAgentService";

export const useImageUpload = (
  apiKey: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  currentAgentSpecialty: AgentSpecialty
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast("Please upload an image file");
      return;
    }

    setIsUploading(true);

    try {
      // Create a message to show the image is being uploaded
      const uploadMessage: Message = {
        id: Date.now().toString(),
        text: "I'm uploading an image for analysis...",
        isAi: false,
        timestamp: new Date(),
        imageUrl: URL.createObjectURL(file)
      };

      setMessages(prev => [...prev, uploadMessage]);

      // Read the file as data URL
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (!e.target?.result) return;
        
        const imageDataUrl = e.target.result as string;
        
        try {
          // Add a loading message
          const loadingMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Analyzing your image...",
            isAi: true,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, loadingMessage]);
          
          // Analyze the image
          const analysis = await analyzeImageForSpecialty(
            imageDataUrl,
            currentAgentSpecialty,
            apiKey
          );
          
          // Replace the loading message with the analysis
          setMessages(prev => prev.map(msg => 
            msg.id === loadingMessage.id 
              ? { ...msg, text: analysis } 
              : msg
          ));
        } catch (error) {
          console.error("Error analyzing image:", error);
          
          // Add an error message
          const errorMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "I'm sorry, I couldn't analyze your image. Please try again or upload a clearer image.",
            isAi: true,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, errorMessage]);
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
      toast("Error processing image. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return {
    fileInputRef,
    isUploading,
    handleImageUpload
  };
};
