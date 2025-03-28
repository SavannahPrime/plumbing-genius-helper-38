
import React from 'react';
import { specialtyCategories } from '@/data/specialtyCategories';
import QuickActionCategory from './QuickActionCategory';

interface QuickActionCategoriesProps {
  showPopularOnly?: boolean;
  showToggle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  showAction?: boolean;
  specialty?: string;
}

const QuickActionCategories = ({ 
  showPopularOnly = false, 
  showToggle = false,
  size = 'md',
  showDescription = true,
  showAction = true,
  specialty
}: QuickActionCategoriesProps) => {
  const filteredCategories = showPopularOnly
    ? specialtyCategories.filter(category => category.isPopular)
    : specialtyCategories;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCategories.map((category) => (
        <QuickActionCategory 
          key={category.id} 
          category={category} 
          size={size}
          showDescription={showDescription}
          showAction={showAction}
          showToggle={showToggle}
        />
      ))}
    </div>
  );
};

export default QuickActionCategories;
