
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export interface EveryFixHeaderProps {
  specialty?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  colorClass?: string;
}

const EveryFixHeader: React.FC<EveryFixHeaderProps> = ({ 
  specialty,
  title,
  subtitle,
  icon,
  colorClass
}) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {icon && colorClass && (
              <div className={colorClass}>
                {icon}
              </div>
            )}
            <Link to="/" className="font-bold text-xl text-primary flex items-center">
              {title ? title : "Connect.Software"}
            </Link>
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {!isMobile && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/agents">Agents</Link>
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
