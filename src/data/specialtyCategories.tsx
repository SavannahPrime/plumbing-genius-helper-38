
import { Home, Wrench, Zap, Droplet, Hammer, PlusCircle, Car, Scissors, ChefHat, Shovel } from "lucide-react";
import { SpecialtyType } from "@/types/global";

export interface SpecialtyCategory {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  description: string;
  agentId?: string;
  isPopular?: boolean;
  requiresSubscription?: boolean;
}

export const specialtyCategories: SpecialtyCategory[] = [
  {
    id: "plumber",
    name: "Plumbing Assistant",
    path: "/plumber",
    icon: <Droplet size={24} />,
    description: "Expert guidance for all your plumbing issues - from leaky faucets to pipe installations.",
    isPopular: true,
    requiresSubscription: false
  },
  {
    id: "handyman",
    name: "DIY Handyman",
    path: "/handyman",
    icon: <Hammer size={24} />,
    description: "Your virtual assistant for home repairs, furniture assembly, and general maintenance tasks.",
    isPopular: true,
    requiresSubscription: false
  },
  {
    id: "electrician",
    name: "Electrical Expert",
    path: "/electrician",
    icon: <Zap size={24} />,
    description: "Safe guidance for electrical repairs, installations, and troubleshooting electrical problems.",
    isPopular: false,
    requiresSubscription: true
  },
  {
    id: "chef",
    name: "Personal Chef",
    path: "/chef",
    icon: <ChefHat size={24} />,
    description: "Culinary guidance, recipe ideas, cooking techniques, and food substitution advice.",
    isPopular: false,
    requiresSubscription: true
  },
  {
    id: "mechanic",
    name: "Auto Mechanic",
    path: "/mechanic",
    icon: <Car size={24} />,
    description: "Vehicle maintenance tips, troubleshooting engine problems, and car repair guidance.",
    isPopular: false,
    requiresSubscription: true
  },
  {
    id: "stylist",
    name: "Fashion Stylist",
    path: "/stylist",
    icon: <Scissors size={24} />,
    description: "Personal style advice, outfit recommendations, and fashion trend insights.",
    isPopular: false,
    requiresSubscription: true
  },
  {
    id: "landscaper",
    name: "Garden Expert",
    path: "/landscaper",
    icon: <Shovel size={24} />,
    description: "Landscaping guidance, plant care tips, garden design, and outdoor maintenance advice.",
    isPopular: false,
    requiresSubscription: true
  },
  {
    id: "cleaning",
    name: "Cleaning Pro",
    path: "/cleaning",
    icon: <PlusCircle size={24} />,
    description: "Specialized cleaning techniques for difficult stains, efficient cleaning routines, and organization tips.",
    isPopular: false,
    requiresSubscription: false
  },
  {
    id: "gadgetfixgenie",
    name: "Tech Support",
    path: "/gadgetfixgenie",
    icon: <Wrench size={24} />,
    description: "Troubleshooting for your electronic devices, setup guidance, and tech problem-solving.",
    isPopular: true,
    requiresSubscription: false
  },
];

export const getSpecialtyById = (id: string | null | undefined): SpecialtyCategory | undefined => {
  if (!id) return undefined;
  return specialtyCategories.find(specialty => specialty.id === id);
};

export const getSpecialtyByPath = (path: string | null | undefined): SpecialtyCategory | undefined => {
  if (!path) return undefined;
  return specialtyCategories.find(specialty => specialty.path === path);
};
