
import React from "react";
import { 
  ChefHat, 
  Wrench, 
  Scissors, 
  Zap, 
  Smartphone, 
  Droplet, 
  Car, 
  Hammer, 
  Bath
} from "lucide-react";
import { QuickActionCategory } from "@/components/shared/QuickActionCategory";

// Category data for different specialties
export const specialtyCategories: Record<string, { title: string, categories: QuickActionCategory[] }> = {
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
        icon: <Wrench className="h-4 w-4 text-primary" />,
        name: "Lawn Care",
        hoverText: "Solutions for common lawn problems and maintenance",
        emoji: "🌱",
        path: "/landscaper/glossary"
      },
      {
        icon: <Wrench className="h-4 w-4 text-primary" />,
        name: "Plant Health",
        hoverText: "Diagnose and treat plant diseases and issues",
        emoji: "🌿",
        path: "/landscaper/glossary"
      },
      {
        icon: <Wrench className="h-4 w-4 text-primary" />,
        name: "Garden Design",
        hoverText: "Tips for planning and arranging garden layouts",
        emoji: "🌷",
        path: "/landscaper/glossary"
      },
      {
        icon: <Wrench className="h-4 w-4 text-primary" />,
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
