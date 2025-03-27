
import React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Toilet, Droplet, Bath, Flame, Trash2, Info, ChefHat, Scissors, Search } from "lucide-react";

interface ProblemCategory {
  icon: React.ReactNode;
  name: string;
  query: string;
  hoverText: string;
  emoji: string;
  path: string;
}

const problemCategories: ProblemCategory[] = [
  { 
    icon: <Toilet className="w-5 h-5" />, 
    name: "Toilet", 
    query: "I have a problem with my toilet.",
    hoverText: "Flush issues? Running water?",
    emoji: "🚽",
    path: "/glossary"
  },
  { 
    icon: <Droplet className="w-5 h-5" />, 
    name: "Shower", 
    query: "I have an issue with my shower.",
    hoverText: "Low pressure? Dripping?",
    emoji: "🚿",
    path: "/glossary"
  },
  { 
    icon: <Droplet className="w-5 h-5" />, 
    name: "Sink", 
    query: "My sink is having problems.",
    hoverText: "Clogged? Leaking?",
    emoji: "🚰",
    path: "/glossary"
  },
  { 
    icon: <Bath className="w-5 h-5" />, 
    name: "Bathtub", 
    query: "I'm having issues with my bathtub.",
    hoverText: "Drainage problems? Slow drain?",
    emoji: "🛁",
    path: "/glossary"
  },
  { 
    icon: <Flame className="w-5 h-5" />, 
    name: "Water Heater", 
    query: "My water heater isn't working properly.",
    hoverText: "No hot water? Strange noises?",
    emoji: "🔥",
    path: "/glossary"
  },
  { 
    icon: <Trash2 className="w-5 h-5" />, 
    name: "Garbage Disposal", 
    query: "My garbage disposal is malfunctioning.",
    hoverText: "Jammed? Not turning on?",
    emoji: "🗑️",
    path: "/glossary"
  },
  { 
    icon: <Droplet className="w-5 h-5" />, 
    name: "Leaking Pipe", 
    query: "I have a leaking pipe.",
    hoverText: "Under sink? Visible pipe?",
    emoji: "💧",
    path: "/glossary"
  },
  { 
    icon: <Droplet className="w-5 h-5" />, 
    name: "Low Water Pressure", 
    query: "I'm experiencing low water pressure.",
    hoverText: "Sudden drop? Specific fixtures?",
    emoji: "📉",
    path: "/glossary"
  },
  { 
    icon: <Info className="w-5 h-5" />, 
    name: "Smells / Sewer", 
    query: "There's a bad smell coming from my plumbing.",
    hoverText: "Rotten egg smell? Sink odor?",
    emoji: "👃",
    path: "/glossary"
  },
  { 
    icon: <ChefHat className="w-5 h-5" />, 
    name: "Chef Help", 
    query: "I need help with cooking or recipes.",
    hoverText: "Recipe advice? Cooking techniques?",
    emoji: "👨‍🍳",
    path: "/chef"
  },
  { 
    icon: <Scissors className="w-5 h-5" />, 
    name: "Styling Advice", 
    query: "I need styling or hair advice.",
    hoverText: "Hair tips? Fashion advice?",
    emoji: "💇",
    path: "/stylist"
  },
  { 
    icon: <Search className="w-5 h-5" />, 
    name: "Step-by-Step Guides", 
    query: "I need detailed step-by-step instructions.",
    hoverText: "Comprehensive DIY guides for all services",
    emoji: "📚",
    path: "/step-by-step"
  },
];

const ProblemCategories = () => {
  const location = useLocation();
  
  // Get the current context from the path
  const getCurrentContext = () => {
    const path = location.pathname;
    if (path.includes("/landscaper")) return "landscaper";
    if (path.includes("/chef")) return "chef";
    if (path.includes("/stylist")) return "stylist";
    if (path.includes("/electrician")) return "electrician";
    if (path.includes("/handyman")) return "handyman";
    if (path.includes("/mechanic")) return "mechanic";
    if (path.includes("/plumber")) return "plumber";
    if (path.includes("/cleaning")) return "cleaning";
    if (path.includes("/gadgetfixgenie")) return "gadget";
    
    return "default";
  };
  
  const currentContext = getCurrentContext();
  
  // Determine which glossary to link to based on current path
  const getContextSpecificPath = (defaultPath: string) => {
    // Ensure we're passing the current context to the glossary
    if (defaultPath === "/glossary" || defaultPath.includes("/glossary")) {
      return `/${currentContext}/glossary`;
    }
    
    // Map paths to their specific glossary pages
    if (currentContext === "landscaper") return "/landscaper/glossary";
    if (currentContext === "chef") return "/chef/glossary";
    if (currentContext === "stylist") return "/stylist/glossary";
    if (currentContext === "electrician") return "/electrician/glossary";
    if (currentContext === "handyman") return "/handyman/glossary";
    if (currentContext === "mechanic") return "/mechanic/glossary";
    if (currentContext === "plumber") return "/plumber/glossary";
    if (currentContext === "cleaning") return "/cleaning/glossary";
    if (currentContext === "gadget") return "/gadget/glossary";
    
    // Default fallback
    return defaultPath;
  };

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
                to={getContextSpecificPath(category.path)}
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
        <Link to={getContextSpecificPath("/step-by-step")} className="text-secondary hover:text-secondary/80 text-sm flex items-center gap-1 font-medium">
          Browse all step-by-step guides <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.section>
  );
};

export default ProblemCategories;
