
import React from "react";
import { Button } from "@/components/ui/button";
import { categories, Category } from "@/constants/plumbingFixes";
import { useLocation } from "react-router-dom";

interface CategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryTabs = ({ selectedCategory, setSelectedCategory }: CategoryTabsProps) => {
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
    
    return "";
  };
  
  const currentContext = getCurrentContext();
  
  // Filter categories based on context if needed
  const contextCategories = currentContext ? 
    categories.filter(cat => !cat.excludeFrom || !cat.excludeFrom.includes(currentContext)) : 
    categories;
  
  return (
    <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
      {contextCategories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "ghost"}
          className={`whitespace-nowrap ${selectedCategory === category.id ? 'bg-[#00AEEF] hover:bg-[#00AEEF]/90' : ''}`}
          onClick={() => setSelectedCategory(category.id)}
        >
          <span className="mr-2">{category.icon}</span>
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryTabs;
