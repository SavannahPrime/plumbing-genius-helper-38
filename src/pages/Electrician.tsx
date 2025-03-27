
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Image as ImageIcon, Zap, Lightbulb, Plug, Cable, Power, ScanLine, AlertTriangle, Wrench, PlugZap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import { QuickActionCategory } from "@/components/shared/QuickActionCategories";

const Electrician = () => {
  const navigate = useNavigate();

  const electricianCategories: QuickActionCategory[] = [
    { 
      icon: <Lightbulb className="w-5 h-5" />, 
      name: "Lighting Issues", 
      hoverText: "Flickering lights, bulb replacements, fixture questions",
      emoji: "💡",
      path: "/glossary"
    },
    { 
      icon: <Plug className="w-5 h-5" />, 
      name: "Outlet Problems", 
      hoverText: "Dead outlets, loose plugs, GFCI issues",
      emoji: "🔌",
      path: "/glossary"
    },
    { 
      icon: <Power className="w-5 h-5" />, 
      name: "Circuit Breakers", 
      hoverText: "Tripping breakers, panel questions, labeling help",
      emoji: "⚡",
      path: "/glossary"
    },
    { 
      icon: <ScanLine className="w-5 h-5" />, 
      name: "Appliance Issues", 
      hoverText: "Troubleshooting electrical problems with appliances",
      emoji: "🧰",
      path: "/glossary"
    },
    { 
      icon: <Cable className="w-5 h-5" />, 
      name: "Wiring Help", 
      hoverText: "Basic wiring questions and safety information",
      emoji: "🔌",
      path: "/glossary"
    },
    { 
      icon: <PlugZap className="w-5 h-5" />, 
      name: "Smart Devices", 
      hoverText: "Setup and troubleshooting for smart electrical devices",
      emoji: "📱",
      path: "/glossary"
    },
    { 
      icon: <AlertTriangle className="w-5 h-5" />, 
      name: "Safety Checks", 
      hoverText: "Identifying potential electrical hazards",
      emoji: "⚠️",
      path: "/glossary"
    },
    { 
      icon: <Wrench className="w-5 h-5" />, 
      name: "DIY Guidance", 
      hoverText: "Safe DIY electrical repairs and when to call a pro",
      emoji: "🔧",
      path: "/glossary"
    },
  ];

  return (
    <div className="min-h-screen bg-yellow-50 font-dm-sans text-primary">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/")} className="mr-2">
              <Home className="w-5 h-5" />
            </Button>
            <Zap className="w-7 h-7 text-yellow-500" />
            <span className="font-space-grotesk font-bold text-xl text-primary">
              Electrician Genius
            </span>
            <Badge variant="outline" className="ml-2">by EveryFixAI</Badge>
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
                <p className="text-sm md:text-base font-medium">Let's solve your electrical issues safely!</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-8 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">Your AI Electrical Assistant</h2>
            
            <p className="mb-6 text-lg text-primary/80">
              Flip the switch on electrical problems — safely and smart.
              <Badge className="ml-2 bg-yellow-100 text-primary">💡 Safety first!</Badge>
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <div className="rounded-full bg-yellow-100 p-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                </div>
                <p className="font-medium">Safety Notice</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">For serious electrical issues, always consult a licensed electrician. Turn off power at the breaker before attempting any DIY electrical work.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-yellow-600 hover:bg-yellow-700 shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={() => navigate("/chat?specialty=electrician")}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI Electrician
              </Button>
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-yellow-800 hover:bg-yellow-900 text-white shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={() => navigate("/diagnosis")}
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Upload Photo
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm font-medium mb-2">Try asking:</p>
              <div className="space-y-2">
                <div className="bg-yellow-50 p-2 rounded">
                  "Why do my lights flicker when I use the microwave?"
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  "How do I replace a light switch?"
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  "My outlet doesn't work anymore"
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <QuickActionCategories 
          title="⚡ Electrical Solutions" 
          categories={electricianCategories} 
        />
      </main>
    </div>
  );
};

export default Electrician;
