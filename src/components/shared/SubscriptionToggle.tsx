
import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { toast } from "sonner";

interface SubscriptionToggleProps {
  isSubscriptionRequired: boolean;
  isActive?: boolean;
  onToggle?: (isActive: boolean) => void;
}

const SubscriptionToggle = ({ 
  isSubscriptionRequired, 
  isActive = false, 
  onToggle 
}: SubscriptionToggleProps) => {
  const [active, setActive] = useState(isActive);

  const handleToggle = () => {
    if (isSubscriptionRequired) {
      toast("Subscription required", {
        description: "Please subscribe to access this premium agent",
        action: {
          label: "Subscribe",
          onClick: () => window.location.href = "/subscription"
        }
      });
      return;
    }

    const newState = !active;
    setActive(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <Switch 
          checked={active} 
          onCheckedChange={handleToggle} 
          disabled={isSubscriptionRequired && !active}
          className={isSubscriptionRequired && !active ? "cursor-not-allowed" : "cursor-pointer"}
        />
        {isSubscriptionRequired && !active && (
          <Lock size={14} className="text-amber-500" />
        )}
      </div>
      <Badge 
        variant={active ? "default" : "outline"} 
        className={`text-xs ${active ? "bg-green-600" : ""}`}
      >
        {active ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
};

export default SubscriptionToggle;
