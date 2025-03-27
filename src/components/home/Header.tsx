
import React from "react";
import { Wrench, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";

interface HeaderProps {
  plumberPersonality: string;
  setPlumberPersonality: (personality: string) => void;
}

const Header = ({ plumberPersonality, setPlumberPersonality }: HeaderProps) => {
  const { handleMicClick } = useElevenLabsAgent();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wrench className="w-7 h-7 text-accent" />
          <span className="font-space-grotesk font-bold text-xl text-primary">
            Plumber's Helper
          </span>
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
          
          <button 
            onClick={handleMicClick}
            className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary/20 transition-colors"
            aria-label="Voice assistant"
          >
            <Mic className="w-4 h-4 text-secondary" />
          </button>
          
          <nav className="text-sm text-neutrals hidden md:block">
            <Link to="/fixes" className="mr-4 hover:underline">Find a Real Plumber</Link>
            <Link to="/fixes" className="hover:underline">Privacy</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
