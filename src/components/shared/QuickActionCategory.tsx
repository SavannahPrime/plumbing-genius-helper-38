
import React from "react";
import { Link } from "react-router-dom";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { getContextSpecificPath } from "@/utils/pathUtils";
import { IconType } from "@/utils/iconUtils";

export interface QuickActionCategory {
  iconType: IconType;
  icon: React.ReactNode;
  name: string;
  hoverText: string;
  emoji: string;
  path: string;
}

interface QuickActionCategoryCardProps {
  category: QuickActionCategory;
  currentContext: string;
}

const QuickActionCategoryCard: React.FC<QuickActionCategoryCardProps> = ({ 
  category, 
  currentContext 
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link 
          to={getContextSpecificPath(category.path, currentContext)}
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
  );
};

export default QuickActionCategoryCard;
