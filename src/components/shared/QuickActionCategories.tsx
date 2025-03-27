
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { motion } from "framer-motion";
import { ChefHat, Wrench, Scissors, Zap, Wrench as WrenchIcon, Smartphone, Droplet, Car, Hammer, Bath } from "lucide-react";

export interface QuickActionCategory {
  icon: React.ReactNode;
  name: string;
  hoverText: string;
  emoji: string;
  path: string;
}

interface QuickActionCategoriesProps {
  title?: string;
  categories?: QuickActionCategory[];
  specialty?: string;
  className?: string;
}

// Category data for different specialties
const specialtyCategories: Record<string, { title: string, categories: QuickActionCategory[] }> = {
  chef: {
    title: "Quick Cooking Solutions",
    categories: [
      {
        icon: <ChefHat className="h-4 w-4 text-primary" />,
        name: "Recipe Fixes",
        hoverText: "Solutions for common cooking mistakes and recipe adjustments",
        emoji: "🍳",
        path: "/chef/glossary"
      },
      {
        icon: <ChefHat className="h-4 w-4 text-primary" />,
        name: "Substitutions",
        hoverText: "Find ingredient substitutions when you're missing something",
        emoji: "🥄",
        path: "/chef/glossary"
      },
      {
        icon: <ChefHat className="h-4 w-4 text-primary" />,
        name: "Kitchen Tools",
        hoverText: "Tips for using and maintaining kitchen equipment",
        emoji: "🔪",
        path: "/chef/glossary"
      },
      {
        icon: <ChefHat className="h-4 w-4 text-primary" />,
        name: "Food Storage",
        hoverText: "Best practices for storing and preserving food",
        emoji: "🧊",
        path: "/chef/glossary"
      }
    ]
  },
  handyman: {
    title: "Quick Repair Solutions",
    categories: [
      {
        icon: <Hammer className="h-4 w-4 text-primary" />,
        name: "Furniture Fixes",
        hoverText: "Quick solutions for wobbly chairs, stuck drawers and more",
        emoji: "🪑",
        path: "/handyman/glossary"
      },
      {
        icon: <Hammer className="h-4 w-4 text-primary" />,
        name: "Wall Repairs",
        hoverText: "Fix holes, cracks and other wall damage",
        emoji: "🧱",
        path: "/handyman/glossary"
      },
      {
        icon: <Hammer className="h-4 w-4 text-primary" />,
        name: "Door & Windows",
        hoverText: "Solutions for sticking doors, window problems and hardware issues",
        emoji: "🚪",
        path: "/handyman/glossary"
      },
      {
        icon: <Hammer className="h-4 w-4 text-primary" />,
        name: "Floor Repairs",
        hoverText: "Fixes for scratched wood, cracked tile and carpet issues",
        emoji: "🪵",
        path: "/handyman/glossary"
      }
    ]
  },
  stylist: {
    title: "Quick Style Solutions",
    categories: [
      {
        icon: <Scissors className="h-4 w-4 text-primary" />,
        name: "Hair Fixes",
        hoverText: "Quick solutions for common hair problems and styling issues",
        emoji: "💇‍♀️",
        path: "/stylist/glossary"
      },
      {
        icon: <Scissors className="h-4 w-4 text-primary" />,
        name: "Makeup Tips",
        hoverText: "Quick makeup fixes and application techniques",
        emoji: "💄",
        path: "/stylist/glossary"
      },
      {
        icon: <Scissors className="h-4 w-4 text-primary" />,
        name: "Fashion Help",
        hoverText: "Outfit combinations and wardrobe solutions",
        emoji: "👚",
        path: "/stylist/glossary"
      },
      {
        icon: <Scissors className="h-4 w-4 text-primary" />,
        name: "Accessories",
        hoverText: "Tips for selecting and styling accessories",
        emoji: "👜",
        path: "/stylist/glossary"
      }
    ]
  },
  electrician: {
    title: "Quick Electrical Solutions",
    categories: [
      {
        icon: <Zap className="h-4 w-4 text-primary" />,
        name: "Light Fixtures",
        hoverText: "Solutions for lighting problems and installations",
        emoji: "💡",
        path: "/electrician/glossary"
      },
      {
        icon: <Zap className="h-4 w-4 text-primary" />,
        name: "Outlet Issues",
        hoverText: "Fixes for non-working outlets and electrical connections",
        emoji: "🔌",
        path: "/electrician/glossary"
      },
      {
        icon: <Zap className="h-4 w-4 text-primary" />,
        name: "Switches",
        hoverText: "Troubleshooting and replacing problematic switches",
        emoji: "🔄",
        path: "/electrician/glossary"
      },
      {
        icon: <Zap className="h-4 w-4 text-primary" />,
        name: "Smart Devices",
        hoverText: "Help with smart home electrical installations",
        emoji: "🏠",
        path: "/electrician/glossary"
      }
    ]
  },
  landscaper: {
    title: "Quick Landscaping Solutions",
    categories: [
      {
        icon: <WrenchIcon className="h-4 w-4 text-primary" />,
        name: "Lawn Care",
        hoverText: "Solutions for common lawn problems and maintenance",
        emoji: "🌱",
        path: "/landscaper/glossary"
      },
      {
        icon: <WrenchIcon className="h-4 w-4 text-primary" />,
        name: "Plant Health",
        hoverText: "Diagnose and treat plant diseases and issues",
        emoji: "🌿",
        path: "/landscaper/glossary"
      },
      {
        icon: <WrenchIcon className="h-4 w-4 text-primary" />,
        name: "Garden Design",
        hoverText: "Tips for planning and arranging garden layouts",
        emoji: "🌷",
        path: "/landscaper/glossary"
      },
      {
        icon: <WrenchIcon className="h-4 w-4 text-primary" />,
        name: "Irrigation",
        hoverText: "Help with watering systems and water management",
        emoji: "💧",
        path: "/landscaper/glossary"
      }
    ]
  },
  mechanic: {
    title: "Quick Auto Solutions",
    categories: [
      {
        icon: <Car className="h-4 w-4 text-primary" />,
        name: "Engine Issues",
        hoverText: "Diagnosing and fixing common engine problems",
        emoji: "🔧",
        path: "/mechanic/glossary"
      },
      {
        icon: <Car className="h-4 w-4 text-primary" />,
        name: "Fluid Checks",
        hoverText: "How to check and replace automotive fluids",
        emoji: "🛢️",
        path: "/mechanic/glossary"
      },
      {
        icon: <Car className="h-4 w-4 text-primary" />,
        name: "Tire Care",
        hoverText: "Tire maintenance, pressure checks and replacements",
        emoji: "🛞",
        path: "/mechanic/glossary"
      },
      {
        icon: <Car className="h-4 w-4 text-primary" />,
        name: "Battery Help",
        hoverText: "Troubleshooting battery issues and replacements",
        emoji: "🔋",
        path: "/mechanic/glossary"
      }
    ]
  },
  cleaning: {
    title: "Quick Cleaning Solutions",
    categories: [
      {
        icon: <Bath className="h-4 w-4 text-primary" />,
        name: "Stain Removal",
        hoverText: "Solutions for removing common stains from various surfaces",
        emoji: "🧴",
        path: "/cleaning/glossary"
      },
      {
        icon: <Bath className="h-4 w-4 text-primary" />,
        name: "Deep Cleaning",
        hoverText: "Tips for thorough cleaning of heavily soiled areas",
        emoji: "🧽",
        path: "/cleaning/glossary"
      },
      {
        icon: <Bath className="h-4 w-4 text-primary" />,
        name: "Quick Tidying",
        hoverText: "Fast methods to tidy and organize spaces",
        emoji: "🧹",
        path: "/cleaning/glossary"
      },
      {
        icon: <Bath className="h-4 w-4 text-primary" />,
        name: "Cleaning Tools",
        hoverText: "Advice on selecting and using cleaning equipment",
        emoji: "🧼",
        path: "/cleaning/glossary"
      }
    ]
  },
  gadget: {
    title: "Quick Tech Solutions",
    categories: [
      {
        icon: <Smartphone className="h-4 w-4 text-primary" />,
        name: "Smartphone Fixes",
        hoverText: "Solutions for common smartphone issues and performance problems",
        emoji: "📱",
        path: "/gadget/glossary"
      },
      {
        icon: <Smartphone className="h-4 w-4 text-primary" />,
        name: "Computer Help",
        hoverText: "Troubleshooting computer problems and maintenance tips",
        emoji: "💻",
        path: "/gadget/glossary"
      },
      {
        icon: <Smartphone className="h-4 w-4 text-primary" />,
        name: "Smart Home",
        hoverText: "Setup and fix issues with smart home devices",
        emoji: "🏠",
        path: "/gadget/glossary"
      },
      {
        icon: <Smartphone className="h-4 w-4 text-primary" />,
        name: "Connectivity",
        hoverText: "Solutions for WiFi, Bluetooth and network problems",
        emoji: "📶",
        path: "/gadget/glossary"
      }
    ]
  },
  plumber: {
    title: "Quick Plumbing Solutions",
    categories: [
      {
        icon: <Droplet className="h-4 w-4 text-primary" />,
        name: "Clogged Drains",
        hoverText: "Solutions for clearing blockages in sinks, tubs and toilets",
        emoji: "🚿",
        path: "/plumber/glossary"
      },
      {
        icon: <Droplet className="h-4 w-4 text-primary" />,
        name: "Leak Fixes",
        hoverText: "How to identify and repair common plumbing leaks",
        emoji: "💧",
        path: "/plumber/glossary"
      },
      {
        icon: <Droplet className="h-4 w-4 text-primary" />,
        name: "Toilet Trouble",
        hoverText: "Fixes for running toilets, weak flushes and other issues",
        emoji: "🚽",
        path: "/plumber/glossary"
      },
      {
        icon: <Droplet className="h-4 w-4 text-primary" />,
        name: "Faucet Repair",
        hoverText: "Solutions for dripping, squeaking or stuck faucets",
        emoji: "🚰",
        path: "/plumber/glossary"
      }
    ]
  }
};

const QuickActionCategories = ({ title, categories, specialty, className = "" }: QuickActionCategoriesProps) => {
  const location = useLocation();
  
  // Determine what categories and title to use (from props or from specialty lookup)
  let displayCategories = categories;
  let displayTitle = title;
  
  if (specialty && specialtyCategories[specialty]) {
    displayCategories = specialtyCategories[specialty].categories;
    displayTitle = displayTitle || specialtyCategories[specialty].title;
  }
  
  // If we still don't have categories, show a default empty state or return null
  if (!displayCategories) {
    return null;
  }
  
  // Get the current context from the path
  const getCurrentContext = () => {
    const path = location.pathname;
    if (path.includes("/landscaper")) return "landscaper";
    if (path.includes("/chef")) return "chef";
    if (path.includes("/stylist")) return "stylist";
    if (path.includes("/electrician")) return "electrician";
    if (path.includes("/handyman")) return "handyman";
    if (path.includes("/mechanic")) return "mechanic";
    if (path.includes("/cleaning")) return "cleaning";
    if (path.includes("/gadgetfixgenie")) return "gadget";
    if (path.includes("/plumber")) return "plumber";
    
    return "default";
  };
  
  const currentContext = getCurrentContext();
  
  // Determine which glossary to link to based on current context
  const getContextSpecificPath = (defaultPath: string) => {
    // If the path already contains the context, return it as is
    if (defaultPath.includes(`/${currentContext}/`)) {
      return defaultPath;
    }
    
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
      <h3 className="text-xl font-semibold mb-4 font-space-grotesk">{displayTitle}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayCategories.map((category, index) => (
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

