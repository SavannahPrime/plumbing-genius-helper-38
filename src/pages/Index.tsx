
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/home/Header";
import QuickFixSection from "@/components/home/QuickFixSection";
import ProblemCategories from "@/components/home/ProblemCategories";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import OtherProducts from "@/components/home/OtherProducts";
import Footer from "@/components/home/Footer";
import ModernHero from "@/components/home/ModernHero";
import EveryFixHowItWorks from "@/components/home/EveryFixHowItWorks";

const Index = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [plumberPersonality, setPlumberPersonality] = useState("classic");
  
  const typingTexts = [
    "Get step-by-step guidance to fix anything plumbing-related.",
    "No more searching through confusing forum posts for answers.",
    "Your AI plumbing expert is available 24/7.",
    "Upload photos for visual diagnosis of your plumbing issue."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [typingTexts.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        plumberPersonality={plumberPersonality}
        setPlumberPersonality={setPlumberPersonality}
      />
      
      <main>
        <ModernHero 
          title="Plumber's Helper"
          specialty="plumber"
          emoji="🔧"
          description="Say goodbye to plumbers, googling, and guessing."
          placeholderText="What's leaking, squeaking, or not working?"
        />

        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <EveryFixHowItWorks specialty="plumber" />
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <QuickFixSection />
          </div>
        </section>

        <section className="py-10 bg-gray-100">
          <div className="container mx-auto px-4">
            <ProblemCategories />
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <LiveFixFeed specialty="plumber" />
          </div>
        </section>

        <section className="py-10 bg-gray-100">
          <div className="container mx-auto px-4">
            <OtherProducts />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
