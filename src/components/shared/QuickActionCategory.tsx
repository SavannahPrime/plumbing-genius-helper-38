
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SubscriptionToggle from './SubscriptionToggle';
import { SpecialtyCategory } from '@/data/specialtyCategories';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

interface QuickActionCategoryProps {
  category: SpecialtyCategory;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  showAction?: boolean;
  showToggle?: boolean;
  specialty?: string;
}

const QuickActionCategory = ({ 
  category, 
  size = 'md', 
  showDescription = true,
  showAction = true,
  showToggle = false,
  specialty
}: QuickActionCategoryProps) => {
  const [activeAgents, setActiveAgents] = useLocalStorage<string[]>('activeAgents', []);
  
  const isAgentActive = activeAgents.includes(category.id);
  
  const handleToggle = (isActive: boolean) => {
    if (isActive) {
      setActiveAgents([...activeAgents, category.id]);
    } else {
      setActiveAgents(activeAgents.filter(id => id !== category.id));
    }
  };

  const handleConnect = () => {
    if (category.requiresSubscription && !isAgentActive) {
      toast("Subscription Required", {
        description: "This agent requires a subscription to connect.",
        action: {
          label: "Subscribe",
          onClick: () => window.location.href = "/subscription"
        }
      });
      return;
    }
    
    if (!isAgentActive) {
      setActiveAgents([...activeAgents, category.id]);
      toast.success(`Connected to ${category.name}`);
    } else {
      window.location.href = category.path;
    }
  };

  const getCardSize = () => {
    switch (size) {
      case 'sm':
        return 'w-full';
      case 'lg':
        return 'w-full';
      default:
        return 'w-full';
    }
  };

  return (
    <Card className={`${getCardSize()} hover:shadow-md transition-shadow duration-300 relative overflow-hidden group`}>
      {category.isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-md">
            Popular
          </div>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-primary/10 text-primary">
              {category.icon}
            </div>
            <CardTitle className={size === 'sm' ? 'text-lg' : 'text-xl'}>
              {category.name}
            </CardTitle>
          </div>
          {showToggle && (
            <SubscriptionToggle 
              isSubscriptionRequired={category.requiresSubscription || false}
              isActive={isAgentActive}
              onToggle={handleToggle}
            />
          )}
        </div>
        {showDescription && (
          <CardDescription className="mt-2 line-clamp-2">
            {category.description}
          </CardDescription>
        )}
      </CardHeader>
      {showAction && (
        <CardContent className="pt-0">
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleConnect}
              className={isAgentActive ? "bg-green-50 border-green-200 text-green-600 hover:bg-green-100" : ""}
            >
              {isAgentActive ? "Chat Now" : "Connect"}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default QuickActionCategory;
