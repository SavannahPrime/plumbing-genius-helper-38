
import React, { useState } from "react";
import { Camera, Zap, Wrench, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayerDialog from "@/components/shared/VideoPlayerDialog";

interface EveryFixHowItWorksProps {
  specialty?: string;
}

const EveryFixHowItWorks = ({ specialty = "general" }: EveryFixHowItWorksProps) => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  
  // This would be replaced with actual video data in a real implementation
  const getVideoDetails = () => {
    switch(specialty) {
      case "plumber":
        return {
          title: "Plumber's Helper in Action",
          description: "See how our AI plumbing assistant helps diagnose and fix common plumbing issues.",
          videoId: "dQw4w9WgXcQ" // Placeholder - replace with actual YouTube ID
        };
      case "handyman":
        return {
          title: "Handyman Hero in Action",
          description: "Watch how our AI handyman assistant guides you through home repairs step by step.",
          videoId: "dQw4w9WgXcQ" // Placeholder - replace with actual YouTube ID
        };
      case "gadget":
        return {
          title: "Gadget Fix Genie in Action",
          description: "See how our AI tech assistant helps troubleshoot and fix common device problems.",
          videoId: "dQw4w9WgXcQ" // Placeholder - replace with actual YouTube ID
        };
      // Add cases for other specialties
      default:
        return {
          title: "AI Assistant in Action",
          description: "Watch how our AI assistants help solve common household problems.",
          videoId: "dQw4w9WgXcQ" // Placeholder - replace with actual YouTube ID
        };
    }
  };
  
  const videoDetails = getVideoDetails();

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-left">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Camera className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">Choose Your Assistant</h3>
          <p className="text-gray-700 text-center">Select the AI assistant that matches your home challenge</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">Describe or Show</h3>
          <p className="text-gray-700 text-center">Chat or upload a photo of your problem</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center">Get Expert Guidance</h3>
          <p className="text-gray-700 text-center">Follow personalized instructions to solve your issue</p>
        </div>
      </div>
      
      {specialty !== "general" && (
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setVideoDialogOpen(true)}
          >
            <Play className="h-4 w-4" />
            Watch {specialty === "plumber" ? "Plumber's Helper" : 
                  specialty === "handyman" ? "Handyman Hero" :
                  specialty === "electrician" ? "Electrician Genius" :
                  specialty === "gadget" ? "Gadget Fix Genie" :
                  specialty === "chef" ? "Chef's Assistant" :
                  specialty === "cleaning" ? "Cleaning Genius" :
                  specialty === "mechanic" ? "Mechanic Assistant" :
                  specialty === "landscaper" ? "Landscaper Buddy" :
                  specialty === "stylist" ? "Stylist's Helper" :
                  "Assistant"} in Action
          </Button>
        </div>
      )}
      
      <VideoPlayerDialog
        isOpen={videoDialogOpen}
        onClose={() => setVideoDialogOpen(false)}
        title={videoDetails.title}
        description={videoDetails.description}
        videoId={videoDetails.videoId}
      />
    </div>
  );
};

export default EveryFixHowItWorks;
