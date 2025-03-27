
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { 
  Wrench, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings, 
  Toilet, 
  Droplet, 
  Bath, 
  Flame, 
  Trash2, 
  Info, 
  ArrowRight,
  Mic
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";

// Updated problem categories with hover text
const problemCategories = [
  { 
    icon: <Toilet className="w-5 h-5" />, 
    name: "Toilet", 
    query: "I have a problem with my toilet.",
    hoverText: "Flush issues? Running water?",
    emoji: "🚽" 
  },
  { 
    icon: <Droplet className="w-5 h-5" />, 
    name: "Shower", 
    query: "I have an issue with my shower.",
    hoverText: "Low pressure? Dripping?",
    emoji: "🚿" 
  },
  { 
    icon: <Droplet className="w-5 h-5" />, 
    name: "Sink", 
    query: "My sink is having problems.",
    hoverText: "Clogged? Leaking?",
    emoji: "🚰" 
  },
  { 
    icon: <Bath className="w-5 h-5" />, 
    name: "Bathtub", 
    query: "I'm having issues with my bathtub.",
    hoverText: "Drainage problems? Slow drain?",
    emoji: "🛁" 
  },
  { 
    icon: <Flame className="w-5 h-5" />, 
    name: "Water Heater", 
    query: "My water heater isn't working properly.",
    hoverText: "No hot water? Strange noises?",
    emoji: "🔥" 
  },
  { 
    icon: <Trash2 className="w-5 h-5" />, 
    name: "Garbage Disposal", 
    query: "My garbage disposal is malfunctioning.",
    hoverText: "Jammed? Not turning on?",
    emoji: "🗑️" 
  },
  { 
    icon: <Droplet className="w-5 h-5" />, 
    name: "Leaking Pipe", 
    query: "I have a leaking pipe.",
    hoverText: "Under sink? Visible pipe?",
    emoji: "💧" 
  },
  { 
    icon: <Droplet className="w-5 h-5" />, 
    name: "Low Water Pressure", 
    query: "I'm experiencing low water pressure.",
    hoverText: "Sudden drop? Specific fixtures?",
    emoji: "📉" 
  },
  { 
    icon: <Info className="w-5 h-5" />, 
    name: "Smells / Sewer", 
    query: "There's a bad smell coming from my plumbing.",
    hoverText: "Rotten egg smell? Sink odor?",
    emoji: "👃" 
  },
];

// Typing animation text options
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

  // Change typing text every few seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#1D3557]">
      {/* Header with voice toggle */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wrench className="w-7 h-7 text-[#1D3557]" />
            <span className="font-inter font-bold text-xl text-[#1D3557]">
              Plumber's Helper
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Voice Toggle Section */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 p-1 rounded-full">
              <button 
                onClick={() => setPlumberPersonality("classic")}
                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all ${plumberPersonality === "classic" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
              >
                🧓 Classic
              </button>
              <button 
                onClick={() => setPlumberPersonality("ai")}
                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all ${plumberPersonality === "ai" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
              >
                🤖 AI
              </button>
              <button 
                onClick={() => setPlumberPersonality("chill")}
                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all ${plumberPersonality === "chill" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
              >
                😎 Chill
              </button>
            </div>
            
            <button 
              onClick={handleMicClick}
              className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center hover:bg-[#B3E5FC] transition-colors"
              aria-label="Voice assistant"
            >
              <Mic className="w-4 h-4 text-[#1D3557]" />
            </button>
            
            <nav className="text-sm text-[#607D8B] hidden md:block">
              <Link to="/fixes" className="mr-4 hover:underline">Find a Real Plumber</Link>
              <Link to="/fixes" className="hover:underline">Privacy</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section with Character on the Left */}
        <section className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 mb-12">
          {/* Animated Plumber Character */}
          <motion.div 
            className="md:col-span-4 flex justify-center relative order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-[#E3F2FD] flex items-center justify-center">
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
              
              {/* Speech Bubble */}
              <div className="absolute -top-12 -right-16 md:-right-24 bg-white rounded-2xl p-3 shadow-md after:content-[''] after:absolute after:bottom-0 after:left-6 after:w-4 after:h-4 after:bg-white after:rotate-45 after:-mb-2">
                <p className="text-sm md:text-base font-medium">Let's fix that leaky mess!</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            className="md:col-span-8 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter">Your AI-Powered Plumbing Assistant</h2>
            
            {/* Animated typing text */}
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="mb-6 text-lg text-[#37474F] font-medium"
            >
              {typingTexts[currentTextIndex]}
            </motion.p>
            
            <p className="mb-6 text-lg text-[#37474F]">
              Snap a pic. Talk to your AI plumber. Get unstuck, fast.
              <Badge variant="outline" className="ml-2 bg-[#E3F2FD] text-[#1D3557]">💡 No appointments. Just answers.</Badge>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link to="/chat">
                <Button 
                  className="w-full sm:w-auto text-lg py-6 px-8 bg-[#1D3557] hover:bg-[#1D3557]/90 shadow-md active:scale-[0.98] transition-all"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Chat
                </Button>
              </Link>
              <Link to="/diagnosis">
                <Button 
                  className="w-full sm:w-auto text-lg py-6 px-8 bg-[#4FC3F7] hover:bg-[#03A9F4] text-white shadow-md active:scale-[0.98] transition-all"
                >
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Visual Diagnosis
                </Button>
              </Link>
            </div>
            <div className="text-sm text-[#78909C]">Or explore quick help topics below 👇</div>
          </motion.div>
        </section>

        {/* Quick Help Buttons */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">🧰 Common Issues</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {problemCategories.map((category, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <Link 
                    to={`/chat?problem=${encodeURIComponent(category.query)}`}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 text-left hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        {category.icon}
                      </div>
                      <span>{category.name} <span className="text-xs opacity-70">{category.emoji}</span></span>
                    </div>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-3">
                  <p className="text-sm">{category.hoverText}</p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link to="/fixes" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 font-medium">
              See all plumbing problems <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>

        {/* "Fix it now" Wizard */}
        <motion.section
          className="mt-20 p-6 bg-white rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-[#1D3557]" />
            Fix it now
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-2">
                <span className="text-xl">🛠️</span>
              </div>
              <h4 className="font-medium mb-1">What's the problem?</h4>
              <p className="text-sm text-gray-500">Select from options above</p>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block" />
            
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-2">
                <span className="text-xl">📷</span>
              </div>
              <h4 className="font-medium mb-1">Got a pic?</h4>
              <p className="text-sm text-gray-500">Upload for better results</p>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block" />
            
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-2">
                <span className="text-xl">📞</span>
              </div>
              <h4 className="font-medium mb-1">Want voice assistance?</h4>
              <p className="text-sm text-gray-500">Talk to AI plumber</p>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block" />
            
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-2">
                <span className="text-xl">✅</span>
              </div>
              <h4 className="font-medium mb-1">Here's your fix!</h4>
              <p className="text-sm text-gray-500">Step-by-step solutions</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Link to="/chat">
              <Button className="bg-[#1D3557]">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="mt-20 border-t pt-6 text-sm text-[#90A4AE] flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div>
            <p className="mb-1">&copy; {new Date().getFullYear()} Plumber's Helper. All rights reserved.</p>
            <p className="text-xs">No pipe too weird, no drip too small.</p>
          </div>
          
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png" 
              alt="Mini Plumber" 
              className="w-12 h-12"
            />
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
