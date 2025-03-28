import { QuickActionCategory } from "@/components/shared/QuickActionCategory";
import { createIcon } from "@/utils/iconUtils";

// Category data for different specialties
export const specialtyCategories: Record<string, { title: string, categories: QuickActionCategory[] }> = {
  chef: {
    title: "Quick Cooking Solutions",
    categories: [
      {
        iconType: "chef",
        icon: createIcon("chef"),
        name: "Recipe Fixes",
        hoverText: "Solutions for common cooking mistakes and recipe adjustments",
        emoji: "🍳",
        path: "/chef/glossary"
      },
      {
        iconType: "chef",
        icon: createIcon("chef"),
        name: "Substitutions",
        hoverText: "Find ingredient substitutions when you're missing something",
        emoji: "🥄",
        path: "/chef/glossary"
      },
      {
        iconType: "chef",
        icon: createIcon("chef"),
        name: "Kitchen Tools",
        hoverText: "Tips for using and maintaining kitchen equipment",
        emoji: "🔪",
        path: "/chef/glossary"
      },
      {
        iconType: "chef",
        icon: createIcon("chef"),
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
        iconType: "hammer",
        icon: createIcon("hammer"),
        name: "Furniture Fixes",
        hoverText: "Quick solutions for wobbly chairs, stuck drawers and more",
        emoji: "🪑",
        path: "/handyman/glossary"
      },
      {
        iconType: "hammer",
        icon: createIcon("hammer"),
        name: "Wall Repairs",
        hoverText: "Fix holes, cracks and other wall damage",
        emoji: "🧱",
        path: "/handyman/glossary"
      },
      {
        iconType: "hammer",
        icon: createIcon("hammer"),
        name: "Door & Windows",
        hoverText: "Solutions for sticking doors, window problems and hardware issues",
        emoji: "🚪",
        path: "/handyman/glossary"
      },
      {
        iconType: "hammer",
        icon: createIcon("hammer"),
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
        iconType: "scissors",
        icon: createIcon("scissors"),
        name: "Hair Fixes",
        hoverText: "Quick solutions for common hair problems and styling issues",
        emoji: "💇‍♀️",
        path: "/stylist/glossary"
      },
      {
        iconType: "scissors",
        icon: createIcon("scissors"),
        name: "Makeup Tips",
        hoverText: "Quick makeup fixes and application techniques",
        emoji: "💄",
        path: "/stylist/glossary"
      },
      {
        iconType: "scissors",
        icon: createIcon("scissors"),
        name: "Fashion Help",
        hoverText: "Outfit combinations and wardrobe solutions",
        emoji: "👚",
        path: "/stylist/glossary"
      },
      {
        iconType: "scissors",
        icon: createIcon("scissors"),
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
        iconType: "zap",
        icon: createIcon("zap"),
        name: "Light Fixtures",
        hoverText: "Solutions for lighting problems and installations",
        emoji: "💡",
        path: "/electrician/glossary"
      },
      {
        iconType: "zap",
        icon: createIcon("zap"),
        name: "Outlet Issues",
        hoverText: "Fixes for non-working outlets and electrical connections",
        emoji: "🔌",
        path: "/electrician/glossary"
      },
      {
        iconType: "zap",
        icon: createIcon("zap"),
        name: "Switches",
        hoverText: "Troubleshooting and replacing problematic switches",
        emoji: "🔄",
        path: "/electrician/glossary"
      },
      {
        iconType: "zap",
        icon: createIcon("zap"),
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
        iconType: "wrench",
        icon: createIcon("wrench"),
        name: "Lawn Care",
        hoverText: "Solutions for common lawn problems and maintenance",
        emoji: "🌱",
        path: "/landscaper/glossary"
      },
      {
        iconType: "wrench",
        icon: createIcon("wrench"),
        name: "Plant Health",
        hoverText: "Diagnose and treat plant diseases and issues",
        emoji: "🌿",
        path: "/landscaper/glossary"
      },
      {
        iconType: "wrench",
        icon: createIcon("wrench"),
        name: "Garden Design",
        hoverText: "Tips for planning and arranging garden layouts",
        emoji: "🌷",
        path: "/landscaper/glossary"
      },
      {
        iconType: "wrench",
        icon: createIcon("wrench"),
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
        iconType: "car",
        icon: createIcon("car"),
        name: "Engine Issues",
        hoverText: "Diagnosing and fixing common engine problems",
        emoji: "🔧",
        path: "/mechanic/glossary"
      },
      {
        iconType: "car",
        icon: createIcon("car"),
        name: "Fluid Checks",
        hoverText: "How to check and replace automotive fluids",
        emoji: "🛢️",
        path: "/mechanic/glossary"
      },
      {
        iconType: "car",
        icon: createIcon("car"),
        name: "Tire Care",
        hoverText: "Tire maintenance, pressure checks and replacements",
        emoji: "🛞",
        path: "/mechanic/glossary"
      },
      {
        iconType: "car",
        icon: createIcon("car"),
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
        iconType: "bath",
        icon: createIcon("bath"),
        name: "Stain Removal",
        hoverText: "Solutions for removing common stains from various surfaces",
        emoji: "🧴",
        path: "/cleaning/glossary"
      },
      {
        iconType: "bath",
        icon: createIcon("bath"),
        name: "Deep Cleaning",
        hoverText: "Tips for thorough cleaning of heavily soiled areas",
        emoji: "🧽",
        path: "/cleaning/glossary"
      },
      {
        iconType: "bath",
        icon: createIcon("bath"),
        name: "Quick Tidying",
        hoverText: "Fast methods to tidy and organize spaces",
        emoji: "🧹",
        path: "/cleaning/glossary"
      },
      {
        iconType: "bath",
        icon: createIcon("bath"),
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
        iconType: "smartphone",
        icon: createIcon("smartphone"),
        name: "Smartphone Fixes",
        hoverText: "Solutions for common smartphone issues and performance problems",
        emoji: "📱",
        path: "/gadget/glossary"
      },
      {
        iconType: "smartphone",
        icon: createIcon("smartphone"),
        name: "Computer Help",
        hoverText: "Troubleshooting computer problems and maintenance tips",
        emoji: "💻",
        path: "/gadget/glossary"
      },
      {
        iconType: "smartphone",
        icon: createIcon("smartphone"),
        name: "Smart Home",
        hoverText: "Setup and fix issues with smart home devices",
        emoji: "🏠",
        path: "/gadget/glossary"
      },
      {
        iconType: "smartphone",
        icon: createIcon("smartphone"),
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
        iconType: "droplet",
        icon: createIcon("droplet"),
        name: "Clogged Drains",
        hoverText: "Solutions for clearing blockages in sinks, tubs and toilets",
        emoji: "🚿",
        path: "/plumber/glossary"
      },
      {
        iconType: "droplet",
        icon: createIcon("droplet"),
        name: "Leak Fixes",
        hoverText: "How to identify and repair common plumbing leaks",
        emoji: "💧",
        path: "/plumber/glossary"
      },
      {
        iconType: "droplet",
        icon: createIcon("droplet"),
        name: "Toilet Trouble",
        hoverText: "Fixes for running toilets, weak flushes and other issues",
        emoji: "🚽",
        path: "/plumber/glossary"
      },
      {
        iconType: "droplet",
        icon: createIcon("droplet"),
        name: "Faucet Repair",
        hoverText: "Solutions for dripping, squeaking or stuck faucets",
        emoji: "🚰",
        path: "/plumber/glossary"
      }
    ]
  },
  painter: {
    title: "Quick Painting Solutions",
    categories: [
      {
        iconType: "brush",
        icon: createIcon("brush"),
        name: "Surface Prep",
        hoverText: "How to prepare different surfaces for painting",
        emoji: "🧰",
        path: "/painter/glossary"
      },
      {
        iconType: "brush",
        icon: createIcon("brush"),
        name: "Paint Selection",
        hoverText: "Choosing the right type of paint for your project",
        emoji: "🎨",
        path: "/painter/glossary"
      },
      {
        iconType: "brush",
        icon: createIcon("brush"),
        name: "Technique Tips",
        hoverText: "Professional painting techniques for beginners",
        emoji: "🖌️",
        path: "/painter/glossary"
      },
      {
        iconType: "brush",
        icon: createIcon("brush"),
        name: "Problem Solving",
        hoverText: "Fixing common painting issues and mistakes",
        emoji: "🔍",
        path: "/painter/glossary"
      }
    ]
  },
  pool: {
    title: "Quick Pool Solutions",
    categories: [
      {
        iconType: "pool",
        icon: createIcon("pool"),
        name: "Water Chemistry",
        hoverText: "Balancing your pool's chemical levels",
        emoji: "⚗️",
        path: "/pool/glossary"
      },
      {
        iconType: "pool",
        icon: createIcon("pool"),
        name: "Equipment Care",
        hoverText: "Maintaining pumps, filters, and other pool equipment",
        emoji: "⚙️",
        path: "/pool/glossary"
      },
      {
        iconType: "pool",
        icon: createIcon("pool"),
        name: "Cleaning Tips",
        hoverText: "Efficient techniques for keeping your pool clean",
        emoji: "🧹",
        path: "/pool/glossary"
      },
      {
        iconType: "pool",
        icon: createIcon("pool"),
        name: "Seasonal Care",
        hoverText: "Opening, closing, and maintaining your pool year-round",
        emoji: "🌡️",
        path: "/pool/glossary"
      }
    ]
  },
  declutter: {
    title: "Quick Decluttering Solutions",
    categories: [
      {
        iconType: "user",
        icon: createIcon("user"),
        name: "Space Sorting",
        hoverText: "Organizing and categorizing your belongings",
        emoji: "📦",
        path: "/declutter/glossary"
      },
      {
        iconType: "user",
        icon: createIcon("user"),
        name: "Joy Sparking",
        hoverText: "Deciding what items to keep and what to let go",
        emoji: "✨",
        path: "/declutter/glossary"
      },
      {
        iconType: "user",
        icon: createIcon("user"),
        name: "Storage Ideas",
        hoverText: "Creative solutions for storing your essentials",
        emoji: "🗄️",
        path: "/declutter/glossary"
      },
      {
        iconType: "user",
        icon: createIcon("user"),
        name: "Maintenance",
        hoverText: "Systems to keep your space organized long-term",
        emoji: "🔄",
        path: "/declutter/glossary"
      }
    ]
  }
};
