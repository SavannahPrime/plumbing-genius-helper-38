
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Image as ImageIcon, Wrench, Camera, Hammer, Drill, PaintBucket, Ruler, Shield, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import { QuickActionCategory } from "@/components/shared/QuickActionCategories";
import EveryFixHeader from "@/components/shared/EveryFixHeader";

const HandymanHero = () => {
  const navigate = useNavigate();

  const handleChatStart = () => {
    navigate("/chat");
  };

  const handlePhotoClick = () => {
    navigate("/diagnosis");
  };

  const handleToolPhotoClick = () => {
    navigate("/diagnosis");
  };

  const handymanCategories: QuickActionCategory[] = [
    { 
      icon: <Drill className="w-5 h-5" />, 
      name: "Wall Repairs", 
      hoverText: "Holes, cracks, dents, and painting touch-ups",
      emoji: "🧱",
      path: "/glossary"
    },
    { 
      icon: <Wrench className="w-5 h-5" />, 
      name: "Furniture", 
      hoverText: "Assembly, repairs, and adjustments",
      emoji: "🪑",
      path: "/glossary"
    },
    { 
      icon: <PaintBucket className="w-5 h-5" />, 
      name: "Painting", 
      hoverText: "Preparation, techniques, and finishing",
      emoji: "🎨",
      path: "/glossary"
    },
    { 
      icon: <Hammer className="w-5 h-5" />, 
      name: "Mounting", 
      hoverText: "TVs, shelves, artwork, and heavy items",
      emoji: "📺",
      path: "/glossary"
    },
    { 
      icon: <Wrench className="w-5 h-5" />, 
      name: "Door Issues", 
      hoverText: "Squeaky hinges, sticking doors, knob problems",
      emoji: "🚪",
      path: "/glossary"
    },
    { 
      icon: <Ruler className="w-5 h-5" />, 
      name: "Flooring", 
      hoverText: "Small repairs for wood, tile, laminate, and carpet",
      emoji: "🪵",
      path: "/glossary"
    },
    { 
      icon: <Stethoscope className="w-5 h-5" />, 
      name: "Diagnostics", 
      hoverText: "Identify issues with furniture and fixtures",
      emoji: "🔍",
      path: "/glossary"
    },
    { 
      icon: <Shield className="w-5 h-5" />, 
      name: "Safety", 
      hoverText: "Childproofing, securing furniture, safety checks",
      emoji: "🛡️",
      path: "/glossary"
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 font-dm-sans text-primary">
      <EveryFixHeader 
        title="Handyman Hero" 
        icon={<Hammer className="h-6 w-6 text-white" />} 
        colorClass="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center" 
      />

      <main className="container mx-auto px-4 py-12">
        <section className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 mb-12">
          <motion.div 
            className="md:col-span-4 flex justify-center relative order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-orange-200 flex items-center justify-center">
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
                  <div className="text-8xl">🔧</div>
                </motion.div>
              </div>
              
              <div className="absolute -top-12 -right-16 md:-right-24 bg-white rounded-2xl p-3 shadow-card after:content-[''] after:absolute after:bottom-0 after:left-6 after:w-4 after:h-4 after:bg-white after:rotate-45 after:-mb-2">
                <p className="text-sm md:text-base font-medium">I'll help you fix that!</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-8 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">Your AI-Powered DIY Assistant</h2>
            
            <p className="mb-6 text-lg text-primary/80">
              Fix furniture, patch walls, hang shelves — no handyman required.
              <Badge variant="outline" className="ml-2 bg-orange-100 text-primary">💡 No tools? No problem.</Badge>
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <div className="rounded-full bg-orange-100 p-2">
                  <Camera className="w-4 h-4 text-orange-600" />
                </div>
                <p className="font-medium">Tool Matcher</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">Upload a photo of a tool or hardware and I'll identify it for you</p>
              <Button variant="outline" className="w-full" onClick={handleToolPhotoClick}>
                Upload a Tool Photo
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-orange-600 hover:bg-orange-700 shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={handleChatStart}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chat
              </Button>
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-orange-800 hover:bg-orange-900 text-white shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={handlePhotoClick}
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Photo Diagnosis
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm font-medium mb-2">Try asking:</p>
              <div className="space-y-2">
                <div className="bg-orange-50 p-2 rounded">
                  "How do I hang a shelf without drilling into wires?"
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  "This table leg is wobbly"
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  "My door handle just spins"
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <QuickActionCategories 
          title="🔨 DIY Solutions" 
          categories={handymanCategories} 
        />
      </main>
    </div>
  );
};

export default HandymanHero;
