
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EveryFixHeaderProps {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
}

const EveryFixHeader = ({ title, icon, colorClass }: EveryFixHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate("/")} className="mr-2" aria-label="Home">
            <Home className="w-5 h-5" />
          </Button>
          <div className={colorClass}>
            {icon}
          </div>
          <span className="font-space-grotesk font-bold text-xl text-primary">
            {title}
          </span>
          <Badge variant="outline" className="ml-2">by EveryFixAI</Badge>
        </div>
      </div>
    </header>
  );
};

export default EveryFixHeader;
