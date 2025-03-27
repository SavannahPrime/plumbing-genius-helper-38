
import React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Toilet, Droplet, Bath, Flame, Trash2, Info, ChefHat, Scissors } from "lucide-react";

interface ProblemCategory {
  icon: React.ReactNode;
  name: string;
  query: string;
  hoverText: string;
  emoji: string;
}

const problemCategories: ProblemCategory[] = [
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
  { 
    icon: <ChefHat className="w-5 h-5" />, 
    name: "Chef Help", 
    query: "I need help with cooking or recipes.",
    hoverText: "Recipe advice? Cooking techniques?",
    emoji: "👨‍🍳" 
  },
  { 
    icon: <Scissors className="w-5 h-5" />, 
    name: "Styling Advice", 
    query: "I need styling or hair advice.",
    hoverText: "Hair tips? Fashion advice?",
    emoji: "💇" 
  },
];

const ProblemCategories = () => {
  return (
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
                to="/glossary"
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
        <Link to="/glossary" className="text-secondary hover:text-secondary/80 text-sm flex items-center gap-1 font-medium">
          See all plumbing problems <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.section>
  );
};

export default ProblemCategories;
