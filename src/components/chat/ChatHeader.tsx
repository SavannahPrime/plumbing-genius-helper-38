
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
  
  // Use new cartoon chef image for chef specialty
  const useCartoonChef = specialty === 'chef';
  const chefCartoonImage = "/lovable-uploads/80a47f92-8528-46f2-9f22-cdfb4785713c.png";

  return (
    <header className="bg-gradient-to-r from-amber-50/80 to-amber-100/80 border-b border-amber-200/50 py-4 px-4 sticky top-0 z-10 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <Home className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {useCartoonChef ? (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-300 shadow-md">
                <img 
                  src={chefCartoonImage} 
                  alt={agent.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : agent.avatarImage ? (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-300 shadow-md">
                <img 
                  src={agent.avatarImage} 
                  alt={agent.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                getBackgroundColorForSpecialty(specialty)
              }`}>
                <span className="text-lg text-white">{agent.emoji}</span>
              </div>
            )}
            <div>
              <h1 className="font-medium text-lg text-amber-900">{agent.name}</h1>
              <p className="text-xs text-amber-700">
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
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-100/60"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          {children}
        </div>
      </div>
    </header>
  );
};

// Helper function to get background color based on agent specialty
const getBackgroundColorForSpecialty = (specialty: AgentSpecialty): string => {
  switch (specialty) {
    case 'plumber':
      return 'bg-accent/80';
    case 'electrician':
      return 'bg-yellow-500';
    case 'gadget':
      return 'bg-purple-600';
    case 'chef':
      return 'bg-amber-600';
    case 'stylist':
      return 'bg-pink-500';
    case 'handyman':
      return 'bg-orange-500';
    case 'mechanic':
      return 'bg-blue-600';
    case 'landscaper':
      return 'bg-green-600';
    case 'cleaning':
      return 'bg-cyan-500';
    default:
      return 'bg-blue-500';
  }
};

export default ChatHeader;
