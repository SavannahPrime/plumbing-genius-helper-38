
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, HelpCircle, MoreVertical } from "lucide-react";
import { specializedAgents, AgentSpecialty } from "@/services/specializedAgentService";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
    <header className="bg-gradient-to-r from-amber-50/90 to-amber-100/90 border-b border-amber-200/50 py-3 px-4 sticky top-0 z-10 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
            <Home className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
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
              } border-2 border-amber-300 shadow-md`}>
                <span className="text-lg text-white">{agent.emoji}</span>
              </div>
            )}
            <div>
              <div className="flex items-center">
                <h1 className="font-semibold text-lg text-amber-900">{agent.name}</h1>
                <div className="ml-2 px-1.5 py-0.5 rounded-full bg-green-100 border border-green-200">
                  <span className="text-[10px] text-green-700 font-medium">Online</span>
                </div>
              </div>
              <p className="text-xs text-amber-700">
                {agent.specialty.charAt(0).toUpperCase() + agent.specialty.slice(1)} Expert
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/step-by-step')}
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-100/60 rounded-full"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/account')}>
                My Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/subscriptions')}>
                Manage Subscriptions
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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
    case 'tax':
      return 'bg-indigo-600';
    case 'psychiatrist':
      return 'bg-teal-600';
    case 'financial':
      return 'bg-emerald-600';
    case 'wellness':
      return 'bg-rose-600';
    case 'legal':
      return 'bg-stone-600';
    case 'career':
      return 'bg-cyan-600';
    case 'relationship':
      return 'bg-pink-500';
    case 'nutrition':
      return 'bg-green-500';
    default:
      return 'bg-blue-500';
  }
};

export default ChatHeader;
