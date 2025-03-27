
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import refactored components
import Hero from "@/components/home/Hero";
import ProblemCategories from "@/components/home/ProblemCategories";
import QuickFixSection from "@/components/home/QuickFixSection";
import OtherProducts from "@/components/home/OtherProducts";
import Footer from "@/components/home/Footer";

const typingTexts = [
  "Fixing toilets...",
  "Unclogging showers...",
  "Diagnosing drips...",
  "Solving leaks...",
  "Repairing faucets..."
];

const Index = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [plumberPersonality, setPlumberPersonality] = useState("classic");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-soft font-dm-sans text-primary">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/")} className="mr-2">
              <Home className="w-5 h-5" />
            </Button>
            <Wrench className="w-7 h-7 text-accent" />
            <span className="font-space-grotesk font-bold text-xl text-primary">
              Plumber's Helper
            </span>
            <Badge variant="outline" className="ml-2">by EveryFixAI</Badge>
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Hero 
          currentTextIndex={currentTextIndex}
          typingTexts={typingTexts}
        />
        
        <ProblemCategories />
        
        <QuickFixSection />
        
        <OtherProducts />

        <Footer />
      </main>
    </div>
  );
};

export default Index;
