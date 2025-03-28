
import React, { useState } from "react";
import { Camera, Zap, Wrench, Play, Smartphone, RefreshCw, HelpCircle } from "lucide-react";
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

  // Define specialty-specific content for the steps
  const getStepsContent = () => {
    if (specialty === "gadget") {
      return [
        {
          icon: <Smartphone className="h-8 w-8 text-primary" />,
          title: "Select Your Device",
          description: "Choose the type of tech device you're having trouble with"
        },
        {
          icon: <HelpCircle className="h-8 w-8 text-primary" />,
          title: "Describe the Issue",
          description: "Tell us what's not working or share a photo of the problem"
        },
        {
          icon: <RefreshCw className="h-8 w-8 text-primary" />,
          title: "Follow Troubleshooting Steps",
          description: "Get step-by-step solutions to get your device working again"
        }
      ];
    }

    // Default steps for other specialties
    return [
      {
        icon: <Camera className="h-8 w-8 text-primary" />,
        title: "Choose Your Assistant",
        description: "Select the AI assistant that matches your home challenge"
      },
      {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Describe or Show",
        description: "Chat or upload a photo of your problem"
      },
      {
        icon: <Wrench className="h-8 w-8 text-primary" />,
        title: "Get Expert Guidance",
        description: "Follow personalized instructions to solve your issue"
      }
    ];
  };

  const steps = getStepsContent();

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-left">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                {step.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
            <p className="text-gray-700 text-center">{step.description}</p>
          </div>
        ))}
      </div>
      
      {specialty !== "general" && (
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setVideoDialogOpen(true)}
          >
            <Play className="h-4 w-4" />
            Watch in Action
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
