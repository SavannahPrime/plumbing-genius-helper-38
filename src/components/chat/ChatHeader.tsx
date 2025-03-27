
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Home, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  children?: React.ReactNode;
  specialty?: AgentSpecialty;
}

const ChatHeader = ({ children, specialty = "plumber" }: ChatHeaderProps) => {
  const agent = specializedAgents[specialty];
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Link to="/" className="p-2 hover:bg-neutrals-steel/30 rounded-full transition-colors">
          <Home className="w-5 h-5 text-primary" />
        </Link>
        
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-2">
              {agent.avatarImage ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={agent.avatarImage} alt={agent.name} />
                  <AvatarFallback>{agent.emoji}</AvatarFallback>
                </Avatar>
              ) : (
                <span className="text-lg">{agent.emoji}</span>
              )}
            </div>
            <h1 className="font-space-grotesk font-bold text-xl text-primary">
              {agent.name}'s Chat
            </h1>
            <Badge variant="outline" className="ml-2 text-xs">AI {agent.specialty}</Badge>
            
            <TooltipProvider>
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
            </TooltipProvider>
          </div>
          <p className="text-sm text-neutrals">
            Describe your {specialty} issue and get expert help
          </p>
        </div>
        
        {children}
      </div>
    </header>
  );
};

export default ChatHeader;
