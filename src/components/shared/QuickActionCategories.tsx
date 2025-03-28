
import React from "react";
import { motion } from "framer-motion";
import { specialtyCategories } from "@/data/specialtyCategories";
import QuickActionCategoryCard, { QuickActionCategory } from "./QuickActionCategory";
import { useCurrentContext } from "@/utils/pathUtils";

interface QuickActionCategoriesProps {
  title?: string;
  categories?: QuickActionCategory[];
  specialty?: string;
  className?: string;
}

const QuickActionCategories = ({ 
  title, 
  categories, 
  specialty, 
  className = "" 
}: QuickActionCategoriesProps) => {
  const currentContext = useCurrentContext();
  
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
          <QuickActionCategoryCard 
            key={index} 
            category={category} 
            currentContext={currentContext} 
          />
        ))}
      </div>
    </motion.section>
  );
};

export default QuickActionCategories;
