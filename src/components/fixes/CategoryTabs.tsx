
import React from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants/plumbingFixes";

interface CategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryTabs = ({ selectedCategory, setSelectedCategory }: CategoryTabsProps) => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className="whitespace-nowrap"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
