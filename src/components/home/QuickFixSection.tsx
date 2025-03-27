
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";

const QuickFixSection = () => {
  const { handleMicClick } = useElevenLabsAgent();

  return (
    <motion.section
      className="mt-20 p-6 bg-white rounded-2xl shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center font-space-grotesk">
        <Wrench className="w-5 h-5 mr-2 text-accent" />
        Fix it now
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/glossary" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <span className="text-xl">🛠️</span>
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">What's the problem?</h4>
            <p className="text-sm text-neutrals">Select from options above</p>
          </div>
        </Link>
        
        <ArrowRight className="w-5 h-5 text-neutrals-steel hidden md:block" />
        
        <Link to="/diagnosis" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <span className="text-xl">📷</span>
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Got a pic?</h4>
            <p className="text-sm text-neutrals">Upload for better results</p>
          </div>
        </Link>
        
        <ArrowRight className="w-5 h-5 text-neutrals-steel hidden md:block" />
        
        <div 
          className="w-full max-w-xs cursor-pointer"
          onClick={handleMicClick}
        >
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2 relative">
              <span className="text-xl">📞</span>
              <div className="absolute inset-0 rounded-full border-2 border-mint voice-ring"></div>
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Want voice assistance?</h4>
            <p className="text-sm text-neutrals">Talk to AI plumber</p>
          </div>
        </div>
        
        <ArrowRight className="w-5 h-5 text-neutrals-steel hidden md:block" />
        
        <Link to="/glossary" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <span className="text-xl">✅</span>
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Here's your fix!</h4>
            <p className="text-sm text-neutrals">Step-by-step solutions</p>
          </div>
        </Link>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Link to="/glossary">
          <Button className="bg-primary hover:bg-primary/90 rounded-xl">
            Get Started
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};

export default QuickFixSection;
