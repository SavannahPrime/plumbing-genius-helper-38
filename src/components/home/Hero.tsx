
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface HeroProps {
  currentTextIndex: number;
  typingTexts: string[];
}

const Hero = ({ currentTextIndex, typingTexts }: HeroProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 mb-12">
      <motion.div 
        className="md:col-span-4 flex justify-center relative order-2 md:order-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-secondary/10 flex items-center justify-center">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <img 
                src="/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png" 
                alt="Friendly Plumber" 
                className="w-40 md:w-56 h-auto"
              />
            </motion.div>
          </div>
          
          <div className="absolute -top-12 -right-16 md:-right-24 bg-white rounded-2xl p-3 shadow-card after:content-[''] after:absolute after:bottom-0 after:left-6 after:w-4 after:h-4 after:bg-white after:rotate-45 after:-mb-2">
            <p className="text-sm md:text-base font-medium">Let's fix that leaky mess!</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="md:col-span-8 order-1 md:order-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">Your AI-Powered Plumbing Assistant</h2>
        
        <motion.p
          key={currentTextIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="mb-6 text-lg text-primary/80 font-medium typing-animation"
        >
          {typingTexts[currentTextIndex]}
        </motion.p>
        
        <p className="mb-6 text-lg text-primary/80">
          Snap a pic. Talk to your AI plumber. Get unstuck, fast.
          <Badge variant="outline" className="ml-2 bg-mint/20 text-primary">💡 No appointments. Just answers.</Badge>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link to="/chat">
            <Button 
              className="w-full sm:w-auto text-lg py-6 px-8 bg-primary hover:bg-primary/90 shadow-md active:scale-[0.98] transition-all rounded-xl"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Chat
            </Button>
          </Link>
          <Link to="/diagnosis">
            <Button 
              className="w-full sm:w-auto text-lg py-6 px-8 bg-secondary hover:bg-secondary/90 text-white shadow-md active:scale-[0.98] transition-all rounded-xl"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Visual Diagnosis
            </Button>
          </Link>
        </div>
        <div className="text-sm text-neutrals">Or explore quick help topics below 👇</div>
      </motion.div>
    </section>
  );
};

export default Hero;
