
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

  useState(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className="min-h-screen bg-soft font-dm-sans text-primary">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wrench className="w-7 h-7 text-accent" />
            <span className="font-space-grotesk font-bold text-xl text-primary">
              Plumber's Helper
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-neutrals-steel/50 p-1 rounded-full">
              <button 
                onClick={() => setPlumberPersonality("classic")}
                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all ${plumberPersonality === "classic" ? "bg-white shadow-sm" : "hover:bg-neutrals-steel"}`}
              >
                🧓 Classic
              </button>
              <button 
                onClick={() => setPlumberPersonality("ai")}
                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all ${plumberPersonality === "ai" ? "bg-white shadow-sm" : "hover:bg-neutrals-steel"}`}
              >
                🤖 AI
              </button>
              <button 
                onClick={() => setPlumberPersonality("chill")}
                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all ${plumberPersonality === "chill" ? "bg-white shadow-sm" : "hover:bg-neutrals-steel"}`}
              >
                😎 Chill
              </button>
            </div>
            
            <button 
              onClick={handleMicClick}
              className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary/20 transition-colors"
              aria-label="Voice assistant"
            >
              <Mic className="w-4 h-4 text-secondary" />
            </button>
            
            <nav className="text-sm text-neutrals hidden md:block">
              <Link to="/fixes" className="mr-4 hover:underline">Find a Real Plumber</Link>
              <Link to="/fixes" className="hover:underline">Privacy</Link>
            </nav>
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

        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4 font-space-grotesk">🧰 Common Issues</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {problemCategories.map((category, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <Link 
                    to={`/chat?problem=${encodeURIComponent(category.query)}`}
                    className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-4 text-left hover-card-animation"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                        {category.icon}
                      </div>
                      <span>{category.name} <span className="text-xs opacity-70">{category.emoji}</span></span>
                    </div>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-3 bg-white shadow-md border border-neutrals-steel/30 z-50">
                  <p className="text-sm">{category.hoverText}</p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link to="/fixes" className="text-secondary hover:text-secondary/80 text-sm flex items-center gap-1 font-medium">
              See all plumbing problems <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>

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
            <Link to="/chat" className="w-full max-w-xs">
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
            
            <Link to="/chat" className="w-full max-w-xs">
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
            <Link to="/chat">
              <Button className="bg-primary hover:bg-primary/90 rounded-xl">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </motion.section>

        <motion.footer 
          className="mt-20 border-t pt-6 text-sm text-neutrals flex justify-between items-center"
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
