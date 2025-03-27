
import React from "react";
import { Home, Mic, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DiagnosisHeaderProps {
  specialty?: AgentSpecialty;
}

const DiagnosisHeader = ({ specialty = "plumber" }: DiagnosisHeaderProps) => {
  const { handleMicClick } = useElevenLabsAgent();
  const agent = specializedAgents[specialty];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Link to="/" className="p-2 hover:bg-neutrals-steel/30 rounded-full transition-colors">
          <Home className="w-6 h-6 text-primary" />
        </Link>
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <h1 className="font-space-grotesk font-bold text-[22px] text-primary">
              {agent.name}'s Visual Diagnosis
            </h1>
            <Badge variant="outline" className="ml-2 text-xs">by EveryFixAI</Badge>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/step-by-step" className="ml-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <span className="sr-only">Get Step-by-Step Help</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Step-by-Step Guides</p>
              </TooltipContent>
            </Tooltip>
            
            {agent.avatarImage ? (
              <Avatar className="ml-2 h-8 w-8">
                <AvatarImage src={agent.avatarImage} alt={agent.name} />
                <AvatarFallback>{agent.emoji}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="ml-2 h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <span>{agent.emoji}</span>
              </div>
            )}
          </div>
          <p className="font-dm-sans text-[16px] text-neutrals flex items-center">
            Upload a photo, and our AI {agent.specialty} will analyze the issue.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-white hover:bg-secondary/10" 
          onClick={handleMicClick}
        >
          <Mic className="w-5 h-5 text-secondary" />
        </Button>
      </div>
    </header>
  );
};

export default DiagnosisHeader;
