
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useLocalStorage } from './useLocalStorage';
import { specialtyCategories } from '@/data/specialtyCategories';

export const useActiveAgents = () => {
  const [activeAgents, setActiveAgents] = useLocalStorage<string[]>('activeAgents', []);
  const [initialized, setInitialized] = useState(false);

  // Initialize with default free agents if nothing is stored yet
  useEffect(() => {
    if (!initialized && activeAgents.length === 0) {
      const defaultActiveAgents = specialtyCategories
        .filter(category => !category.requiresSubscription)
        .map(category => category.id);
      
      setActiveAgents(defaultActiveAgents);
      setInitialized(true);
    }
  }, [activeAgents, initialized, setActiveAgents]);

  const toggleAgent = (agentId: string) => {
    const agent = specialtyCategories.find(category => category.id === agentId);
    
    if (agent?.requiresSubscription) {
      toast("Subscription Required", {
        description: "This agent requires a premium subscription.",
        action: {
          label: "Subscribe",
          onClick: () => window.location.href = "/subscription"
        }
      });
      return;
    }
    
    if (activeAgents.includes(agentId)) {
      setActiveAgents(activeAgents.filter(id => id !== agentId));
      toast.info(`${agent?.name || 'Agent'} deactivated`);
    } else {
      setActiveAgents([...activeAgents, agentId]);
      toast.success(`${agent?.name || 'Agent'} activated`);
    }
  };

  const isAgentActive = (agentId: string) => {
    return activeAgents.includes(agentId);
  };

  return {
    activeAgents,
    toggleAgent,
    isAgentActive
  };
};
