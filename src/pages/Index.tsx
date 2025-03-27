
import React, { useState, useEffect } from "react";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";

// Import refactored components
import Header from "@/components/home/Header";
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
  const { handleMicClick } = useElevenLabsAgent();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-soft font-dm-sans text-primary">
      <Header 
        plumberPersonality={plumberPersonality}
        setPlumberPersonality={setPlumberPersonality}
      />

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
