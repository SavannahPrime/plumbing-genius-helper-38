
import React, { useRef } from "react";
import { Camera, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";

interface UploadCardProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCameraClick: () => void;
  handleUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  specialty?: AgentSpecialty;
}

const UploadCard = ({ 
  handleFileChange, 
  handleCameraClick, 
  handleUploadClick, 
  fileInputRef,
  specialty = "plumber"
}: UploadCardProps) => {
  const agent = specializedAgents[specialty];
  
  return (
    <Card className="p-8 text-center w-full md:w-2/3 shadow-card rounded-2xl">
      <div className="border-2 border-dashed border-neutrals-steel rounded-xl p-8 cursor-pointer hover:border-secondary transition-colors">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
            <Camera className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="font-space-grotesk font-semibold text-xl text-primary">
            Tap to Upload a Photo
          </h3>
          <p className="text-neutrals max-w-sm">
            Take a clear photo of the {specialty} issue, and {agent.name} will analyze it for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-xs mx-auto">
            <Button className="bg-primary hover:bg-primary/90 w-full rounded-xl" onClick={handleCameraClick}>
              <Camera className="w-5 h-5 mr-2" />
              Take Photo
            </Button>
            <Button variant="outline" className="w-full rounded-xl" onClick={handleUploadClick}>
              <Upload className="w-5 h-5 mr-2" />
              Upload Image
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UploadCard;
