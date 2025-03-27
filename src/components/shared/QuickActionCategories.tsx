
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { motion } from "framer-motion";

export interface QuickActionCategory {
  icon: React.ReactNode;
  name: string;
  hoverText: string;
  emoji: string;
  path: string;
}

interface QuickActionCategoriesProps {
  title: string;
  categories: QuickActionCategory[];
  className?: string;
}

const QuickActionCategories = ({ title, categories, className = "" }: QuickActionCategoriesProps) => {
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
  
  // Determine which glossary to link to based on current context
  const getContextSpecificPath = (defaultPath: string) => {
    // If the path is a glossary path, ensure we're using the current context
    if (defaultPath === "/glossary" || defaultPath.includes("/glossary")) {
      return `/${currentContext}/glossary`;
    }
    
    return defaultPath;
  };

  return (
    <motion.section
      className={`mt-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-xl font-semibold mb-4 font-space-grotesk">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
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
    </motion.section>
  );
};

export default QuickActionCategories;
