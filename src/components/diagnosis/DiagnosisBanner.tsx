
import React from "react";
import { Lightbulb } from "lucide-react";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";

interface DiagnosisBannerProps {
  specialty?: AgentSpecialty;
}

const DiagnosisBanner = ({ specialty = "plumber" }: DiagnosisBannerProps) => {
  const agent = specializedAgents[specialty];
  
  return (
    <div className="bg-primary/5 rounded-2xl p-6 max-w-xs">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-space-grotesk font-semibold text-lg">Visual Analysis</h2>
      </div>
      <p className="text-neutrals text-sm mb-4">
        Take a clear photo of your {specialty} issue, and {agent.name} will provide a detailed diagnosis with possible solutions.
      </p>
      <div className="space-y-2">
        <div className="flex items-center text-xs text-neutrals">
          <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mr-2 text-accent">1</div>
          <p>Upload a clear photo</p>
        </div>
        <div className="flex items-center text-xs text-neutrals">
          <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mr-2 text-accent">2</div>
          <p>AI analyzes the issue</p>
        </div>
        <div className="flex items-center text-xs text-neutrals">
          <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mr-2 text-accent">3</div>
          <p>Get step-by-step solutions</p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisBanner;
