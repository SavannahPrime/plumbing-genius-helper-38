
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Wrench, Search, MessageSquare, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

// Import refactored components
import Header from "@/components/home/Header";
import ProblemCategories from "@/components/home/ProblemCategories";
import QuickFixSection from "@/components/home/QuickFixSection";
import OtherProducts from "@/components/home/OtherProducts";
import Footer from "@/components/home/Footer";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";

const typingTexts = [
  "Fixing toilets...",
  "Unclogging showers...",
  "Diagnosing drips...",
  "Solving leaks...",
  "Repairing faucets..."
];

const commonIssues = [
  "Why is my toilet leaking from the base?",
  "What do I do if my shower won't get hot?",
  "How to fix a dripping faucet?",
  "Why is my sink draining slowly?",
  "What does this gurgling sound mean?",
];

const Index = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [plumberPersonality, setPlumberPersonality] = useState("classic");
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate("/chat", { state: { initialQuery: searchInput } });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    navigate("/chat", { state: { initialQuery: suggestion } });
  };

  return (
    <div className="min-h-screen bg-soft font-dm-sans text-primary">
      <Header plumberPersonality={plumberPersonality} setPlumberPersonality={setPlumberPersonality} />

      <main className="container mx-auto px-4">
        {/* Hero Section - New Design */}
        <section className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Side - Emotional Hook */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk leading-tight mb-4">
                Fix Anything at Home — <span className="text-accent">Instantly</span> with AI 🛠️💬
              </h1>
              <h2 className="text-xl md:text-2xl text-primary/80 mb-6">
                Say goodbye to plumbers, googling, and guessing.
              </h2>
              <p className="text-lg mb-8 text-primary/70">
                One tap. Snap a pic. Your home fix guide, instantly.
              </p>

              {/* Search/Prompt Field */}
              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="What's leaking, squeaking, or not working?"
                    className="pl-10 pr-4 py-6 text-lg rounded-xl shadow-md"
                    value={searchInput}
                    onChange={handleSearchChange}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Auto-suggest dropdown */}
                {showSuggestions && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-200">
                    {commonIssues
                      .filter(issue => issue.toLowerCase().includes(searchInput.toLowerCase()))
                      .slice(0, 5)
                      .map((suggestion, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-b-0"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                  </div>
                )}
              </form>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/chat")} 
                  className="text-lg py-6 px-6"
                  size="lg"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Try the Fix Assistant
                </Button>
                <Button 
                  variant="outline" 
                  className="text-lg py-6 px-6" 
                  size="lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch It Work
                </Button>
              </div>
            </motion.div>

            {/* Right Side - Interactive Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
                <div className="bg-primary text-white p-4 flex items-center">
                  <Wrench className="h-5 w-5 mr-2" />
                  <span className="font-medium">Plumber's Helper Chat</span>
                </div>
                <div className="p-4 h-[400px] overflow-y-auto">
                  {/* Simulated chat conversation */}
                  <div className="flex mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
                    <div className="bg-gray-100 rounded-xl p-3 max-w-[80%]">
                      <p>My kitchen sink is clogged and draining slowly. What should I do?</p>
                    </div>
                  </div>

                  <div className="flex mb-4 justify-end">
                    <div className="bg-primary/10 rounded-xl p-3 max-w-[80%]">
                      <p className="font-medium mb-2">Let's fix that clogged sink! 👨‍🔧</p>
                      <p className="mb-2">Here's a simple step-by-step solution:</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Try pouring boiling water down the drain</li>
                        <li>Use a mixture of baking soda and vinegar:
                          <ul className="list-disc pl-5 mt-1">
                            <li>½ cup baking soda</li>
                            <li>½ cup vinegar</li>
                          </ul>
                        </li>
                        <li>Wait 30 minutes, then flush with hot water</li>
                      </ol>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
                    <div className="bg-gray-100 rounded-xl p-3 max-w-[80%]">
                      <p>What if that doesn't work?</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-primary/10 rounded-xl p-3 max-w-[80%]">
                      <p>If that doesn't work, you can try a plunger or plumber's snake.</p>
                      <p className="mt-2">Need more help? I can walk you through using a drain snake or recommend a reliable plumber in your area.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/20 rounded-full z-[-1]"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-[-1]"></div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks specialty="plumber" />

        {/* Live Fix Feed - Now we're using the LiveFixFeed component */}
        <LiveFixFeed specialty="plumber" />
        
        {/* Common Issues Categories */}
        <ProblemCategories />
        
        {/* Quick Fix Section */}
        <QuickFixSection />
        
        {/* Other Products */}
        <OtherProducts />

        <Footer />
      </main>
    </div>
  );
};

export default Index;
