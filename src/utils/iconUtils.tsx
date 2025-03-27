
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
  LucideIcon
} from "lucide-react";

export type IconType = "chef" | "wrench" | "scissors" | "zap" | "smartphone" | "droplet" | "car" | "hammer" | "bath";

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
  bath: Bath
};

// Function to create icon JSX element
export const createIcon = (iconType: IconType): JSX.Element => {
  const IconComponent = iconComponents[iconType];
  return <IconComponent className="h-4 w-4 text-primary" />;
};
