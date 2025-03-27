
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Image as ImageIcon, Leaf, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const LandscaperBuddy = () => {
  const navigate = useNavigate();

  const handleChatStart = () => {
    navigate("/chat");
  };

  const handlePhotoClick = () => {
    navigate("/diagnosis");
  };
  
  const handlePlanCalendar = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-green-50 font-dm-sans text-primary">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/")} className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Leaf className="w-7 h-7 text-green-500" />
            <span className="font-space-grotesk font-bold text-xl text-primary">
              Landscaper Buddy
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 mb-12">
          <motion.div 
            className="md:col-span-4 flex justify-center relative order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-green-200 flex items-center justify-center">
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
                  <div className="text-8xl">🌿</div>
                </motion.div>
              </div>
              
              <div className="absolute -top-12 -right-16 md:-right-24 bg-white rounded-2xl p-3 shadow-card after:content-[''] after:absolute after:bottom-0 after:left-6 after:w-4 after:h-4 after:bg-white after:rotate-45 after:-mb-2">
                <p className="text-sm md:text-base font-medium">Let's get your garden thriving!</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-8 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">Your AI-Powered Garden Assistant</h2>
            
            <p className="mb-6 text-lg text-primary/80">
              Your AI yard partner — from soil to sprinkler.
              <Badge className="ml-2 bg-green-100 text-primary">💡 Plants. Soil. Solutions.</Badge>
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-5 h-5 text-green-600" />
                <p className="font-medium">Seasonal Planning</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">Get personalized recommendations for what to plant this season based on your location and climate</p>
              <Button variant="outline" className="w-full border-green-200 hover:bg-green-50" onClick={handlePlanCalendar}>
                Create Seasonal Plant Calendar
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-green-600 hover:bg-green-700 shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={handleChatStart}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chat
              </Button>
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-green-800 hover:bg-green-900 text-white shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={handlePhotoClick}
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Plant Diagnosis
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm font-medium mb-2">Try asking:</p>
              <div className="space-y-2">
                <div className="bg-green-50 p-2 rounded">
                  "Why are these leaves browning?"
                </div>
                <div className="bg-green-50 p-2 rounded">
                  "How do I edge my lawn like a pro?"
                </div>
                <div className="bg-green-50 p-2 rounded">
                  "Which plants survive in dry shade?"
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default LandscaperBuddy;
