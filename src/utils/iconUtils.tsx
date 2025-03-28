
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
  Bath,
  Paintbrush,
  User,
  LifeBuoy,
  LucideIcon
} from "lucide-react";

export type IconType = "chef" | "wrench" | "scissors" | "zap" | "smartphone" | "droplet" | "car" | "hammer" | "bath" | "paintbrush" | "user" | "lifebuoy";

// Map of icon types to their components
export const iconComponents: Record<IconType, LucideIcon> = {
  chef: ChefHat,
  wrench: Wrench,
  scissors: Scissors,
  zap: Zap,
  smartphone: Smartphone,
  droplet: Droplet,
  car: Car,
  hammer: Hammer,
  bath: Bath,
  paintbrush: Paintbrush,
  user: User,
  lifebuoy: LifeBuoy
};

// Function to create icon JSX element
export const createIcon = (iconType: IconType): JSX.Element => {
  const IconComponent = iconComponents[iconType];
  return <IconComponent className="h-4 w-4 text-primary" />;
};
