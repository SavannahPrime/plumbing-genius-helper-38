
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, HelpCircle } from "lucide-react";
import { specializedAgents, AgentSpecialty } from "@/services/specializedAgentService";

interface ChatHeaderProps {
  specialty: AgentSpecialty;
  children?: React.ReactNode;
}

const ChatHeader = ({ specialty, children }: ChatHeaderProps) => {
  const navigate = useNavigate();
  const agent = specializedAgents[specialty];

  return (
    <header className="bg-white border-b py-4 px-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <Home className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              specialty === 'plumber' ? 'bg-accent/80' : 
              specialty === 'electrician' ? 'bg-yellow-500' :
              specialty === 'gadget' ? 'bg-purple-600' :
              specialty === 'chef' ? 'bg-amber-600' :
              specialty === 'stylist' ? 'bg-pink-500' :
              'bg-blue-500'
            }`}>
              <span className="text-lg text-white">{agent.emoji}</span>
            </div>
            <div>
              <h1 className="font-medium text-lg">{agent.name}</h1>
              <p className="text-xs text-muted-foreground">
                {agent.specialty.charAt(0).toUpperCase() + agent.specialty.slice(1)} Expert
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/step-by-step')}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          {children}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
