
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Image as ImageIcon, Zap, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const ElectricianGenius = () => {
  const navigate = useNavigate();

  const handleChatStart = () => {
    navigate("/chat");
  };

  const handlePhotoClick = () => {
    navigate("/diagnosis");
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-dm-sans text-primary">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/")} className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Zap className="w-7 h-7 text-yellow-500" />
            <span className="font-space-grotesk font-bold text-xl text-primary">
              Electrician Genius
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-700">Safety First</p>
            <p className="text-sm text-red-600">Always turn off power at the breaker before attempting any electrical work. If you feel unsafe at any point, call a licensed professional.</p>
          </div>
        </div>
        
        <section className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 mb-12">
          <motion.div 
            className="md:col-span-4 flex justify-center relative order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-yellow-200 flex items-center justify-center">
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
                  <div className="text-8xl">⚡</div>
                </motion.div>
              </div>
              
              <div className="absolute -top-12 -right-16 md:-right-24 bg-white rounded-2xl p-3 shadow-card after:content-[''] after:absolute after:bottom-0 after:left-6 after:w-4 after:h-4 after:bg-white after:rotate-45 after:-mb-2">
                <p className="text-sm md:text-base font-medium">Let's fix that electrical issue safely!</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-8 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">Your AI-Powered Electrical Assistant</h2>
            
            <p className="mb-6 text-lg text-primary/80">
              Flip the switch on electrical problems — safely and smart.
              <Badge className="ml-2 bg-yellow-100 text-primary">💡 Safety first, always.</Badge>
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <p className="font-medium mb-3">Safety Checklist</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full border border-yellow-500 flex items-center justify-center text-xs font-bold">1</div>
                  <p>Turn off power at breaker panel</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full border border-yellow-500 flex items-center justify-center text-xs font-bold">2</div>
                  <p>Test to confirm power is off</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full border border-yellow-500 flex items-center justify-center text-xs font-bold">3</div>
                  <p>If unsure at any point, call a professional</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-yellow-600 hover:bg-yellow-700 shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={handleChatStart}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chat
              </Button>
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-yellow-800 hover:bg-yellow-900 text-white shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={handlePhotoClick}
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Photo Diagnosis
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm font-medium mb-2">Try asking:</p>
              <div className="space-y-2">
                <div className="bg-yellow-50 p-2 rounded">
                  "Why do my lights flicker when I microwave something?"
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  "This switch shocks me sometimes"
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  "What is this wire in my wall?"
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default ElectricianGenius;
