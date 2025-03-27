
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

export interface EveryFixHeaderProps {
  specialty?: string;
}

const EveryFixHeader: React.FC<EveryFixHeaderProps> = ({ specialty }) => {
  const isMobile = useMobile();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-xl text-primary flex items-center">
            EveryFixAI
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {!isMobile && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/fixes">Fixes</Link>
            </Button>
          )}
          <Button size="sm" asChild>
            <Link to={specialty ? `/chat?specialty=${specialty}` : "/chat"}>Start Chat</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default EveryFixHeader;
