
import React from "react";
import { Wrench, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  plumberPersonality: string;
  setPlumberPersonality: (personality: string) => void;
}

const Header = ({ plumberPersonality, setPlumberPersonality }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate("/")} className="mr-2">
            <Home className="w-5 h-5" />
          </Button>
          <Wrench className="w-7 h-7 text-accent" />
          <span className="font-space-grotesk font-bold text-xl text-primary">
            Home Fix Wizard
          </span>
          <Badge variant="outline" className="ml-2">by Connect.Software</Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-neutrals-steel/50 p-1 rounded-full">
            <button 
              onClick={() => setPlumberPersonality("classic")}
              className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all ${plumberPersonality === "classic" ? "bg-white shadow-sm" : "hover:bg-neutrals-steel"}`}
            >
              🧓 Classic
            </button>
            <button 
              onClick={() => setPlumberPersonality("ai")}
              className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all ${plumberPersonality === "ai" ? "bg-white shadow-sm" : "hover:bg-neutrals-steel"}`}
            >
              🤖 AI
            </button>
            <button 
              onClick={() => setPlumberPersonality("chill")}
              className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all ${plumberPersonality === "chill" ? "bg-white shadow-sm" : "hover:bg-neutrals-steel"}`}
            >
              😎 Chill
            </button>
          </div>
          
          <nav className="text-sm text-neutrals hidden md:flex items-center space-x-6">
            <Link to="/fixes" className="hover:text-primary transition-colors">Find a Pro</Link>
            <Link to="/step-by-step" className="hover:text-primary transition-colors">Guides</Link>
            <Link to="/chat?specialty=plumber" className="hover:text-primary transition-colors">Chat</Link>
            <Button size="sm" variant="outline" onClick={() => navigate("/")}>
              All Products
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
