
import React from "react";
import { Home, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";

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
          <h1 className="font-space-grotesk font-bold text-[22px] text-primary">
            {agent.name}'s Visual Diagnosis
          </h1>
          <p className="font-dm-sans text-[16px] text-neutrals flex items-center">
            Upload a photo, and our AI {agent.specialty} will analyze the issue.
            <Badge variant="outline" className="ml-2 text-xs">by EveryFixAI</Badge>
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
